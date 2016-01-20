import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import * as actionCreators from '../../action_creators'
import {UsersInput} from './UsersInput'
import {UserTable} from './UserTable'
import _ from 'lodash'

export const Users = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    createUser: React.PropTypes.func,
    deleteUser: React.PropTypes.func,
    groups: React.PropTypes.array,
    users: React.PropTypes.array
  },

  _deleteUser (id) {
    this.props.deleteUser(id)
  },

  render () {
    let groupOptions = []
    for (let obj in this.props.groups) {
      groupOptions.push(this.props.groups[obj].name)
    }

    return (
      <div>
        <div className='add-user-form'>
          <h2>Add New User</h2>
          <UsersInput groupOptions={groupOptions} createUser={this.props.createUser} />
        </div>
        <div className='user-list'>
          <UserTable users={this.props.users} deleteUser={this._deleteUser} />
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    users: state.get('users'),
    groups: state.get('groups')
  }
}

export const UsersContainer = connect(mapStateToProps, actionCreators)(Users)
