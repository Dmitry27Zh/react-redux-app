import { logger } from './middleware/logger'
import { thunk } from './middleware/thunk'
import tasksReducer from './tasks'
import { createStore, compose, applyMiddleware } from 'redux'

const middlewareEnhancer = applyMiddleware(logger, thunk)

const configureStore = () => {
  return createStore(
    tasksReducer,
    compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  )
}

export default configureStore
