import React, { ReactNode } from 'react';

export type Task = {
    id: string,
    timestamp: number,
    columnIndex: number,
    titleTask: string,
    finalized: boolean,
}

export type DarkMode = boolean

export type IAction = {
    type: string,
    payload?: any | undefined
}

export type IState = {
    tasks: Task[][],
    isDark: boolean,
};

export type ContextProviderProps = {
    children?: ReactNode
}

export interface IContextProps {
    state: IState;
    dispatch: React.Dispatch<IAction>;
}