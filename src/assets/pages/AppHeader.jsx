import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { Cart } from './Cart.jsx'

import { userService } from '../../services/user.service.js'
import { login, signup, logout } from '../../store/actions/user.actions.js'

import { showErrorMsg } from '../../services/event-bus.service.js'

import icon from '/game-controller.svg'

import '../css/AppHeader.css'

export function AppHeader() {
  const navigate = useNavigate()

  const [user, setUser] = useState(userService.getLoggedinUser())

  const [isCart, setIsCart] = useState(false)

  function onSetUser(user) {
    setUser(user)
    navigate(`/`)
  }

  function onLogout() {
    // userService
    //   .logout()
    //   .then(() => {
    //     onSetUser(null)
    //   })
    //   .catch((err) => {
    //     showErrorMsg('OOPs try again')
    //   })
    logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function toggleCart() {
    setIsCart((prevIsCart) => (prevIsCart = !prevIsCart))
  }
  return (
    <header className='app-header'>
      <section className='header-container'>
        <div className='logo-container'>
          <h1>Game Store</h1>
          <img className='icon' src={icon} alt='' />
        </div>
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/game'>Games</NavLink>
          <NavLink to='/dashboard'>Dashboard</NavLink>
          <NavLink to='/about'>About</NavLink>
        </nav>
        {user ? (
          <section className='login-container'>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )}

        <button onClick={toggleCart}>
          <i className='fa-solid fa-cart-shopping'></i>
        </button>
      </section>
      {isCart && <Cart toggleCart={toggleCart} />}
      <UserMsg />
    </header>
  )
}
