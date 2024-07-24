'use client';
import React, { useEffect } from "react"
import * as assets from '@/assets/stringifiedAssets';
import { useTask } from "@/context";

const DarkModeButton = ({ toggleModeCallback }: { toggleModeCallback: () => void }) => {
    const { state } = useTask()
    const { isDark } = state


    useEffect(() => {
        const switchToggle = document.querySelector('#switch-toggle');
        const body = document.body;
        if(switchToggle){
            if(isDark){
                switchToggle.classList.remove('bg-yellow-500', 'translate-x-15')
                switchToggle.classList.add('bg-gray-700', 'translate-x-45')
                body.classList.add('dark')
                switchToggle.innerHTML = assets.MoonSvg
            } else {
                switchToggle.classList.add('bg-yellow-500', 'translate-x-15')
                switchToggle.classList.remove('bg-gray-700', 'translate-x-45')
                body.classList.remove('dark')
                switchToggle.innerHTML = assets.SunSvg  
            }
        }
    }, [])

    const toggleMode = () => {
        if (typeof document !== "undefined") {
            const switchToggle = document.querySelector('#switch-toggle');
            const body = document.body;
            if (!isDark && switchToggle && body) {
                switchToggle.classList.remove('bg-yellow-500', 'translate-x-15')
                switchToggle.classList.add('bg-gray-700', 'translate-x-45')
                body.classList.add('dark')

                setTimeout(() => {
                    switchToggle.innerHTML = assets.MoonSvg
                }, 250);
            } else if (switchToggle && body) {
                switchToggle.classList.add('bg-yellow-500', 'translate-x-15')
                switchToggle.classList.remove('bg-gray-700', 'translate-x-45')
                body.classList.remove('dark')

                setTimeout(() => {
                    switchToggle.innerHTML = assets.SunSvg
                }, 250);
            }

            toggleModeCallback()
        }
    }

    return (
        <button
            style={{ zIndex: 999 }}
            onClick={() => toggleMode()}
            className="w-20 h-10 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow absolute top-8 right-8">
            <div
                id="switch-toggle"
                className="w-8 h-8 relative rounded-full transition duration-500 transform bg-yellow-500 translate-x-15 p-1 text-white">
            </div>
        </button>
    )
}

export default DarkModeButton