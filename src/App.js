import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { logout, login, selectUser } from './features/userSlice'
import { auth } from './firebase'
import Imessage from './Imessage'
import Login from './Login'
function App () {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        )
      } else {
        debugger;   
        dispatch(logout())
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div className='App'>{user ? <Imessage /> : <Login />}</div>
}

export default App
