import axios from "axios";
import { BaseURL, LoginPage, RefreshToken } from "./Constants";
import { IErrorResponse } from "../types/Response.interface"

const instance = axios.create({
    baseURL: BaseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    console.error(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
            await axios.get(`${BaseURL}${RefreshToken}`, { withCredentials: true } );

            return instance(originalRequest);
        }
        catch (refreshError) {
            localStorage.clear();
            window.location.href = LoginPage;
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
});

export default instance;