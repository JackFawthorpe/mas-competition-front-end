import React, { useState } from 'react'
import LoginPage from '../pages/Login'

export const AuthContext = React.createContext<{user: User, setUser: any}>({
  user: null,
  setUser: null
})

// Context for authentication of the user
// User data is stored in localstorage
export const AuthContextProvider = (props) => {

  const setUser = (user) => {
    setState({...state, user: user})
    if (user != null) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }
  
  const loadUser = () => {
    return localStorage.getItem('user') != null
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  }

  const initState = {
    user: loadUser(),
    setUser: setUser
  } 

  const [state, setState] = useState(initState)

  return (
    <AuthContext.Provider value={state}>
      {state.user != null ? props.children : <LoginPage/>}
    </AuthContext.Provider>
  )
}