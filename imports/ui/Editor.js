import React from 'react'
import ReactDOM from 'react-dom'
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js'

import './../../node_modules/draft-js/dist/Draft.css'

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  onChange(editorState) {

    this.setState({editorState})
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, ''))
  }

  handleReply(e) {
    e.preventDefault()
    const topicId = Session.get('selectedTopicId')
    const contentState = this.state.editorState.getCurrentContent()
    const contentJSON = JSON.stringify(convertToRaw(contentState))
    Meteor.call('topics.addMessage', topicId, contentJSON, Meteor.user().username)
    Meteor.call('users.upMessageCount', Meteor.userId())


  }

  render() {
    return (
      <div>
          <button onClick={this._onBoldClick.bind(this)}>Bold</button>
          <div className="reply__ipt">
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
            />
          </div>
          <div className="reply__right">
            <button
              className="reply__right--btn"
              onClick={this.handleReply.bind(this)}>
              <i className="fa fa-envelope"></i>
            </button>
          </div>
      </div>
    );
  }
}

export default MyEditor
