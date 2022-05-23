import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { biodataReducer } from './reducer'

const reducers = combineReducers({
  biodataReducer,
})
const store = createStore(reducers, applyMiddleware(thunk))

export default store
