import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const signToken = (payload, privateKey, options) => {
    return jwt.sign(payload, privateKey, options);
}

const extractPayloadFromToken = (token) => {
    const jwtArr = token.split('.');

    if (jwtArr.length !== 3) {
        return null;
    }

    try {
        const payload = jwtArr[1];
        const decodedPayload = Buffer.from(payload, 'base64');
        const payloadStr = decodedPayload.toString('utf-8');
        return JSON.parse(payloadStr);
    } catch(e) {
        console.log('Error while extracting payload from token: ' + e.message);
        return null;
    }
}

const generateTokensAndPublicKey = ({ userId, options }) => {
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

    const accessToken = signToken({ userId }, privateKey, options);
    options.expiresIn = '15 days';
    const refreshToken = signToken({ userId }, privateKey, options);

    return { tokens: { accessToken, refreshToken }, publicKey };
}

export {
    generateTokensAndPublicKey,
    extractPayloadFromToken,
    signToken
}