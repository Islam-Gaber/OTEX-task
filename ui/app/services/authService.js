import axios from "axios";
export const baseURL =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:8000/api/"
        : "/api/";

const mainService = axios.create({
    baseURL: baseURL,
    // withCredentials: true,
    headers: {
        // Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
export const dictionaryService = axios.create({
    baseURL:
        process.env.NODE_ENV !== "production" ? "http://localhost:7000/" : "/",
    // withCredentials: true,
    headers: {
        // Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default mainService;
