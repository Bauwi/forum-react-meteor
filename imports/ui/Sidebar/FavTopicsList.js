import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import {Topics} from '../../api/topics'
import TopicListItem from './TopicListItem'

export class FavTopicsList extends Component {
  renderFavTopics() {
    let favTopicsList = []
    if(!this.props.dataLoading){
      favTopicsList = Meteor.user().favTopics.map(favTopicId => {
        return Topics.find({_id: favTopicId}).fetch()
      }).slice(0,5)

    }
    return favTopicsList.map((favTopic, i) => {
        if(favTopic.length !== 0){
          return <TopicListItem key={favTopic[0]._id} topic={favTopic[0]} />
        }
    })
  }

  render() {
    return(
      <div className="page-content__sidebar__list">
        <h4 className="page-content__sidebar__content__mainList--title">
          <i className="fa fa-star-o"></i>
        </h4>
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
