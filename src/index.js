import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import createStore from './store/store'
import { taskCompleted, taskRemoved, descriptionChanged, thunkDemo, getTasks } from './store/tasks'
import { Provider, useSelector } from 'react-redux'

const store = createStore()

const App = () => {
  const state = useSelector((state) => state)
  useEffect(() => {
    store.dispatch(getTasks())
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
