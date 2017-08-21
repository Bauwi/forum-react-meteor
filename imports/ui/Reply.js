import React, {Component} from 'react'
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'

import Editor from './Editor'


export default class Reply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  onChange(e) {
    this.setState({message: e.target.value})
  }

  render() {
    return(
      <div className="reply">
        {/* <div>
          <input
            className="reply__ipt"
            type="text"
            value={this.state.message}
            onChange={this.onChange.bind(this)}/>
        </div> */}
        <div className="reply__left--ipt">
          <Editor />
        </div>
      </div>
    )
  }
}
