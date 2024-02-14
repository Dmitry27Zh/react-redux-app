import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './store/store'
import { taskCompleted, taskRemoved, descriptionChanged, thunkDemo, getTasks } from './store/tasks'

const store = configureStore()

const App = () => {
  const [state, setState] = useState(store.getState())
  useEffect(() => {
    store.dispatch(getTasks())
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])
  const completeTask = (id) => {
    store.dispatch(taskCompleted(id))
    store.dispatch(thunkDemo(id))
  }
  const changeDescription = (id) => {
    store.dispatch(descriptionChanged(id))
  }
  const removeTask = (id) => {
    store.dispatch(taskRemoved(id))
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
