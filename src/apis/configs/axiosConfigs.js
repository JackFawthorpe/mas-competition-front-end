
import axios from "axios";
import { LocalStorageAPI } from "../LocalStorageAPI";

let baseURL = "http://localhost:4300/api/v1";

if (process.env.NODE_ENV === "production") {
    baseURL = `https://mas-competition.csse.canterbury.ac.nz${process.env.PUBLIC_URL}/api/v1`;
}
  
export const api = axios.create({
    baseURL,
    withCredentials: true,
});

api.interceptors.response.use(
    response => {
      // If response is successful, return it
      return response;
    },
    error => {
      // If response status is 401 (redirect) then the account has been logged out
      if (error.response && error.response.status === 401) {
        LocalStorageAPI.removeItem('user');
        window.location.href = "/";
        window.location.reload();
      }
      // Return the error
      return Promise.reject(error);
    }
);