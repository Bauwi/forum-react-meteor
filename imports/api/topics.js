import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { Random } from 'meteor/random'

import moment from 'moment'

export const Topics = new Mongo.Collection('topics')

if(Meteor.isServer){
  Meteor.publish('topics', function () {
    return Topics.find()
  })
}

Meteor.methods({
  'topics.insert' (title, body, username) {
    return Topics.insert({
      title,
      body,
      username,
      messages: [],
      authorId: this.userId,
      lastUpdate: moment().valueOf()
    })
  },


  'topics.addMessage'(_id, message, userName) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id
    })

    Topics.update({
      _id,
    }, {
      $push: {
        messages: {
          id: Random.id(),
          userId: this.userId,
          userName,
          message,
          postedAt: moment().valueOf()
        }
      },
      $set: {
        lastUpdate: moment().valueOf()
      }
    })

  }

})
