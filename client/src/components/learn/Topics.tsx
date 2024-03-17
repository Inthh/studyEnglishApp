import { useState } from "react";

type Topic = {
    id: number,
    name: string
}
const topics: Topic[] = [
    {
        id: 1,
        name: "Contracts"
    },
    {
        id: 2,
        name: "Marketing"
    },
    {
        id: 3,
        name: "Warranties"
    },
    {
        id: 4,
        name: "Business Planning"
    },
    {
        id: 5,
        name: "Conferences"
    },
    {
        id: 6,
        name: "Computer and Internet"
    }
]

function Topics() {
    const [activeTopicId, setActiveTopicId] = useState(1)

    return (
        <div className="col-span-1 grid grid-rows-6 w-[80%]">
            <p className="row-span-1 text-2xl font-bold ml-5 my-auto">Topics</p>
            <div className="row-span-5 border-2 border-dashed border-slate-200 rounded-2xl mx-5">
                <ul>
                    {
                        topics.map((topic: Topic, idx) => {
                            return (
                                <li className={`rounded-2xl m-8 drop-shadow-xl p-4 font-semibold hover:cursor-pointer
                                    ${activeTopicId === idx + 1 ? "bg-blue-900 text-white" : "bg-white text-blue-900"}`} key={topic.id}
                                    onClick={() => setActiveTopicId(idx + 1)}>
                                    {idx + 1}. {topic.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Topics;