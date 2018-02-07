import React, { Component } from 'react'

export default class ProfileSocialFollower extends Component {
  render() {
    const {following} = this.props
    return(
      <li className="profile__social__following--item">
        <div className="profile__social__following--item--img-container">
          <img src={following.profileInfo.avatar} className="profile__social__following--item--img"/>
        </div>

        <p className="profile__social__following--item--username">{following.username}</p>

      </li>
    )
  }
}
