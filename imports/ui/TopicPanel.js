import React, {Component} from 'react'

import {Reply} from './Reply'
import MessageList from './MessageList'

export default class TopicPanel extends Component {
  render() {
    return (
      <div>
        <MessageList />
        <Reply />
      </div>
    )
  }
}
