import React, {Component} from 'react'
import {Session} from 'meteor/session'

export default class PaginationNumberListItem extends Component {


  handleClick() {
    Session.set('currentPageNumber', this.props.num)
  }

  render() {
    const className = (Session.get('currentPageNumber') === this.props.num) ? "selectedPage" : ""
    return (
      <li
        onClick={this.handleClick.bind(this)}
        className={className}>{this.props.num}
      </li>
    )
  }
}
