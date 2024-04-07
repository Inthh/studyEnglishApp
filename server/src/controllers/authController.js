import jwt from 'jsonwebtoken';

import db from "../model/index.js";
import { extractPayloadFromToken, generateTokensAndPublicKey } from '../utils/tokenHandler.js';

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

    async register (req, res) {
        const { username, password, uid, displayName, type } = req.body;

        try {
            switch (type) {
                case 'default': {
                    if (!username || !password) {
                        return res.status(400).json({ message: 'Bad Request' });
                    }
                    const result = await db.Login.create({   
                        username,
                        password,
                        type
                    });
                    const { tokens, publicKey } = generateTokensAndPublicKey(result.userId)
    
                    await db.Login.update({ publicKey }, {
                        where: { userId: result.userId }
                    });
                    console.log("Register account with username password successful")
                    return res.status(200).json({ tokens });
                }

                case 'google': {
                    if (!uid || !displayName) {
                        return res.status(400).json({ message: 'Bad Request' });
                    }
    
                    const [user, created] = await db.User.findOrCreate({
                        where: { uid }, 
                        defaults: {
                            uid,
                            displayName,
                            type
                        }
                    });
                    console.log("Register account with google successful")
    
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
    }
};

export default authController;