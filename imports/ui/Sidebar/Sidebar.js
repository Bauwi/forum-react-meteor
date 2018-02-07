import React, {Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import { Session } from 'meteor/session'
import propTypes from 'prop-types'
import FlipMove from 'react-flip-move'

import {Topics} from '../../api/topics'

import SidebarNav from './SidebarNav'
import FavTopicsList from './FavTopicsList'
import PinTopicsList from './PinTopicsList'


import TopicListItem from './TopicListItem'

export class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (e) {
    const search = e.target.value
    this.setState({search})
  }

  renderResults () {
    if(this.props.topics.length !== 0){
      if(this.state.search === ""){
        return <p className="search__result--empty">Find a topic by its name</p>
      }
      return(
        this.props.topics.map(topic => {
          if(topic.title.toUpperCase().match(this.state.search.toUpperCase())){
            return <TopicListItem key={topic._id} topic={topic} />
          }
        })
      )
    } else {
      return <p>No results found</p>
    }
  }

  renderShortcuts () {
    return(
      <div>
        <div>
          <PinTopicsList />
        </div>
        <div>
          <FavTopicsList />
        </div>
        <div className="page-content__sidebar__list">
          <FlipMove duration={750} easing="ease-out">
            <h4 className="page-content__sidebar__content__mainList--title">All</h4>
            {this.renderAllTopics()}
          </FlipMove>
        </div>
      </div>
    )
  }

  renderAllTopics () {
    if(this.props.topics.length !== 0){
      const renderedTopics = this.props.topics.slice(0, 5)
      return (
        renderedTopics.map(topic => {
          return <TopicListItem key={topic._id} topic={topic} />
        })
      )
    }
  }

  render(){
    const searchClassname = this.props.onSearch ? "search search--jiro" : "search search--jiro is-not-on-search"
    const searchContainerClassname = this.props.onSearch ? 'search__container' : "search__container search__container--unactive"
    return(
        <div className="page-content__sidebar__content">
          <div
            className="page-content__sidebar__content--close"
            onClick={() => Session.set('isNavOpen', false)}
            >
            <i className="fa fa-times"></i>
          </div>
          <SidebarNav isSearchOpen={this.props.onSearch}/>
          <div className={searchContainerClassname}>
            <span className={searchClassname}>
    					<input
                className="search__field search__field--jiro"
                 type="text"
                 id="search-10"
                 value={this.state.search}
                 onChange={this.handleSearch}
               />
    					<label className="search__label search__label--jiro" htmlFor="input-10">
    						<span className="search__label-content search__label-content--jiro">Search</span>
    					</label>
    				</span>
          </div>

          {!this.props.onSearch ? this.renderShortcuts() : <div>{this.renderResults()}</div>}
        </div>
    )
  }
}

Topics.propTypes = {
  topics: propTypes.array.isRequired
}

export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const onSearch = Session.get('onSearch')
  Meteor.subscribe('topics')
  return {
    topics: Topics.find({}, {
      sort: {
        lastUpdate: -1
      }
    }).fetch().map(topic => {
      return {
        ...topic,
        selected: (topic._id === selectedTopicId)
      }
    }),
    onSearch
  }
}, Sidebar)
