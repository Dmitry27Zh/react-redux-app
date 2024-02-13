const TASK_UPDATED = 'task/updated'
const TASK_REMOVED = 'task/removed'

export const taskCompleted = (id) => {
  return {
    type: TASK_UPDATED,
    payload: {
      id,
      completed: true,
    },
  }
}

export const descriptionChanged = (id) => {
  return {
    type: TASK_UPDATED,
    payload: {
      id,
      description: `New Title for id:${id}`,
    },
  }
}

export const taskRemoved = (id) => {
  return {
    type: TASK_REMOVED,
    payload: {
      id,
    },
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case TASK_UPDATED:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload }
        } else {
          return item
        }
      })
    case TASK_REMOVED:
      return state.filter((item) => item.id !== action.payload.id)
    default:
      return state
  }
}

export default reducer
