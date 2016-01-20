export const localStorageMiddleware = store => next => action => {
  const currentState = store.getState()
  console.log(currentState)
  localStorage.setItem('currState', JSON.stringify(currentState))
  return next(action)
}
