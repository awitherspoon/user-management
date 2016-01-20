import React from 'react'
import 'react-widgets/lib/less/react-widgets.less'
import {TextField, DropDownMenu, MenuItem, RaisedButton} from 'material-ui'

export const UsersInput = React.createClass({
  propTypes: {
    createUser: React.PropTypes.func,
    groupOptions: React.PropTypes.array
  },

  getInitialState () {
    return {dropdownValue: null, inputValue: null, floatingErrorText: 'Name is required', disabled: true}
  },

  _handleInputChange (e) {
    e.target.value ? this.setState({floatingErrorText: false}) : this.setState({floatingErrorText: 'Name is required'})
    this.setState({inputValue: e.target.value})
    this._handleSubmitDisabled()
  },
  _handleDropdownChange (e, index, value) {
    this.setState({dropdownValue: value})
    this._handleSubmitDisabled()
  },
  _handleSubmitDisabled () {
    setTimeout(() => {
      if (this.state.dropdownValue !== null && this.state.inputValue !== null) {
        this.setState({disabled: false})
      }
    }, 60)
  },
  _addNewUser () {
    this.props.createUser(this.state.inputValue, this.state.dropdownValue)
    this.setState({dropdownValue: null, inputValue: null, floatingErrorText: 'Name is Required', disabled: true})
  },

  render () {
    return (
      <div>
        <div>
          <TextField
            value={this.state.inputValue}
            errorText={this.state.floatingErrorText}
            floatingLabelText='Name'
            onChange={this._handleInputChange} />
          <h4>Group</h4>
          <DropDownMenu style={{minWidth: '320px'}} value={this.state.dropdownValue} onChange={this._handleDropdownChange}>
            {
              this.props.groupOptions.map((g) => {
                return <MenuItem key={g} value={g} primaryText={g}/>
              })
            }
          </DropDownMenu>
        </div>
        <RaisedButton style={{marginTop: '25px'}} label='Submit' primary={true} disabled={this.state.disabled} onClick={this._addNewUser} />
      </div>
    )
  }
})
