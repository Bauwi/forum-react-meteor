import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'
import { createContainer } from 'react-meteor-data'

import { Link } from 'react-router'

import Profile from './Profile'

export class PrivateHeader extends Component{

  render() {
    return (

        <header className="header-container">
          <section className="page-content__sidebar header-container__left">
            <h1 className="header__title">{this.props.title}</h1>
          </section>
          <section className="page-content__main header-container__right">
            <div className="header-container__right--btns">
                <button
                  className="button button--secondary"
                  onClick={this.props.handleImgClick}
                  >
                    <i className="fa fa-bars"></i>
                </button>
                <Link to="/dashboard">Home</Link>
                <Link to="#">Profile</Link>
                <Link to="#">Messenger</Link>
                <Link to="/dashboard/:id/page1">Page1</Link>
              </div>
            <button className="button button--link-text" onClick={() => this.props.handleLogout()}>Logout</button>
          </section>
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
    isNavOpen: Session.get('isNavOpen')
  }
}, PrivateHeader)
