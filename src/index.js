import React from 'react'
import ReactDOM from 'react-dom/client'

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'task/completed':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, completed: true }
        } else {
          return item
        }
      })
    default:
      return state
  }
}

const createStore = (reducer, initialState) => {
  let state = initialState

  return {
    getState() {
      return state
    },
    dispatch(action) {
      state = reducer(state, action)
    },
  }
}

const store = createStore(taskReducer, [{ id: 1, description: 'Task 1', completed: false }])

const App = () => {
  const completeTask = () => {
    store.dispatch({
      type: 'task/completed',
      payload: {
        id: 1,
      },
    })

    console.log(store.getState())
  }
  return (
    <>
      <h1>App</h1>
      <button onClick={completeTask}>Complete</button>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
