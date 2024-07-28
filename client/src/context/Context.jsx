import {createContext,useEffect,useReducer} from "react"
import reducer from "./Reducer"

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching:  false,
    error: false,
}

export const GlobalContext = createContext(initialState)
const ContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])
    return <GlobalContext.Provider value={{user:state.user,isFetching: state.isFetching,error: state.error,dispatch}}>
        {children}
    </GlobalContext.Provider>
}

export default ContextProvider