import React from 'react'


import PrivateHeader from './PrivateHeader'
import TopicPanel from './TopicPanel'
import TopicList from './TopicList'

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <TopicList />
        <TopicPanel />
      </div>
    </div>
  )
}
