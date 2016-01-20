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

  it('adds a user', () => {
    const initialState = Map({
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

})
