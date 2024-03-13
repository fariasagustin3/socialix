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

// when user follow other user
export const follow = (userId) => {
  return {
    type: "FOLLOW",
    payload: userId,
  }
}

// when user unfollow other user
export const unfollow = (userId) => {
  return {
    type: "UNFOLLOW",
    payload: userId,
  }
}
