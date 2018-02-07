import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data'

import CalendarDate from '../CalendarDate'

export class TopicListItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    // this.shortenTopicTitle = this.shortenTopicTitle.bind(this)
  }

  handleClick() {
    this.props.Session.set('selectedTopicId', this.props.topic._id)
    this.props.Session.set('currentPageNumber', 1)
    this.props.Session.set('onHome', false)
    this.props.Session.set('onProfile', false)
    this.props.Session.set('onMessenger', false)

  }

  shortenTopicTitle() {
    const { title } = this.props.topic
    if(title.length < 35) {
      return title
    } else {
      return title.split('').slice(0, 35).join('').trim() + "..."
    }
  }

  render() {
    const { topic } = this.props
    const itemClassName = this.props.Session.get('selectedTopicId') === topic._id ? "item item--selected" : "item"

    return(
      <div onClick={this.handleClick}>
        <div className={itemClassName}>
          <h3 className="item__title">{this.shortenTopicTitle()}</h3>
          <div className="item__subtitle">
            <p className="item__subtitle--username">{topic.username}</p>
            <CalendarDate  styling="item__subtitle--lastup" date={topic.lastUpdate}/>
          </div>
        </div>
      </div>
    )
  }
}

TopicListItem.propTypes = {
  topic: propTypes.object.isRequired,
  Session: propTypes.object.isRequired
}

export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('users')
  return {
    Session
  }
}, TopicListItem)
