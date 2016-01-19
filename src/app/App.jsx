import React from 'react'

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired
  },

  render () {
    return (
      <div className='active-section'>
        {this.props.children}
      </div>
    )
  }
})
