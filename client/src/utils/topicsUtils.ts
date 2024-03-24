import { BASE_URL } from "./constants"

export async function getTopicsOfSetByPageNum(setId: number, pageNum: number) {
    try {
        const reponse = await fetch(BASE_URL + `/topics?setId=${setId}&pageNumber=${pageNum}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        const { topics, totalTopics } = await reponse.json();
        return { topics, totalTopics };
    } catch (err) {
        console.log("Error while fetching topics", err)
        return null;
    }
}

export async function topicsLoader({ params }: any) {
    const { setId } = params
    return await getTopicsOfSetByPageNum(setId, 1);
}