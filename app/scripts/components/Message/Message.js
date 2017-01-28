import React, { Component, PropTypes } from 'react'
import moment from '../../../bower_components/moment/moment'
import ModAction from '../ModAction/ModAction'
import Media from './Media'
import MessageMenu from './MessageMenu'
import emojis from 'react-emoji'
import {mobile} from '../../../styles/sizes'
import {grey500, grey200} from 'material-ui/styles/colors'
import ReactMarkdown from 'react-markdown'

class Message extends Component {

  state = {modAction: false}

  modAction = (open) => {
    return (e) => {
      e.preventDefault()
      this.setState({modAction: open})
    }
  }

  checkYouTube = (message) => {
    return /[^ ]+youtube\.com[^ \.\!]+/.exec(message)
  }

  checkImage = (message) => {
    return /[^ ]+(\.gif|\.jpg|\.png)/.exec(message)
  }

  render() {
    let below
    let media
    const {text, author, id, timestamp, postMessage, type} = this.props

    if (this.checkYouTube(text)) {
      media = <Media url={this.checkYouTube(text)[0]}/>
    } else if (this.checkImage(text)) {
      media = <Media url={this.checkImage(text)[0]}/>
    }

    if (this.state.modAction) {
      below =
        <ModAction
          msgId={id}
          author={author}
          close={this.modAction(false)}
          postMessage={postMessage}/>
    } else {
      below = <div style={styles.below}>
          <MessageMenu
            modAction={this.modAction}
            id = {id} />
          <div style={styles.date}>
              {moment(timestamp).format('h:mm A, ddd MMM DD YYYY')}
          </div>
        </div>
    }

    return <tr
        style={type === 'direct_message' ?
          {...styles.message, ...styles.direct_message} : styles.message}>
        <td style={styles.icon}>
          <img style={styles.iconImg} src={author.icon}/>
        </td>
        <td style={styles.messageText}>
          <div style={styles.name}>{author.name}</div>
          {
            type === 'direct_message' &&
            <div style={styles.dmCallout}>Direct Message</div>
          }
          <div style={styles.text}>
            {
              emojis.emojify(text).map((emojiText, i) => {
                return emojiText.props ? emojiText : <ReactMarkdown
                  key={i}
                  style={styles.text}
                  source={emojiText}
                  escapeHtml={true}/>
              })
            }
          </div>
          {media}
          {below}
          <div style={styles.msgPadding}></div>
        </td>
      </tr>
  }
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  author: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}

export default Message

const styles = {
  message: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  directMessage: {
    backgroundColor: grey200,
  },
  dmCallout: {
    color: grey500,
    fontStyle: 'italic',
  },
  messageText: {
    width: '100%',
    fontSize: 14,
    paddingRight: 20,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  icon: {
    paddingRight: 10,
    paddingLeft: 25,
    paddingTop: 5,
    minWidth: 50,
    verticalAlign: 'top',
  },
  iconImg: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  date: {
    fontSize: 10,
    fontStyle: 'italic',
    color: grey500,
    height: 22,
    display: 'inline-block',
  },
  text: {
    fontSize: 16,
  },
  msgPadding: {
    height: 15,
  },
}
