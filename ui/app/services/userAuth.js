import mainService from "./authService";

export function login(data) {
    return mainService
        .post("/user/login", data)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}
export function logout() {
    return mainService
        .post("/user/logout", {})
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}
