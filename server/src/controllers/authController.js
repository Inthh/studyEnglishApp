import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import db from "../model/index.js";
import { signToken, extractPayloadFromToken } from '../utils/tokenHandler.js';

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
                algorithm: 'RS512', expiresIn:  '30d'
            };
            const accessToken = signToken({ userId: login.userId }, privateKey, jwtOptions);
            jwtOptions.expiresIn = '15 days';
            const refreshToken = signToken({ userId: login.userId }, privateKey, jwtOptions);

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
    }
};

export default authController;