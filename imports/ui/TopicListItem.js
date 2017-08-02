import React from 'react'
import propTypes from 'prop-types'
import { Session } from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data'

export const TopicListItem = (props) => {
  return(
    <div onClick={() => {props.Session.set('selectedTopicId', props.topic._id)}}>
      {(props.topic._id===props.Session.get('selectedTopicId'))? 'selected' : undefined}
      <h3>{props.topic._id}</h3>
      <p>{props.topic.body}</p>
    </div>
  )
}

TopicListItem.propTypes = {
  topic: propTypes.object.isRequired,
  Session: propTypes.object.isRequired
}

export default createContainer(() => {
  return { Session }
}, TopicListItem)
