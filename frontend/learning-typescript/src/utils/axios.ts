import axios from "axios";
import queryString from "query-string";

const API_URL = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5000";

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.response.use(
    response => {
        if (response && response) {
            return response;
        }

        return response;
    },
    error => {
        // Handle errors
        throw error;
    }
);

export default axiosClient;
