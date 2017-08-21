import React, {Component} from 'react'
import Modal from 'react-modal'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

export default class AddTopic extends Component {
  constructor(props) {
    super(props)
    this.state ={
      isOpen: false
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  onAdd(e) {
    e.preventDefault()
    let title = this.refs.title.value.trim()
    let content = this.refs.content.value.trim()
    let username = Meteor.user().username
    console.log(username)

    Meteor.call('topics.insert', title, content, username, (err, res ) => {
      if(res) {
        Session.set('selectedTopicId', res)
      }
    })

    this.handleModalClose()
  }

  handleModalClose(){
    this.setState({
      isOpen: false
    })
  }

  render () {
    return (
      <div>
        <button className="button button--secondary" onClick={() => this.setState({isOpen: true})}>New Topic</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="New Topic"
          onRequestClose={this.handleModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h3>New Topic</h3>
          <input type="text" name="title" ref="title" placeholder="Title" />
          <input type="text" name="content" ref="content" placeholder="Content"/>
          <button className="button button--pill button--warning" onClick={this.onAdd}>create</button>
          <button className="button button--pill" onClick={this.handleModalClose}>Cancel</button>

        </Modal>
      </div>
    )
  }
}
