import React, { Component } from 'react'

import UserStats from './UserStats'
import FavTopicsList from './Sidebar/FavTopicsList'
import PinTopicsList from './Sidebar/PinTopicsList'

export default class UserPanel extends Component {

  render() {

    return(
      <div>
        <UserStats />
        <FavTopicsList />
        <PinTopicsList />
      </div>
    )
  }
}
