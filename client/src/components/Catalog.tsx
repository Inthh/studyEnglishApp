import { Link } from "react-router-dom";
import { VocabularySet } from "../types/api";

function Catalog({ vocabularySets }: { vocabularySets: VocabularySet[] }) {
    return (
        <div className="mx-auto pt-20">
            <p className="ml-28 text-2xl font-bold">Bộ từ vựng</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-20 mt-10">
                {
                    vocabularySets.map((set: VocabularySet) => (
                        <div key={set.id} className="rounded-2xl bg-white m-8 drop-shadow-xl">
                            <div className="grid grid-rows-5 p-5 place-items-stretch">
                                <div className="text-lg font-semibold row-span-1">{set.name}</div>
                                <div className="text-sm row-span-3">{set.description}</div>
                                <div className="grid grid-cols-2 justify-items-stretch gap-x-10 sm:lg:grid-cols-2 row-span-1 pt-0.5">
                                    <Link to='/' className="grid rounded-2xl bg-red-400 hover:bg-red-500 cursor-pointer py-2 place-items-center text-slate-50">Kiểm tra</Link>
                                    <Link to={`/learn/vocabulary/${set.id}/topics/1`} className="grid rounded-2xl bg-emerald-400 hover:bg-emerald-500 cursor-pointer py-2 place-items-center text-slate-50">Học ngay</Link>
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