import {Map} from 'immutable'
import _ from 'lodash'

let userCount = 0
let groupCount = 2
const initialState = Map({
  auth: false,
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
  ]
})

function setState (state, newState) {
  return state.merge(newState)
}

function getAuth (state) {
  return state.set('auth', true)
}

function addUser (state, user, group) {
  const newUser = {
    id: userCount,
    name: user,
    groups: []
  }
  newUser.groups.push(group)
  userCount++
  return state.update('users', users => users.concat(newUser))
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
    id: groupCount,
    name: group,
    members: []
  }
  groupCount++
  return state.update('groups', groups => groups.concat(newGroup))
}

function addUserToGroup (state, user, group) {
  const groups = state.get('groups')
  let newUsers = []
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
    case 'BEFORE_DELETE_USER':
      return cleanUpUserHistory(state, action.user)
    case 'DELETE_USER':
      return deleteUser(state, action.user)
    case 'ADD_GROUP':
      return addGroup(state, action.group)
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
  }
  return state
}
