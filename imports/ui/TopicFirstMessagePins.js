import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'
import {createContainer} from 'react-meteor-data'
import { Session } from 'meteor/session'

export class TopicFirstMessagePins extends Component {
  handleFavTopic() {
    const selectedTopicId = Session.get('selectedTopicId')
    if(!this.props.isFavTopic) {
      Meteor.call('users.addFavTopic', Meteor.user()._id, selectedTopicId)
     }
     else {
      Meteor.call('users.removeFavTopic', Meteor.user()._id, this.props.Session.get('selectedTopicId') )
    }
  }

  handlePinTopic() {
    const selectedTopicId = Session.get('selectedTopicId')
    if(!this.props.isPinTopic) {
      Meteor.call('users.addPinTopic', Meteor.user()._id, selectedTopicId)
     }
     else {
      Meteor.call('users.removePinTopic', Meteor.user()._id, this.props.Session.get('selectedTopicId') )
    }
  }

  render() {
    const favClassname = !this.props.isFavTopic ? "fa fa-star-o post__message post__message--pins is-not-fav-topic" : "fa fa-star post__message post__message--pins is-fav-topic"
    const pinClassname = !this.props.isPinTopic ? "fa fa-thumb-tack post__message post__message--pins is-not-fav-topic" : "fa fa-thumb-tack post__message post__message--pins is-fav-topic"

    return(
      <div>
        <div>
          <i className={favClassname} onClick={this.handleFavTopic.bind(this)}></i>
          <i className={pinClassname} onClick={this.handlePinTopic.bind(this)}></i>
        </div>
      </div>
    )
  }
}
export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('Meteor.users.favTopics')
  return {
    Session,
    isFavTopic: Meteor.users.findOne({favTopics: selectedTopicId}) ? true : false,
    isPinTopic: Meteor.users.findOne({pinTopics: selectedTopicId}) ? true : false
  }
}, TopicFirstMessagePins)
