import React, {Component} from 'react'

export default class MessageListItem extends Component {
  render() {
    const {body, topicId} = this.props.message
    return(
      <div>
        <h1>{body}</h1>
        <p>{topicId}</p>
      </div>
    )
  }
}
