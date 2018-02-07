import React, { Component } from 'react'
import { Session } from 'meteor/session'

import PrivateHeader from './PrivateHeader'
import MainPanel from './MainPanel'
import Sidebar from './Sidebar/Sidebar'

export default class App extends Component{

  render() {
    const location = Session.get('location')
    let appClassName = ""
    if(Session.get('selectedTopicId') || Session.get('onHome') ){
      appClassName = "app--home"
    } else if (Session.get('onProfile')){
      appClassName = "app--profile"
    } else if (Session.get('onMessenger')){
      appClassName = "app--messenger"
    }

    return (
      <div className={appClassName}>
        <PrivateHeader title="Dashboard" location={location}/>
        <div className="page-content">
          <div className="page-content__sidebar">
            <Sidebar className="page-content__sidebar__content" />
          </div>
          <div className="page-content__main">
            <MainPanel />
          </div>
        </div>
      </div>
    )
  }
}
