import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

import moment from 'moment'

export const Messages = new Mongo.Collection('messages')

if(Meteor.isServer){
  Meteor.publish('messages', function () {
    return Messages.find()
  })
}

Meteor.methods({
  'messages.insert' (topicId, body) {
    return Messages.insert({body, topicId, userId: this.userId, updatedAt: moment().valueOf()})
  }
})
