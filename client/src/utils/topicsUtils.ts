import { BASE_URL, TOPICS_PAGE_SIZE } from "./constants"

export async function getTopicsOfSetByPageNum(setId: number, pageNum: number) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return null;
    }

    const reponse = await fetch(BASE_URL + `/topics?setId=${setId}&pageNumber=${pageNum}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data =  await reponse.json();
    if (reponse.status !== 200) {
        console.log(`Error while fetching topics status=${reponse.status} reason=${data.message}`);
        throw new Error(`${reponse.status}`);
    }

    const { topics } = data;
    return { topics };
}

export async function topicsLoader({ params }: any) {
    const { setId, topicId } = params
    const pageNumber = Math.floor(parseInt(topicId)/TOPICS_PAGE_SIZE) + 1
    return await getTopicsOfSetByPageNum(setId, pageNumber);
}

export async function learnLoader({ params }: any) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return null;
    }

    const { setId } = params
    const reponse = await fetch(BASE_URL + `/topics/total?setId=${setId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const data =  await reponse.json();
    if (reponse.status !== 200) {
        console.log(`Error while fetching total topics" status=${reponse.status} reason=${data.message}`);
        throw new Error(`${reponse.status}`);
    }

    const { totalTopics } = data;
    return { totalTopics };
}