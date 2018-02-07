import React, { Component } from 'react'
import { createContainer } from 'react-meteor-data'

export class MessengerUsersListItem extends Component {
  renderUser() {
    if(this.props.user[0]){
      return (
        <div className="messenger__users-list__item__img-container">
          <img
            src={this.props.user[0].profileInfo.avatar}
          />
        </div>
      )
    }
  }

  render() {
    const className = this.props.discussionId === this.props.activeDiscussion ? "messenger__users-list__item messenger__users-list__item--selected" : "messenger__users-list__item"
    return(
      <div
        className={className}
        onClick={() => {
          Session.set('activeDiscussion', this.props.discussionId)
        }
      }
        >
        {this.renderUser()}
        <p>{this.props.user[0] ? this.props.user[0].username : ''}</p>
      </div>
    )
  }
}

export default createContainer((props) => {
  const subscription = Meteor.subscribe('users.profileInfo')
  const loading = subscription.ready()
  const user = Meteor.users.find({_id: props.userId}).fetch()

  return {
    loading,
    activeDiscussion: Session.get('activeDiscussion'),
    user
  }
}, MessengerUsersListItem)
