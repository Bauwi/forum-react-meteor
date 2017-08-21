import React from 'react'


import PrivateHeader from './PrivateHeader'
import TopicPanel from './TopicPanel'
import TopicList from './TopicList'
import UserPanel from './UserPanel'
import Footer from './Footer'


export default () => {
  const isNavOpen = Session.get(isNavOpen)
  return (
    <div className="app">
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <div className="page-content__sidebar">
          <TopicList className="page-content__sidebar__content" />
        </div>
        <div className="page-content__main">
          <TopicPanel />
        </div>
        {/* <UserPanel /> */}
      </div>
      <Footer />
    </div>
  )
}
