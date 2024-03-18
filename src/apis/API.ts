import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"

export const API = {
    getHello: async function (cancel = false) {
        const response = await api.request({
            url: `/hello`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        })

        return response.data
    },
}

const cancelApiObject = defineCancelApiObject(API)          