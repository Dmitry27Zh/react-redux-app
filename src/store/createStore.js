export const createStore = (reducer, initialState) => {
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
