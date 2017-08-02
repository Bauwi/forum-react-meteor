import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router'


import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedTopicId = Session.get('selectedTopicId')

  if(selectedTopicId){
    browserHistory.replace(`/dashboard/${selectedTopicId}`)
  }
})

Meteor.startup(() => {
  Session.set('selectedTopicId', undefined)
  ReactDOM.render(routes, document.getElementById('app'));
});
