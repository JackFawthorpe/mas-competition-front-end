import React, { useState } from 'react'
import LoginPage from '../pages/Login'

export const AuthContext = React.createContext({
  user: null,
  setUser: (user: User) => {}
})

// Context for authentication of the user
// User data is stored in localstorage
export const AuthContextProvider = (props) => {

  const setUser = (user) => {
    setState({...state, user: user})
    localStorage.setItem('user', JSON.stringify(state.user));
  }
  
  const initState = {
    user: localStorage.getItem('user'),
    setUser: setUser
  } 

  const [state, setState] = useState(initState)

  return (
    <AuthContext.Provider value={state}>
      {state.user != null ? props.children : <LoginPage/>}
    </AuthContext.Provider>
  )
}