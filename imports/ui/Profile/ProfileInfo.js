import React, { Component } from 'react'
import moment from 'moment'

import ProfileInfoSignature from './ProfileInfoSignature'
import ProfileInfoAvatar from './ProfileInfoAvatar'
import ProfileButtons from './ProfileButtons'

export default class ProfileInfo extends Component {
  renderProfileInfo() {
    const {user} = this.props
    if(!user || !user.createdAt) {
      return <p>Loading...</p>
    } else {
      const days = Math.round(moment.duration(moment() - user.createdAt).asDays())
      return(
        <div>
          <ProfileButtons user={user} />
          <h2 className="profile__info__username">{user.username}</h2>
          <ProfileInfoAvatar userId={user._id} avatar={user.profileInfo.avatar} />

          <section className="profile__info__stats">
            <p>signup: {moment(user.createdAt).format('D MMM YYYY')} ({days} day(s))</p>
            <p>messages: {user.messageCount}</p>
          </section>

          <ProfileInfoSignature userId={user._id} signature={user.profileInfo.signature}/>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderProfileInfo()}
      </div>
    )
  }
}
