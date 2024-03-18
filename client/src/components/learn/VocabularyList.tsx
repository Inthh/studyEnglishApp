import { ChevronRightIcon, ChevronLeftIcon, SpeakerWaveIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Vocabulary } from "../../types/api";
import { useLoaderData } from "react-router-dom";

function VocabularyList() {
    const { vocabularies } = useLoaderData() as { vocabularies: Vocabulary[] };

    const [activeMemoriedBtn, setActiveMemoriedBtn] = useState<boolean>(false)
    const [countMemorized, setCountMemorized] = useState<number>(0)
    const [isMemoriedDone, setIsMemoriedDone] = useState<boolean>(false)
    const [vocabularyId, setVocabularyId] = useState<number>(0)


    function handleMemoriedBtn(vocabularyId: number) {
        vocabularies[vocabularyId].isMemoried = true;
        setActiveMemoriedBtn(true);
        setCountMemorized(countMemorized + 1);
        if (countMemorized + 1 === vocabularies.length) {
            setIsMemoriedDone(true);
        }
    }

    function handleChevronLeft(vocabularyId: number) {
        if (vocabularyId === -1) {
            return handleChevronRight(vocabularies.length - 1);
        }

        if (vocabularies[vocabularyId].isMemoried) {
            return handleChevronRight(vocabularyId - 1);
        }

        setVocabularyId(vocabularyId);
        setActiveMemoriedBtn(false);
    }

    function handleChevronRight(vocabularyId: number) {
        if (vocabularyId === vocabularies.length) {
            return handleChevronRight(0);
        }

        if (vocabularies[vocabularyId].isMemoried) {
            return handleChevronRight(vocabularyId + 1);
        }

        setVocabularyId(vocabularyId);
        setActiveMemoriedBtn(false);
    }

    return (
        <div className="col-span-2 grid grid-rows-6 w-[90%]">
            <p className="row-span-1 text-2xl font-bold ml-5 my-auto">Vocabulary</p>
            <div className="grid grid-rows-8 row-span-5 border-2 border-dashed border-slate-200 rounded-2xl mx-5 justify-items-center items-center max-h-[500px]">
                {
                    isMemoriedDone ?
                    <>
                        <div className="rounded-2xl row-span-8 bg-white w-[92%] h-[92%] grid justify-items-center items-center border border-green-700">
                            <p className="text-green-700 text-3xl font-bold">
                                All is remembered.
                            </p>
                        </div>
                    </> :
                    <>
                        <div className="rounded-2xl row-span-7 bg-blue-400 w-[92%] h-[88%] grid justify-items-center items-center">
                            <div className="text-center row-span-6">
                                <p className={`uppercase text-5xl font-semibold ${activeMemoriedBtn ? "line-through" : ""}`}>{vocabularies[vocabularyId].vocabulary}</p>
                                <p className="italic ">abide by</p>
                                <p className="mt-10">({vocabularies[vocabularyId].pos}) {vocabularies[vocabularyId].vietnamese}</p>
                                <p className="italic">{vocabularies[vocabularyId].example}</p>
                            </div>
                            <div className="grid">
                                <div
                                    className={`${activeMemoriedBtn ? "text-green-700 bg-blue-400" : "bg-green-700 text-white"} grid justify-items-center items-center border-2 border-green-700 font-medium rounded-3xl px-9 py-3.5 hover:cursor-pointer`}
                                    onClick={() => handleMemoriedBtn(vocabularyId)}>Memorized</div>
                            </div>
                        </div>
                        <div className="row-span-1 grid grid-cols-3 pb-5 w-[92%]">
                            <div className="text-center rounded-full w-14 h-14 grid justify-items-center items-center drop-shadow-xl bg-white hover:cursor-pointer">
                                <SpeakerWaveIcon className="w-7 h-7"></SpeakerWaveIcon>
                            </div>
                            <div className="grid grid-cols-2 justify-items-center items-center">
                                <ChevronLeftIcon onClick={() => handleChevronLeft(vocabularyId - 1)} className="w-11 h-11 border border-blue-900 rounded-full text-blue-900 hover:cursor-pointer hover:text-white hover:bg-blue-900"></ChevronLeftIcon>
                                <ChevronRightIcon onClick={() => handleChevronRight(vocabularyId + 1)} className="w-11 h-11 border border-blue-900 rounded-full text-blue-900 hover:cursor-pointer hover:text-white hover:bg-blue-900"></ChevronRightIcon>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default VocabularyList;