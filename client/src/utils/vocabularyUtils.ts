import { BASE_URL } from "./constants"

export async function vocabularyListLoader({ params }: any) {
    const { topicId } = params
    const reponse = await fetch(BASE_URL + `/vocabularies?topicId=${topicId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    const data =  await reponse.json();
    if (reponse.status !== 200) {
        console.log(`Error while fetching vocabularies of topicId=${topicId} status=${reponse.status} reason=${data.message}`);
        throw new Error(`${reponse.status}`);
    }

    return { ...data };
}

export async function vocabularySetsLoader() {
    const reponse = await fetch(BASE_URL + `/vocabulary-sets`, {
        method: 'GET'
    });

    const data =  await reponse.json();
    if (reponse.status !== 200) {
        console.log(`Error while fetching vocabulary sets status=${reponse.status} reason=${data.message}`);
        throw new Error(`${reponse.status}`);
    }

    const { vocabularySets } = data;
    return {
        vocabularySets
    };
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

    const reponse = await fetch(BASE_URL + `/vocabularies`, {
        method: 'PATCH',
        body: JSON.stringify(dataSubmit),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    result =  await reponse.json();
    if (reponse.status !== 200) {
        console.log(`Error while updating for vocabulary status=${reponse.status} reason=${result.message}`);
        throw new Error(`${reponse.status}`);
    }
    return result;
}