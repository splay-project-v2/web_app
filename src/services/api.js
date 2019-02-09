import axios from "axios";

const URL_API_V1 = "http://127.0.0.1:8081/api/v1"


function loginAPI(user, password) {
    return axios.post(URL_API_V1 + "/sessions", {
        data: {
            type: 'session',
            attributes: {
                username: user,
                password: password
            }
        }
    })
}

function registerAPI(user, email, password, passwordConfirmation) {
    return axios.post(URL_API_V1 + "/users", {
        data: {
            type: 'session',
            attributes: {
                email: email,
                username: user,
                password: password,
                password_confirmation: passwordConfirmation
            }
        }
    })
}

function createJobAPI(token, name, description, nbSplayd, code) {
    var config = {
        headers: {'Authorization': "bearer " + token}
    };
    return axios.post(URL_API_V1 + "/jobs", {
        data: {
            type: 'user',
            attributes: {
                code: code,
                name: name,
                description: description,
                nb_splayds: nbSplayd
            }
        }
    }, config)
}

function listJobsAPI(token) {
    var config = {
        headers: {'Authorization': "bearer " + token}
    };
    return axios.get(URL_API_V1 + "/jobs", config)
}

function getJobAPI(token, idJob) {
    var config = {
        headers: {'Authorization': "bearer " + token}
    };
    return axios.get(URL_API_V1 + `/jobs/${idJob}`, config)
}

function removeJobAPI(token, idJob){
    var config = {
        headers: {'Authorization': "bearer " + token}
    };
    return axios.delete(URL_API_V1 + `/jobs/${idJob}`, config)
}

function listSplaydsAPI(token) {
    var config = {
        headers: {'Authorization': "bearer " + token}
    };
    return axios.get(URL_API_V1 + "/splayds", config)
}

export {
    loginAPI,
    registerAPI,
    createJobAPI,
    listJobsAPI,
    getJobAPI,
    removeJobAPI,
    listSplaydsAPI
}