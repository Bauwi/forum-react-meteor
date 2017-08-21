import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import {Topics} from '../api/topics'
import PinTopicsListItem from './PinTopicsListItem'

export class PinTopicsList extends Component {
  renderPinTopics() {
    let pinTopicsList = []
    if(!this.props.dataLoading){
      pinTopicsList = Meteor.user().pinTopics.map(pinTopicId => {
        return Topics.find({_id: pinTopicId}).fetch()
      })

    }
    return pinTopicsList.map((pinTopic, i) => {
        if(pinTopic.length !== 0){
          return <PinTopicsListItem key={pinTopic[0]._id} pinTopic={pinTopic} />
        }
    })
  }

  render() {
    return(
      <div className="page-content__sidebar__pin-topic-list">
        {this.renderPinTopics()}
      </div>
    )
  }
}

export default createContainer(() => {
  var handle = Meteor.subscribe('users')
  return {
    dataLoading: !handle.ready() || !Meteor.user(),
  }
}, PinTopicsList)
