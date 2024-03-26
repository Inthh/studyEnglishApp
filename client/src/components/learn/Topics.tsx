import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { TOPICS_PAGE_SIZE } from "../../utils/constants";

type Topic = {
    id: number,
    name: string
}

function Topics() {
    const { topicId } = useParams()
    const { topics } = useLoaderData() as { topics: Topic[], totalTopics: number };
    const [activeTopicId, setActiveTopicId] = useState(topicId ? parseInt(topicId) : topics[0].id);

    useEffect(() => {
        setActiveTopicId(topics[0].id);
    }, [topics])

    return (
        <div className="grid grid-cols-3 justify-items-center">
            <div className="col-span-1 w-[80%]">
                <div className="grid grid-rows-6">
                    <p className="row-span-1 text-2xl font-bold ml-5 my-auto">Topics</p>
                    <div className="row-span-5 border-2 border-dashed border-slate-200 rounded-2xl mx-5">
                        <div className={`grid grid-rows-${TOPICS_PAGE_SIZE} row-span-${TOPICS_PAGE_SIZE}`}>
                            {
                                topics.map((topic: Topic) => {
                                    return (
                                        <Link to={`topics/${topic.id}`} className={`rounded-2xl mx-8 my-5 drop-shadow-xl p-4 font-semibold hover:cursor-pointer text-sm whitespace-nowrap truncate
                                            ${activeTopicId === topic.id ? "bg-blue-900 text-white" : "bg-white text-blue-900"}`} key={topic.id}
                                            onClick={() => setActiveTopicId(topic.id)}>
                                            {topic.id}. {topic.name}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 w-[90%]">
                <Outlet />
            </div>
        </div>
    );
}

export default Topics;