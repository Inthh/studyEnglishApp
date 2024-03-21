import { BASE_URL } from "./constants"

export async function topicsLoader({ params }: any) {
    try {
        const { setId } = params
        const reponse = await fetch(BASE_URL + `/topics?setId=${setId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    
        const { topics } = await reponse.json()
        return { topics }
    } catch (err) {
        console.log("Error while fetching topics", err)
        return []
    }
}