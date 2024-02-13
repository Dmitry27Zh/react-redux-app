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

const store = createStore(taskReducer, [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: false },
])

const App = () => {
  const state = store.getState()
  const completeTask = (id) => {
    store.dispatch({
      type: 'task/completed',
      payload: {
        id,
      },
    })

    console.log(store.getState())
  }
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((item) => (
          <li key={item.id}>
            <p>{item.description}</p>
            <p>Completed: {String(item.completed)}</p>
            <button onClick={() => completeTask(item.id)}>Complete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
