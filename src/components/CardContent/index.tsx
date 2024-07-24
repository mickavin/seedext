import React, { useState, useCallback } from 'react';
import { TITLES, ICONS } from '@/constants';
import Input from '@/components/Input';
import PlusIcon from '@/assets/svg/plus';
import SearchIcon from '@/assets/svg/search';
import ListItem from '@/components/ListItem';
import { useTask } from '@/context';
import { iterableArray } from '@/utils';
import * as actions from '@/context/actions';
import { Task } from '@/types';

const Card = ({ provided, index, list, searchTexts, inSearch, automaticSearch, setInSearch, searchTask, setSearchTexts } : { 
    provided: any, 
    index: number, 
    list: Task[],
    searchTexts: string[],
    inSearch: boolean[],
    automaticSearch: boolean,
    setInSearch: (searchTexts: boolean[]) => void,
    searchTask: (index: number) => void ,
    setSearchTexts: (searchTexts: string[]) => void
}) => {
    const { state, dispatch } = useTask();
    const { tasks, isDark } = state
    const [text, setText] = useState('')

    const onChangeText = useCallback((e: any) => {
        const text = e.target.value
        setText(text)
    }, [text, setText])

    const addTask = (titleTask: string = text, columnIndex: number = 0) => {
        const timestamp = Date.now()
        const id = Date.now() + '-' + Math.random().toString(36).slice(2);

        const newTask = {
            id,
            timestamp,
            columnIndex,
            titleTask,
            finalized: false
        }

        dispatch(actions.addTaskAction(newTask))
        setText('')
    }

    const handleKeyDownAdd = (event: any) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const finalizeTask = (index: number, columnIndex: number, e: any) => {
        const nextTasks = iterableArray(tasks)
        const columnTask = iterableArray(nextTasks[columnIndex])
        const task = columnTask[index]
        const finalized = e.target.checked

        dispatch(actions.finalizeTaskAction(task, finalized, index))
    }

    const onChangeTexts = (event: any, index: number) => {
        const value = event.target.value
        const values = iterableArray(searchTexts)
        values[index] = value
        setSearchTexts(values)
    }

    const handleKeyDown = (event: any, index: number) => {
        if (event.key === 'Enter') {
            searchTask(index)
        }
    }

    const resetInput = (index: number) => {
        const searchIndexes = iterableArray(inSearch)
        const values = iterableArray(searchTexts)

        searchIndexes[index] = false
        values[index] = ''

        setSearchTexts(values)
        setInSearch(searchIndexes)
        document.getElementById(`search-btn-${index}`)?.classList.remove('active')
    }



    return (
        <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list-group flex items-center justify-center w-screen h-screen font-medium "

        >
            <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100 dark:bg-blue-navy-intense dark:text-gray-100 min-h-48">
                <div className='max-h-5/6'>
                    <div

                        className="max-w-full p-8 pt-0 bg-white rounded-lg shadow-lg w-96 dark:bg-blue-navy dark:text-gray-200 h-3/4 overflow-auto min-h-48">
                        <div>
                            <div className="flex items-center mb-6 bg-white dark:bg-blue-navy dark:text-gray-200 pt-8 pt-4" style={{ position: 'sticky', top: '0px' }}>
                                {ICONS[index](isDark)}
                                <h4 className="font-semibold ml-3 text-lg">{TITLES[index]}</h4>
                            </div>
                            <Input
                                placeholder="Rechercher une tâche"
                                text={searchTexts[index]}
                                onChangeText={(e) => onChangeTexts(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={() => document.getElementById(`search-btn-${index}`)?.classList.add('active')}
                                btnComponent={
                                    <button
                                        id={`search-btn-${index}`}
                                        onClick={() => searchTask(index)}
                                        className="text-sm font-medium rounded search-btn">
                                        <SearchIcon isDark={isDark}/>
                                    </button>
                                }
                                rightComponent={inSearch[index] || (automaticSearch && searchTexts[index].length > 0) ?
                                    <a onClick={() => resetInput(index)} className='badge'>x</a>
                                    : null}
                            />
                        </div>


                        {
                            list.map((item, listIndex) =>
                                <>
                                    <ListItem
                                        key={listIndex}
                                        item={item}
                                        listIndex={listIndex}
                                        index={index}
                                        isDark={isDark}
                                        finalizeTask={finalizeTask}
                                    />
                                </>
                            )}
                        {
                            index == 0 ?
                                <Input
                                    placeholder="Ajouter une nouvelle tâche"
                                    text={text}
                                    onChangeText={onChangeText}
                                    onKeyDown={handleKeyDownAdd}
                                    btnComponent={
                                        <button
                                            onClick={() => addTask()}
                                            className="text-sm font-medium rounded">
                                            <PlusIcon />
                                        </button>
                                    }
                                    rightComponent={null}
                                />
                                : null
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Card