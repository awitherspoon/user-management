import React from 'react'
import {TextField, RaisedButton} from 'material-ui'
import {GroupList} from './GroupList'

export const GroupsInput = React.createClass({
  // TODO: nested verification
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
  _disableErrorText (disable) {
    if (this.state.floatingErrorText !== false && disable) {
      this.setState({floatingErrorText: false})
    }
    if (!disable) {
      this.setState({floatingErrorText: 'Group name is required'})
    }
  },
  _handleInputChange (e) {
    e.target.value ? this._disableErrorText(true) : this._disableErrorText(false)
    this.inputValue = e.target.value
    this._handleSubmitDisabled(e.target.value)
  },
  _handleDropdownChange (e, index, value) {
    this.setState({dropdownValue: value, selectedUser: e.target.innerHTML})
    this._handleSubmitDisabled()
  },
  _handleSubmitDisabled (v) {
    if (v.length && this.state.disabled !== false) {
      this.setState({disabled: false})
    }
    if (!v.length) {
      this.setState({disabled: true})
    }
  },
  _addNewGroup () {
    /* HACK: holding the input value in state is causing endless re-rendering
    sluggishness from Material-UI, this should be worked out a different way.
     - Andrew */
    this.props.createGroup(this.inputValue)
    this.inputValue = ''
    this.setState({floatingErrorText: 'Name is Required', disabled: true})
  },

  render () {
    return (
      <div>
        <div className='add-group-form'>
          <TextField errorText={this.state.floatingErrorText} floatingLabelText='Name' onChange={this._handleInputChange} />
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
