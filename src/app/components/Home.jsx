import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import * as actionCreators from '../../action_creators'
import {RaisedButton} from 'material-ui'

export const Home = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    auth: React.PropTypes.bool,
    getAuth: React.PropTypes.func
  },

  _getAuth () {
    this.props.getAuth()
  },

  render () {
    let display
    this.props.auth ? display = 'Hello World' : display = <RaisedButton label='Login' success={true} onClick={this._getAuth}/>
    return (
      <div className='home'>
        <div className='title'>{display}</div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    auth: state.get('auth')
  }
}

export const HomeContainer = connect(mapStateToProps, actionCreators)(Home)
