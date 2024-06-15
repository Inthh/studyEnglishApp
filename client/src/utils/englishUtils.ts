import { SERVER_BASE_URL } from "./constants"

export async function checkGrammar(paragraph: string) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return null;
    }
    const reponse = await fetch(SERVER_BASE_URL + `/english/check-grammar`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ paragraph }),
    });

    const data =  await reponse.json();
    if (reponse.status !== 200) {
        console.log(`Error while checking grammar for paragraph status=${reponse.status} reason=${data.message}`);
        throw new Error(`${reponse.status}`);
    }

    return data;
}