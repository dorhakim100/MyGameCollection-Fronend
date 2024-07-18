import { userService } from '../../services/user.service.js'
// import { CLEAR_gameT } from '../reducers/game.reducer.js'
import {
  ADD_GAME_TO_CART,
  SET_USER,
  SET_USER_SCORE,
} from '../reducers/user.reducer.js'
import { store } from '../store.js'

export function login(credentials) {
  return userService
    .login(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
      return user
    })
    .catch((err) => {
      console.log('user actions -> Cannot login', err)
      throw err
    })
}

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
    })
    .catch((err) => {
      console.log('user actions -> Cannot signup', err)
      throw err
    })
}

export function logout(credentials) {
  return userService
    .logout(credentials)
    .then(() => {
      store.dispatch({ type: SET_USER, user: null })
    })
    .catch((err) => {
      console.log('user actions -> Cannot logout', err)
    })
}

export function checkout(diff) {
  return userService
    .updateScore(-diff)
    .then((newScore) => {
      store.dispatch({ type: CLEAR_CART })
      store.dispatch({ type: SET_USER_SCORE, score: newScore })
    })
    .catch((err) => {
      console.log('user actions -> Cannot checkout', err)
      throw err
    })
}

export function addGameToCart(game) {
  return userService
    .addGameToCart(game)
    .then((game) => {
      console.log(game)
      store.dispatch({ type: ADD_GAME_TO_CART, game })
    })
    .catch((err) => {
      console.log('user actions -> Cannot add game', err)
      throw err
    })
}
