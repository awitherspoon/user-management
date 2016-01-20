import React from 'react'
import _ from 'lodash'
import {TextField, DropDownMenu, MenuItem, RaisedButton} from 'material-ui'
import {GroupList} from './GroupList'

export const GroupsInput = React.createClass({
  propTypes: {
    addUserToGroup: React.PropTypes.func,
    createGroup: React.PropTypes.func,
    deleteGroup: React.PropTypes.func,
    removeUserFromGroup: React.PropTypes.func,
    groups: React.PropTypes.array,
    users: React.PropTypes.array
  },

  getInitialState () {
    return {inputValue: null, floatingErrorText: 'Group name is required', disabled: true}
  },
  _handleInputChange (e) {
    e.target.value ? this.setState({floatingErrorText: false}) : this.setState({floatingErrorText: 'Group name is required'})
    this.setState({inputValue: e.target.value})
    this._handleSubmitDisabled()
  },
  _handleDropdownChange (e, index, value) {
    console.log(e.target.innerHTML)
    console.log(value)
    this.setState({dropdownValue: value, selectedUser: e.target.innerHTML})
    this._handleSubmitDisabled()
  },
  _handleSubmitDisabled () {
    setTimeout(() => {
      if (this.state.inputValue !== null) {
        this.setState({disabled: false})
      }
    }, 60)
  },
  _addNewGroup () {
    this.props.createGroup(this.state.inputValue)
    this.setState({inputValue: null, floatingErrorText: 'Name is Required', disabled: true})
  },

  render () {
    return (
      <div>
        <div className='add-group-form'>
          <TextField value={this.state.inputValue} errorText={this.state.floatingErrorText} floatingLabelText='Name' onChange={this._handleInputChange} />
          <div className='add-group-submit-button'>
            <RaisedButton style={{marginTop: '25px'}} label='Submit' secondary={true} disabled={this.state.disabled} onClick={this._addNewGroup} />
          </div>
        </div>
        <div className='group-list'>
          {
            this.props.groups.map(g => {
              return (
                <GroupList key={g.id} group={g} users={this.props.users} addUserToGroup={this.props.addUserToGroup} deleteGroup={this.props.deleteGroup} removeUserFromGroup={this.props.removeUserFromGroup}/>
              )
            })
          }
        </div>
      </div>
    )
  }
})
