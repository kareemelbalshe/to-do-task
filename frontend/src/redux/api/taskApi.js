
import request from "../../utils/request";
import { toast } from "react-toastify";
import { taskAction } from "../slices/taskSlice";

export function getTask(listId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get("/api/v1/task/" + listId, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })
            dispatch(taskAction.getTask1(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function createTask(task, listId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/v1/task/" + listId, task, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })
            dispatch(taskAction.createTask1(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function updateTask(task, taskId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put("/api/v1/task/" + taskId, task, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })
            dispatch(taskAction.updateTask1(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function deleteTask(taskId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete("/api/v1/task/" + taskId, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })
            dispatch(taskAction.deleteTask1(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}