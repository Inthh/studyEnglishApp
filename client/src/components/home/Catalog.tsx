import { Link } from "react-router-dom";
import { VocabularySet } from "../../types/api";

function Catalog({ vocabularySets }: { vocabularySets: VocabularySet[] }) {
    return (
        <div className="mt-20 grid-rows-[40px_1fr]">
            <p className="ml-[80px] text-2xl font-bold">Bộ từ vựng</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-[70px] gap-x-3">
                {
                    vocabularySets.map((set: VocabularySet) => (
                        <div key={set.id} className="rounded-2xl bg-white drop-shadow-xl min-w-[300px]">
                            <div className="grid grid-rows-[40px_1fr_40px] p-5 gap-y-3">
                                <div className="text-lg font-semibold row-span-1">{set.name}</div>
                                <div className="text-sm row-span-3">{set.description}</div>
                                <div className="grid grid-cols-2 sm:lg:grid-cols-2 row-span-1 pt-5">
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