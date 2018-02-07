import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { Random } from 'meteor/random'

import moment from 'moment'

export const Messages = new Mongo.Collection('messages')

if(Meteor.isServer){
  Meteor.publish('messages', function () {
    const user = this.userId
    return Messages.find({
      'users': user
    })
  })

}

Meteor.methods({
  'messages.newConversation' (_id, alterId, body, alterUsername) {
    return Messages.insert({
      users: [this.userId, alterId],
      messages: [{
        _id,
         body,
         to: alterUsername,
         postedAt: moment().valueOf()
       }],
      lastUpdate: moment().valueOf(),
      createdAt: moment().valueOf()
    })
  },

  'messages.newMessage' (_id, alterId, body, alterUsername) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      alterId: {
        type: String,
        min: 1
      },
      body: {
        type: String,
        min: 1,
        max: 1000
      },
      alterUsername: {
        type: String,
        min: 1
      }
    }).validate({
      _id, alterId, body, alterUsername
    })

    Messages.update({
      "users" : {
        $all: [
          _id, alterId
        ]
      }
    },{
      $push: {
        messages: {
          _id,
          body,
          to: alterUsername,
          postedAt: moment().valueOf()
        }
      }
    })
  },

// db.users.update({"_id": "wF75S522gMuwhgFZo", "messenger.alterId": "xpXXSgjYyhnYpTJRz"},{$push: {"messenger.$.messages": "test"}})

})
