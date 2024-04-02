import { CursorArrowRaysIcon } from "@heroicons/react/16/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Vocabulary } from "../../types/api";

function initAnswer(wordSplit: string[]) {
    return wordSplit.map(char => char === ' ' ? ' ' : '')
}

function WordChecker() {
    const { vocabularies } = useLoaderData() as { vocabularies: Vocabulary[] };
    const [vocabularyIdx, setVocabularyIdx] = useState<number>(0);
    const wordSplit = useMemo(
        () => vocabularies[vocabularyIdx].word.split(''), 
        [vocabularies, vocabularyIdx])
    const inputRefs = useRef([]);
    const [answer, setAnswer] = useState<string[]>(initAnswer(wordSplit));
    const [isWrong, setIsWrong] = useState<boolean>(false);

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
            if (vocabularyIdx + 1 < vocabularies.length) {
                setVocabularyIdx(vocabularyIdx + 1);
                setAnswer(initAnswer(vocabularies[vocabularyIdx + 1].word.split('')));
            } else {
                //TODO:
            }
        } else {
            setIsWrong(true);
            setTimeout(() => {
                setIsWrong(false);
            }, 800)
        }
    }

    return (
        <div className="grid grid-rows-[50px_380px] w-[100%]">
            <p className="text-2xl font-bold my-auto">Practice</p>
            <div className="grid grid-rows-[70px_minmax(170px, 1fr)_100px] mt-10 rounded-2xl bg-white drop-shadow-xl">
                <div className="my-7 ml-7">
                    ({vocabularies[vocabularyIdx].partsOfSpeech}) {vocabularies[vocabularyIdx].vietnamese}
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
        </div>
    );
}

export default WordChecker;