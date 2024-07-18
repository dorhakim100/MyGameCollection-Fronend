import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { userService } from '../../services/user.service.js'
import { login, signup, logout } from '../../store/actions/user.actions.js'

import { showErrorMsg } from '../../services/event-bus.service.js'

export function LoginSignup({ onSetUser }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const [isSignup, setIsSignUp] = useState(user)
  const [credentials, setCredentials] = useState(
    userService.getEmptyCredentials()
  )

  const navigate = useNavigate()

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
  }
  function onLogin(credentials) {
    isSignup
      ? signup(credentials)
          .then((data) => {
            onSetUser(data.loggedinUser)
          })
          .then(() => {
            showSuccessMsg('Signed in successfully')
          })
          .catch((err) => {
            showErrorMsg('Oops try again')
          })
      : login(credentials)
          .then((data) => {
            console.log(data)
            onSetUser(data)
          })
          .then(() => {
            showSuccessMsg('Logged in successfully')
          })
          .catch((err) => {
            showErrorMsg('Oops try again')
          })
  }

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={credentials.username}
          placeholder='Username'
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          type='password'
          name='password'
          value={credentials.password}
          placeholder='Password'
          onChange={handleChange}
          required
          autoComplete='off'
        />
        {isSignup && (
          <input
            type='text'
            name='fullname'
            value={credentials.fullname}
            placeholder='Full name'
            onChange={handleChange}
            required
          />
        )}
        <button>{isSignup ? 'Signup' : 'Login'}</button>
      </form>

      <div className='btns'>
        <a href='#' onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </div>
  )
}
