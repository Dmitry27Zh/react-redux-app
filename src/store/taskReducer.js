import { taskRemoved, taskUpdated } from './actionTypes'

export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case taskUpdated:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload }
        } else {
          return item
        }
      })
    case taskRemoved:
      return state.filter((item) => item.id !== action.payload.id)
    default:
      return state
  }
}
