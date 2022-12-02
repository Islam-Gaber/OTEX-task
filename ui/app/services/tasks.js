import mainService from "./mainService";

export function records(data) {
    return mainService
        .post(`tasks/records`, data)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export function taskDelete(id) {
    return mainService
        .delete(`tasks/${id}/delete`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export function record(id) {
    return mainService
        .get(`tasks/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export function update(id, data) {
    return mainService
        .put(`tasks/${id}/update`, data)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export function create(data) {
    return mainService
        .post("tasks/create", data)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}
