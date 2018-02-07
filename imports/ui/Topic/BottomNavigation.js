import React, { Component } from 'react'
import { Session } from 'meteor/session'
import { createContainer } from 'react-meteor-data'

import { Topics } from '../../api/topics'

const BottomNavigation = (props) => {

  const onePageForward = () => {
    const currentPageNumber = Session.get('currentPageNumber')
    if(currentPageNumber !== props.maxPageNumber) {
      Session.set('currentPageNumber', Session.get('currentPageNumber') + 1)
    }
  }

  const onePageBackward = () => {
    const currentPageNumber = Session.get('currentPageNumber')
    if(currentPageNumber !== 1) {
      Session.set('currentPageNumber', Session.get('currentPageNumber') - 1)
    }
  }

  const fourPagesForward = () => {
    const currentPageNumber = Session.get('currentPageNumber')
    if(currentPageNumber > props.maxPageNumber - 4) {
      Session.set('currentPageNumber', props.maxPageNumber)
    } else {
      Session.set('currentPageNumber', Session.get('currentPageNumber') + 4)
    }
  }

  const fourPagesBackward = () => {
    const currentPageNumber = Session.get('currentPageNumber')
    if(currentPageNumber < 5) {
      Session.set('currentPageNumber', 1)
    } else {
      Session.set('currentPageNumber', Session.get('currentPageNumber') - 4)
    }
  }

    return (
      <nav className="footer__navigation">
        <section>
          <ul className="footer__navigation__list">
            <li onClick={fourPagesBackward}>
              <i className="fa fa-angle-left"></i>
              <i className="fa fa-angle-left"></i>
            </li>
            <li onClick={onePageBackward}>
              <i className="fa fa-angle-left"></i>
            </li>
          </ul>
        </section>
        <section>
          <ul className="footer__navigation__list">
            <li onClick={onePageForward}>
              <i className="fa fa-angle-right"></i>
            </li>
            <li onClick={fourPagesForward}>
              <i className="fa fa-angle-right"></i>
              <i className="fa fa-angle-right"></i>
            </li>
          </ul>
        </section>
      </nav>
    )
}

export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const topic = Topics.find({_id: selectedTopicId}, {}).fetch()
  return {
    maxPageNumber: topic[0] ? Math.ceil(((topic[0].messages.length + 1) - 11)/10) +1  : ''
  }
}, BottomNavigation)
