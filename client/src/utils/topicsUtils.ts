import { BASE_URL, TOPICS_PAGE_SIZE } from "./constants"

export async function getTopicsOfSetByPageNum(setId: number, pageNum: number) {
    try {
        const reponse = await fetch(BASE_URL + `/topics?setId=${setId}&pageNumber=${pageNum}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        const { topics } = await reponse.json();
        return { topics };
    } catch (err) {
        console.log("Error while fetching topics", err)
        return null;
    }
}

export async function topicsLoader({ params }: any) {
    const { setId, topicId } = params
    const pageNumber = Math.floor(parseInt(topicId)/TOPICS_PAGE_SIZE) + 1
    return await getTopicsOfSetByPageNum(setId, pageNumber);
}

export async function learnLoader({ params }: any) {
    try {
        const { setId } = params
        const reponse = await fetch(BASE_URL + `/topics/total?setId=${setId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        const { totalTopics } = await reponse.json();
        return { totalTopics };
    } catch (err) {
        console.log("Error while fetching total topics", err)
        return { totalTopics: 0 };
    }
}