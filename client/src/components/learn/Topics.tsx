import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import { getTopicsOfSetByPageNum } from "../../utils/topicsUtils";
import { TOPICS_PAGE_SIZE } from "../../utils/constants";

type Topic = {
    id: number,
    name: string
}

function Topics({ topics, totalTopics }: { topics: Topic[], totalTopics: number }) {
    const { topicId, setId } = useParams();
    const [activeTopicId, setActiveTopicId] = useState(parseInt(topicId as string));
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [newTotalTopics, setNewTotalTopics] = useState<number>(totalTopics);
    const [newTopicList, setNewTopicList] = useState<Topic[]>(topics);

    useEffect(() => {
        getTopicsOfSetByPageNum(parseInt(setId as string), pageNumber).then((res) => {
            if (res) {
                setNewTopicList(res.topics);
                setActiveTopicId(res.topics[0].id);
                setNewTotalTopics(res.totalTopics);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber])

    return (
        <>
            <div className="col-span-1 grid grid-rows-6 w-[80%]">
                <p className="row-span-1 text-2xl font-bold ml-5 my-auto">Topics</p>
                <div className="row-span-5 border-2 border-dashed border-slate-200 rounded-2xl mx-5">
                    <div className={`grid grid-rows-${TOPICS_PAGE_SIZE + 1}`}>
                        <div className={`grid grid-rows-${TOPICS_PAGE_SIZE} row-span-${TOPICS_PAGE_SIZE}`}>
                            {
                                newTopicList.map((topic: Topic) => {
                                    return (
                                        <Link to={`topics/${topic.id}`} className={`rounded-2xl mx-8 my-5 drop-shadow-xl p-4 font-semibold hover:cursor-pointer
                                            ${activeTopicId === topic.id ? "bg-blue-900 text-white" : "bg-white text-blue-900"}`} key={topic.id}
                                            onClick={() => setActiveTopicId(topic.id)}>
                                            {topic.id}. {topic.name}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className="row-span-1 grid justify-items-center items-center">
                            <Pagination totalPage={Math.ceil(newTotalTopics/TOPICS_PAGE_SIZE)} onCallback={setPageNumber}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Topics;