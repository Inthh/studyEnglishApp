export function vocabularyListLoader({ params }: any) {
    const { topicId } = params

    if (topicId === 2)
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

export function vocabularySetsLoader() {
    return {
        vocabularySets: [
            {
                id: 1,
                name: "Từ vựng dành cho kì thi TOEIC",
                description: "Chuẩn bị cho kỳ thi TOEIC với các bài tập và phần mềm hỗ trợ."
            },
            {
                id: 2,
                name: "Từ vựng dành cho kì thi IELTS",
                description: "Học và luyện thi kỳ thi IELTS với các tài liệu và bài tập thực hành."
            },
            {
                id: 3,
                name: "Từ vựng dành cho kì thi TOEFL",
                description: "Chuẩn bị cho kỳ thi TOEFL với các tài liệu và bài tập luyện thi."
            },
            {
                id: 4,
                name: "Từ vựng dành cho kì thi SAT",
                description: "Ôn tập và luyện thi kỳ thi SAT với các tài liệu và bài tập."
            },
            {
                id: 5,
                name: "Từ vựng dành cho kì thi Trinh do nang cao",
                description: "Nâng cao trình độ tiếng Anh với các tài liệu và bài tập luyện thi chuyên sâu."
            }
        ]
    }
}