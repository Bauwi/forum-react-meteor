import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import {Topics} from '../../api/topics'

import ClassicListItem from '../ClassicListItem'

export class ProfileTopicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'recent'
    }
  }


  renderOwnTopics() {
    if(this.props.ownTopics.length !== 0 && this.props.lastTopics.length !== 0){
      console.log(this.state.status)
      let topics =[]
      if(this.state.status === 'recent'){
        topics = this.props.recent.slice(0, 5)
      } else if(this.state.status === 'top5') {
        topics = this.props.ownTopics.slice(0, 5)
      } else if(this.state.status === "all"){
        topics = this.props.ownTopics
      }
      // const topics = this.state.status === 'top10' ? this.props.ownTopics.slice(0, 10) : this.props.ownTopics
      console.log(topics.length)

        return topics.map(topic => {
          return <ClassicListItem key={topic._id} topic={topic} />
        })
    } else {
     return (<p className="profile--empty">No activity yet</p>)
   }
  }



  render() {
    return (
      <div className="classic__list profile__topic-list">
        <nav>
          <ul>
            <li onClick={() => this.setState({status: 'recent'})}>Recent</li>
            <li onClick={() => this.setState({status: 'top5'})}>Top 5</li>
            <li onClick={() => this.setState({status: 'all'})}>All</li>
          </ul>
        </nav>
        {this.renderOwnTopics()}
      </div>
    )
  }
}


export default createContainer(props => {
  const subscription = Meteor.subscribe('users')
  const isReady = subscription.ready()
  Meteor.subscribe('topics')
  const userId = props.user ? props.user._id : ''
  const participatingTopicId = isReady ? props.user.participatingTopicId : ''
  const ownTopics = Topics.find({authorId: userId}, {
    sort: {
      messages: -1
    }
  }).fetch()
  const topTopics = Meteor.users.find({_id: userId}).fetch()
  return {
    ownTopics,
    recent: Topics.find({
      messages: {
        $elemMatch : {
          userId
        }
      }
    }).fetch(),
    lastTopics: isReady ? Topics.find().fetch().filter(topic => participatingTopicId.includes(topic._id)) : []
  }
}, ProfileTopicList)
