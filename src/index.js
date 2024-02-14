import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import createStore from './store/store'
import {
  taskCompleted,
  taskRemoved,
  titleChanged,
  thunkDemo,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
} from './store/tasks'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getError } from './store/errors'

const store = createStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadTasks())
  }, [])
  const completeTask = (id) => {
    dispatch(taskCompleted(id))
    dispatch(thunkDemo(id))
  }
  const changeTitle = (id) => {
    dispatch(titleChanged(id))
  }
  const removeTask = (id) => {
    dispatch(taskRemoved(id))
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>Completed: {String(item.completed)}</p>
            <button onClick={() => completeTask(item.id)}>Complete</button>
            <button onClick={() => changeTitle(item.id)}>Change title</button>
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
