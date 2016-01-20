import React from 'react'
import {DropDownMenu, IconButton, MenuItem, RaisedButton} from 'material-ui'
import ActionGrade from 'material-ui/lib/svg-icons/action/grade'
import _ from 'lodash'

export const GroupList = React.createClass({
  propTypes: {
    addUserToGroup: React.PropTypes.func,
    deleteGroup: React.PropTypes.func,
    removeUserFromGroup: React.PropTypes.func,
    group: React.PropTypes.object,
    users: React.PropTypes.array
  },
  getInitialState () {
    return {dropdownValue: null, selectedUser: null, disabled: true}
  },
  _handleDropdownChange (e, index, value) {
    const selectedUser = value + ' ' + e.target.innerHTML
    this.setState({dropdownValue: value, selectedUser: selectedUser})
    this._handleSubmitDisabled()
  },
  _handleSubmitDisabled () {
    setTimeout(() => {
      if (this.state.dropdownValue !== null) {
        this.setState({disabled: false})
      }
    }, 60)
  },
  _addUserToGroup () {
    this.props.addUserToGroup(this.state.selectedUser, this.props.group.id, true)
    this.setState({dropdownValue: null, selectedUser: null, disabled: true})
  },
  _removeUserFromGroup (e) {
    console.log(e.target.id)
    this.props.removeUserFromGroup(e.target.innerHTML, e.target.id)
  },
  _deleteGroup () {
    this.props.deleteGroup(this.props.group.id)
  },

  render () {
    const g = this.props.group
    return (
      <div className='group-list-item'>
        <div className='group-list-title'>{g.name}</div>
        <DropDownMenu style={{minWidth: '100%'}} value={this.state.dropdownValue} onChange={this._handleDropdownChange}>
          {
            this.props.users.map(u => {
              if (_.includes(u.groups, g.name)) {
                return <MenuItem style={{display: 'none'}} key={u.id} value={u.id} primaryText='--Already In Group--' />
              }
              return (<MenuItem key={u.id} value={u.id} primaryText={u.name}/>)
            })
          }
        </DropDownMenu>
        <div className='group-list-buttons'>
          <RaisedButton style={{display: 'inline-block', marginTop: '25px'}} label='Add User' secondary={true} disabled={this.state.disabled} onClick={this._addUserToGroup} />
          {
            g.members.length < 1 ?
              <div className='group-delete-button'>
                <RaisedButton style={{display: 'inline-block', marginTop: '25px'}} label='Delete Group' primary={true} onClick={this._deleteGroup}/>
              </div> : null
          }
        </div>
        <ul>
          {
            g.members.length > 0 ? g.members.map(m => {
              return (<li key={m.user}>
                <IconButton tooltip='Click name to remove user from group' touch={true} tooltipPosition='bottom-center'>
                  <ActionGrade/>
                </IconButton>
                {
                  this.props.users.map(u => {
                    if (m.user == u.name) {
                      return (
                        <a onClick={this._removeUserFromGroup} key={u.id} id={g.id + ' ' + u.id}>{ m.user }</a>
                      )
                    }
                  })
                }
              </li>)
            }) : null
          }
        </ul>
      </div>
    )
  }
})
