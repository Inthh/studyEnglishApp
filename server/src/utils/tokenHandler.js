import jwt from 'jsonwebtoken';

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

export {
    signToken,
    extractPayloadFromToken
}