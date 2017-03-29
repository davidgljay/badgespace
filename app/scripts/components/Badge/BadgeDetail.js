import React, {Component, PropTypes} from 'react'
import Badge from './Badge'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import EditNametag from '../Nametag/EditNametag'
import CircularProgress from 'material-ui/CircularProgress'
import {indigo500} from 'material-ui/styles/colors'
import Navbar from '../Utils/Navbar'
import Login from '../User/Login'
import QRcode from 'qrcode.react'

class BadgeDetail extends Component {

  constructor (props) {
    super(props)

    this.state = {
      showQR: false
    }

    this.onRequestClick = () => {
      const {nametagEdits, createNametag, data: {template: {id}}} = this.props
      createNametag(nametagEdits[id])
      //TODO: Send to homepage with message, possibly via Router.link?
    }

    this.onEmailClick = () => {
      const path = `https://${window.location.host}/badges/${this.props.template.id}`
      window.open = (`mailto:?&subject=${encodeURIComponent('You\'ve been granted a certificate on Nametag!')}` +
               `&body=${encodeURIComponent(`To claim your certificate just visit this URL.\n\n${path}`)}`, '_blank').focus()
    }

    this.onClipboardClick = () => {
      document.querySelector('#hiddenPath').select()
      try {
        const successful = document.execCommand('copy')
        this.setState({copySuccess: successful})
      } catch (err) {
        console.error('Oops, unable to copy')
      }
    }

    this.onQRClick = () => {
      this.setState({showQR: !this.state.showQR})
    }

    this.onHomeClick = () => {
      window.location = '/rooms'
    }
  }

  componentDidMount () {
    const {fetchBadges, certificateId} = this.props
    fetchBadges([certificateId])
  }

  render () {
    const {
      params,
      data: {me, template, loading},
      nametagEdits,
      updateNametagEdit,
      addNametagEditBadge,
      removeNametagEditBadge
    } = this.props
    const path = `https://${window.location.host}/badges/${template.id}`
    const shareMode = !!params.granterId

    if (loading) {
      return <div style={styles.spinner}>
        <CircularProgress />
      </div>
    }

    let headerText
    let claimButton

    headerText = shareMode
    ? <div>
      <div style={styles.header}>
        <h3>Your certificate has been created.</h3>
        <div>You can share this URL with the people you would like to grant it to.</div>
      </div>
      <input
        type='text'
        id='hiddenPath'
        value={path} />
      <div style={styles.shareButtons}>
        <FlatButton
          style={styles.button}
          onClick={this.onEmailClick}
          label='E-MAIL' />
        <FlatButton
          style={styles.button}
          onClick={this.onClipboardClick}
          label='COPY TO CLIPBOARD' />
        <FlatButton
          style={styles.button}
          onClick={this.onQRClick}
          label='SHOW QR CODE' />
      </div>
    </div>
      : <div style={styles.header}>
        <h3>Request This Badge</h3>
        Claim it so that you can show it off! Badges
        let others know why you are worthy of trust and respect.
        They can also give you access to exclusive communities.
      </div>

    if (!shareMode) {
      claimButton = null
    } else if (!me) {
      claimButton = <Login message={'Log in to claim'} />
    } else {
      claimButton = <div style={styles.claimButton}>
        <div>
          {template.granter.name} will need to know a little about you before granting you
          this badge. What would you like to share?
        </div>
        <EditNametag
          nametagEdit={nametagEdits[template.id]}
          me={me}
          template={template.id}
          updateNametagEdit={updateNametagEdit}
          addNametagEditBadge={addNametagEditBadge}
          removeNametagEditBadge={removeNametagEditBadge} />
        <RaisedButton
          style={styles.button}
          labelStyle={styles.buttonLabel}
          backgroundColor={indigo500}
          onClick={this.onRequestClick}
          label='REQUEST THIS BADGE' />
      </div>
    }

    return <div>
      <Navbar
        me={me} />
      <div style={styles.certDetailContainer}>
        {
          headerText
        }
        {
          this.state.copySuccess &&
          <div style={styles.copySuccess}>
            Copied!
          </div>
        }
        {
          this.state.showQR &&
          <div style={styles.QRcode}>
            <QRcode value={window.location.href} size={256} />
          </div>
        }
        <div style={styles.certDetail}>
          <Badge
            badge={{template, notes: []}}
            draggable={false}
            expanded />
        </div>
        {claimButton}
      </div>
    </div>
  }
}

BadgeDetail.propTypes = {
  createNametag: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    template: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      granter: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      }).isRequired
    }),
    me: PropTypes.shape({
      displayNames: PropTypes.arrayOf(PropTypes.string).isRequired,
      icons: PropTypes.arrayOf(PropTypes.string).isRequired,
      badges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
    })
  }).isRequired
}

export default BadgeDetail

const styles = {
  header: {
    textAlign: 'center',
    maxWidth: 450
  },
  certDetailContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  certDetail: {
    fontSize: 16,
    lineHeight: '20px',
    maxWidth: 350
  },
  claimButton: {
    margin: 30
  },
  buttonLabel: {
    color: '#fff'
  },
  shareButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  QRcode: {
    margin: 20
  },
  copySuccess: {
    color: 'green',
    fontSize: 12
  },
  spinner: {
    marginLeft: '45%',
    marginTop: '40vh'
  }
}
