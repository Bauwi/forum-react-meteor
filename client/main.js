import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router'

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy')


  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const pageNumber = Session.get('currentPageNumber')
  if(selectedTopicId){
    browserHistory.replace(`/dashboard/${selectedTopicId}/${pageNumber}`)
  }
})

Tracker.autorun(() => {
  const onProfile = Session.get('onProfile')
  if(onProfile){
    browserHistory.replace(`/dashboard/profile`)
  }
  const onHome = Session.get('onHome')
  if(onHome){
    browserHistory.replace(`/dashboard/home`)
  }
  const onMessenger = Session.get('onMessenger')
  if(onMessenger){
    browserHistory.replace('/dashboard/messenger')
  }
})


Tracker.autorun(() => {
const onTopic = !!Session.get('selectedTopicId')
const onHome = Session.get('onHome')
const onProfile = Session.get('onProfile')
const onMessenger = Session.get('onMessenger')
  if(onTopic) {
    Session.set('location', 'onTopic')
  } else if(onHome) {
    Session.set('location', 'onHome')
  } else if(onProfile) {
    Session.set('location', 'onProfile')
  } else if(onMessenger) {
    Session.set('location', 'onMessenger')
  }
})



Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen')
  const isPagOpen = !(Session.get('onHome') || Session.get('onProfile') || Session.get('onMessenger'))

  document.body.classList.toggle('is-nav-open', isNavOpen)
  document.body.classList.toggle('is-pag-open', isPagOpen)
})

Meteor.startup(() => {
  Session.set('selectedTopicId', undefined)
  Session.set('isNavOpen', true)
  Session.set('currentPageNumber', 1)
  Session.set('isReplyOpen', false)
  Session.set('onProfile', false)
  Session.set('onHome', true)
  Session.set('onMessenger', false)
  Session.set('location', '')
  Session.set('onSearch', false)
  Session.set('activeDiscussion', undefined)
  ReactDOM.render(routes, document.getElementById('app'));
});
