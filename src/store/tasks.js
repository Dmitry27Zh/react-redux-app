import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = {
  entities: [],
  isLoading: true,
}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex((item) => item.id === action.payload.id)
      const element = state.entities[elementIndex]
      state.entities[elementIndex] = { ...element, ...action.payload }
    },
    remove(state, action) {
      return state.entities.filter((item) => item.id !== action.payload.id)
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    },
  },
})

const { recived, update, remove, taskRequested, taskRequestFailed } = slice.actions

export const taskCompleted = (id) => {
  return update({
    id,
    completed: true,
  })
}

export const titleChanged = (id) => {
  return update({
    id,
    title: `New Title for id:${id}`,
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
    dispatch(taskRequestFailed())
    dispatch(setError(e.message))
  }
}

export default slice.reducer
