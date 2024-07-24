import React, { ChangeEventHandler, ReactNode } from "react";

const Input = ({ text, placeholder, btnComponent, rightComponent, onFocus, onKeyDown, onChangeText, }:
    { 
        text: string, 
        placeholder: string, 
        btnComponent: ReactNode, 
        rightComponent: ReactNode, 
        onFocus?: React.FocusEventHandler<HTMLInputElement>,
        onKeyDown: React.KeyboardEventHandler<HTMLInputElement> 
        onChangeText: ChangeEventHandler<HTMLInputElement>, 
    }) => {
    return (
        <div className='flex w-full items-center h-8 px-2 mt-2' style={{ position: 'sticky', bottom: '0px' }}>
            {btnComponent}
            <input
                className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium border-b-2"
                placeholder={placeholder}
                type="text"
                value={text}
                onChange={onChangeText}
                enterKeyHint='enter'
                onKeyDown={onKeyDown}
                onFocus={onFocus}
            />
            {rightComponent}
        </div>
    )
}

export default Input