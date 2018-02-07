import React, { Component } from 'react'
import moment from 'moment'

export default class TopicListItemDate extends Component {
  render() {
    const dateClassName = this.props.styling
    moment.updateLocale('en', {
      calendar : {
          lastDay : '[Yesterday at] LT',
          sameDay : 'LT',
          nextDay : '[Tomorrow at] LT',
          lastWeek : '[last] dddd [at] LT',
          nextWeek : 'dddd [at] LT',
          sameElse : 'L'
      }
    })

    return (
      <p className={dateClassName}>
        {time = moment(this.props.date).calendar()}
      </p>
    )
  }
}
