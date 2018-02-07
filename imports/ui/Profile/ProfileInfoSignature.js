import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

export default class ProfileInfoSignature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      signature: ''
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  handleModalClose(){
    this.setState({
      isOpen: false
    })
  }

  onUpdate() {
    let signature = this.state.signature
    this.setState({isOpen: !this.state.isOpen})
    Meteor.call('users.updateSignature', Meteor.userId(), signature)
  }

  renderUpdatebtn(){
    if(this.props.userId === Meteor.userId()){
      return(
        <p
          className="profile__info__signature--btn"
          onClick={() => this.setState({isOpen: !this.state.isOpen})}>
          <i className="fa fa-pencil"></i>
        </p>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderUpdatebtn()}
        <blockquote>
          {this.props.signature ? this.props.signature : <p className="profile--empty">add a signature!</p>}
        </blockquote>

        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Signature"
          onRequestClose={this.handleModalClose}
          className="boxed-view__signature"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h2>Update your signature</h2>
          <p>{this.state.signature.length} / 140</p>
          <textarea
            type="text"
            name="signature"
            ref="signature"
            placeholder="New Signature"
            onChange={() => this.setState({signature: this.refs.signature.value.trim()})}
          />
          <button className="button button--pill button--warning" onClick={this.onUpdate}>update</button>
          <button className="button button--pill" onClick={this.handleModalClose}>Cancel</button>

        </Modal>

      </div>
    )
  }
}
