import React from 'react'
import {TextField, DropDownMenu, MenuItem, RaisedButton} from 'material-ui'

export const UsersInput = (props) => {
  const errorText = props.floatingErrorText ? props.errorText : props.floatingErrorText
  const inputValue = props.floatingErrorText ? '' : props.inputValue

  return (
    <div>
      <div>
        <TextField
          value={inputValue}
          errorText={errorText}
          floatingLabelText='Name'
          onChange={props.handleInputChange} />
        <h4>Group</h4>
        <DropDownMenu style={{minWidth: 320}} value={props.dropdownValue} onChange={props.handleDropdownChange}>
          {
            props.groupOptions.map((g) => {
              return <MenuItem key={g} value={g} primaryText={g}/>
            })
          }
        </DropDownMenu>
      </div>
      <RaisedButton style={{marginTop: 25}}
                    label='Submit'
                    primary={true}
                    disabled={props.disabled}
                    onClick={props.createNewUser} />
    </div>
  )
}
