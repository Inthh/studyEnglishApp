import { BASE_URL } from "./constants"

export function vocabularyListLoader({ params }: any) {
    const { topicId } = params

    if (parseInt(topicId as string) === 2)
        return {
            vocabularies: [
                {
                    id: 1,
                    vocabulary: "Checking",
                    pos: "noun",
                    vietnamese: "quả táo",
                    example: "I ate an apple this morning.",
                    isMemoried: false,
                },
                {
                    id: 2,
                    vocabulary: "Checking 2",
                    pos: "noun",
                    vietnamese: "sách",
                    example: "She loves reading books.",
                    isMemoried: false
                }
            ]
        }
    return {
        vocabularies: [
            {
                id: 1,
                vocabulary: "apple",
                pos: "noun",
                vietnamese: "quả táo",
                example: "I ate an apple this morning.",
                isMemoried: false,
            },
            {
                id: 2,
                vocabulary: "book",
                pos: "noun",
                vietnamese: "sách",
                example: "She loves reading books.",
                isMemoried: false
            },
            {
                id: 3,
                vocabulary: "happy",
                pos: "adjective",
                vietnamese: "hạnh phúc",
                example: "He felt happy after receiving the good news.",
                isMemoried: false
            },
            {
                id: 4,
                vocabulary: "run",
                pos: "verb",
                vietnamese: "chạy",
                example: "She likes to run in the morning.",
                isMemoried: false
            },
            {
                id: 5,
                vocabulary: "yellow",
                pos: "adjective",
                vietnamese: "màu vàng",
                example: "The sunflowers are yellow.",
                isMemoried: false
            }
        ]
    }
}

export async function vocabularySetsLoader() {
    try {
        const reponse = await fetch(BASE_URL + `/vocabulary-sets`, {
            method: 'GET'
        })
    
        const { vocabularySets } = await reponse.json()
        console.log(vocabularySets)
        return {
            vocabularySets
        }
    } catch (err) {
        console.log("Error while fetching vocabulary sets", err)
        return []
    }
}