import React, {Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import { Session } from 'meteor/session'
import propTypes from 'prop-types'

import {Topics} from '../api/topics'
import TopicListItem from './TopicListItem'

export class TopicList extends Component {
  handleNewTopic(e) {
    e.preventDefault()
    Meteor.call('topics.insert', 'hola', 'chico')
  }

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
        <button onClick={this.handleNewTopic.bind(this)}>New Topic</button>
        {this.renderTopics()}
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
        updatedAt: -1
      }
    }).fetch().map(topic => {
      return {
        ...topic,
        selected: (topic._id === selectedTopicId)
      }
    })
  }
}, TopicList)
