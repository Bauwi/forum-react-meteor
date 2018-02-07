import React, { Component } from 'react'
import { Session } from 'meteor/session'

export default class EditorToggler extends Component {
  handleClick () {
    const isReplyOpen = Session.get('isReplyOpen')
    Session.set('isReplyOpen', !isReplyOpen)
    console.log(Session.get('isReplyOpen'))
  }

  render () {
    return(
      <div className="editor__toggler">
        <button
          onClick={this.handleClick.bind(this)}
          className="btn btn-1 btn-1c">
          <i className="fa fa-reply"></i>
        </button>
      </div>
    )
  }
}
