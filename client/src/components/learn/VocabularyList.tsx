import { ChevronRightIcon, ChevronLeftIcon, SpeakerWaveIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Vocabulary } from "../../types/api";
import { useLoaderData } from "react-router-dom";

function VocabularyList() {
    const { vocabularies } = useLoaderData() as { vocabularies: Vocabulary[] };

    const [activeMemoriedBtn, setActiveMemoriedBtn] = useState<boolean>(false)
    const [countMemorized, setCountMemorized] = useState<number>(0)
    const [isMemoriedDone, setIsMemoriedDone] = useState<boolean>(false)
    const [vocabularyId, setVocabularyId] = useState<number>(0)


    useEffect(() => {
        // Reset all state to default state when loading new vocabularies
        const totalMemoried = vocabularies.reduce((totalMemoried, currentVoca) => {
            return currentVoca.isMemoried ? totalMemoried + 1 : totalMemoried
        }, 0)

        setIsMemoriedDone(totalMemoried === vocabularies.length)
        setVocabularyId(0)
        setCountMemorized(totalMemoried)
        setActiveMemoriedBtn(false)
    }, [vocabularies])

    function handleMemoriedBtn(vocabularyId: number) {
        if (!vocabularies[vocabularyId].isMemoried) {
            vocabularies[vocabularyId].isMemoried = true;
            setActiveMemoriedBtn(true);
            setCountMemorized(countMemorized + 1);
            if (countMemorized + 1 === vocabularies.length) {
                setIsMemoriedDone(true);
            }
        } else {
            vocabularies[vocabularyId].isMemoried = false;
            setActiveMemoriedBtn(false);
            setCountMemorized(countMemorized - 1);
        }
    }

    function handleChevronLeft(vocabularyId: number) {
        console.log("vocabularyId left: ", vocabularyId)
        if (vocabularyId === -1) {
            return handleChevronLeft(vocabularies.length - 1);
        }

        // Skip memoried vocabulary and go to the next vocabulary
        if (vocabularies[vocabularyId].isMemoried) {
            return handleChevronLeft(vocabularyId - 1);
        }

        setVocabularyId(vocabularyId);
        setActiveMemoriedBtn(false);
    }

    function handleChevronRight(vocabularyId: number) {
        console.log("vocabularyId right: ", vocabularyId)
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
        <div className="grid grid-rows-6 w-[92%] h-[92%]">
            <p className="row-span-1 text-2xl font-bold my-auto">Vocabulary</p>
            <div className="row-span-5 grid grid-rows-8 border-2 border-dashed border-slate-200 rounded-2xl mr-5 justify-items-center items-center max-h-[500px]">
                {
                    isMemoriedDone ?
                    <div className="rounded-2xl row-span-8 bg-white w-[92%] h-[92%] grid justify-items-center items-center border border-green-700">
                        <p className="text-green-700 text-3xl font-bold">
                            All is remembered.
                        </p>
                    </div> :
                    <>
                        <div className="rounded-2xl row-span-7 bg-blue-400 w-[92%] h-[92%] grid justify-items-center items-center">
                            <div className="text-center">
                                <p className={`uppercase text-5xl font-semibold ${activeMemoriedBtn ? "line-through" : ""}`}>{vocabularies[vocabularyId].vocabulary}</p>
                                <p className="italic ">abide by</p>
                                <p className="mt-10">({vocabularies[vocabularyId].pos}) {vocabularies[vocabularyId].vietnamese}</p>
                                <p className="italic">{vocabularies[vocabularyId].example}</p>
                            </div>
                            <div className="grid">
                                <div
                                    className={`${activeMemoriedBtn ? "text-green-700 bg-blue-400" : "bg-green-700 text-white"} grid justify-items-center items-center border-2 border-green-700 font-medium rounded-3xl px-9 py-3.5 hover:cursor-pointer`}
                                    onClick={() => handleMemoriedBtn(vocabularyId)}>Memorized
                                </div>
                            </div>
                        </div>
                        <div className="row-span-1 grid grid-cols-3 mb-5 w-[92%]">
                            <div className="text-center rounded-full lg:mt-0 sm:mt-3 mt-3 lg:w-14 lg:h-14 sm:w-11 sm:h-11 w-11 h-11 grid justify-items-center items-center drop-shadow-xl bg-white hover:cursor-pointer">
                                <SpeakerWaveIcon className="lg:w-7 lg:h-7 sm:w-5 sm:h-5 w-5 h-5"></SpeakerWaveIcon>
                            </div>
                            <div className="grid grid-cols-2 justify-items-center items-center">
                                <ChevronLeftIcon onClick={() => handleChevronLeft(vocabularyId - 1)} className="lg:w-11 lg:h-11 sm:w-9 sm:h-9 w-9 h-9 border border-blue-900 rounded-full text-blue-900 hover:cursor-pointer hover:text-white hover:bg-blue-900"></ChevronLeftIcon>
                                <ChevronRightIcon onClick={() => handleChevronRight(vocabularyId + 1)} className="lg:w-11 lg:h-11 sm:w-9 sm:h-9 w-9 h-9 border border-blue-900 rounded-full text-blue-900 hover:cursor-pointer hover:text-white hover:bg-blue-900"></ChevronRightIcon>
                            </div>
                            <div className="grid text-green-700 lg:text-2xl sm:text-base text-base lg:font-extrabold sm:font-bold font-bold items-center justify-items-end">
                                <p className="">{countMemorized}/{vocabularies.length} Memoried</p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default VocabularyList;