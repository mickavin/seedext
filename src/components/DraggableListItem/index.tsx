import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import DraggableIcon from '@/assets/svg/drag'
import { useTask } from '@/context';
import * as actions from '@/context/actions';
import { Task } from "@/types";

const DraggableListItem = ({ item, listIndex, index, isDark, finalizeTask } :
    {
        item: Task,
        listIndex: number,
        index: number,
        isDark: boolean,
        finalizeTask: (listIndex: number, index: number, event: any) => void,
    }) => {
    const { dispatch } = useTask();

    const removeTask = () => {
        dispatch(actions.removeTaskAction(item))
    }

    return (
        <Draggable key={item.id} draggableId={`draggable-${item.id}`} index={listIndex}>
            {(draggableProvided) => (
                <div
                    id={`draggable-${item.id}`}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}

                    className="list-group-item flex-row align-items-start relative">
                    <label
                    htmlFor={`task_${index}_${listIndex}`}
                    className='flex flex-row justify-between items-center my-2.5 h-10 px-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'>
                        <input
                            className="hidden"
                            type="checkbox"
                            id={`task_${index}_${listIndex}`}
                            checked={item.finalized}
                            onChange={(e) => finalizeTask(listIndex, index, e)}
                        />
                        <div
                            className="flex items-center "
                        >
                            <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
                                <svg
                                    className="w-4 h-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span className="ml-4 text-sm">{item.titleTask}</span>
                        </div>
                        <div className="flex flex-row justify-content-center items-center">
                        <DraggableIcon isDark={isDark} />
                        </div>
                        

                    </label>
                    <a className="badge absolute badge-list" onClick={() => removeTask()}>x</a>

                </div>
            )}
        </Draggable>
    )
}

export default DraggableListItem