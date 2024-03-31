
import axios from "axios";

let baseURL = "http://localhost:4300/api/v1";

if (process.env.NODE_ENV === "production") {
    baseURL = `http://132.181.18.82${process.env.PUBLIC_URL}/api/v1`;
}
  
export const api = axios.create({
    baseURL,
    withCredentials: true,
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
    return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})