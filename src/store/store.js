import { configureStore } from '@reduxjs/toolkit'
import { logger } from './middleware/logger'
import tasksReducer from './tasks'

const createStore = () => {
  return configureStore({
    reducer: tasksReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export default createStore
