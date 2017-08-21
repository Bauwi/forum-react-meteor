import React, {Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import { Session } from 'meteor/session'
import propTypes from 'prop-types'
import FlipMove from 'react-flip-move'

import {Topics} from '../api/topics'
import TopicListItem from './TopicListItem'
import AddTopic from './AddTopic'
import PinTopicsList from './PinTopicsList'

export class TopicList extends Component {

  renderTopics () {
    if(this.props.topics.length !== 0){
      return (
        this.props.topics.map(topic => {
          return <TopicListItem key={topic._id} topic={topic} />
        })
      )
    }
  }

  render(){
    return(
        <div>
          <AddTopic />
          <PinTopicsList />
          <FlipMove duration={750} easing="ease-out">
            {this.renderTopics()}
          </FlipMove>
        </div>
    )
  }
}

Topics.propTypes = {
  topics: propTypes.array.isRequired
}

export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('topics')
  Meteor.subscribe('topics')
  return {
    topics: Topics.find({}, {
      sort: {
        lastUpdate: -1
      }
    }).fetch().map(topic => {
      return {
        ...topic,
        selected: (topic._id === selectedTopicId)
      }
    })
  }
}, TopicList)
