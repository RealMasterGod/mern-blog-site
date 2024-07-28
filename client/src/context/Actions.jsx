export const LOGIN_START = "LOGIN_START"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const UPDATE_START = "UPDATE_START"
export const UPDATE_SUCCESS = "UPDATE_SUCCESS"
export const UPDATE_FAILURE = "UPDATE_FAILURE"
export const LOGOUT = "LOGOUT"

export const loginStart = () => {
    return {type: LOGIN_START}
}

export const loginSuccess = (user) => {
    return {type: LOGIN_SUCCESS,payload: user}
}

export const loginFailure = () => {
    return {type: LOGIN_FAILURE}
}

export const logout = () => {
    return {type: LOGOUT}
}

export const updateStart = () => {
    return {type: UPDATE_START}
}

export const updateSuccess = (user) => {
    return {type: UPDATE_SUCCESS,payload: user}
}

export const updateFailure = () => {
    return {type: UPDATE_FAILURE}
}