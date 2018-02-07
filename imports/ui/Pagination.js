import React, { Component } from 'react'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

import PaginationNumberList from './PaginationNumberList'
import Pins from './Pins'
import PaginationMessageCount from './PaginationMessageCount'

export class Pagination extends Component {
  handleSearch() {
    Session.set('onSearch', true)
    console.log(Session.get('onSearch'))
  }

  handleHome () {
    Session.set('onSearch', false)
  }


  render() {
    const homeBtnClassName = !this.props.isSearchOpen ? "paginationBar__left--content" : "paginationBar__left--content paginationBar__left--content--unactive"
    const searchBtnClassName = this.props.isSearchOpen ? "paginationBar__left--content" : "paginationBar__left--content paginationBar__left--content--unactive"
    return (
      <div>
        <div className="header-container paginationBar">
          <section className="paginationBar__left--container">

          </section>
          <section className="page-content__main header-container__right paginationBar__right">
            <Pins/>
            <PaginationNumberList />
            <PaginationMessageCount />
          </section>

        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    isSearchOpen: Session.get('onSearch')
  }
}, Pagination)
