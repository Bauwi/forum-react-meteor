import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import moment from 'moment'

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
        username: true,
        participatingTopicId: true,
        profileInfo: true,
        messenger: true
      }
    })
  })
}
Meteor.publish('users.profileInfo', function() {
  return Meteor.users.find({}, {
    fields: {
      username: true,
      participatingTopicId: true,
      profileInfo: true,
      createdAt: true,
      messageCount: true
    }
  })
})

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
  user.participatingTopicId = []
  user.profileInfo = {
    avatar: "https://www.timeshighereducation.com/sites/default/files/byline_photos/default-avatar.png",
    signature: '',
    preferences: {
      tobedefined: undefined
    },
    following: []
  }
  user.messenger = []

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
  'users.updateParticipatingTopics'(_id, topicId) {
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
        participatingTopicId: topicId
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
  },
  'users.updateSignature'(_id, signature) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      signature: {
        type: String,
        min: 1,
        max: 140
      }
    }).validate({
      _id, signature
    })

    Meteor.users.update({
      _id
    }, {
      $set: {
        "profileInfo.signature": signature
      }
    })
  },
  'users.updateAvatar'(_id, avatar) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      avatar: {
        type: String,
        label: 'Your avatar',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({
      _id, avatar
    })

    Meteor.users.update({
      _id
    }, {
      $set: {
        "profileInfo.avatar": avatar
      }
    })
  },
  'users.addFollowing'(_id, followedUserId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      followedUserId: {
        type: String,
        min: 1,
        max: 20
      }
    }).validate({
      _id, followedUserId
    })

    Meteor.users.update({
      _id,
    }, {
      $push: {
        "profileInfo.following": followedUserId
      }
    })

  },

  'users.removeFollowing'(_id, unfollowedUserId) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      unfollowedUserId: {
        type: String,
        min: 1
      }
    }).validate({
      _id, unfollowedUserId
    })

    Meteor.users.update({
      _id
    }, {
      $pull: {
        "profileInfo.following": unfollowedUserId
      }
    })
  },

  


})
