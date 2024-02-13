import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './store/store'
import * as actions from './store/tasks/actions'

const store = configureStore()

const App = () => {
  const [state, setState] = useState(store.getState())
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])
  const completeTask = (id) => {
    store.dispatch(actions.taskCompleted(id))
  }
  const changeDescription = (id) => {
    store.dispatch(actions.descriptionChanged(id))
  }
  const removeTask = (id) => {
    store.dispatch(actions.taskRemoved(id))
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
            <button onClick={() => removeTask(item.id)}>Remove</button>
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
