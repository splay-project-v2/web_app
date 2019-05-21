import axios from 'axios'

const URL_API_V1 = 'http://127.0.0.1:8081/api/v1'

function handlingErrorAPI (error) {
  var msg = error
  // eslint-disable-next-line
  console.error(error);
  if (error.response) {
    msg = 'Server response : ' + error.response.data.errors
  } else {
    msg = 'Error : ' + error.message
  }
  // eslint-disable-next-line
  throw { msg: msg, source: error }
}

function loginAPI (user, password) {
  return axios.post(URL_API_V1 + '/sessions', {
    data: {
      type: 'session',
      attributes: {
        username: user,
        password: password
      }
    }
  }).catch((error) => {
    handlingErrorAPI(error)
  })
}

function registerAPI (user, email, password, passwordConfirmation) {
  return axios.post(URL_API_V1 + '/users', {
    data: {
      type: 'session',
      attributes: {
        email: email,
        username: user,
        password: password,
        password_confirmation: passwordConfirmation
      }
    }
  }).catch((error) => {
    handlingErrorAPI(error)
  })
}

function createJobAPI (token, dataForm) {
  var config = {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }
  return axios.post(URL_API_V1 + '/jobs', {
    data: {
      type: 'user',
      attributes: dataForm
    }
  }, config).catch((error) => {
    handlingErrorAPI(error)
  })
}

function listJobsAPI (token) {
  var config = {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }
  return axios.get(URL_API_V1 + '/jobs', config).catch((error) => {
    handlingErrorAPI(error)
  })
}

function getJobAPI (token, idJob) {
  var config = {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }
  return axios.get(URL_API_V1 + `/jobs/${idJob}`, config).catch((error) => {
    handlingErrorAPI(error)
  })
}

function killJobAPI (token, idJob) {
  var config = {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }
  return axios.delete(URL_API_V1 + `/jobs/${idJob}`, config).catch((error) => { handlingErrorAPI(error) })
}

function getLogsAPI (token, idJob) {
  var config = {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }
  return axios.get(URL_API_V1 + `/logs/${idJob}`, config).catch((error) => { handlingErrorAPI(error) })
}

function listSplaydsAPI (token) {
  var config = {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }
  return axios.get(URL_API_V1 + '/splayds', config).catch((error) => { handlingErrorAPI(error) })
}

export {
  loginAPI,
  registerAPI,
  createJobAPI,
  listJobsAPI,
  getJobAPI,
  killJobAPI,
  listSplaydsAPI,
  getLogsAPI
}
