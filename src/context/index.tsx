import React, { createContext, useContext, useEffect, ReactNode, useReducer } from 'react';
import { taskReducer, initialState } from '@/context/reducers';
import * as types from '@/types';

const TaskContext = createContext<{ state: types.IState; dispatch: React.Dispatch<types.IAction> } | undefined>(undefined)


export const TaskProvider: React.FC<types.ContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState, () => {
        if (typeof window != 'undefined') {
            const storedTasks = localStorage.getItem('tasks')
            let isDark = localStorage.getItem('isDark') == 'true' ? true : false;
            let tasks = storedTasks ? JSON.parse(storedTasks) : [[], [], []];
            return { tasks, isDark };
        }
        return initialState
    });

    useEffect(() => {
        localStorage.setItem('isDark', JSON.stringify(state.isDark));
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }, [state.tasks, state.isDark]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('App must be used within a TaskProvider');
    }
    return context;
};
