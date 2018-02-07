import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session'

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Profile from '../ui/Profile/Profile'


const onEnterTopicPage = (nextState) => {
  Session.set('onProfile', false)
  Session.set('onHome', false)
  Session.set('onMessenger', false)

  Session.set('selectedTopicId', nextState.params.id)
}
const onLeaveTopicPage= () => {
  Session.set('selectedTopicId', undefined)
}

const onEnterProfilePage = (nextState) => {
  //
  Session.set('selectedTopicId', undefined)
  Session.set('onHome', false)
  Session.set('onMessenger', false)

  Session.set('onProfile', true)
};
const onLeaveProfilePage = () => {
  Session.set('onProfile', false)
}

const onEnterHomePage = (nextState) => {

  Session.set('selectedTopicId', undefined)
  Session.set('onProfile', false)
  Session.set('onMessenger', false)

  Session.set('onHome', true)
};
const onLeaveHomePage = () => {
  Session.set('onHome', false)
}

const onEnterMessengerPage = (nextState) => {

  Session.set('selectedTopicId', undefined)
  Session.set('onProfile', false)
  Session.set('onHome', false)

  Session.set('onMessenger', true)
}
const onLeaveMessengerPage = () => {

  Session.set('onMessenger', false)
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard/home');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const globalOnchange = (prevState, nextState) => {
  globalOnEnter(nextState)
}
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1]
  Session.set('currentPagePrivacy', lastRoute.privacy)
}
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnchange}>
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/signup" privacy="unauth" component={Signup} />
      <Route path="/dashboard" privacy="auth" component={Dashboard} >
        <Route path="/dashboard/:id/:page" privacy="auth" component={Dashboard} onEnter={onEnterTopicPage}  onLeave={onLeaveTopicPage}/>
        <Route path="/dashboard/home" privacy="auth" component={Dashboard} onEnter={onEnterHomePage} onLeave={onLeaveHomePage}/>
        <Route path="/dashboard/profile" privacy="auth" component={Dashboard} onEnter={onEnterProfilePage} onLeave={onLeaveProfilePage}/>
        <Route path="/dashboard/messenger" privacy="auth" component={Dashboard} onEnter={onEnterMessengerPage} onLeave={onLeaveMessengerPage}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
