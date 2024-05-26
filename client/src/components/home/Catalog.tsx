import { Link } from "react-router-dom";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { VocabularySet } from "../../types/api";

function Catalog({ vocabularySets }: { vocabularySets: VocabularySet[] }) {
    return (
        <div className="mt-20 grid-rows-[40px_1fr]">
            <div className="md:ml-[80px] ml-[20px] inline-flex text-slate-700 dark:text-gray-300">
                <BookOpenIcon className="h-8 w-8"></BookOpenIcon>
                <p className="md:ml-2 ml-0 text-2xl font-bold">Vocabulary</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:justify-items-start justify-items-center md:m-[70px] m-[10px] gap-x-3 text-slate-700">
                {
                    vocabularySets.map((set: VocabularySet) => (
                        <div key={set.id} className="rounded-2xl bg-white dark:bg-gray-400 drop-shadow-xl min-w-[150px] md:w-[350px] w-[300px]">
                            <div className="grid grid-rows-[1fr_20px_50px_20px] p-5 gap-y-3">
                                <LazyLoadImage 
                                    className="h-[180px] w-[100%] object-cover rounded-xl border-2"
                                    src={set.thumbnail} 
                                    effect="blur"
                                    alt="" />
                                <div className="text-lg font-semibold row-span-1">{set.name}</div>
                                <div className="text-xs row-span-3">{set.description}</div>
                                <div className="grid grid-cols-2 sm:lg:grid-cols-2 row-span-1">
                                    <div>
                                        <Link to={`/practice/${set.id}/page/1/topics/1`} className="grid rounded-lg bg-red-700 hover:scale-105 duration-300 cursor-pointer py-2 place-items-center text-slate-50 min-w-[100px] h-[40px] w-[100px]">Practice</Link>
                                    </div>
                                    <div className="grid justify-end">
                                        <Link to={`/learn/${set.id}/page/1/topics/1`} className="grid rounded-lg bg-emerald-700 hover:scale-105 duration-300 cursor-pointer py-2 place-items-center text-slate-50 min-w-[100px] h-[40px] w-[100px]">Learn now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Catalog;