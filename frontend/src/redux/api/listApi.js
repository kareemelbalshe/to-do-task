import request from "../../utils/request";
import { toast } from "react-toastify";
import { listAction } from "../slices/listSlice";

export function getList() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get("/api/v1/list", {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })
            dispatch(listAction.getList1(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function createList(list) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/v1/list", list, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })
            dispatch(listAction.createList1(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function updateList(list, listId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put("/api/v1/list/" + listId, list, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })
            dispatch(listAction.updateList1(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function deleteList(listId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete("/api/v1/list/" + listId, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })
            dispatch(listAction.deleteList1(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}