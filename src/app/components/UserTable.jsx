import React from 'react'
import {Dialog, RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui'
import _ from 'lodash'

export const UserTable = React.createClass({
  propTypes: {
    deleteUser: React.PropTypes.func,
    users: React.PropTypes.array
  },
  getInitialState () {
    return ({modalOpen: false, user: null})
  },
  _deleteUser (e) {
    this.props.deleteUser(e.target.id)
  },
  _handleModalClose () {
    this.setState({modalOpen: false, user: null})
  },
  _onRowSelection (e) {
    const thisUser = _.find(this.props.users, o => o.id == e.target.id)
    this.setState({modalOpen: true, user: thisUser})
  },
  render () {
    const actions = [
      <RaisedButton label='OK' primary={true} onClick={this._handleModalClose} />
    ]
    const currentUser = this.state.user ? this.state.user : null
    const userDialog = (currentUser
      ? <Dialog
          title={currentUser.name}
          actions={actions}
          modal={true}
          open={this.state.modalOpen}
          onRequestClose={this._handleModalClose}>
          <h3>{currentUser.name + "'s"} Groups:</h3>
          <hr/>
          {
            currentUser ? currentUser.groups.map(g => g + ' ') : null
          }
        </Dialog> : null
    )
    return (
      <div>
        {userDialog}
        <Table height={'300px'} selectable={false}>
          <TableHeader enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan='4' tooltip='User List' style={{textAlign: 'center', fontSize: '24px'}}>
                User List
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip='ID'>ID</TableHeaderColumn>
              <TableHeaderColumn tooltip='Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='Groups'>Groups</TableHeaderColumn>
              <TableHeaderColumn tooltip='Remove'>Remove</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={false}>
            {
              this.props.users ? this.props.users.map((u, index) => {
                return (
                  <TableRow rowNumber={u.id} key={u.id}>
                    <TableRowColumn>{u.id}</TableRowColumn>
                    <TableRowColumn><button id={u.id} onClick={this._onRowSelection}>{u.name}</button></TableRowColumn>
                    <TableRowColumn>{u.groups.length}</TableRowColumn>
                    <TableRowColumn><button id={u.id} onClick={this._deleteUser}>Delete</button></TableRowColumn>
                  </TableRow>
                )
              }) : null
            }
          </TableBody>
        </Table>
      </div>
    )
  }
})
