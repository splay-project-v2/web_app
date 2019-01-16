import axios from "axios";

const URL_API_V1 = "http://127.0.0.1:8081/api/v1"


function loginAPI(user, password) {
    return axios.post(URL_API_V1 + "/sessions", {
        data: {
            type: 'session',
            attributes: {
                login: user,
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
                login: user,
                password: password,
                password_confirmation: passwordConfirmation
            }
        }
    })
}

export {
    loginAPI,
    registerAPI
}