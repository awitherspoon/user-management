import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import * as actionCreators from '../../action_creators'
import {GroupsInput} from './GroupsInput'

export const Groups = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    addUserToGroup: React.PropTypes.func,
    createGroup: React.PropTypes.func,
    deleteGroup: React.PropTypes.func,
    removeUserFromGroup: React.PropTypes.func,
    groups: React.PropTypes.array,
    users: React.PropTypes.array
  },

  render () {
    return (
      <div>
        <GroupsInput groups={this.props.groups} users={this.props.users} addUserToGroup={this.props.addUserToGroup} createGroup={this.props.createGroup} deleteGroup={this.props.deleteGroup} removeUserFromGroup={this.props.removeUserFromGroup}/>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    groups: state.get('groups'),
    users: state.get('users')
  }
}

export const GroupsContainer = connect(mapStateToProps, actionCreators)(Groups)
