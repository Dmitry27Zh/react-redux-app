import { taskReducer } from './taskReducer'
import { createStore } from 'redux'

const initialState = [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: false },
]

export const initializeStore = () => {
  return createStore(taskReducer, initialState)
}
