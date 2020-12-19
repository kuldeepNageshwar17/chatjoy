import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'

function Login () {
  const signin = () => {
    auth.signInWithPopup(provider).catch(error => {
        alert(error);
    })
  }
  return (
    <div className='login'>
      <div className='login__logo'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYn92Zremhxjko42d9nv273JymwUteX06HnQ&usqp=CAU'
          alt=''
        />
      </div>
      <Button onClick={signin}> Sign In</Button>
    </div>
  )
}

export default Login
