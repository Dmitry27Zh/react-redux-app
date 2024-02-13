import { createAction } from '@reduxjs/toolkit'

const update = createAction('task/update')
const remove = createAction('task/removed')

export const taskCompleted = (id) => {
  return update({
    id,
    completed: true,
  })
}

export const descriptionChanged = (id) => {
  return update({
    id,
    description: `New Title for id:${id}`,
  })
}

export const taskRemoved = (id) => {
  return remove({
    id,
  })
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case update.type:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload }
        } else {
          return item
        }
      })
    case remove.type:
      return state.filter((item) => item.id !== action.payload.id)
    default:
      return state
  }
}

export default reducer
