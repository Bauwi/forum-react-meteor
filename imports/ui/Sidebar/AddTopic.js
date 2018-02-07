import React, {Component} from 'react'
import Modal from 'react-modal'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'
import ReactQuill from 'react-quill'

export class AddTopic extends Component {
  constructor(props) {
    super(props)
    this.state ={
      isOpen: false,
      editorHtml: '',
      theme: 'snow'
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
  }

  onAdd(e) {
    e.preventDefault()
    let title = this.refs.title.value.trim()
    let content = this.state.editorHtml
    let username = Meteor.user().username

    Meteor.call('topics.insert', title, content, username, (err, res ) => {
      if(res) {
        Session.set('selectedTopicId', res)
        Meteor.call('users.updateParticipatingTopics', Meteor.userId(), this.props.Session.get('selectedTopicId'))
        this.setState({editorHtml: ''})
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
      <div className="paginationBar__left--content">
        <button className="btn btn-1 btn-1c" onClick={() => this.setState({isOpen: true})}>New</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="New Topic"
          onRequestClose={this.handleModalClose}
          className="boxed-view__box boxed-view__add-topic"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h3>New</h3>
          <div className="add-topic__inputs">

            <label>Title :</label>
            <input className="add-topic__inputs--title" type="text" name="title" ref="title" placeholder="Must be 70 characters or less" />

            <label>Body : </label>
            <div className="add-topic__inputs--body">
              <ReactQuill
                theme="snow"
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={AddTopic.modules}
                formats={AddTopic.formats}
                // onBlur={this.onBlur}
                bounds={'.app'}
                placeholder="Your text goes here..."
               />
            </div>
          </div>
          <div>
            <button className="button button--pill button--warning" onClick={this.onAdd}>create</button>
            <button className="button button--pill" onClick={this.handleModalClose}>Cancel</button>
          </div>


        </Modal>
      </div>
    )
  }
}

AddTopic.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}],

    ['bold', 'italic', 'underline', 'blockquote'],
    [{'list': 'ordered'}],
    ['link', 'video'],
    ['clean']
  ]
}

AddTopic.formats = [
  'header',
  'bold', 'italic', 'underline', 'blockquote',
  'list',
  'link', 'video',
]

AddTopic.propTypes = {
  placeholder: React.PropTypes.string,
}

export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  Meteor.subscribe('users')
  return {
    Session,
    user: Meteor.users.find({_id: Meteor.userId()}, {}).fetch()
  }
}, AddTopic)
