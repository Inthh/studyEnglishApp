import jwt from 'jsonwebtoken';
import { getAuth } from 'firebase-admin/auth'

import db from '../model/index.js';
import { extractPayloadFromToken } from '../utils/tokenHandler.js';

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    let token = "";
    if (authorization) {
        try {
            const authorizationSplit = authorization.split(' ');
            if (authorizationSplit.length > 1) {
                token = authorizationSplit[1]
                const payload = extractPayloadFromToken(token);

                // Sign in with google
                if (payload && payload?.firebase?.sign_in_provider === 'google.com') {
                    const res = await getAuth().verifyIdToken(token);

                    if (!res || !res.user_id) {
                        console.log('Google access token invalid');
                        return res.status(401).json({ message: 'google access token invalid' });
                    }
                    const { id } = await db.User.findOne({
                        attributes: ['id'],
                        where: {
                            uid: res.user_id
                        }
                    });
                    req.userId = id;
                    next(); 
                    return;
                }

                const { publicKey } = await db.Login.findOne({
                    attributes: ['publicKey'],
                    where: {
                        userId: payload.userId
                    }
                });

                jwt.verify(token, publicKey, function(err, decoded) {
                    if (err) {
                        console.log('Error during verification: ', err.message);
                        if (err.name === 'TokenExpiredError') {
                            res.status(401).json({ message: 'jwt expired' });
                        } else {
                            res.status(401).json({ message: 'jwt error' });
                        }
                        return;
                    }
                    req.userId = decoded.userId;
                    next();
                });

                return;
            }
        } catch (err) {
            console.log('Error while authenticate user: ', err.message);
            return res.status(400).json({ message: 'Bad Request' });
        }
    }

    res.status(400).json({ message: 'Bad Request' });
}
export default authentication;