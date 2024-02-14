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
      state.entities = state.entities.filter((item) => item.id !== action.payload.id)
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state) {
      state.isLoading = false
    },
    receivedCreatedTask(state, action) {
      state.entities.push(action.payload)
    },
  },
})

const { recived, update, remove, taskRequested, taskRequestFailed, receivedCreatedTask } = slice.actions

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

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (e) {
    dispatch(taskRequestFailed())
    dispatch(setError(e.message))
  }
}

export const createTask = (title) => async (dispatch) => {
  try {
    const task = await todosService.create({ title, completed: false })
    dispatch(receivedCreatedTask(task))
  } catch (e) {
    dispatch(setError(e.message))
  }
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default slice.reducer
