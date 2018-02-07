import React, {Component} from 'react'
import moment from 'moment'
import { createContainer } from 'react-meteor-data'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

import Profile from '../Profile/Profile'

export class MessageListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  handleModalClose(){
    this.setState({
      isOpen: false
    })
  }

  onReport() {
    
  }


  render() {
    const {message, _id, postedAt, userName} = this.props.message
    let avatar, signature = ''
    let user = {}
    if(!this.props.loading) {
        user = this.props.user[0]
        avatar = this.props.user[0].profileInfo.avatar
        signature = this.props.user[0].profileInfo.signature
    }

    return(
        <div className="post">
          <div className="post__header">
            <div className="post__header--left">
              <div>
                <img src={avatar} className="post__header__avatar"/>

                <div className="post__header__userdate">
                  <div
                    className="post__header__username"
                    onClick={() => this.setState({isOpen: !this.state.isOpen})}
                    >
                    {userName}
                  </div>
                  <div>
                    {moment(postedAt).format('HH:mm:ss')}
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="post__body" >
              <header className="post__body--header">
                <p><i className="fa fa-exclamation-triangle"></i></p>
              </header>
              <section
                dangerouslySetInnerHTML={{__html: message}}
                className="post__body--section"
                >

                </section>
              <footer className="post__body--footer">{signature}</footer>
            </div>

            <Modal
              isOpen={this.state.isOpen}
              contentLabel="Profile"
              onRequestClose={this.handleModalClose}
              className="boxed-view__profile"
              overlayClassName="boxed-view boxed-view--modal"
            >
              <Profile user={user} />


            </Modal>

        </div>
    )
  }
}

export default createContainer((props) => {
  const userId = props.message.userId
  const subscription = Meteor.subscribe('users.profileInfo')
  const loading = !subscription.ready()
  const user = Meteor.users.find({_id: userId},{}).fetch()
  return {
    loading,
    user
  }
}, MessageListItem)
