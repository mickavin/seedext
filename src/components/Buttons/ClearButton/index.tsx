'use client';
import React from "react"
import trash from '@/assets/svg/trash'

const ClearButton = ({ clearCallback }: { clearCallback: () => void }) => {
    const onClick = () => {
        clearCallback()
    }

    return (
        <button
            onClick={() => onClick()}
            className="w-10 h-10 rounded-full bg-red-500 border-white flex items-center transition duration-300 focus:outline-none shadow absolute top-8 left-8">
            <div className="w-8 h-8 relative rounded-full transition duration-500 transform bg-red-500 translate-x-15 p-1 text-white">
                {trash()}
            </div>
        </button>
    )
}

export default ClearButton