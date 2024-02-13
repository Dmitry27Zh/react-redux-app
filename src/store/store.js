import { logger } from './middleware/logger'
import tasksReducer from './tasks'
import { createStore, compose, applyMiddleware } from 'redux'

const middlewareEnhancer = applyMiddleware(logger)

const configureStore = () => {
  return createStore(
    tasksReducer,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middlewareEnhancer)
  )
}

export default configureStore
