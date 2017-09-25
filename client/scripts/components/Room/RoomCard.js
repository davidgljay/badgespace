import React, {PropTypes, Component} from 'react'
import {Card} from 'material-ui/Card'
import {withRouter} from 'react-router'
import NametagIcon from '../Nametag/NametagIcon'
import Badges from '../Badge/Badges'
import RaisedButton from 'material-ui/RaisedButton'

class RoomCard extends Component {

  constructor (props) {
    super(props)

    this.onJoinClick = () => {
      const {room, router} = this.props
      router.push({
        pathname: `/rooms/${room.id}`,
        state: {isJoining: true}
      })
    }
  }

  render () {
    const {room} = this.props

    return <Card key={room.id} style={styles.front} className='roomCard'>
      <div style={styles.cardContainer}>
        <div className='cardMod' style={styles.modContainer}>
          <div style={styles.modIcon}>
            <NametagIcon
              image={room.mod.image}
              name={room.mod.name}
              diameter={80} />
          </div>
          <div style={styles.modName}>{room.mod.name}</div>
          <Badges badges={room.mod.badges} />
        </div>
        <div style={styles.roomInfo}>
          <div style={styles.title}>{room.title}</div>
          <div style={styles.bio}>"{room.mod.bio}"</div>
        </div>
        <div style={styles.joinContainer}>
          <RaisedButton
            primary
            id='JoinButton'
            label={'Join'}
            onClick={this.onJoinClick} />
        </div>
      </div>
    </Card>
  }
}

const {string, shape, arrayOf, object} = PropTypes

RoomCard.proptypes = {
  room: shape({
    id: string.isRequired,
    title: string.isRequired,
    mod: shape({
      id: string.isRequired,
      name: string.isRequired,
      image: string,
      badges: arrayOf(object)
    }).isRequired
  }).isRequired
}

export default withRouter(RoomCard)

const styles = {
  cardContainer: {
    display: 'flex',
    textAlign: 'left',
    marginBottom: 60
  },
  modContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 20px 0px 20px',
    position: 'relative',
    bottom: 40,
    width: 100
  },
  modName: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    wordWrap: 'break-word'
  },
  modIcon: {
    marginLeft: 10
  },
  joinContainer: {
    margin: 30
  },
  roomInfo: {
    flex: 1
  },
  bio: {
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic'
  },
  title: {
    fontSize: 24,
    marginTop: 20
  }
}
