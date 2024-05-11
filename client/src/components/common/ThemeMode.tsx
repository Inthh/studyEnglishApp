import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

function ThemeMode() {
    // isChecked = true => This is dark mode, isChecked = false => This is light mode
    const themeMode = localStorage.getItem('themeMode');
    const [isChecked, setIsChecked] = useState(themeMode === 'dark');

    useEffect(() => {
        document.documentElement.classList[isChecked ? 'add' : 'remove']('dark')
    }, [isChecked])
  
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        localStorage.setItem('themeMode', !isChecked ? 'dark' : 'light');
    }
  
    return (
      <>
        <label className={`fixed right-4 bottom-4 w-[160px] h-[40px] inline-flex cursor-pointer select-none items-center z-50`}>
            <input
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckboxChange}
                className='sr-only'
            />
            <span
                className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                isChecked ? 'bg-slate-900' : 'bg-yellow-500'
                }`}
            > 
                <span
                className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                    isChecked ? 'translate-x-[28px]' : ''
                }`}
                ></span>
            </span>
            <span className='label flex items-center text-sm font-medium text-slate-700'>
                {isChecked ? 
                <p className="inline-flex items-center text-slate-100">
                    Dark <MoonIcon className="ml-2 h-4 w-4"/>
                </p> : 
                <p className="inline-flex items-center text-yellow-500">
                    Light <SunIcon className="ml-2 h-4 w-4"/>
                </p>
                }
            </span>
        </label>
      </>
    )
  }

export default ThemeMode;