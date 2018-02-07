import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import { Topics } from '../api/topics'
// import { users } from '../api/users'
import ClassicListItem from './ClassicListItem'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: "all"
    }
  }

  renderAllTopics () {
    const allTopics = this.props.topics.slice(0, 19)
    return allTopics.map( topic => {
      return <ClassicListItem key={topic._id} topic={topic} />
    })
  }

  renderPopularTopics () {
    if(this.props.followedUsersTopics){
      return this.props.followedUsersTopics.map( topic => {
        return <ClassicListItem key={topic._id} topic={topic} />
      })
    }
  }

  renderInvolvedTopics () {
    if(this.props.involved){
      participatingTopics = Meteor.user().participatingTopicId.map(participatingTopicId => {
        return Topics.find({_id: participatingTopicId}).fetch()
      })
      return participatingTopics.map( topic => {
        return <ClassicListItem key={topic[0]._id} topic={topic[0]} />
      })
    }
  }

  renderMain() {
    if(this.state.status === "all"){
      return this.renderAllTopics()
    } else if (this.state.status === "popular") {
      return this.renderPopularTopics()
    } else if(this.state.status === "involved") {
      return this.renderInvolvedTopics()
    }
  }

  render () {
    console.log(window.innerWidth)
    const allClassname = this.state.status === "all" ? "home__bar__item home__bar__item--selected" : "home__bar__item"
    const popularClassname = this.state.status === "popular" ? "home__bar__item home__bar__item--selected" : "home__bar__item"
    const involvedClassname = this.state.status === "involved" ? "home__bar__item home__bar__item--selected" : "home__bar__item"

    return (
      <div className="home">
        <section className="home__bar">
          <h4
            className={allClassname}
            onClick={() => this.setState({status: 'all'})}
            >
              All</h4>
          <h4
            className={popularClassname}
            onClick={() => this.setState({status: "popular"})}
            >
              Followed Users</h4>
          <h4
            className={involvedClassname}
            onClick={() => this.setState({status: "involved"})}  >
            Participating</h4>
        </section>
        <section className="classic__list">{this.renderMain()}</section>

      </div>
    )
  }
}


export default createContainer (() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('topics')
  Meteor.subscribe('users')
  const user = Meteor.users.find({_id: Meteor.userId()}, {}).fetch()
  return {
    topics: Topics.find({}, {
      sort: {
        lastUpdate: -1
      }
    }).fetch(),
     involved: user[0] ? user[0].participatingTopicId : undefined,
     followedUsersTopics: Topics.find({}, {
       sort: {
         lastUpdate: -1
       }
     }).fetch().filter(topic => {
       return user[0].profileInfo.following.includes(topic.authorId)
     })
  }
}, Home)
