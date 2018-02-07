import React, { Component } from 'react'
import { Session } from 'meteor/session'

import AddTopic from './AddTopic'

export default class SidebarNav extends Component {

  toggleSearch() {
    Session.set('onSearch', true)
  }

  handleHome () {
    Session.set('onSearch', false)
  }

  render() {
    const searchBtnClassName = this.props.isSearchOpen ? "paginationBar__left--content" : "paginationBar__left--content paginationBar__left--content--unactive"
    const homeBtnClassName = !this.props.isSearchOpen ? "paginationBar__left--content" : "paginationBar__left--content paginationBar__left--content--unactive"
    return(
      <section className="page-content__sidebar__sidebar-nav">
        <div>
          <div
            className={homeBtnClassName}
            onClick={this.handleHome.bind(this)}
            >
            <i className="fa fa-bars"></i>

          </div>
          <AddTopic />
          <div
            className={searchBtnClassName}
            onClick={this.toggleSearch.bind(this)}
            >
            <i className="fa fa-search"></i>
          </div>
        </div>
      </section>
    )
  }
}
