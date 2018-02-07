import React, { Component } from 'react'
import { createContainer } from 'react-meteor-data'

export class MessengerReply extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: ''
    }
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleMessageChange(e) {
    const message = e.target.value
    this.setState({message})
  }

  handleSubmit(e) {
    e.preventDefault()
    const message = this.state.message
    Meteor.call('messages.newMessage', Meteor.userId(), this.props.alterId[0], message, this.props.alterUsername)
    this.setState({
      message:''
    })
  }

  componentDidMount() {
    this.nameInput.focus()
  }
  componentDidUpdate() {
    this.nameInput.focus()
  }

  render() {
    return(
      <div className="messenger__reply">
        <form onSubmit={this.handleSubmit}>
          <input
            className="editor__body"
            type="text"
            name="input"
            ref={ input => { this.nameInput = input}}
            value={this.state.message}
            placeholder={`answer ${this.props.alterUsername}`}
            onChange={this.handleMessageChange} />
          <button className="button button--secondary">Reply</button>
        </form>
      </div>
    )
  }
}

export default createContainer((props) =>{
  Meteor.subscribe('users.profileInfo')
  const alterId = props.discussion[0] ? props.discussion[0].users.filter(id => {
    return id !== Meteor.userId()
  }) : ''
  const alterUser = Meteor.users.find( {_id: alterId[0] }).fetch()
  return {
    alterId,
    alterUsername: alterUser[0] ? alterUser[0].username : ''
  }
}, MessengerReply)
