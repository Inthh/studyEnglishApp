import jwt from 'jsonwebtoken';

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
            res.status(400).json({ message: 'Bad Request' });
        }
    }

    res.status(400).json({ message: 'Bad Request' });
}
export default authentication;