import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { contactReducer } from './reducer/contactReducer/contactReducer'

const rootReducer = combineReducers({
    contact: contactReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>