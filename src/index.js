import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'task/updated':
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

const createStore = (reducer, initialState) => {
  let state = initialState
  const listeners = []

  return {
    getState() {
      return state
    },
    dispatch(action) {
      state = reducer(state, action)
      listeners.forEach((listener) => listener(state))
    },
    subscribe(listener) {
      listeners.push(listener)
    },
  }
}

const store = createStore(taskReducer, [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: false },
])

const App = () => {
  const [state, setState] = useState(store.getState())
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])
  const completeTask = (id) => {
    store.dispatch({
      type: 'task/updated',
      payload: {
        id,
        completed: true,
      },
    })
  }
  const changeDescription = (id) => {
    store.dispatch({
      type: 'task/updated',
      payload: {
        id,
        description: `New Title for id:${id}`,
      },
    })
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
            <button onClick={() => changeDescription(item.id)}>Change title</button>
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
