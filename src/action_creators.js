// import request from 'superagent' -- ajax library

export function setState (state) {
  return {
    type: 'SET_STATE',
    state
  }
}

export function getAuth () {
  return {
    type: 'GET_AUTH'
  }
}

export function addUser (user, group) {
  return {
    type: 'ADD_USER',
    user,
    group
  }
}

export function removeUser (user) {
  return {
    type: 'DELETE_USER',
    user
  }
}

export function cleanUpUserHistory (user) {
  return {
    type: 'BEFORE_DELETE_USER',
    user
  }
}

export function addGroup (group) {
  return {
    type: 'ADD_GROUP',
    group
  }
}

export function deleteGroup (group) {
  return {
    type: 'DELETE_GROUP',
    group
  }
}

export function addToGroup (user, group) {
  return {
    type: 'ADD_USER_TO_GROUP',
    user,
    group
  }
}

export function addGroupToUser (group, user) {
  return {
    type: 'ADD_GROUP_TO_USER',
    group,
    user
  }
}

export function removeFromGroup (user, group) {
  return {
    type: 'REMOVE_USER_FROM_GROUP',
    user,
    group
  }
}

export function removeGroupFromUser (group, user) {
  return {
    type: 'REMOVE_GROUP_FROM_USER',
    group,
    user
  }
}

// Theoretical API calls
// New user to DB (api/create_user:{userData})
export function createUser (user, group) {
  return dispatch => {
    dispatch(addUser(user, group))
    dispatch(addToGroup(user, group))
  }
}
// New group to DB (api/create_group:{groupData})
export function createGroup (group) {
  return dispatch => {
    console.log(group)
    dispatch(addGroup(group))
  }
}
// Add user to group in DB (api/add_to_group:{someData})
export function addUserToGroup (user, group, noSplit) {
  return dispatch => {
    const userId = parseInt(user)
    user = user.replace(/[0-9]/g, '').trim()
    console.log(user)
    dispatch(addToGroup(user, group))
    dispatch(addGroupToUser(group, userId))
  }
}

export function deleteUser (user) {
  return dispatch => {
    dispatch(cleanUpUserHistory(user))
    dispatch(removeUser(user))
  }
}

export function removeUserFromGroup (user, ids) {
  return dispatch => {
    const theseIds = ids.split(' ')
    dispatch(removeFromGroup(user, theseIds[0]))
    dispatch(removeGroupFromUser(theseIds[0], theseIds[1]))
  }
}
/* ...and so on.  Each of these three functions has access to the dispatch object
by virtue of the redux-thunk middleware, which allows me to async call the backend,
await a response, and then dispatch.  Or, eagerly update with a dispatch, then call
the backend, and if there's an error roll back the store's state. */
