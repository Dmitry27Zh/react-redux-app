import * as actions from './actionTypes'

export const taskCompleted = (id) => {
  return {
    type: actions.taskUpdated,
    payload: {
      id,
      completed: true,
    },
  }
}

export const descriptionChanged = (id) => {
  return {
    type: actions.taskUpdated,
    payload: {
      id,
      description: `New Title for id:${id}`,
    },
  }
}

export const taskRemoved = (id) => {
  return {
    type: actions.taskRemoved,
    payload: {
      id,
    },
  }
}
