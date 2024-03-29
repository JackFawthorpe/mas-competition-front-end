import React, { useState } from 'react'
import LoginPage from '../pages/Login'

export const AuthContext = React.createContext({
  user: null,
  setUser: (user: User) => {}
})

export const AuthContextProvider = (props) => {

  const setUser = (user) => {
    setState({...state, user: user})
  }

  const initState = {
    user: null,
    setUser: setUser
  } 

  const [state, setState] = useState(initState)

  return (
    <AuthContext.Provider value={state}>
      {state.user != null ? props.children : <LoginPage/>}
    </AuthContext.Provider>
  )
}