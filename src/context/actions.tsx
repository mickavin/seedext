import * as actionTypes from '@/context/actionTypes';
import * as types from '@/types'

export const addTaskAction = (task: types.Task) => ({
    type: actionTypes.ADD_TASK,
    payload: {
        task
    }
})

export const clearTasksAction = () => ({
    type: actionTypes.CLEAR_TASKS,
})

export const toggleModeAction = () => ({
    type: actionTypes.TOGGLE_MODE
})

export const moveTaskAction = (dragResult: any) => ({
    type: actionTypes.MOVE_TASK,
    payload: {
        dragResult
    }
})

export const removeTaskAction = (task: types.Task) => ({
    type: actionTypes.REMOVE_TASK,
    payload: {
        task
    }
})

export const finalizeTaskAction = (task: types.Task, isFinalized: boolean, index: number) => ({
    type: actionTypes.FINALIZE_TASK,
    payload: {
        task,
        isFinalized,
        index
    }
})