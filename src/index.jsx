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
import {UsersContainer} from 'components/Users'
import {GroupsContainer} from 'components/Groups'
import injectTapEventPlugin from 'react-tap-event-plugin'
// import {localStorageMiddleware} from './localStorageMiddleware'

injectTapEventPlugin()
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store = createStoreWithMiddleware(reducer)
store.subscribe(() => {
  const currentState = store.getState()
  localStorage.setItem('currState', JSON.stringify(currentState))
})
setState()

const history = createHistory({
  queryKey: false
})

const routes = <Route component={App}>
  <Route path='/' component={HomeContainer} />
  <Route path='/users' component={UsersContainer} />
  <Route path='/groups' component={GroupsContainer} />
</Route>

DOM.render(
  <Provider store={store}>
    <Router location='history' history={history} routes={routes}/>
  </Provider>,
  document.getElementById('app')
)
