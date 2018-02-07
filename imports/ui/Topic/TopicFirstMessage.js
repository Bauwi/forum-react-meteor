import React, {Component} from 'react'
import moment from 'moment'
import {createContainer} from 'react-meteor-data'
import { Session } from 'meteor/session'
import { Link } from 'react-router'

import {Topics} from '../../api/topics'
import UserPanel from '../UserPanel'
import Pins from '../Pins'

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)

export class TopicFirstMessage extends Component {
  render() {
    const {loading, topic} = this.props
    return (
      <div className="post post__message--first">


        <div className="post__header">
          <div className="post__header--left">
            <div>
              <img
                src={this.props.user[0] ? this.props.user[0].profileInfo.avatar : ""}
                className="post__header__avatar"
              />

              <div className="post__header__userdate">
                <div className="post__header__username">
                  {!loading ? topic[0].username : ''}
                </div>
                <div>
                  {!loading ? moment(topic[0].lastUpdate).format('HH:mm:ss'):''}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="post__body" >
          <header className="post__body--header">
            <p><i className="fa fa-quote-right"></i></p>
            <p><i className="fa fa-exclamation-triangle"></i></p>
          </header>
          <section
            dangerouslySetInnerHTML={{__html: !loading ? topic[0].body : '' }}
            className="post__body--section"
            >

            </section>
          <footer className="post__body--footer">{this.props.user[0]? this.props.user[0].profileInfo.signature : ""}</footer>
        </div>
      </div>
    )
  }
}

export default createContainer (() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const subscription = Meteor.subscribe('topics')
  const subscription2 = Meteor.subscribe('users.profileInfo')
  const loading = !subscription.ready() && !subscription2.ready()
  const topic = Topics.find({_id: selectedTopicId}, {}).fetch()
  const userId = topic[0] ? topic[0].authorId : ""
  const user =  Meteor.users.find({_id: userId},{}).fetch()
    return {
      topic,
      loading,
      user
    }
}, TopicFirstMessage)
