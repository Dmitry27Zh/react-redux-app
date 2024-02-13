import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: false },
]

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.findIndex((item) => item.id === action.payload.id)
      const element = state[elementIndex]
      state[elementIndex] = { ...element, ...action.payload }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload.id)
    },
  },
})

const { update, remove } = slice.actions

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

export default slice.reducer
