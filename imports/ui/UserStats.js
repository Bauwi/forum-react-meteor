import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'

import { Topics } from '../api/topics'

export class UserStats extends Component {
  render() {

    return (
      <div className="message-list-wrapper">
        <p>UserStats</p>
        <p>Join: {Meteor.user() ? moment(Meteor.user().createdAt).format('MMM Do, Y') : ''}</p>
        <p>Messages: {Meteor.user() ? Meteor.user().messageCount : ''}</p>
      </div>
    )
  }
}

export default createContainer (() => {
  Meteor.subscribe('users')

  return {
    messageCount: Meteor.user()
  }
}, UserStats)
