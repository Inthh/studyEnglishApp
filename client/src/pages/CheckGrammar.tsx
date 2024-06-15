import { useRef, useState } from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { checkGrammar } from "../utils/englishUtils";
import { SyncLoader } from "react-spinners";
import { toast, Bounce, ToastContainer } from "react-toastify";

type ErrorsGrammar = {
    message: string
}

function CheckGrammar() {
    const textArea = useRef({});
    const buttonCheck = useRef({});
    const [suggestions, setSuggestions] = useState([]);
    const [errors, setErrors] = useState<ErrorsGrammar[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const isSubmited = !(suggestions.length === 0 && errors.length === 0 && !message);

    async function handleSubmitParagraph() {
        const paragraph = (textArea.current as HTMLTextAreaElement).value;
        const paragraphTrim = paragraph?.trim()

        if (paragraphTrim) {
            setIsLoading(true);
            (buttonCheck.current as HTMLButtonElement).disabled = true;
            (buttonCheck.current as HTMLButtonElement).classList.add("bg-blue-400");
            (buttonCheck.current as HTMLButtonElement).classList.remove("hover:bg-blue-500");
            try {
                const { result } = await checkGrammar(paragraph);
                const { errors, suggestions, message } = result;

                setSuggestions(suggestions);
                setErrors(errors);
                setMessage(message);
            } catch (e) {
                toast.error("Internal server error!");
            }
            (buttonCheck.current as HTMLButtonElement).classList.remove("bg-blue-400");
            (buttonCheck.current as HTMLButtonElement).classList.add("hover:bg-blue-500");
            (buttonCheck.current as HTMLButtonElement).disabled = false;
            setIsLoading(false);

        } else {
            toast.error("Please provide your paragraph!");
        }
    }
 
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Header />
            <div className="flex flex-col justify-between min-h-screen bg-gradient-to-r from-slate-100/40 to-gray-100 dark:from-slate-600 dark:to-gray-700">
                <div className={`grid ${!errors || errors.length === 0 ? "grid-rows-[300px_0fr_1fr]" : "grid-rows-[300px_1fr_1fr]"} sm:justify-items-center align-items-center my-[50px] gap-y-10`}>
                    <div className="grid grid-rows-[80%_20%] gap-y-2 items-center">
                        <div className="relative">
                            {
                                isLoading &&
                                <label
                                    htmlFor="paragraph"
                                    className="absolute grid justify-center items-center w-[100%] h-[100%]" >
                                    <div>
                                        <SyncLoader color="#3B82F6" size={12}/>                                
                                    </div>
                                </label>
                            }

                            <textarea
                                ref={textArea as React.MutableRefObject<HTMLTextAreaElement>}
                                name="paragraph"
                                placeholder="Input your paragraph..."
                                className="sm:w-[600px] w-[350px] sm:text-base text-sm sm:h-[200px] h-[180px] focus:outline-0 focus:border-b-blue-700 dark:focus:border-b-blue-600 border-b-2 dark:border-gray-400 p-3 sm:ml-0 ml-4 dark:text-gray-300 dark:bg-gray-600"
                            ></textarea>
                        </div>
                        <div className="grid justify-items-end sm:mr-0 mr-4">
                            <button 
                                ref={buttonCheck as React.MutableRefObject<HTMLButtonElement>}
                                className="h-[40px] sm:w-[150px] w-[130px] sm:text-base text-sm bg-blue-600 dark:bg-blue-500 rounded dark:text-slate-300 text-slate-100 hover:bg-blue-500 dark:hover:bg-blue-400" onClick={handleSubmitParagraph}>
                                Check grammar
                            </button>
                        </div>
                    </div>

                    {
                        !isSubmited ? <></> :
                        !errors || errors.length === 0 ?  
                        <div className="grid sm:w-[600px] w-[350px]">
                            <p className="text font-semibold text-green-600 dark:text-green-500 sm:ml-0 ml-4 sm:text-base text-sm">{message || "Your paragraph has correct English grammar."}<span>{suggestions.length > 0 && !message && " You can refer to some of our other suggestions below."}</span></p> 
                        </div>
                            :
                        <div className="grid sm:w-[600px] w-[350px] grid-rows-[50px_1fr]">
                            <p className="text-xl font-bold text-red-700 dark:text-red-600 sm:ml-0 ml-4">Errors: </p>
                            <div className="ml-4 border-[1px] p-4 rounded dark:text-gray-300">
                                {
                                    errors.map((err, idx) => (
                                        <p key={idx} className="my-2 sm:text-base text-sm italic">{`${idx + 1}. ${err.message}`}</p>
                                    ))
                                }
                            </div>
                        </div>
                    }

                    {
                        suggestions.length > 0 &&
                        <div className="grid grid-rows-[50px_1fr] sm:w-[600px] w-[350px]">
                        <p className="text-xl font-bold text-green-700 dark:text-green-600 sm:ml-0 ml-4">Suggestions: </p>
                        <div className="ml-4 border-[1px] p-4 rounded dark:text-gray-300">
                            {
                                suggestions.map((suggestion, idx) => (
                                    <p key={idx} className="my-2 sm:text-base text-sm italic">{`${idx + 1}. ${suggestion}`}</p>
                                ))
                            }
                        </div>
                    </div>
                    }
                </div>
                <Footer />
            </div>
        </>
    );
}

export default CheckGrammar;