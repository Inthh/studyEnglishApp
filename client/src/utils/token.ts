const extractPayloadFromToken = (token: string) => {
    const jwtArr = token.split('.');

    if (jwtArr.length !== 3) {
        return null;
    }

    try {
        const payload = jwtArr[1];
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
    } catch(e) {
        console.log('Error while extracting payload from token: ' + (e as Error).message);
        return null;
    }
}

export {
    extractPayloadFromToken
}