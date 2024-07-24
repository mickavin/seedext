import * as actionTypes from '@/context/actionTypes';
import * as types from '@/types'
import { iterableArray, rearangeArr } from '@/utils';

export const initialState: types.IState = {
    tasks: [[], [], []],
    isDark: true,
}

export const taskReducer = (state: types.IState = initialState, action: types.IAction): types.IState => {
    switch (action.type) {
        case actionTypes.ADD_TASK: {
            let tasks = iterableArray(state.tasks)
            const newTask = action.payload.task
            let column = iterableArray(tasks[newTask.columnIndex])
            column.push(newTask)
            tasks.splice(newTask.columnIndex, 1, column)

            return {
                ...state,
                tasks: iterableArray(tasks)
            };
        }
        case actionTypes.MOVE_TASK: {
            const { source, destination } = action.payload.dragResult;
            const nextTasks = iterableArray(state.tasks)

            if (!destination) {
                return {
                    ...state,
                    tasks: nextTasks
                };
            }

            if (destination.droppableId === source.droppableId) {
                const sourceColumnIndex = parseInt(source.droppableId.replace('droppable-', ''))
                const sourceColumn = iterableArray(nextTasks[sourceColumnIndex])
                const rearangedColumn = rearangeArr(sourceColumn, source.index, destination.index)
                nextTasks.splice(sourceColumnIndex, 1, rearangedColumn)

                return {
                    ...state,
                    tasks: iterableArray(nextTasks)
                };

            } else if (destination.droppableId !== source.droppableId) {
                const sourceColumnIndex = parseInt(source.droppableId.replace('droppable-', ''))
                const destinationColumnIndex = parseInt(destination.droppableId.replace('droppable-', ''))
                const destinationColumn = iterableArray(nextTasks[destinationColumnIndex])
                const sourceColumn = iterableArray(nextTasks[sourceColumnIndex])
                const movedTask = {
                    ...sourceColumn[source.index],
                    columnIndex: destinationColumnIndex
                }
                destinationColumn.push(movedTask)
                const rearangedDestinationColumn = rearangeArr(destinationColumn, destinationColumn.length - 1, destination.index)

                sourceColumn.splice(source.index, 1)

                nextTasks.splice(sourceColumnIndex, 1, sourceColumn)
                nextTasks.splice(destinationColumnIndex, 1, rearangedDestinationColumn)

                return {
                    ...state,
                    tasks: iterableArray(nextTasks)
                };
            }
            return {
                ...state,
                tasks: iterableArray(state.tasks)
            };
        }
        case actionTypes.REMOVE_TASK: {
            let tasks = iterableArray(state.tasks)
            const removableTask = action.payload.task
            let column = iterableArray(tasks[removableTask.columnIndex])
            column = column.filter((item: types.Task) => removableTask.id != item.id)
            tasks.splice(removableTask.columnIndex, 1, column)

            return {
                ...state,
                tasks: iterableArray(tasks)
            };
        }
        case actionTypes.CLEAR_TASKS: {
    
            return {
                ...state,
                tasks: [[], [], []]
            };
        }
        case actionTypes.TOGGLE_MODE: {
            let isDark = !state.isDark

            return {
                ...state,
                isDark
            };
        }
        case actionTypes.FINALIZE_TASK: {
            let task = action.payload.task

            const index = action.payload.index
            const isFinalized = action.payload.isFinalized
            const nextTasks = iterableArray(state.tasks)

            const columnTask = iterableArray(nextTasks[task.columnIndex])
            const newTask = {
                ...task,
                finalized: isFinalized
            }

            columnTask.splice(index, 1, newTask)

            nextTasks.splice(task.columnIndex, 1, columnTask)
            
            const tasks = {
                tasks: nextTasks
            }

            return {
                ...state,
                ...tasks
            };
        }
        default:
            return state;
    }
};