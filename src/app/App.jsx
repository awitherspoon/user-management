import React from 'react'
import {NavContainer} from 'components/Navbar'
import style from 'components/styles/base'

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired
  },

  render () {
    return (
      <div>
        <NavContainer />
        <div className='active-section'>
          {this.props.children}
        </div>
      </div>
    )
  }
})
