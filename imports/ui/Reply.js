import React, {Component} from 'react'
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'

import Editor from './Editor'
import EditorToggler from './EditorToggler'

export class Reply extends Component {

  renderReply() {
    const isReplyOpenClassname = !this.props.isReplyOpen ? "page-content__main reply" : "page-content__main reply is-reply-open"
    if(Session.get('isReplyOpen')){
      return(
        <section className={isReplyOpenClassname}>
          {/* <Editor/> */}
          <Editor placeholder="Here is your text..."/>
        </section>
      )
    } else {
      return(
        <section className="Editor__toggler__container">
          <EditorToggler />
        </section>
      )
    }
  }

  render() {
    return (
      <div className="super-container">
        {this.renderReply()}
      </div>
    )
  }
}

export default createContainer(() => {
  const isReplyOpen = Session.get('isReplyOpen')
  return {
    isReplyOpen
  }
}, Reply)
