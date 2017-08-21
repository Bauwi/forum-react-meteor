import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data'
import moment from 'moment'

export class TopicListItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { topic } = this.props
    return(
      <div onClick={() => {this.props.Session.set('selectedTopicId', this.props.topic._id)}}>
        <div className="item">
          <h3 className="item__title">{topic.title.split('').slice(0,40).join('').trim() + '...'}</h3>
          <div className="item__subtitle">
            <p className="item__subtitle--username">{topic.username}</p>
            <p className="item__subtitle--lastup">last: {moment(topic.lastUpdate).format('HH:mm:ss')}</p>
          </div>
        </div>
      </div>
    )
  }
}

TopicListItem.propTypes = {
  topic: propTypes.object.isRequired,
  Session: propTypes.object.isRequired
}

export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('Meteor.users.favTopics')
  return {
    Session
  }
}, TopicListItem)
