import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'
import Modal from 'react-modal'

import ProfileSocialFollowing from './ProfileSocialFollowing'

export class ProfileSocial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  renderFollowing() {
    let following = []
    if(this.state.isOpen) {
      following = this.props.following
    } else {
      following = this.props.following.slice(0, 8)
    }

    if(following.length !==0) {
      return following.map(element => {
        return <ProfileSocialFollowing key={element._id} following={element} />
      })
    } else {
      return <p className="profile--empty">{`${this.props.user ? this.props.user.username : "" } is not following anyone yet`}</p>
    }

  }

  handleModalClose(){
    this.setState({
      isOpen: false
    })
  }

  render() {
    return(
      <div>
        <h4>Following ({this.props.following ? this.props.following.length : "loading"})</h4>
        <ul className="profile__social__following">
          {this.renderFollowing()}
        </ul>
        <p
          className="profile__social--seeAll"
          onClick={() => this.setState({isOpen: !this.state.isOpen})}
          >
            {this.props.following.length >= 8 ? "Check all" : ""}
        </p>
        <section>
          <h4>Badges</h4>
          <p className="profile--empty">Show me your badges</p>
        </section>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Following"
          onRequestClose={this.handleModalClose}
          className="boxed-view__following"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <ul className="profile__social__following">
            {this.renderFollowing()}
          </ul>
          <button className="button button--pill" onClick={this.handleModalClose}>Cancel</button>

        </Modal>
      </div>
    )
  }
}

export default createContainer(props => {
  const subscription = Meteor.subscribe('users.profileInfo')
  const isReady = subscription.ready()
  const followingArr =  isReady ? props.user.profileInfo.following : ""
  return {
    following: Meteor.users.find().fetch().filter(element => {
      return followingArr.includes(element._id)
    }).reverse()
  }
}, ProfileSocial)
