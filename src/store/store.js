import tasksReducer from './tasks'
import { createStore } from 'redux'

const configureStore = () => {
  return createStore(tasksReducer)
}

export default configureStore
