import React, { Component } from 'react'

import UserStats from './UserStats'
import FavTopicsList from './FavTopicsList'
import PinTopicsList from './PinTopicsList'

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
