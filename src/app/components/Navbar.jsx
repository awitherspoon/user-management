import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import * as actionCreators from '../../action_creators'

export const Navbar = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    auth: React.PropTypes.bool
  },

  render () {
    console.log(this.props.auth)
    const loggedInOptions = (
      <div className='nav-options'>
        <ul>
          <li>
            <a href='#/'>Home</a>
          </li>
          <li>
            <a href='#/users'>Users</a>
          </li>
          <li>
            <a href='#/groups'>Groups</a>
          </li>
        </ul>
      </div>
    )

    return (
      <nav className='site-nav'>
        <div className='brand'>U-Manage</div>
        {this.props.auth === true ? loggedInOptions : null}
      </nav>
    )
  }
})

function mapStateToProps (state) {
  return {
    auth: state.get('auth')
  }
}

export const NavContainer = connect(mapStateToProps, actionCreators)(Navbar)
