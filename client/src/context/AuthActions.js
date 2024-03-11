// when login is starting
export const loginStart = (userCredentials) => {
  return {
    type: "LOGIN_START",
  }
}

// when login was success
export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  }
}

// when login was success
export const loginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  }
}
