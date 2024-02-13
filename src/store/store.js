import tasksReducer from './tasks'
import { createStore } from 'redux'

const initialState = [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: false },
]

const configureStore = () => {
  return createStore(tasksReducer, initialState)
}

export default configureStore
