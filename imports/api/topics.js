import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

import moment from 'moment'

export const Topics = new Mongo.Collection('topics')

if(Meteor.isServer){
  Meteor.publish('topics', function () {
    return Topics.find()
  })
}

Meteor.methods({
  'topics.insert' (title, body) {
    return Topics.insert({title, body, userId: this.userId, updatedAt: moment().valueOf()})
  }
})
