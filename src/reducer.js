import {Map} from 'immutable'
import _ from 'lodash'

const noStoredState = Map({
  auth: false,
  userCount: 0,
  groupCount: 2,
  users: [],
  groups: [
    {
      id: 0,
      name: 'I <3 React',
      members: []
    },
    {
      id: 1,
      name: 'Bratwürst Chompers',
      members: []
    }
  ],
  inputValue: '',
  dropdownValue: '',
  errorText: 'Name is required',
  floatingErrorText: true,
  disabled: true
})
// Get existing state from browser storage, or if !exist, use pre-made state
const initialState = generateInitialState()
function generateInitialState () {
  const stateFromStorage = JSON.parse(localStorage.getItem('currState'))
  let initialState
  stateFromStorage !== null ? initialState = Map(stateFromStorage) : initialState = noStoredState
  return initialState
}

// Inputs state management
function resetInputsState (state) {
  const reset = Map({
    inputValue: '',
    dropdownValue: '',
    floatingErrorText: true,
    disabled: true
  })
  return state.merge(reset)
}

function toggleErrorText (state, value) {
  let inputState = state.get('floatingErrorText')
  if (!inputState && value.length === 0) {
    inputState = !inputState
  }
  if (inputState && value.length > 0) {
    inputState = !inputState
  }
  return state.set('floatingErrorText', inputState)
}

function toggleDisabled (state) {
  const dropdownState = state.get('dropdownValue')
  const inputState = state.get('inputValue')
  let disabledState = state.get('disabled')
  if (inputState.length > 0 && dropdownState.length > 0 && disabledState) {
    disabledState = !disabledState
    return state.set('disabled', disabledState)
  }
  if (inputState.length === 0 && !disabledState) {
    disabledState = !disabledState
    return state.set('disabled', disabledState)
  }
  return state
}

function handleInputsValueChange (state, name, value) {
  let inputState = state.get(name)
  inputState = value
  return state.set(name, inputState)
}

// Everything else state management
function setState (state, newState) {
  return state.merge(newState)
}

function getAuth (state) {
  return state.set('auth', true)
}

function addUser (state, user, group) {
  const newUser = {
    id: state.get('userCount'),
    name: user,
    groups: []
  }
  newUser.groups.push(group)
  return state.update('users', users => users.concat(newUser))
}

function incrementId (state) {
  let currCount = state.get('userCount')
  const newCount = currCount + 1
  console.log(currCount, newCount)
  return state.set('userCount', newCount)
}

function cleanUpUserHistory (state, user) {
  const users = state.get('users')
  const removedUser = _.filter(users, u => u.id == user)
  const groups = state.get('groups')
  const newGroupsList = []
  _.forEach(groups, g => {
    _.forEach(g.members, m => {
      if (m.user == removedUser[0]['name']) {
        const user = m.user
        g.members = _.filter(g.members, u => u.user != user)
      }
    })
    newGroupsList.push(g)
  })
  return state.set('groups', newGroupsList)
}

function deleteUser (state, user) {
  const users = state.get('users')
  const newUserList = _.filter(users, u => u.id != user)
  return state.set('users', newUserList)
}

function addGroup (state, group) {
  const newGroup = {
    id: state.get('groupCount'),
    name: group,
    members: []
  }
  return state.update('groups', groups => groups.concat(newGroup))
}

function incrementGroupId (state) {
  const currCount = state.get('groupCount')
  const newCount = currCount + 1
  return state.set('groupCount', newCount)
}

function addUserToGroup (state, user, group) {
  const groups = state.get('groups')
  const newUsers = []
  _.forEach(groups, (g) => {
    if (g.id === group || g.name === group) {
      g.members = g.members.concat({user})
    }
    return newUsers.push(g)
  })
  return state.set('groups', newUsers)
}

function addGroupToUser (state, group, user) {
  const users = state.get('users')
  const groups = state.get('groups')
  const thisGroup = _.filter(groups, g => g.id == group)
  const newUsers = []
  _.forEach(users, (u) => {
    if (u.id == user) {
      u.groups = u.groups.concat(thisGroup[0].name)
    }
    newUsers.push(u)
  })
  return state.set('users', newUsers)
}

function removeUserFromGroup (state, user, group) {
  const groups = state.get('groups')
  let usersRemoved = []
  _.forEach(groups, (g) => {
    if (g.id == group) {
      g.members = _.filter(g.members, u => u.user != user)
    }
    return usersRemoved.push(g)
  })
  return state.set('groups', usersRemoved)
}

function removeGroupFromUser (state, group, user) {
  const users = state.get('users')
  const groups = state.get('groups')
  const thisGroup = _.filter(groups, g => g.id == group)
  const newUsers = []
  _.forEach(users, (u) => {
    if (u.id == user) {
      u.groups = _.filter(u.groups, g => g != thisGroup[0].name)
    }
    newUsers.push(u)
  })
  return state.set('users', newUsers)
}

function deleteGroup (state, group) {
  const groups = state.get('groups')
  const newGroupList = _.filter(groups, g => g.id != group)
  return state.set('groups', newGroupList)
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'GET_AUTH':
      return getAuth(state)
    case 'ADD_USER':
      return addUser(state, action.user, action.group)
    case 'INCREMENT_ID':
      return incrementId(state)
    case 'BEFORE_DELETE_USER':
      return cleanUpUserHistory(state, action.user)
    case 'DELETE_USER':
      return deleteUser(state, action.user)
    case 'ADD_GROUP':
      return addGroup(state, action.group)
    case 'INCREMENT_GROUP_ID':
      return incrementGroupId(state)
    case 'ADD_USER_TO_GROUP':
      return addUserToGroup(state, action.user, action.group)
    case 'ADD_GROUP_TO_USER':
      return addGroupToUser(state, action.group, action.user)
    case 'REMOVE_USER_FROM_GROUP':
      return removeUserFromGroup(state, action.user, action.group)
    case 'REMOVE_GROUP_FROM_USER':
      return removeGroupFromUser(state, action.group, action.user)
    case 'DELETE_GROUP':
      return deleteGroup(state, action.group)
    // Input state cases
    case 'RESET_INPUT_STATE':
      return resetInputsState(state)
    case 'SET_INPUT_VALUE':
    case 'SET_DROPDOWN_VALUE':
      return handleInputsValueChange(state, action.name, action.value)
    case 'TOGGLE_ERROR_TEXT':
      return toggleErrorText(state, action.value)
    case 'TOGGLE_DISABLED':
      return toggleDisabled(state)
  }
  return state
}
