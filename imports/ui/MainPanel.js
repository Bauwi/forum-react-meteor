import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { createContainer } from 'react-meteor-data'

import Reply from './Reply'
import MessageList from './Topic/MessageList'
import Home from './Home'
import Profile from './Profile/Profile'
import Messenger from './Messenger/Messenger'

export class TopicPanel extends Component {
  renderMainPanel () {
    if(this.props.onTopic){
      return (
            <div>
              <div className="reading-area">
                <MessageList />
                <Reply/>
              </div>
            </div>
      )
    }

    else if(this.props.onHome){
      return(
        <Home />
      )
    } else if (this.props.onProfile){
      return (
        <Profile user={Meteor.user()} />
      )
    } else if(this.props.onMessenger) {
      return (
        <Messenger />
      )
    }
  }



  render() {
    return (
        <div className="page-content__main__panel">
          {this.renderMainPanel()}
        </div>
    )
  }
}


export default createContainer(() => {
  return {
    onTopic: Session.get('selectedTopicId'),
    onHome: Session.get('onHome'),
    onProfile: Session.get('onProfile'),
    onMessenger: Session.get('onMessenger')
  }
}, TopicPanel)
