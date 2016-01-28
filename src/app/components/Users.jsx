import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import * as actionCreators from '../../action_creators'
import {UsersInput} from './UsersInput'
import {UserTable} from './UserTable'

export const Users = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    createUser: React.PropTypes.func.isRequired,
    deleteUser: React.PropTypes.func.isRequired,
    groups: React.PropTypes.array.isRequired,
    handleInputChange: React.PropTypes.func.isRequired,
    handleDropdownChange: React.PropTypes.func.isRequired,
    users: React.PropTypes.array.isRequired,
    inputValue: React.PropTypes.string.isRequired,
    dropdownValue: React.PropTypes.string.isRequired,
    errorText: React.PropTypes.string.isRequired,
    floatingErrorText: React.PropTypes.bool.isRequired,
    disabled: React.PropTypes.bool.isRequired
  },

  _createUser () {
    this.props.createUser(this.props.inputValue, this.props.dropdownValue)
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
          <UsersInput groupOptions={groupOptions} createNewUser={this._createUser} {...this.props} />
        </div>
        <div className='user-list'>
          <UserTable users={this.props.users} deleteUser={this.props.deleteUser} />
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    users: state.get('users'),
    groups: state.get('groups'),
    inputValue: state.get('inputValue'),
    dropdownValue: state.get('dropdownValue'),
    errorText: state.get('errorText'),
    floatingErrorText: state.get('floatingErrorText'),
    disabled: state.get('disabled')
  }
}

export const UsersContainer = connect(mapStateToProps, actionCreators)(Users)
