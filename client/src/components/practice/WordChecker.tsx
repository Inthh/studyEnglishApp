import { CursorArrowRaysIcon, ForwardIcon } from "@heroicons/react/16/solid";
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
        (inputRefs.current[0] as HTMLInputElement).focus();
    }, [vocabularyIdx]);

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
            const indexOfWord = vocabularyIdxList.current[randomIdx]
            setVocabularyIdx(indexOfWord);
            setAnswer(initAnswer(vocabularies[indexOfWord].word.split('')));
        } else {
            setIsWrong(true);
            setTimeout(() => {
                setIsWrong(false);
            }, 800)
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

    return (
        <div className="grid grid-rows-[50px_380px_1fr] w-[100%]">
            <p className="text-2xl font-bold my-auto">Practice</p>
            <div className="grid grid-rows-[70px_minmax(170px, 1fr)_100px] mt-10 rounded-2xl bg-white drop-shadow-xl">
                <div className="my-7 ml-7 grid grid-cols-2 md:text-base sm:text-sm text-sm">
                    <div>
                        <p className="border-l-4 pl-2 border-slate-500">({vocabularies[vocabularyIdx].partsOfSpeech}) {vocabularies[vocabularyIdx].vietnamese}</p>
                    </div>
                    <div className="grid grid-cols-[1fr_40px] justify-items-end mr-7">
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
                                <div key={idx} className={`${isSpace ? "bg-white" : isWrong ? "bg-red-300 border-2 border-red-500" : "bg-sky-300"} md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center`}>
                                    <input
                                        ref={(el) => ((inputRefs.current[idx] as any) = el)}
                                        type="text"
                                        value={answer[idx]}
                                        onChange={(event) => handleInputChange(event, idx)}
                                        onKeyDown={(event) => handleKeyDown(event, idx)}
                                        maxLength={isSpace ? 0 : 1}
                                        readOnly={isSpace}
                                        className={`${isSpace ? "bg-white hover:cursor-default" : isWrong ? "bg-red-300" : "bg-sky-300"} text-center text-4xl font-semibold text-blue-900 md:w-[50px] md:h-[50px] sm:w-[30px] sm:h-[30px] w-[30px] h-[30px] focus:outline-none`} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="grid justify-items-center items-center mb-7 md:text-base sm:text-sm text-sm">
                    <div className="grid grid-cols-2">
                        <div className="grid justify-items-end font-bold">Answer:</div>
                        <div className="ml-2">{answer.join('')}</div>
                    </div>
                    <div
                        onClick={handleSubmitAnswer}
                        className="bg-blue-800 md:w-[120px] md:h-[50px] sm:w-[110px] sm:h-[40px] w-[110px] h-[40px] grid rounded-2xl grid-cols-3 hover:cursor-pointer hover:opacity-80">
                        <div className="font-medium text-white col-span-2 grid items-center ml-5">
                            Submit
                        </div>
                        <div className="grid items-center justify-items-end mr-5">
                            <CursorArrowRaysIcon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-rows-[80px_1fr] mt-10 rounded-2xl bg-white drop-shadow-xl">
                <div className="grid grid-rows mt-7 ml-7 text-sm font-medium">
                    <div className="text-blue-900">Total: {vocabularies.length}</div>
                    <div className="text-green-700">Hoàn thành: {passedVocIdxList.current.length}</div>
                </div>
                <div className={`mt-4 mx-7 overflow-x-auto ${passedVocIdxList.current.length > 0 && "mb-7"}`}>
                    <div className="inline-flex">
                        {
                            passedVocIdxList.current.map((passedVocIdx, idx) => (
                                <span key={idx} className={`mx-1 ${idx === 0 && "ml-0"} ${idx === passedVocIdxList.current.length - 1 && "mr-0"} bg-green-500 py-2 px-3 rounded-xl text-white text-sm flex-shrink-0`}>{vocabularies[passedVocIdx].word}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordChecker;