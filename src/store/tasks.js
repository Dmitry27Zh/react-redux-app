import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'

const initialState = []

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    recived(_, action) {
      return action.payload
    },
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

const { recived, update, remove } = slice.actions

const taskRequested = createAction('task/requested')
const taskRequestFailed = createAction('task/requestFailed')

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

export const thunkDemo = (id) => (dispatch, getState) => {
  console.warn('Thunk Demo: ', getState())
  dispatch(taskRemoved(id))
}

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (e) {
    console.error(e)
    dispatch(taskRequestFailed(e))
  }
}

export default slice.reducer
