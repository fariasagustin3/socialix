import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer";

// create an initial state and pass it to createContext parameter
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE);

// component to wrap the app to apply a react context api
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  return(
    <AuthContext.Provider 
      value={{ 
        user: state.user,
        isFetching: state.isFetching,
        error: state.error, dispatch
      }}>
        {children}
    </AuthContext.Provider>
  )
}
