import request from 'superagent'
import _ from 'lodash'

export function setState (state) {
  return {
    type: 'SET_STATE',
    state
  }
}
