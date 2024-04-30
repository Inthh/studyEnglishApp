import { useContext } from "react";
import CIcon from "@coreui/icons-react";
import { cibBuyMeACoffee } from "@coreui/icons"
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { ResoucesContext, Resources } from "../contexts/ResourcesProvider";


function AboutMe() {
    const { resources } = useContext(ResoucesContext) as { resources: Resources };
 
    return (
        <>
            <Header />
            <div className="flex flex-col justify-between min-h-screen bg-gradient-to-r from-slate-100/40 to-gray-100">
                <div className="grid justify-items-center my-[50px]">
                    <div className="lg:w-[50%] md:w-[70%] w-[70%]">
                        <div className="grid grid-rows-[100px_1fr] text-slate-700">
                            <p className="text-center text-4xl font-extrabold mb-10">About me</p>
                            <div className="text-center mb-10 italic">
                                "Hello everyone, my name is Thinh, and <span className="text-blue-800 font-bold">Dolphin Learning</span> is a website I created to support those who want to improve their English skills. If you have any questions or feedback about the website, please send your feedback to the email <span className="text-blue-800 font-bold">dolphin.learning.01@gmail.com</span>. Finally, to contribute to the maintenance of the website, please support me using the QR code below. Thank you very much! <span className="text-red-800">&hearts;</span>" 
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 justify-items-center items-center">
                            <div className="rounded-full bg-orange-300 w-[250px] h-[250px] grid grid-rows-[30px_1fr] justify-center items-center">
                                <p className="text-center text-orange-700 font-bold italic text-lg mt-12">Buy me a coffee</p>
                                <CIcon icon={cibBuyMeACoffee} height={150} width={150} />
                            </div>
                            <div className="grid grid-rows-[20px_1fr] gap-y-4">
                                <p className="text-lg text-center font-bold italic">QR Code</p>
                                <LazyLoadImage 
                                    src={resources.donateQR}
                                    className="object-cover rounded-xl h-[400px] p-4" 
                                    height="400px"
                                    effect="blur"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default AboutMe;