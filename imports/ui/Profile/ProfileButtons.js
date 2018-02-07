import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'
import Modal from 'react-modal'

import { Messages } from '../../../imports/api/messages'

export class ProfileButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
  }

  handleModalClose(){
    this.setState({
      isOpen: false
    })
  }

  handleFollowClick() {
    const following = this.props.mainUser[0].profileInfo.following.includes(this.props.user._id)
    const FollowButtonText = following ? "unfollow" : 'follow'
    if(following) {
      Meteor.call("users.removeFollowing", Meteor.userId(), this.props.user._id)
    } else {
      Meteor.call("users.addFollowing", Meteor.userId(), this.props.user._id)
    }
  }

  handleMessageSubmit() {
    if(!this.props.isAlreadyDiscussingWith){
      Meteor.call("messages.newConversation", Meteor.userId(), this.props.user._id, 'bullshit text', this.props.user.username )
    } else {
      Meteor.call('messages.newMessage', Meteor.userId(), this.props.user._id, 'bullshit answer', this.props.user.username)
    }
  }

  renderButtons() {
    // const following = this.props.mainUser[0].profileInfo.following.includes(this.props.user._id)
    // const FollowButtonText = this.props.following ? "unfollow" : 'follow'
    let user = this.props.user ? this.props.user : ''
    if(user._id === Meteor.userId()){
      return ""
    } else {
      return(
        <div>
          <button
            className="button button--secondary"
            onClick={this.handleFollowClick.bind(this)}>
            {this.props.isFollowing ? "unfollow" : "follow"}
          </button>
          <button
            className="button button--secondary"
            onClick={() => this.setState({isOpen: true})}
            >
            <i className="fa fa-envelope"></i>
          </button>

          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Send Private Message"
            onRequestClose={this.handleModalClose}
            className="boxed-view__private-message"
            overlayClassName="boxed-view boxed-view--modal"
          >
            <textarea type="text"/>
            <button
              className="button button--secondary"
              onClick={this.handleMessageSubmit}
              >
                send
              </button>


          </Modal>
        </div>
      )
    }
  }

  render() {
    console.log(this.props.isFollowing)
    return(
      <footer>
        {this.renderButtons()}
      </footer>
    )
  }
}

export default createContainer((props) => {
  const subscription = Meteor.subscribe('users')
  Meteor.subscribe('messages')
  const loading = subscription.ready()
  const mainUser =  Meteor.users.find({_id: Meteor.userId()}).fetch()
  const messagesExchanged = Messages.find({
    "users": {
      $all : [props.user._id, Meteor.userId()]
    }
  }).fetch()
  return {
    mainUser,
    loading,
    messages: Messages.find().fetch(),
    isAlreadyDiscussingWith:  messagesExchanged.length !== 0,
    isFollowing: mainUser[0].profileInfo.following.includes(props.user._id)
  }
}, ProfileButtons)
