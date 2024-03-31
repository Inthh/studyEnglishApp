import { BASE_URL } from "./constants"

export async function vocabularyListLoader({ params }: any) {
    const { topicId } = params
    try {
        const reponse = await fetch(BASE_URL + `/vocabularies?topicId=${topicId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        const { vocabularies } = await reponse.json()

        return { vocabularies }
    } catch (err) {
        console.log(`Error while fetching vocabularies of topicId=${topicId} reason=${err}`)
        return {
            vocabularies: []
        }
    }
}

export async function vocabularySetsLoader() {
    try {
        const reponse = await fetch(BASE_URL + `/vocabulary-sets`, {
            method: 'GET'
        })

        const { vocabularySets } = await reponse.json()
        return {
            vocabularySets
        }
    } catch (err) {
        console.log("Error while fetching vocabulary sets", err)
        return {
            vocabularySets: []
        }
    }
}

type UpdateMemoriedData = {
    vocabularyId: number,
    userId: number,
    isMemoried: boolean
} | { allUnmemoried: boolean, topicId: number }
export async function updateMemoried({ params, request }) {
    let result = null;
    const userVoca = await request.formData();
    const allUnmemoried = userVoca.get("allUnmemoried")
    const topicId = userVoca.get("topicId")

    let dataSubmit: UpdateMemoriedData;

    if (allUnmemoried && topicId) {
        dataSubmit = { allUnmemoried: allUnmemoried === 'true', topicId: parseInt(topicId) }
    } else {
        dataSubmit = {
            vocabularyId: 0,
            userId: 0,
            isMemoried: false,
        }
        userVoca.forEach((value: FormDataEntryValue, key: keyof UpdateMemoriedData) => {
            if (key in dataSubmit) {
                if (key === 'isMemoried') {
                    dataSubmit[key] = value === 'true';
                } else {
                    dataSubmit[key] = parseInt(value as string, 10);
                }
            }
        })
    }

    try {
        result = await (await fetch(BASE_URL + `/vocabularies`, {
            method: 'PATCH',
            body: JSON.stringify(dataSubmit),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })).json()
    } catch (err) {
        console.log("Error while updating for vocabulary", err)
    }
    return result;
}