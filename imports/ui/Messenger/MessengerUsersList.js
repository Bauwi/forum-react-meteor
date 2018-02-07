import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'
import Slider from 'react-slick'

import { Messages } from '../../../imports/api/messages'

import MessengerUsersListItem from './MessengerUsersListItem'
import MessengerUsersListNew from './MessengerUsersListNew'

export class MessengerUsersList extends Component {

  renderUsers() {
    if(!this.props.loading) {
      return this.props.discussions.map( discussion => {

        const userId = discussion.users.filter( id => {
          return id !== Meteor.userId()
        })
        return <div key={discussion._id}>
          <MessengerUsersListItem discussionId={discussion._id} userId={userId[0]} />
        </div>
      })
    }
  }

  render() {
    const settings = {
      arrows: true,
      infinite: false,
      easing: 'ease-out',
      responsive: [
        { breakpoint: 860, settings: { slidesToShow: 5 } },
        { breakpoint: 10000, settings: { slidesToShow: 8 } }],
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide: true
    }
    return(
      <div className="messenger__users-list">
        {/* <MessengerUsersListNew /> */}
        <Slider {...settings}>
          {this.renderUsers()}
        </Slider>

      </div>

    )
  }
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('messages')
  const loading = !subscription.ready()
  return {
    loading,
    discussions : Messages.find().fetch()
  }
}, MessengerUsersList)
