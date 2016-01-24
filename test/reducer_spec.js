import {List, Map, fromJS} from 'immutable'
import {expect} from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {

  it('initializes preset state', () => {
    const initialState = Map({
      users: List.of(),
      groups: List.of('group1', 'group2')
    })
    const action = {
      type: 'SET_STATE'
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      users: [],
      groups: ['group1', 'group2']
    }))
  })

  it('handles getAuth', () => {
    const initialState = Map({
      auth: false
    })
    const action = {
      type: 'GET_AUTH'
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      auth: true
    }))
  })

  it('adds a user', () => {
    const initialState = Map({
      userCount: 0,
      users: []
    })
    const action = {
      type: 'ADD_USER',
      user: 'Andrew',
      group: 'group1'
    }
    const nextState = reducer(initialState, action)
    expect(nextState.get('users')[0].name).to.equal('Andrew')
    expect(nextState.get('users')[0].id).to.equal(0)
    expect(nextState.get('users')[0].groups[0]).to.equal('group1')
  })

  it('deletes a user', () => {
    const initialState = Map({
      users: [
        {
          id: 0,
          name: 'Andrew',
          groups: ['group1']
        }
      ]
    })
    const action = {
      type: 'DELETE_USER',
      user: 0
    }
    const nextState = reducer(initialState, action)

    expect(nextState.get('users').length).to.equal(0)
  })

  it('purges deleted users from group lists', () => {
    const initialState = Map({
      users: [{ id: 0, name: 'Andrew' }],
      groups: [{ id: 0, name: 'group1', members: [{user: 'Andrew'}] }]
    })
    const action = {
      type: 'BEFORE_DELETE_USER',
      user: 0
    }
    const nextState = reducer(initialState, action)

    expect(nextState.get('groups')[0].members.length).to.equal(0)
  })

  it('adds new groups', () => {
    const initialState = Map({
      groupCount: 2,
      groups: []
    })
    const action = {
      type: 'ADD_GROUP',
      group: 'I <3 Mocha'
    }
    const nextState = reducer(initialState, action)

    expect(nextState.get('groups')).to.eql([{id: 2, name: 'I <3 Mocha', members: []}])
  })

  it('adds users to groups', () => {
    const initialState = Map({
      groups: [{id: 0, name: 'I <3 Mocha', members: []}]
    })
    const action = {
      type: 'ADD_USER_TO_GROUP',
      user: 'Andrew',
      group: 'I <3 Mocha'
    }
    const nextState = reducer(initialState, action)

    expect(nextState.get('groups')).to.eql([{id: 0, name: 'I <3 Mocha', members: [{user: 'Andrew'}]}])
  })

  it('adds groups to users', () => {
    const initialState = Map({
      users: [{id: 0, name: 'Andrew', groups: []}],
      groups: [{id: 0, name: 'I <3 React', members: []}]
    })
    const action = {
      type: 'ADD_GROUP_TO_USER',
      user: 0,
      group: 0
    }
    const nextState = reducer(initialState, action)

    expect(nextState.get('users')).to.eql([{id: 0, name: 'Andrew', groups: ['I <3 React']}])
  })

  it('removes users from groups', () => {
    const initialState = Map({
      users: [{id: 0, name: 'Andrew', groups: []}],
      groups: [{id: 0, name: 'I <3 React', members: [{user: 'Andrew'}]}]
    })
    const action = {
      type: 'REMOVE_USER_FROM_GROUP',
      user: 'Andrew',
      group: 0
    }
    const nextState = reducer(initialState, action)

    expect(nextState.get('groups')).to.eql([{id: 0, name: 'I <3 React', members: []}])
  })

  it('removes groups from users', () => {
    const initialState = Map({
      users: [{id: 0, name: 'Andrew', groups: ['I <3 React']}],
      groups: [{id: 0, name: 'I <3 React', members: []}]
    })
    const action = {
      type: 'REMOVE_GROUP_FROM_USER',
      group: 0,
      user: 0
    }
    const nextState = reducer(initialState, action)

    expect(nextState.get('users')).to.eql([{id: 0, name: 'Andrew', groups: []}])
  })

  it('deletes a group', () => {
    const initialState = Map({
      groups: [{id: 0, name: 'Bratwürst Chompers', members: []}]
    })
    const action = {
      type: 'DELETE_GROUP',
      group: 0
    }
    const nextState = reducer(initialState, action)

    expect(nextState.get('groups')).to.eql([])
  })

})
