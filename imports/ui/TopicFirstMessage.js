import React, {Component} from 'react'
import moment from 'moment'
import {createContainer} from 'react-meteor-data'

import {Topics} from '../api/topics'
import UserPanel from './UserPanel'
import TopicFirstMessagePins from './TopicFirstMessagePins'

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
      <div className="post">
        <div className="post__header">
          <div className="post__header--left">
            <div>
              <img
                src='http://www.iconninja.com/files/260/257/291/totoro-icon.png'
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
        {/* <div className="post__header">
          <div className="post__header--left">
            <div className="post__header__avatar">Avatar</div>
            <div className="post__header__userdate">
              <h5 className="post__header__username">{!loading ? topic[0].username : ''}</h5>
              <p className="post__header__date--bottom">{!loading ? moment(topic[0].lastUpdate).format('HH:mm:ss'):''}</p>
            </div>
          </div>
          <div className="post__header--right">
            <i className="fa fa-exclamation-triangle"></i>
            <i className="fa fa-exclamation-triangle"></i>
          </div>
        </div> */}

        {/* <TopicFirstMessagePins /> */}

        <p className="post__body">{!loading ? topic[0].body : '' }</p>
      </div>
    )
  }
}

export default createContainer (() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const subscription = Meteor.subscribe('topics')
  const loading = !subscription.ready()
  const topic = Topics.find({_id: selectedTopicId}, {}).fetch()
    return {
      topic,
      loading
    }
}, TopicFirstMessage)
