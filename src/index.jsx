import React from 'react'
import DOM from 'react-dom'
import Router, {Route} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import createHistory from 'history/lib/createHashHistory'
import {setState} from './action_creators'
import reducer from './reducer'
import App from './app/App'
import {HomeContainer} from 'components/Home'

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store = createStoreWithMiddleware(reducer)
// setState()

const history = createHistory({
  queryKey: false
})

const routes = <Route component={App}>
  <Route path='/' component={HomeContainer} />
</Route>

DOM.render(
  <Provider store={store}>
    <Router location='history' history={history} routes={routes}/>
  </Provider>,
  document.getElementById('app')
)
