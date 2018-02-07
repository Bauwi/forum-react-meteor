import React, { Component } from 'react'
import { Session } from 'meteor/session'

export default class ClassicListItem extends Component {
  handleClick() {
    Session.set('selectedTopicId', this.props.topic._id)
    Session.set('currentPageNumber', 1)
  }

  render() {
    let rankClassname = ""
    if(this.props.topic.messages.length >= 30) {
      rankClassname = "classic__list__item--rank rank-gold"
    } else if(this.props.topic.messages.length < 30 && this.props.topic.messages.length >= 15) {
      rankClassname = "classic__list__item--rank rank-silver"
    } else {
      rankClassname = "classic__list__item--rank rank-bronze"
    }
    return(
      <div
        className="classic__list__item"
        onClick={this.handleClick.bind(this)}
        >
        <div className={rankClassname}></div>
        <p className="classic__list__item--title">{this.props.topic.title}</p>
        <p className="classic__list__item--count"><i className="fa fa-comment-o"></i> {this.props.topic.messages.length}</p>
        <p className="classic__list__item--date">{this.props.topic.username}</p>
      </div>
    )
  }
}
