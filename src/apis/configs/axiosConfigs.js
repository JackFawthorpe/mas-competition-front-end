
import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
    return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})