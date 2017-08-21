import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import {Topics} from '../api/topics'
import FavTopicsListItem from './FavTopicsListItem'

export class FavTopicsList extends Component {
  renderFavTopics() {
    let favTopicsList = []
    if(!this.props.dataLoading){
      favTopicsList = Meteor.user().favTopics.map(favTopicId => {
        return Topics.find({_id: favTopicId}).fetch()
      })

    }
    return favTopicsList.map((favTopic, i) => {
        if(favTopic.length !== 0){
          return <FavTopicsListItem key={favTopic[0]._id} favTopic={favTopic} />
        }
    })
  }

  render() {
    return(
      <div>
        <h5>Favorite Topics</h5>
        {this.renderFavTopics()}
      </div>
    )
  }
}

export default createContainer(() => {
  var handle = Meteor.subscribe('users')
  return {
    dataLoading: !handle.ready() || !Meteor.user(),
  }
}, FavTopicsList)
