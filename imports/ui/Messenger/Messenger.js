import React, { Component } from 'react'

import MessengerUsersList from './MessengerUsersList'
import MessengerMessageList from './MessengerMessageList'

export default class Messenger extends Component {
  render() {
    return(
      <div className="messenger">
        <MessengerUsersList />
        <MessengerMessageList />
      </div>
    )
  }
}
