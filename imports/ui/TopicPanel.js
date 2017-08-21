import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Reply from './Reply'
import MessageList from './MessageList'


export default class TopicPanel extends Component {
  renderProfile() {
    return(
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={300}>

            <img src="https://jerem77.files.wordpress.com/2015/11/totoro.gif" />

      </ReactCSSTransitionGroup>
    )

  }

  renderTopicPanel() {
      return (
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={300}>
            <div>
              <div>
                <MessageList />
                <ReactCSSTransitionGroup
                  transitionName="reply"
                  transitionAppear={true}
                  transitionAppearTimeout={2000}
                  transitionEnterTimeout={2000}
                  transitionLeaveTimeout={300}>
                  <Reply />
                </ReactCSSTransitionGroup>
              </div>
          </div>
          </ReactCSSTransitionGroup>
      )
  }

  render() {
    return (
        <div className="page-content__main__post-list">
          {Session.get('selectedTopicId') ? this.renderTopicPanel() : this.renderProfile()}
        </div>
    )
  }
}
