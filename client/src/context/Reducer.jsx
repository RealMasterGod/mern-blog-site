import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT, UPDATE_FAILURE, UPDATE_START, UPDATE_SUCCESS } from "./Actions"

const reducer = (state,action) => {
    if(action.type === LOGIN_START) {
        return {user: null,isFetching: true,error: false}
    }
    if(action.type === LOGIN_SUCCESS) {
        return {user: action.payload,isFetching:false,error: true}
    }
    if(action.type === LOGIN_FAILURE) {
        return {user: null,isFetching: false, error: true}
    }
    if(action.type === UPDATE_START) {
        return {...state,isFetching: true}
    }
    if(action.type === UPDATE_SUCCESS) {
        return {user: action.payload,isFetching:false,error: true}
    }
    if(action.type === UPDATE_FAILURE) {
        return {...state, isFetching:false,error: true}
    }
    if(action.type === LOGOUT) {
        return {user: null,isFetching: false,error: false}
    }
    throw new Error(`no matching"${action.type}" - action type`)
}

export default reducer