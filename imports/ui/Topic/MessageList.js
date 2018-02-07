import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


import  { Topics }  from '../../api/topics'
import  MessageListItem  from './MessageListItem'
import TopicFirstMessage from './TopicFirstMessage'
import BottomNavigation from './BottomNavigation'
import CalendarDate from '../CalendarDate'



export class MessageList extends Component {
  scrollToTop () {
    const node = ReactDOM.findDOMNode(this.topicTop);
    node.scrollIntoView({ behaviour: "smooth" });
  }

  componentDidMount() {
    this.scrollToTop();
  }

  componentDidUpdate() {
    this.scrollToTop();
  }

  renderMessageList () {
    if(this.props.topic.length !== 0){
      const currentPage = Session.get('currentPageNumber')
      const minBoundary = (currentPage - 1) * 10
      const maxBoundary = (currentPage * 10)
      const currentPageMessages = this.props.topic[0].messages.slice( minBoundary, maxBoundary )
      return (
          currentPageMessages.map((message) => {
              return (
                  <MessageListItem key={message.id} id={message.id} message={message} />
              )
          })
      )
  }
}


  render() {
    console.log(this.props.messagesNumber)
    const selected = Session.get('selectedTopicId')
    const currentPageNumber = Session.get('currentPageNumber')
    return (
      <div className="message-list-wrapper">
        <div ref={el => {this.topicTop = el}}></div>
          <div>
            <header className="post__message__title">
              <header className="post__message__title__header">
                <CalendarDate styling="post__message__title__header--date" date={!this.props.loading ? this.props.topic[0].createdAt : ''} />
                <p className="post__message__title__header--author">{!this.props.loading ? this.props.topic[0].username : ''}</p>
              </header>
              <h3 className="post__message__title--title">{!this.props.loading ? this.props.topic[0].title : ''}</h3>
            </header>
            {currentPageNumber === 1 ? <TopicFirstMessage /> : undefined}
              {!this.props.loading ? this.renderMessageList() : 'loading'}

              <footer className="footer">
                 {this.props.messagesNumber > 10 ? <BottomNavigation /> : ""}
              </footer>
            </div>
      </div>
    )
  }
}

Topics.propTypes = {
  topics: propTypes.object.isRequired
}

export default createContainer (() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const subscription = Meteor.subscribe('topics')
  const loading = !subscription.ready()
  const topic = Topics.find({_id: selectedTopicId}, {}).fetch()
  const currentPageNumber = Session.get('currentPageNumber')
  return {
    loading,
    topic,
    messagesNumber: topic[0] ? topic[0].messages.length : 1
  }
}, MessageList)
