import { ChevronRightIcon, ChevronLeftIcon, SpeakerWaveIcon } from "@heroicons/react/16/solid";
import { useEffect, useMemo, useState } from "react";
import { Vocabulary } from "../../types/api";
import { useActionData, useLoaderData, useParams, useSubmit } from "react-router-dom";

function VocabularyList() {
    const { topicId } = useParams()
    const submit = useSubmit()
    const actionData = useActionData() as { vocabularyId: number, isMemoried: boolean }
    const { vocabularies } = useLoaderData() as { vocabularies: Vocabulary[] }
    const totalMemoried = useMemo(() =>
        vocabularies.reduce((totalMemoried, currentVoca) => {
            return currentVoca.isMemoried ? totalMemoried + 1 : totalMemoried}, 0),
    [vocabularies]);
    const [countMemorized, setCountMemorized] = useState<number>(totalMemoried)
    const [isMemoriedDone, setIsMemoriedDone] = useState<boolean>(
        totalMemoried === vocabularies.length)
    const [vocabularyIndex, setVocabularyIndex] = useState<number>(getFirstUnmemoriedVoca())
    const [activeMemoriedBtn, setActiveMemoriedBtn] = useState<boolean>(
        actionData ? actionData.isMemoried : vocabularies[vocabularyIndex].isMemoried)
    const [audio, setAudio] = useState(new Audio(vocabularies[vocabularyIndex].audioUrl));
    useEffect(() => {
        setCountMemorized(totalMemoried);
        if (totalMemoried === vocabularies.length) {
            setIsMemoriedDone(true);
            return;
        }
        setIsMemoriedDone(false);
        setVocabularyIndex(getFirstUnmemoriedVoca());
        setActiveMemoriedBtn(actionData && actionData.isMemoried || false);
    }, [vocabularies]);

    useEffect(() => {
        setAudio(new Audio(vocabularies[vocabularyIndex].audioUrl));
    }, [vocabularyIndex, vocabularies]);

    function getFirstUnmemoriedVoca() {
        if (actionData) {
            return vocabularies.findIndex(voca=> voca.id === actionData.vocabularyId)
        }
        const index = vocabularies.findIndex(voca=> !voca.isMemoried)
        if (index === -1) {
            return 0
        }
        return index
    }

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

    function handleStudyAgain() {
        submit({
            allUnmemoried: true,
            topicId: parseInt(topicId as string)
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

    function handlePlayAudio() {
        audio.play();
    }

    return (
        <div className="grid grid-rows-[90px_1fr] justify-items-center items-center">
            <p className="text-2xl font-bold text-slate-700 dark:text-gray-300">Vocabulary</p>
            <div className="grid grid-rows-8 w-[100%] py-2 bg-slate-300 dark:bg-gray-400 rounded-2xl justify-items-center items-center max-w-[830px] max-h-[480px] h-[480px]">
                {
                    isMemoriedDone ?
                    <>
                        <div className="rounded-2xl row-span-8 bg-white w-[92%] h-[92%] grid justify-items-center items-center">
                            <p className="row-span-7 text-green-700 text-3xl font-bold">
                                All is remembered.
                            </p>
                            <div
                                className={`bg-sky-900/75 text-white grid justify-items-center items-center font-medium rounded-3xl px-9 py-3.5 hover:cursor-pointer`}
                                onClick={handleStudyAgain}>Study again
                            </div>
                        </div>
                    </> :
                    <>
                        <div className="rounded-2xl row-span-7 bg-white text-slate-700 w-[92%] h-[92%] grid justify-items-center items-center">
                            <div className="text-center mx-3">
                                <p className={`uppercase lg:text-5xl sm:text-3xl text-3xl font-semibold ${activeMemoriedBtn ? "line-through" : ""}`}>{vocabularies[vocabularyIndex].word}</p>
                                <p className="italic lg:text-base sm:text-sm text-sm">{vocabularies[vocabularyIndex].pronunciation}</p>
                                <p className="mt-10 lg:text-base sm:text-sm text-sm">({vocabularies[vocabularyIndex].partsOfSpeech}) {vocabularies[vocabularyIndex].vietnamese}</p>
                                <p className="italic lg:text-base sm:text-sm text-sm">{vocabularies[vocabularyIndex].example}</p>
                            </div>
                            <div className="grid">
                                <div
                                    className={`${activeMemoriedBtn ? "text-sky-900/75 bg-white border-2 border-sky-900/75" : "bg-sky-900/75 text-white border-2 border-white"} grid justify-items-center items-center font-medium rounded-3xl px-9 py-3.5 hover:cursor-pointer`}
                                    onClick={() => handleMemoriedBtn(vocabularyIndex)}>Memorized
                                </div>
                            </div>
                        </div>
                        <div className="row-span-1 grid grid-cols-3 w-[92%] mb-2">
                            <div 
                                onClick={handlePlayAudio}
                                className="text-center rounded-full lg:w-14 lg:h-14 sm:w-11 sm:h-11 w-11 h-11 grid justify-items-center items-center drop-shadow-xl bg-white hover:cursor-pointer hover:scale-110 duration-300">
                                <SpeakerWaveIcon className="lg:w-7 lg:h-7 sm:w-5 sm:h-5 w-5 h-5 text-slate-700">
                                </SpeakerWaveIcon>
                            </div>
                            <div className="grid grid-cols-2 justify-items-center items-center">
                                <ChevronLeftIcon onClick={() => handleChevronLeft(vocabularyIndex - 1)} className="lg:w-11 lg:h-11 sm:w-9 sm:h-9 w-9 h-9 border border-sky-900/75 rounded-full text-sky-900/75 hover:cursor-pointer hover:text-white hover:bg-sky-900/75"></ChevronLeftIcon>
                                <ChevronRightIcon onClick={() => handleChevronRight(vocabularyIndex + 1)} className="lg:w-11 lg:h-11 sm:w-9 sm:h-9 w-9 h-9 border border-sky-900/75 rounded-full text-sky-900/75 hover:cursor-pointer hover:text-white hover:bg-sky-900/75"></ChevronRightIcon>
                            </div>
                            <div className="grid text-slate-700 lg:text-2xl md:text-lg sm:text-sm text-sm lg:font-extrabold sm:font-bold font-bold items-center justify-items-end">
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