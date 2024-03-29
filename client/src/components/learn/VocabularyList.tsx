import { ChevronRightIcon, ChevronLeftIcon, SpeakerWaveIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Vocabulary } from "../../types/api";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";

function VocabularyList() {
    const submit = useSubmit()
    let actionData = useActionData() as { vocabularyId: number, isMemoried: boolean };
    const { vocabularies } = useLoaderData() as { vocabularies: Vocabulary[] }
    const totalMemoried = vocabularies.reduce((totalMemoried, currentVoca) => {
        return currentVoca.isMemoried ? totalMemoried + 1 : totalMemoried
    }, 0);

    const [countMemorized, setCountMemorized] = useState<number>(totalMemoried)
    const [isMemoriedDone, setIsMemoriedDone] = useState<boolean>(
        totalMemoried === vocabularies.length)
    const [vocabularyIndex, setVocabularyIndex] = useState<number>(() => {
        if (actionData) {
            return vocabularies.findIndex(voca=> voca.id === actionData.vocabularyId)
        }
        const index = vocabularies.findIndex(voca=> !voca.isMemoried)
        if (index === -1) {
            return 0
        }
        return index
    })
    const [activeMemoriedBtn, setActiveMemoriedBtn] = useState<boolean>(
        actionData ? actionData.isMemoried : vocabularies[vocabularyIndex].isMemoried)

    function handleMemoriedBtn(vocabularyIndex: number) {
        if (!vocabularies[vocabularyIndex].isMemoried) {
            vocabularies[vocabularyIndex].isMemoried = true;
            setActiveMemoriedBtn(true);
            setCountMemorized(countMemorized + 1);
            if (countMemorized + 1 === vocabularies.length) {
                setIsMemoriedDone(true);
            }
        } else {
            vocabularies[vocabularyIndex].isMemoried = false;
            setActiveMemoriedBtn(false);
            setCountMemorized(countMemorized - 1);
        }
        submit({
            vocabularyId: vocabularies[vocabularyIndex].id,
            isMemoried: vocabularies[vocabularyIndex].isMemoried
        }, {
            method: 'patch'
        })
    }

    function handleChevronLeft(vocabularyIndex: number) {
        if (vocabularyIndex === -1) {
            return handleChevronLeft(vocabularies.length - 1);
        }

        // Skip memoried vocabulary and go to the next vocabulary
        if (vocabularies[vocabularyIndex].isMemoried) {
            return handleChevronLeft(vocabularyIndex - 1);
        }

        setVocabularyIndex(vocabularyIndex);
        setActiveMemoriedBtn(false);
    }

    function handleChevronRight(vocabularyIndex: number) {
        if (vocabularyIndex === vocabularies.length) {
            return handleChevronRight(0);
        }

        if (vocabularies[vocabularyIndex].isMemoried) {
            return handleChevronRight(vocabularyIndex + 1);
        }

        setVocabularyIndex(vocabularyIndex);
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
                                <p className={`uppercase lg:text-5xl sm:text-3xl text-3xl font-semibold ${activeMemoriedBtn ? "line-through" : ""}`}>{vocabularies[vocabularyIndex].word}</p>
                                <p className="italic lg:text-base sm:text-sm text-sm">{vocabularies[vocabularyIndex].pronunciation}</p>
                                <p className="mt-10 lg:text-base sm:text-sm text-sm">({vocabularies[vocabularyIndex].partsOfSpeech}) {vocabularies[vocabularyIndex].vietnamese}</p>
                                <p className="italic lg:text-base sm:text-sm text-sm">{vocabularies[vocabularyIndex].example}</p>
                            </div>
                            <div className="grid">
                                <div
                                    className={`${activeMemoriedBtn ? "text-green-700 bg-blue-400" : "bg-green-700 text-white"} grid justify-items-center items-center border-2 border-green-700 font-medium rounded-3xl px-9 py-3.5 hover:cursor-pointer`}
                                    onClick={() => handleMemoriedBtn(vocabularyIndex)}>Memorized
                                </div>
                            </div>
                        </div>
                        <div className="row-span-1 grid grid-cols-3 mb-5 w-[92%]">
                            <div className="text-center rounded-full lg:mt-0 sm:mt-3 mt-3 lg:w-14 lg:h-14 sm:w-11 sm:h-11 w-11 h-11 grid justify-items-center items-center drop-shadow-xl bg-white hover:cursor-pointer">
                                <SpeakerWaveIcon className="lg:w-7 lg:h-7 sm:w-5 sm:h-5 w-5 h-5"></SpeakerWaveIcon>
                            </div>
                            <div className="grid grid-cols-2 justify-items-center items-center">
                                <ChevronLeftIcon onClick={() => handleChevronLeft(vocabularyIndex - 1)} className="lg:w-11 lg:h-11 sm:w-9 sm:h-9 w-9 h-9 border border-blue-900 rounded-full text-blue-900 hover:cursor-pointer hover:text-white hover:bg-blue-900"></ChevronLeftIcon>
                                <ChevronRightIcon onClick={() => handleChevronRight(vocabularyIndex + 1)} className="lg:w-11 lg:h-11 sm:w-9 sm:h-9 w-9 h-9 border border-blue-900 rounded-full text-blue-900 hover:cursor-pointer hover:text-white hover:bg-blue-900"></ChevronRightIcon>
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