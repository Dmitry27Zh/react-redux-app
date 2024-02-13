import { taskUpdated } from './actionTypes'

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
    default:
      return state
  }
}
