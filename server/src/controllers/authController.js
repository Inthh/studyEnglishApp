import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import db from '../model/index.js';
import { transporter } from '../utils/mailer.js';
import { extractPayloadFromToken, generateTokensAndPublicKey, signToken } from '../utils/tokenHandler.js';

const authController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const login = await db.Login.findOne({
                attributes: ["userId"],
                where: { username, password }
            });

            if (!login) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const jwtOptions = {
                algorithm: 'RS512', expiresIn:  '30d'
            };
            const { tokens, publicKey } = generateTokensAndPublicKey({ userId: login.userId, options: jwtOptions });
            const { accessToken, refreshToken } = tokens;
            if (!accessToken || !refreshToken) {
                res.status(500).json({ message: 'Internal server error' });
            } else {
                db.Login.update({ publicKey }, {
                    where: { userId: login.userId }
                }).then(() => {
                    res.json({ accessToken, refreshToken });
                }).catch(() => {
                    res.status(500).json({ message: 'Internal server error' });
                })
            }
        } catch (err) {
            console.log('Error while login: ', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    logout: async (req, res) => {
        const { authorization } = req.headers;
        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            res.status(400).json({ message: 'Bad Request' });
            return;
        }

        const payload = extractPayloadFromToken(accessToken);

        if (!payload) {
            res.status(400).json({ message: 'Bad Request' });
            return;
        }

        const { publicKey } = await db.Login.findOne({
            attributes: ['publicKey'],
            where: {
                userId: payload.userId
            }
        });

        jwt.verify(accessToken, publicKey, function(err, decoded) {
            if ((err && err.name === 'TokenExpiredError') || (!err && decoded)) {
                // Remove publicKey to database
                db.Login.update({ publicKey: null }, {
                    where: { userId: payload.userId }
                }).then(() => {
                    res.json({ message: 'Log out successfully' });
                }).catch(() => {
                    res.status(500).json({ message: 'Internal server error' });
                });
                return;
            }

            res.status(400).json({ message: 'Bad Request' });
        });
    },

    async register(req, res) {
        const { defaultInfo, googleInfo, type } = req.body;

        try {
            switch (type) {
                case 'default': {
                    if (!defaultInfo || Object.entries(defaultInfo).some(
                        (entry) => !entry[1] && entry[0] !== 'lastname')) {
                        console.log("Some registered infomation is invalid");
                        return res.status(400).json({ message: 'Bad Request' });
                    }

                    const loginInfo = await db.Login.findOne({
                        where: { 
                            [Op.or]: [
                                { username: defaultInfo.username },
                                { email: defaultInfo.email, type: "default" }
                            ] 
                        },
                        raw: true
                    });

                    if (loginInfo) {
                        console.log("This username or email or this email is already registered");
                        return res.status(400).json({ message: 'Username or email is already registered' });
                    }

                    const ts = await db.sequelize.transaction();
                    try {
                        const user = await db.User.create({
                            firstname: defaultInfo.firstname,
                            lastname: defaultInfo.lastname,
                            email: defaultInfo.email,
                            type
                        }, {
                            transaction: ts
                        });

                        const jwtOptions = {
                            algorithm: 'RS512', expiresIn:  '30d'
                        };
                        const { tokens, publicKey } = generateTokensAndPublicKey({ userId: user.id, options: jwtOptions });

                        await db.Login.create({
                            userId: user.id,
                            username: defaultInfo.username,
                            password: defaultInfo.password,
                            publicKey,
                            type
                        }, {
                            transaction: ts
                        });
                        await ts.commit();

                        console.log("Register account with username password successful");
                        return res.status(200).json({ tokens });
                    } catch (err) {
                        await ts.rollback();

                        console.log(`Register with type ${type} failed reason: ${err.message}`);
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                }

                case 'google': {
                    if (!googleInfo || Object.values(googleInfo).some(info => !info)) {
                        return res.status(400).json({ message: 'Bad Request' });
                    }

                    const [user, created] = await db.User.findOrCreate({
                        where: { uid: googleInfo.uid },
                        defaults: {
                            ...googleInfo,
                            type
                        }
                    });

                    if (created) {
                        console.log("Register account with google successful")
                    }

                    return res.status(200).json({ uid: user.uid, displayName: user.displayName });
                }

                default:
                    console.error('Register type is invalid: ', req.body.type);
                    return res.status(400).json({ message: 'Bad Request' });
            }
        } catch (err) {
            console.log(`Register with type ${type} failed reason: ${err.message}`);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    async changePassword(req, res) {
        const { oldPassword, newPassword } = req.body;
        const userId = req.userId

        try {
            const result = await db.Login.findOne({
                where: { userId, password: oldPassword }
            });

            if (!result) {
                console.log('Old password is invalid so could not change password');
                return res.status(400).json({ message: 'Old password is invalid' });
            }

            if (newPassword.length < 6) {
                console.log('New password is invalid so could not change password');
                return res.status(400).json({ message: 'New password is invalid' });
            }

            const jwtOptions = {
                algorithm: 'RS512', expiresIn:  '30d'
            };
            const { tokens, publicKey } = generateTokensAndPublicKey({ userId, options: jwtOptions });
            const { accessToken, refreshToken } = tokens;
            if (!accessToken || !refreshToken) {
                throw new Error('Gererate tokens and public keys failed');
            }
            await db.Login.update({ publicKey, password: newPassword }, {
                where: { userId }
            });
            console.log(`Change password for user ${userId} successfully`);
            res.json({ accessToken, refreshToken });
        } catch (err) {
            console.log('An error occured while change password: ', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const user = await db.User.findOne({ where: { email } });

            if (!user || user.type !== 'default') {
                return res.status(404).json({ message: "User is not exist"});
            }

            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem'
                }
            });
            const jwtOptions = {
                algorithm: 'RS512', expiresIn: '10m'
            };
            const token = signToken({ userId: user.id }, privateKey, jwtOptions);
            await db.Login.update({
                resetKey: publicKey
            }, {
                where: { userId: user.id }
            });

            const resetLink = `http://${req.headers.host}/reset-password/${user.id}/${token}`;
            console.log(resetLink);

            // await transporter.sendMail({
            //     from: 'dolphin.learning.01@gmail.com',
            //     to: email, 
            //     subject: 'Password Reset Request',
            //     html: `
            //         <p>You requested a password reset. Click the link below to reset your password:</p>
            //         <a href="${resetLink}">${resetLink}</a>
            //     `,
            // });

            res.status(200).json({ message: "Reset link sent to your email" });
        } catch (err) {
            console.log(`An error occured while forgoting password reason=${err.message}`);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default authController;