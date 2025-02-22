import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'

import { userService } from '../services/user.service.js'
import { gameReducer } from './reducers/game.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

const rootReducer = combineReducers({
  gameModule: gameReducer,
  userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
