import { createSlice } from '@reduxjs/toolkit'

const initialState = { entities: [] }

const slice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    set(state, action) {
      state.entities.push(action.payload)
    },
  },
})

const { set } = slice.actions

export const setError = (message) => (dispatch) => {
  dispatch(set(message))
}

export const getError = () => (state) => state.errors.entities[0]

export default slice.reducer
