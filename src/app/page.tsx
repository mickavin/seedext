'use client'
import React, { useEffect, useState, useCallback, useId } from 'react';
import DarkModeButton from "@/components/Buttons/DarkModeButton";
import ClearButton from "@/components/Buttons/ClearButton";
import Input from '@/components/Input'
import { Task } from '@/types';
import { TITLES, ICONS } from '@/constants';
import { iterableArray, rearangeArr, search } from '@/utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StrictModeDroppable from '@/components/StrictModeDroppable';
import PlusIcon from '@/assets/svg/plus'
import DraggableIcon from '@/assets/svg/drag'
import SearchIcon from '@/assets/svg/search'
import ListItem from '@/components/ListItem';

export default function Home() {
    const [tasks, setTasks] = useState([[], [], []] as Task[][])
    const [filteredTasks, setFilteredTasks] = useState([[], [], []] as Task[][])
    const [isDark, setDark] = useState(false)
    const [text, setText] = useState('')
    const [searchTexts, setSearchTexts] = useState(['', '', ''])
    const [inSearch, setInSearch] = useState([false, false, false])

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks')
        let tasks = storedTasks ? JSON.parse(storedTasks) : [[], [], []];
        setTasks(tasks as Task[][])

    }, [])


    const toggleModeCallback = useCallback((isDarkMode: boolean) => {
        setDark(isDarkMode)
    }, [isDark, setDark])

    const onDragStart = () => {

    };

    const saveTasks = (nextTasks: Task[][]) => {
        setTimeout(() => {
            localStorage.setItem('tasks', JSON.stringify(nextTasks))
        }, 1000)
    }

    const clearTasks = () => {
        setTasks([[], [], []])
        localStorage.removeItem('tasks')
    }


    const onChangeText = useCallback((e: any) => {
        const text = e.target.value
        setText(text)
    }, [text, setText])

    const addTask = useCallback((titleTask: string = text, columnIndex: number = 0) => {
        const timestamp = Date.now()
        const id = Date.now() + '-' + Math.random().toString(36).slice(2);

        const newTask = {
            id,
            timestamp,
            columnIndex,
            titleTask,
            finalized: false
        }

        let column = iterableArray(tasks[columnIndex])
        column.push(newTask)
        const nextTasks = iterableArray(tasks)
        nextTasks.splice(columnIndex, 1, column)
        setTasks(nextTasks)
        saveTasks(nextTasks)
        setText('')
    }, [text, tasks,setText, setTasks, saveTasks, iterableArray])

    const finalizeTask = (index: number, columnIndex: number, e: any) => {
        const nextTasks = iterableArray(tasks)

        const columnTask = iterableArray(nextTasks[columnIndex])
        const task = columnTask[index]
        const newTask = {
            ...task,
            finalized: e.target.checked
        }

        columnTask.splice(index, 1, newTask)

        nextTasks.splice(columnIndex, 1, columnTask)
        setTasks(nextTasks)
        saveTasks(nextTasks)
    }

    const onDragEnd = (result: any) => {

        const { source, destination } = result;
        const nextTasks = iterableArray(tasks)

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            const sourceColumnIndex = parseInt(source.droppableId.replace('droppable-', ''))
            const sourceColumn = iterableArray(tasks[sourceColumnIndex])
            const rearangedColumn = rearangeArr(sourceColumn, source.index, destination.index)
            nextTasks.splice(sourceColumnIndex, 1, rearangedColumn)
            setTasks(nextTasks)

        } else if (destination.droppableId !== source.droppableId) {
            const sourceColumnIndex = parseInt(source.droppableId.replace('droppable-', ''))
            const destinationColumnIndex = parseInt(destination.droppableId.replace('droppable-', ''))
            const destinationColumn = iterableArray(tasks[destinationColumnIndex])
            const sourceColumn = iterableArray(tasks[sourceColumnIndex])

            destinationColumn.push(sourceColumn[source.index])
            const rearangedDestinationColumn = rearangeArr(destinationColumn, destinationColumn.length - 1, destination.index)

            sourceColumn.splice(source.index, 1)

            nextTasks.splice(sourceColumnIndex, 1, sourceColumn)
            nextTasks.splice(destinationColumnIndex, 1, rearangedDestinationColumn)
            setTasks(nextTasks)
        }
        saveTasks(nextTasks)
    };

    const searchTask = (columnIndex: number) => {  
        const allTasks = iterableArray(tasks);
        const tasksByColumn = allTasks[columnIndex];
        const searchIndexes = iterableArray(inSearch)
        searchIndexes[columnIndex] = true
        const filteredColumnTasks = search(searchTexts[columnIndex], tasksByColumn, [{type: 'string', key: 'titleTask'}])
        allTasks.splice(columnIndex, 1, filteredColumnTasks)
        setFilteredTasks(allTasks)
        setInSearch(searchIndexes)
    }

    const onChangeTexts = (event : any, index: number) => {
        const value = event.target.value
        const values = iterableArray(searchTexts)
        values[index] = value
        setSearchTexts(values)
    }

    const resetInput = (index: number) => {
        const searchIndexes = iterableArray(inSearch)
        const values = iterableArray(searchTexts)

        searchIndexes[index] = false
        values[index] = ''

        setSearchTexts(values)
        setInSearch(searchIndexes)
    }

    const handleKeyDown = (event: any, index: number) => {
        if (event.key === 'Enter') {
            searchTask(index)
        }
      }

      const handleKeyDownAdd = (event: any) => {
        if (event.key === 'Enter') {
            addTask()
        }
      }

    const getTasks = inSearch.indexOf(true) > -1 ? filteredTasks : tasks

    return (
        <div className="flex items-center justify-center w-screen h-screen font-medium ">
            <ClearButton clearCallback={clearTasks} />
            <DarkModeButton toggleModeCallback={toggleModeCallback} />
            <DragDropContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >

                {
                    getTasks.map((list, index) =>
                        <StrictModeDroppable droppableId={`droppable-${index}`}>
                            {(provided, snapshot) => (
                                <div
                                    key={index}
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
                                                    btnComponent={
                                                        <button
                                                            onClick={() => searchTask(index)}
                                                            className="text-sm font-medium rounded">
                                                            <SearchIcon/>
                                                        </button>
                                                    }
                                                    rightComponent={inSearch[index] ? 
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
                                                                   <PlusIcon/>
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
                            )}


                        </StrictModeDroppable>
                    )}


            </DragDropContext>
        </div>

    );
}
