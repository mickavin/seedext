import React, { ChangeEventHandler, ReactNode } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableIcon from '@/assets/svg/drag'

const ListItem = ({ item, listIndex, index, isDark, finalizeTask } :
    {
        item: any,
        listIndex: number,
        index: number,
        isDark: boolean,
        finalizeTask: any,
    }) => {
    return (
        <Draggable key={item.id} draggableId={`draggable-${item.id}`} index={listIndex}>
            {(draggableProvided, draggableSnapshot) => (
                <div
                    id={`draggable-${item.id}`}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}

                    className="list-group-item flex-column align-items-start">
                    <div className='flex flex-row justify-between items-center my-2.5 h-10 px-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'>
                        <input
                            className="hidden"
                            type="checkbox"
                            id={`task_${index}_${listIndex}`}
                            checked={item.finalized}
                            onChange={(e) => finalizeTask(listIndex, index, e)}
                        />
                        <label
                            className="flex items-center "
                            htmlFor={`task_${index}_${listIndex}`}
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
                        </label>
                        <DraggableIcon isDark={isDark} />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default ListItem