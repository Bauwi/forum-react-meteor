import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'

import { Link } from 'react-router'

// import AddTopic from './AddTopic'
import Pagination from './Pagination'
import PrivateHeaderButton from './PrivateHeaderButton'

export class PrivateHeader extends Component{
  constructor(props) {
    super(props)
    this.state = {
      current: "home"
    }
  }

  handleHomeClick() {
    Session.set('onProfile', false)
    Session.set('onMessenger', false)

    Session.set('onHome', true)

    HomeBtnClassName = Session.get('onHome') ? "button--header button--header--selected" : "button--header"
    ProfileBtnClassName = Session.get('onProfile') ? "button--header button--header--selected" : "button--header"
    MessengerBtnClassName = Session.get('onMessenger') === "messenger" ? "button--header button--header--selected" : "button--header"
  }

  handleProfileClick() {
    Session.set('onHome', false)
    Session.set('onMessenger', false)

    Session.set('onProfile', true)
  }

  handleMessengerClick() {
    Session.set('onProfile', false)
    Session.set('onHome', false)

    Session.set('onMessenger', true)
  }

  render() {

    return (

        <header>
          <div className="header-container header-container--main-header">
            <section className="page-content__sidebar header-container__left">
              <h1 className="header__title">{this.props.title}</h1>
            </section>
            <section className="page-content__main header-container__right">
              <div className="header-container__right--btns">
                  <button
                    className="button--header button--header--switch"
                    onClick={this.props.handleImgClick}
                    >
                      <i className="fa fa-caret-left"></i>
                  </button>
                  <PrivateHeaderButton
                    reference="onHome"
                    location={this.props.location}
                  />
                  <PrivateHeaderButton
                    reference="onProfile"
                    location={this.props.location}
                  />
                  <PrivateHeaderButton
                    reference="onMessenger"
                    location={this.props.location}
                  />

                </div>
                <h1 className="header__title--private-header">Dashboard</h1>
              <button className="button button--link-text" onClick={() => this.props.handleLogout()}><i className="fa fa-sign-out"></i></button>
            </section>

          </div>
          <Pagination />

        </header>

    )
  }
}

PrivateHeader.propTypes = {
  title: propTypes.string.isRequired
}

export default createContainer(() => {
  return  {
    handleImgClick: () => {
      const isOpen = Session.get('isNavOpen')
      Session.set('isNavOpen', !isOpen)
    } ,
    handleLogout: () => Accounts.logout(),
    isNavOpen: Session.get('isNavOpen'),

  }
}, PrivateHeader)
