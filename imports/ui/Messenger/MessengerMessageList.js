import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'react-meteor-data'
import FlipMove from 'react-flip-move'

import  MessengerMessageListItem  from './MessengerMessageListItem'
import MessengerReply from './MessengerReply'

import { Messages } from '../../../imports/api/messages'

export class MessengerMessageList extends Component {

  scrollToBottom () {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessages() {
    if(this.props.discussion.length !== 0) {

      return this.props.discussion[0].messages.map( message => {
        return (

            <MessengerMessageListItem key={message.postedAt} message={message} />

        )
      })
    }
  }

  render() {
    return (
      <div>
        <div className="messenger__Message-list">
          <ul>
            <FlipMove>
              {this.renderMessages()}
              </FlipMove>
          </ul>

        <div ref={el => {this.messagesEnd = el}}></div>
        </div>


        {this.props.isDiscusionActive ? <MessengerReply discussion={this.props.discussion}/> : ''}
      </div>
    )
  }
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('messages')
  const loading = subscription.ready()
  const activeDiscussion = Session.get('activeDiscussion')
  return {
    loading,
    isDiscusionActive: !!Session.get('activeDiscussion'),
    discussion:  Messages.find({_id: activeDiscussion}).fetch()
  }
}, MessengerMessageList)
