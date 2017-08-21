import React, {Component} from 'react'
import moment from 'moment'
import {Editor, convertFromRaw, EditorState} from 'draft-js'

export default class MessageListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.message.message)))
    }
  }

  render() {
    const {message, _id, postedAt, userName} = this.props.message

    return(
        // <div className="post">
        //   <div className="post__header">
        //     <div className="post__header--left">
        //       <div className="post__header__avatar">Avatar</div>
        //       <Popup
        //         trigger={<Button icon='add' />}
        //         content="The default theme's basic popup removes the pointing arrow."
        //         basic
        //       />
        //       <div className="post__header__userdate">
        //         <h5 className="post__header__username">{userName}</h5>
        //         <p className="post__header__date--bottom">{moment(postedAt).format('HH:mm:ss')}</p>
        //       </div>
        //     </div>
        //     <div className="post__header--right">
        //       <i className="fa fa-exclamation-triangle"></i>
        //       <i className="fa fa-exclamation-triangle"></i>
        //     </div>
        //   </div>
        //   <p className="post__message">{message}</p>
        // </div>
        <div className="post">
          <div className="post__header">
            <div className="post__header--left">
              <div>
                <img
                  src='http://www.iconninja.com/files/260/257/291/totoro-icon.png'
                  className="post__header__avatar"
                />

                <div className="post__header__userdate">
                  <div className="post__header__username">
                    User_1
                  </div>
                  <div>
                    {moment(postedAt).format('HH:mm:ss')}
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="post__body">
              <Editor
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                readOnly={true}
              />
            </div>

        </div>
    )
  }
}
