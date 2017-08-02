import React, {Component} from 'react'
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'

import {Messages} from '../api/messages'

export class Reply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  handleReply(e) {
    e.preventDefault()
    const topicId = Session.get('selectedTopicId')
    Meteor.call('messages.insert', topicId, this.state.message)
  }

  onChange(e) {
    this.setState({message: e.target.value})
  }

  render() {
    return(
      <div>
        <p>{this.state.message}</p>
        <input
          value={this.state.message}
          onChange={this.onChange.bind(this)}/>
        <button onClick={this.handleReply.bind(this)}>Reply</button>
      </div>
    )
  }
}

export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('messages')
  return {
    messages: Messages.find({}, {
      sort: {
        updatedAt: 1
      }
    }).fetch().map(note => {
      return {
        ...note,
        selected: (note._id === selectedTopicId)
      }
    })
  }
}, Reply)
