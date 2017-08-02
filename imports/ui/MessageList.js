import React, {Component} from 'react'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'

import  { Messages }  from '../api/messages'
import  MessageListItem  from './MessageListItem'

export class MessageList extends Component {
  renderMessages () {
    const selectedTopicId = Session.get('selectedTopicId')
    if(this.props.messages.length !== 0){
      return (
        this.props.messages.map(message => {
          if(message.topicId === selectedTopicId){
            return <MessageListItem key={message._id} message={message} />
          }
        })
      )
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => console.log(this.props.messages)}>Access</button>
        {this.renderMessages()}
      </div>
    )
  }
}

Messages.propTypes = {
  messages: propTypes.array.isRequired
}

export default createContainer (() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('messages')
  return {
    messages: Messages.find({}, {
      sort: {
        updatedAt: 1
      }
    }).fetch()
  }
}, MessageList)
