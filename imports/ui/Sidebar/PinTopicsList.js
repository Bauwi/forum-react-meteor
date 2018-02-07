import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import {Topics} from '../../api/topics'
import TopicListItem from './TopicListItem'

export class PinTopicsList extends Component {
  renderPinTopics() {
    let pinTopicsList = []
    if(!this.props.dataLoading){
      pinTopicsList = Meteor.user().pinTopics.map(pinTopicId => {
        return Topics.find({_id: pinTopicId}).fetch()
      }).slice(0,5)

    }
    return pinTopicsList.map((pinTopic, i) => {
        if(pinTopic.length !== 0){
          return <TopicListItem key={pinTopic[0]._id} topic={pinTopic[0]} />
        }
    })
  }

  render() {
    return(
      <div className="page-content__sidebar__list">
        <h4 className="page-content__sidebar__content__mainList--title">
          <i className="fa fa-thumb-tack"></i>
        </h4>
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
