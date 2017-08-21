import React, { Component } from 'react'
import {createContainer} from 'react-meteor-data'
import { Session } from 'meteor/session'
import propTypes from 'prop-types'
import moment from 'moment'

export class PinTopicsListItem extends Component{
  render() {
    const { pinTopic } = this.props
    return(
      <div
        onClick={() => {this.props.Session.set('selectedTopicId', this.props.pinTopic[0]._id)}}
        className="item-container">
        <div className="item item--pins">
          <h3 className="item__title">{pinTopic[0].title.split('').slice(0,40).join('').trim() + '...'}</h3>
          <div className="item__subtitle">
            <p className="item__subtitle--username">{pinTopic[0].username}</p>
            <p className="item__subtitle--lastup">last: {moment(pinTopic[0].lastUpdate).format('HH:mm:ss')}</p>
          </div>
        </div>
      </div>
    )
  }
}

PinTopicsListItem.propTypes = {
  pinTopic: propTypes.array.isRequired,
  Session: propTypes.object.isRequired
}

export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('Meteor.users.favTopics')
  return {
    Session
  }
}, PinTopicsListItem)
