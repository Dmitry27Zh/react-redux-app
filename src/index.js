import React from 'react'
import ReactDOM from 'react-dom/client'

const createStore = (initialState) => {
  let state = initialState

  return {
    getState() {
      return state
    },
    dispatch(action) {
      if (action.type === 'task/completed') {
        state = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, completed: true }
          } else {
            return item
          }
        })
      }

      console.log(state)
    },
  }
}

const store = createStore([{ id: 1, description: 'Task 1', completed: false }])

const App = () => {
  console.log(store.getState())

  return (
    <>
      <h1>App</h1>
      <button
        onClick={() =>
          store.dispatch({
            type: 'task/completed',
            payload: {
              id: 1,
            },
          })
        }
      >
        Complete
      </button>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
