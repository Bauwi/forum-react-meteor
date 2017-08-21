import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

if(Meteor.isServer){
  Meteor.publish('users', function () {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        favTopics: true,
        pinTopics: true,
        messageCount: true || 0,
        createdAt: true,
        username: true
      }
    })
  })
}

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });

  return true;
});

Accounts.onCreateUser((options, user) => {
  user.favTopics = []
  user.pinTopics = []
  user.messageCount = 0

  return user
})

Meteor.methods({
  'users.addFavTopic'(_id, topicId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      topicId: {
        type: String,
        min: 1
      }
    }).validate({
      _id, topicId
    })

    Meteor.users.update({
      _id,
    }, {
      $push: {
        favTopics: topicId
      }
    })

  },

  'users.removeFavTopic'(_id, topicId) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      topicId: {
        type: String,
        min: 1
      }
    }).validate({
      _id, topicId
    })

    Meteor.users.update({
      _id
    }, {
      $pull: {
        favTopics: topicId
      }
    })
  },
  'users.addPinTopic'(_id, topicId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      topicId: {
        type: String,
        min: 1
      }
    }).validate({
      _id, topicId
    })

    Meteor.users.update({
      _id,
    }, {
      $push: {
        pinTopics: topicId
      }
    })

  },

  'users.removePinTopic'(_id, topicId) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      topicId: {
        type: String,
        min: 1
      }
    }).validate({
      _id, topicId
    })

    Meteor.users.update({
      _id
    }, {
      $pull: {
        pinTopics: topicId
      }
    })
  },
  'users.upMessageCount'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id
    })

    Meteor.users.update({
      _id,
    }, {
      $inc: {
        messageCount: 1
      }
    })

  }

})
