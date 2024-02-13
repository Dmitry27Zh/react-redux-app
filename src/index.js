import React from 'react'
import ReactDOM from 'react-dom/client'

const createStore = (initialState) => {
  const state = initialState

  return {
    getState() {
      return state
    },
  }
}

const store = createStore([{ id: 1, description: 'Task 1', completed: false }])

const App = () => {
  return <h1>App</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
