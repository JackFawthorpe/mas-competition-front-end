
import axios from "axios";

let baseURL = "http://localhost:4300/api/v1";

if (process.env.NODE_ENV === "production") {
    baseURL = "https://localhost:4000/api/v1";
  } else if (process.env.NODE_ENV === "staging") {
    baseURL = "https://localhost:4500/test/api/v1";
  }
  
export const api = axios.create({
baseURL: baseURL
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