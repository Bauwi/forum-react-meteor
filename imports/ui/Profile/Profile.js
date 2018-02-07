import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'

import ProfileInfo from './ProfileInfo'
import ProfileSocial from './ProfileSocial'
import ProfileTopicList from './ProfileTopicList'

export default class Profile extends Component {


  render() {
    const { user } = this.props
    return(
      <div className="profile">

        <section className="profile__top">
          <section className="profile__info">
            <ProfileInfo user={user}/>
          </section>
          <section className="profile__social">
            <ProfileSocial user={user} />
          </section>
        </section>

        <section>
          <ProfileTopicList user={user} />
        </section>
      </div>
    )
  }
}
