import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonApi"


export const allBranchApi = async () => {
    return await commonAPI('GET', `${BASE_URL}/sales/branchs`)
}

export const salesDetilsApi = async (formData) => {    
    return await commonAPI('POST', `${BASE_URL}/sales/detils`, formData, "")
}

export const getAllSaleshApi = async () => {
    return await commonAPI('GET', `${BASE_URL}/sales/allsales`)
}

export const editSalesApi = async (id, formData) => {
    return await commonAPI('PUT', `${BASE_URL}/sales/editsales/${id}`, formData, "");
}

export const deleteSalesApi = async (id) => {
    return await commonAPI('DELETE', `${BASE_URL}/sales/deletesales/${id}`, {}, "");
}