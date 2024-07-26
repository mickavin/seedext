'use client'
import React, { useState } from 'react';
import DarkModeButton from "@/components/Buttons/DarkModeButton";
import ClearButton from "@/components/Buttons/ClearButton";
import CardContent from "@/components/CardContent";
import { Task } from '@/types';
import { iterableArray, search } from '@/utils';
import { DragDropContext } from 'react-beautiful-dnd';
import StrictModeDroppable from '@/components/StrictModeDroppable';
import { useTask } from "@/context";
import * as actions from '@/context/actions';

const AUTO = true

const Home : React.FC = () => {
    const [searchTexts, setSearchTexts] = useState(['', '', ''])
    const [inSearch, setInSearch] = useState([false, false, false])
    const { state, dispatch } = useTask();
    const { tasks } = state

    const toggleModeCallback = () => {
        dispatch(actions.toggleModeAction())
    };

    const clearTasks = () => {
        dispatch(actions.clearTasksAction())
    };

    const onDragEnd = (result: any) => {
        dispatch(actions.moveTaskAction(result))
    };

    const searchTask = (columnIndex: number) => {  
        const searchIndexes = iterableArray(inSearch)
        searchIndexes[columnIndex] = true
        setInSearch(searchIndexes)
        if(typeof document != 'undefined'){
            document.getElementById(`search-btn-${columnIndex}`)?.classList.add('active')
        }
    }

    const filteredTasks = tasks.map((taskList: Task[], index: number) => 
        search(searchTexts[index], taskList, [{type: 'string', key: 'titleTask'}])) as Task[][]
    

    const getTasks : Task[][]  = inSearch.indexOf(true) > -1 && !AUTO || 
                    searchTexts.findIndex((item: string) => item.length > 0) > -1 && AUTO ? 
                    filteredTasks : 
                    tasks

    return (
            <div className="flex items-center justify-center w-screen h-screen font-medium ">
                <ClearButton clearCallback={clearTasks} />
                <DarkModeButton toggleModeCallback={toggleModeCallback} />
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        getTasks.map((list, index) =>
                            <StrictModeDroppable 
                            key={index}
                            droppableId={`droppable-${index}`}>
                                {(provided) => (
                                    <CardContent
                                    provided={provided}
                                    index={index}
                                    searchTask={searchTask}
                                    list={list}
                                    setSearchTexts={setSearchTexts}
                                    searchTexts={searchTexts}
                                    inSearch={inSearch}
                                    setInSearch={setInSearch}
                                    automaticSearch={AUTO}
                                    />
                                )}


                            </StrictModeDroppable>
                        )}


                </DragDropContext>
            </div>
    );
}

export default Home;