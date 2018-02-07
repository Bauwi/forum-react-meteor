import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

export default class ProfileInfoAvatar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  handleModalClose(){
    this.setState({
      isOpen: false
    })
  }

  renderUpdatebtn(){
    if(this.props.userId === Meteor.userId()){
      return(
        <p
          className="profile__info__avatar--btn"
          onClick={() => this.setState({isOpen: !this.state.isOpen})}>
          <i className="fa fa-pencil"></i>
        </p>
      )
    } else {
      return ""
    }
  }

  onUpdate() {
    let avatar = this.refs.avatar.value.trim()
    Meteor.call('users.updateAvatar', Meteor.userId(), avatar)
  }

  render() {
    return(
        <div className="profile__info__avatar">

          {this.renderUpdatebtn()}

          <img src={this.props.avatar} className="profile__info__avatar--img" />

        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Avatar"
          onRequestClose={this.handleModalClose}
          className="boxed-view__avatar"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <input type="text" name="avatar" ref="avatar" placeholder="New Avatar" />
          <button className="button button--pill button--warning" onClick={this.onUpdate}>create</button>
          <button className="button button--pill" onClick={this.handleModalClose}>Cancel</button>

        </Modal>

      </div>
    )
  }
}
