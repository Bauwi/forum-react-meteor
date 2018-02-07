import React, { Component } from 'react'

export default class MessengerMessageListItem extends Component {
  render() {
    const containerClassName = this.props.message._id === Meteor.userId() ? "messenger__Message-list__item__container messenger__Message-list__item__container--right " : "messenger__Message-list__item__container"
    const contentClassName = this.props.message._id === Meteor.userId() ? "messenger__Message-list__item messenger__Message-list__item--right" : "messenger__Message-list__item"
    return (
      <div className={containerClassName}>
        <div className={contentClassName}>
          {this.props.message.body}
        </div>
      </div>
    )
  }
}
