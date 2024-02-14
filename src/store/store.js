import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { logger } from './middleware/logger'
import tasksReducer from './tasks'
import errorReducer from './errors'

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: tasksReducer,
})

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export default createStore
