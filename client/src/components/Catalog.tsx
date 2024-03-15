type VocabularySet = {
    id: number,
    name: string,
    description: string
}

function Catalog() {
    const vocabularySets: VocabularySet[] = [
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

    return (
        <div className="mx-auto pt-20">
            <p className="ml-28 text-2xl font-bold">Bộ từ vựng</p>
            <div className="grid grid-cols-3 m-20 mt-10">
                {
                    vocabularySets.map((set: VocabularySet) => (
                        <div key={set.id} className="rounded-md bg-white m-8">
                            <div className="p-5">
                                <p className="pb-3 text-lg font-semibold">{set.name}</p>
                                <p className="text-sm">{set.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Catalog;