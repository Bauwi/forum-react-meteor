import React from 'react'
import { createContainer } from 'react-meteor-data'

import  { Topics }  from '../api/topics'

const PaginationMessageCount = (props) => {
  return(
    <div><i className="fa fa-reply"></i> {props.topic[0] ? props.topic[0].messages.length + 1 : ''}</div>
  )
}


export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const topic = Topics.find({_id: selectedTopicId}, {}).fetch()
  return {
    topic
  }
}, PaginationMessageCount)
