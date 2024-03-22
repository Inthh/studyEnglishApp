import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../common/Pagination";

type Topic = {
    id: number,
    name: string
}

function Topics({ topics }: { topics: Topic[] }) {
    const { topicId } = useParams();
    const [activeTopicId, setActiveTopicId] = useState(parseInt(topicId as string));

    return (
        <>
            <div className="col-span-1 grid grid-rows-6 w-[80%]">
                <p className="row-span-1 text-2xl font-bold ml-5 my-auto">Topics</p>
                <div className="row-span-5 border-2 border-dashed border-slate-200 rounded-2xl mx-5">
                    <div className={`grid grid-rows-${topics.length + 1}`}>
                        {
                            topics.map((topic: Topic, idx) => {
                                return (
                                    <Link to={`topics/${topic.id}`} className={`rounded-2xl mx-8 my-5 drop-shadow-xl p-4 font-semibold hover:cursor-pointer
                                        ${activeTopicId === topic.id ? "bg-blue-900 text-white" : "bg-white text-blue-900"}`} key={topic.id}
                                        onClick={() => setActiveTopicId(topic.id)}>
                                        {idx + 1}. {topic.name}
                                    </Link>
                                )
                            })
                        }
                        <div className="row-span-1 grid justify-items-center items-center">
                            <Pagination totalPage={4}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Topics;