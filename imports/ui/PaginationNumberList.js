import React, {Component} from 'react'
import {createContainer} from 'react-meteor-data'

import {Topics} from '../api/topics'
import PaginationNumberListItem from './PaginationNumberListItem'

export class PaginationNumberList extends Component {

  minus4pages() {
    Session.set('currentPageNumber', Session.get('currentPageNumber') - 4)
  }
  plus4pages() {
    Session.set('currentPageNumber', Session.get('currentPageNumber') + 4)
  }


  renderList (){
    if(this.props.topic[0]){
      const arr= [], currentPageNumber = Session.get('currentPageNumber')
      let min = currentPageNumber - 2, max = currentPageNumber + 2

      for (let j = min ; j <= max ; j++){
        if(j > 0 && j <= this.props.maxPageNumber) {
          arr.push(j)
        }
      }

      const middle = arr.map(num => <PaginationNumberListItem key={num} num={num} />)

      return (
        <ul className="paginationBar__right__pagination">
          {currentPageNumber > 3 ? <li onClick={() => Session.set('currentPageNumber', 1)}>1</li> : ''}
          {currentPageNumber > 4 ? <li onClick={this.minus4pages.bind(this)}>...</li> : ''}
          {middle}
          {currentPageNumber < this.props.maxPageNumber - 3 ? <li onClick={this.plus4pages.bind(this)}>...</li> : ''}
          {currentPageNumber < this.props.maxPageNumber - 2 ? <li onClick={() => Session.set('currentPageNumber', this.props.maxPageNumber)}>{this.props.maxPageNumber}</li> : ''}
        </ul>
      )
    }
  }


  render() {
    return(
      <ul
        className="paginationBar__right__pagination"
        >
        {this.renderList()}
      </ul>
    )
  }
}


export default createContainer(() => {
  const selectedTopicId = Session.get('selectedTopicId')
  const topic = Topics.find({_id: selectedTopicId}, {}).fetch()
  return  {
    selectedTopicId,
    topic,
    maxPageNumber: topic[0] ? Math.ceil(((topic[0].messages.length + 1) - 11)/10) +1  : '',

  }
}, PaginationNumberList)
