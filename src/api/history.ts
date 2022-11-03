import { HistoryType } from "../types/history";
import instance from "./instance";

export const listHistory = async () => {
    const url = `/history`
    return instance.get(url)
}


export const listHistoryByUser = (userId: string | undefined) => {
    const url = `/history/user/${userId}`
    return instance.get(url)
}

export const detailHistoryByUserActivity= (acivityId: string, userId: string | undefined) => {
    const url = `/learningProgress?activityId=${acivityId}&userId=${userId}`
    return instance.get(url)
}


export const detailHistory = async (id: string | undefined) => {
    const url = `/history/${id}`
    return instance.get(url)
}

export const addHistory = async (data: any ) => {
    const url = `/history`
    return instance.post(url,data)
}

export const editHistory = async (data: HistoryType) => {
    const url = `/history/${data._id}`
    return instance.put(url,data)
}

export const removeHistory = async (id: string) => {
    const url = `/history${id}`
    return instance.delete(url)
}