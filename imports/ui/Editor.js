import React from 'react'
import ReactDOM from 'react-dom'
import ReactQuill from 'react-quill'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

export class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
  }

  handleReply(e) {
    e.preventDefault()
    const topicId = Session.get('selectedTopicId')
    Meteor.call('topics.addMessage', topicId, this.state.editorHtml, Meteor.user().username)
    Meteor.call('users.upMessageCount', Meteor.userId())
    if(!this.props.isAlreadyParticipating) {
      Meteor.call('users.updateParticipatingTopics', Meteor.userId(), this.props.Session.get('selectedTopicId'))
    }

    this.setState({
      editorHtml: ''
    })
    Session.set('isReplyOpen', false)
  }

  handleClose() {
    Session.set('isReplyOpen', false)
  }
  // onBlur() {
  //   Session.set('isReplyOpen', false)
  // }

  render() {
    // console.log(this.props.isAlreadyParticipating)
    return (
      <div className="reply__content">
          <div className="reply__content__input">
            <ReactQuill
              theme="snow"
              onChange={this.handleChange}
              value={this.state.editorHtml}
              modules={Editor.modules}
              formats={Editor.formats}
              // onBlur={this.onBlur}
              bounds={'.app'}
              placeholder={this.props.placeholder}
             />
          </div>
          <div className="reply__content__buttons">
            <button
              onClick={this.handleClose}
              className="reply__content__buttons--close"
              >
              X
            </button>
            <button
              className="btn btn-1-black btn-1c-black"
              onClick={this.handleReply.bind(this)}>
              <i className="fa fa-reply"></i>
            </button>
          </div>
      </div>
    );
  }
}
<button>Send message</button>
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}],

    ['bold', 'italic', 'underline', 'blockquote'],
    [{'list': 'ordered'}],
    ['link', 'video'],
    ['clean']
  ]
}

Editor.formats = [
  'header',
  'bold', 'italic', 'underline', 'blockquote',
  'list',
  'link', 'video',
]

Editor.propTypes = {
  placeholder: React.PropTypes.string,
}


export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('users')
  const user = Meteor.users.find({_id: Meteor.userId()}).fetch()
  return {
    Session,
    isAlreadyParticipating: user[0].participatingTopicId.includes(selectedTopicId)
  }
}, Editor)
