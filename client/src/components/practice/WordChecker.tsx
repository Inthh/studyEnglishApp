import { CursorArrowRaysIcon, ForwardIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { Vocabulary } from "../../types/api";
import { TOPICS_PAGE_SIZE } from "../../utils/constants";

function initAnswer(wordSplit: string[]) {
    return wordSplit.map(char => char === ' ' ? ' ' : '')
}

function WordChecker() {
    const { vocabularies } = useLoaderData() as { vocabularies: Vocabulary[] };
    const { setId, topicId } = useParams() as { setId: string, topicId: string };
    const { totalTopics } = useRouteLoaderData('practice') as  { totalTopics: number };
    const navigate = useNavigate();
    // Create a list of index of words
    const vocabularyIdxList = useRef(vocabularies.map((_, index) => index));
    const passedVocIdxList = useRef([] as number[]);
    const skipVocIdxList = useRef([] as number[]);
    // Get random vocabularyIdx from list of index of words
    const [vocabularyIdx, setVocabularyIdx] = useState<number>(
        vocabularyIdxList.current[Math.floor(Math.random() * vocabularyIdxList.current.length)]);
    const wordSplit = useMemo(
        () => vocabularies[vocabularyIdx].word.split(''),
        [vocabularies, vocabularyIdx])
    const inputRefs = useRef([]);

    const [answer, setAnswer] = useState<string[]>(initAnswer(wordSplit));
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [isSuggestion, setIsSuggestion] = useState<boolean>(false);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Enter') {
                handleSubmitAnswer()
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answer, vocabularies])

    useEffect(() => {
        setAnswer(initAnswer(wordSplit));
        (inputRefs.current[0] as HTMLInputElement).focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vocabularyIdx, vocabularies]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
        const newAnswer = [...answer];
        newAnswer[idx] = e.target.value;
        setAnswer(newAnswer);

        if (idx < wordSplit.length - 1 && e.target.value !== '') {
            let step = 1;
            // Skip input present for space character
            if ((inputRefs.current[idx + 1] as HTMLInputElement).readOnly) {
                step = 2;
            }
            (inputRefs.current[idx + step] as HTMLInputElement).focus();
        } else if (idx === wordSplit.length - 1) {
            (inputRefs.current[idx] as HTMLInputElement).focus();
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
        if (e.key === 'Backspace') {
            const newAnswer = [...answer];
            if (newAnswer[idx] === '') {
                e.preventDefault();
                if (idx > 0) {
                    let step = 1;
                    // Skip input present for space character
                    if ((inputRefs.current[idx - 1] as HTMLInputElement).readOnly) {
                        step = 2;
                    }
                    (inputRefs.current[idx - step] as HTMLInputElement).focus();
                }
            } else {
                if ((inputRefs.current[idx] as HTMLInputElement).readOnly) {
                    (inputRefs.current[idx - 2] as HTMLInputElement).focus();
                } else {
                    newAnswer[idx] = '';
                    setAnswer(newAnswer);
                }
            }
        }
    }

    function handleSubmitAnswer() {
        if (answer.join('').toLowerCase() === vocabularies[vocabularyIdx].word) {
            // Find and Remove the current index of the index of the word
            const index = vocabularyIdxList.current.findIndex((vocIdx) => vocIdx === vocabularyIdx)
            passedVocIdxList.current.push(vocabularyIdx)
            vocabularyIdxList.current.splice(index, 1);
            if (vocabularyIdxList.current.length === 0) {
                // If skipped vocabulary list is empty , skip to next topic
                if (skipVocIdxList.current.length === 0) {
                    const nextTopicId =
                        parseInt(topicId as string) + 1 > totalTopics ? 1 : parseInt(topicId as string) + 1;
                    const nextPageNum = Math.ceil(nextTopicId/TOPICS_PAGE_SIZE);
                    navigate(`/practice/${setId}/page/${nextPageNum}/topics/${nextTopicId}`);
                    return;
                } else {
                    // Reset unfinshed vocabulary list from skipped vocabulary list
                    vocabularyIdxList.current = [...skipVocIdxList.current];
                    skipVocIdxList.current = [];
                }
            }
            // Get random index of the word from index list
            const randomIdx = Math.floor(Math.random() * vocabularyIdxList.current.length);
            const indexOfWord = vocabularyIdxList.current[randomIdx];
            setIsCorrect(true);
            setTimeout(() => { 
                setVocabularyIdx(indexOfWord);
                setAnswer(initAnswer(vocabularies[indexOfWord].word.split('')));
                setIsCorrect(false);
            }, 600);
        } else {
            setIsWrong(true);
            setTimeout(() => {
                setIsWrong(false);
            }, 600)
        }
    }

    function handleSkip() {
        const index = vocabularyIdxList.current.findIndex((vocIdx) => vocIdx === vocabularyIdx)
        skipVocIdxList.current.push(vocabularyIdx)
        vocabularyIdxList.current.splice(index, 1);
        if (vocabularyIdxList.current.length === 0) {
            // Deliver skipped vocabulary list to unfinished vocabulary list
            vocabularyIdxList.current = [...skipVocIdxList.current];
            skipVocIdxList.current = [];
        }
        const randomIdx = Math.floor(Math.random() * vocabularyIdxList.current.length);
        const indexOfWord = vocabularyIdxList.current[randomIdx]
        setVocabularyIdx(indexOfWord);
        setAnswer(initAnswer(vocabularies[indexOfWord].word.split('')));
    }

    function handleToggleSuggestion(isPopup: boolean) {
        setIsSuggestion(isPopup);
    }

    return (
        <>
            {
                isSuggestion &&
                <div className="fixed top-0 left-0 w-full h-full grid justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-2 md:w-[450px] md:h-[180px] sm:w-[300px] sm:h-[150px] w-[300px] h-[150px] grid grid-rows-[25px_1fr]">
                        <div className="grid justify-end">
                            <XMarkIcon onClick={() => handleToggleSuggestion(false)} className="md:h8 md:w-8 sm:h-6 sm:w-6 h-6 w-6 text-slate-700 hover:cursor-pointer hover:text-slate-500"></XMarkIcon>
                        </div>
                        <div className="border-2 m-2 rounded-md border-slate-300 overflow-y-auto md:text-base sm:text-sm text-sm">
                            <p className="md:m-2 sm:m-1 m-1">
                            {vocabularies[vocabularyIdx].explaination}
                            </p>
                        </div>
                    </div>
                </div>
            }

            <div className="grid grid-rows-[90px_380px_1fr] w-[100%]">
                <div className="grid items-center">
                    <p className="text-2xl font-bold text-center text-slate-700">Practice</p>
                </div>
                <div className="grid grid-rows-[70px_minmax(170px, 1fr)_140px] rounded-2xl bg-white drop-shadow-xl">
                    <div className="my-3 ml-6 grid grid-cols-3 md:text-base sm:text-sm text-sm items-center">
                        <div className="inline-flex col-span-2 items-center">
                            <p className="border-l-4 pl-2 border-slate-500 text-slate-700">({vocabularies[vocabularyIdx].partsOfSpeech}) {vocabularies[vocabularyIdx].vietnamese}</p>
                            <div
                                onClick={() => handleToggleSuggestion(true)}
                                className="md:text-sm sm:text-xs text-xs text-white ml-[6px] md:w-[100px] sm:w-[120px] w-[120px] h-[30px] bg-green-700 grid justify-center items-center rounded-xl hover:cursor-pointer hover:bg-green-500">
                                <p>Suggestion</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-[1fr_40px] justify-items-end mr-7 col-span-1">
                            <div className="md:mt-[2px] sm:mt-[4px] mt-[4px]">
                                Skip
                            </div>
                            <ForwardIcon onClick={handleSkip} className="h-8 w-8 text-slate-700 hover:cursor-pointer hover:text-slate-500" />
                        </div>
                    </div>
                    <div className={`grid md:grid-cols-8 sm:grid-cols-5 grid-cols-5 gap-2 mx-3 mb-3 items-center justify-items-center`}>
                        {
                            wordSplit.map((char, idx) => {
                                const isSpace = char === ' ';
                                return (
                                    <div key={idx} className={`${isSpace ? "bg-white" : isWrong ? "bg-red-300 border-2 border-red-500" : isCorrect ? "bg-green-300 border-2 border-green-500" : "bg-slate-300"} md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center`}>
                                        <input
                                            ref={(el) => ((inputRefs.current[idx] as any) = el)}
                                            type="text"
                                            value={answer[idx]}
                                            onChange={(event) => handleInputChange(event, idx)}
                                            onKeyDown={(event) => handleKeyDown(event, idx)}
                                            maxLength={isSpace ? 0 : 1}
                                            readOnly={isSpace}
                                            className={`${isSpace ? "bg-white hover:cursor-default" : isWrong ? "bg-red-300" : isCorrect ? "bg-green-300" : "bg-slate-300"} text-center text-4xl font-semibold text-sky-900/75 md:w-[50px] md:h-[50px] sm:w-[30px] sm:h-[30px] w-[30px] h-[30px] focus:outline-none`} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="grid justify-items-center items-center mb-3 md:text-base sm:text-sm text-sm">
                        <div className="inline-flex items-center p-2 border-2 border-blue-400 rounded-xl">
                            <div className="inline-flex mr-2 md:w-[240px] sm:w-[200px] w-[200px] md:h-[50px] sm:h-[40px] h-[40px] items-center border-2 border-blue-200 p-2 rounded-lg">
                                <div className="font-bold text-slate-700">Answer:</div>
                                <div className="ml-2">{answer.join('')}</div>
                            </div>
                            <div
                                onClick={handleSubmitAnswer}
                                className="bg-sky-900/75 md:w-[120px] md:h-[50px] sm:w-[110px] sm:h-[40px] w-[110px] h-[40px] grid rounded-2xl grid-cols-3 hover:cursor-pointer hover:opacity-80">
                                <div className="font-medium text-white col-span-2 grid items-center ml-5">
                                    Submit
                                </div>
                                <div className="grid items-center justify-items-end mr-5">
                                    <CursorArrowRaysIcon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-rows-2 rounded-2xl bg-white drop-shadow-xl mt-8">
                    <div className="grid grid-rows mt-7 ml-7 text-sm font-medium">
                        <div className="text-blue-900">Total: {vocabularies.length}</div>
                        <div className="text-green-700">Completed: {passedVocIdxList.current.length}</div>
                    </div>
                    <div
                        id="scrollbar-passed-list"
                        className={`mt-4 mx-7 overflow-x-auto ${passedVocIdxList.current.length > 0 && "mb-5"}`}>
                        <div className="inline-flex">
                            {
                                passedVocIdxList.current.map((passedVocIdx, idx) => (
                                    <span key={idx} className={`mx-1 ${idx === 0 && "ml-0"} ${idx === passedVocIdxList.current.length - 1 && "mr-0"} bg-green-500 mb-2 py-2 px-3 rounded-xl text-white text-sm flex-shrink-0`}>{vocabularies[passedVocIdx].word}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WordChecker;