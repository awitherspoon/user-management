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

  render () {
    let display
    this.props.auth ? display = <div style={{fontSize: 32}}>Hello World</div> : display = <RaisedButton label='Login' secondary={true} onClick={this.props.getAuth}/>
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
