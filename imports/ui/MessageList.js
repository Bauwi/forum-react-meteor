import React, {Component} from 'react'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


import  { Topics }  from '../api/topics'
import  MessageListItem  from './MessageListItem'
import TopicFirstMessage from './TopicFirstMessage'


export class MessageList extends Component {
  renderMessageList () {
    if(this.props.topic.length !== 0){
      return (
        this.props.topic[0].messages.map((message) => {
            return (
                <MessageListItem key={message.id} id={message.id} message={message} />
            )
        })
      )
  }
}

  render() {
    return (

      <div className="message-list-wrapper">
          <div>
            <h3 className="post__message post__message--title">{!this.props.loading ? this.props.topic[0].title : ''}</h3>
            <TopicFirstMessage />
              {this.renderMessageList()}
            </div>
      </div>
    )
  }
}

Topics.propTypes = {
  topics: propTypes.object.isRequired
}

export default createContainer (() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const subscription = Meteor.subscribe('topics')
  const loading = !subscription.ready()
  const topic = Topics.find({_id: selectedTopicId}, {}).fetch()
  return {
    loading,
    topic
  }
}, MessageList)
