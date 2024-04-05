import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { TOPICS_PAGE_SIZE } from "../../utils/constants";

type Topic = {
    id: number,
    name: string
}

function Topics() {
    const { topicId } = useParams();
    const { topics } = useLoaderData() as { topics: Topic[], totalTopics: number };
    const topicIdNum = topicId ? parseInt(topicId) : topics[0].id;
    const [activeTopicId, setActiveTopicId] = useState(topicIdNum);

    useEffect(() => {
        setActiveTopicId(topicIdNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topics, topicId])

    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 grid-cols-1 justify-items-center">
            <div className="lg:col-span-1 w-[80%] lg:order-1 sm:order-last order-last">
                <div className="grid grid-rows-[90px_1fr] justify-items-center items-center">
                    <p className="row-span-1 text-2xl font-bold">Topics</p>
                    <div className="border-2 border-slate-200 w-[330px] rounded-2xl p-2">
                        <div className={`grid grid-rows-${TOPICS_PAGE_SIZE} justify-center items-center gap-y-1`}>
                            {
                                topics.map((topic: Topic) => {
                                    return (
                                        <Link to={`topics/${topic.id}`} className={`w-[300px] rounded-xl drop-shadow-xl px-3 py-5 font-semibold hover:cursor-pointer text-sm whitespace-nowrap truncate
                                            ${activeTopicId === topic.id ? "bg-sky-900/75 text-white border-4" : "bg-white text-blue-900"}`} key={topic.id}
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
            <div className="lg:col-span-2 lg:order-last sm:order-1 order-1 w-[80%]">
                <Outlet />
            </div>
        </div>
    );
}

export default Topics;