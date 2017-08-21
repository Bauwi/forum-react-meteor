import React, { Component } from 'react'



export default class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClick(e) {
    this.setState({open: !this.state.open})
    console.log(this.refs)
  }

  handleClose(e) {
    this.setState({open: false})
  }

  render() {
    return(
      <div>
        <a
          href="#"
          ref="target"
          onClick={this.handleClick.bind(this)}>Popover</a>
        <a
          placement='bottom'
          container={this}
          target={this.refs.target}
          show={this.state.open}
          onHide={this.handleClose.bind(this)} >
          <p>This is popover</p>
        </a>
      </div>
    )
  }
}
