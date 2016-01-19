import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import * as actionCreators from '../../action_creators'

export const Home = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {},

  render () {
    return (
      <div>Hello world</div>
    )
  }
})

function mapStateToProps (state) {
  return {}
}

export const HomeContainer = connect(mapStateToProps, actionCreators)(Home)
