import React, {Component, PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import {grey, primary} from '../../../styles/colors'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import t from '../../utils/i18n'
import TextField from 'material-ui/TextField'
import {track} from '../../utils/analytics'
import validEmail from '../../utils/validEmail'

class ContactDialog extends Component {

  constructor (props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      organization: '',
      note: '',
      sent: false,
      nameError: '',
      emailError: '',
      orgError: ''
    }

    this.setItem = item => e => {
      e.preventDetfault
      this.setState({[item]: e.target.value})
    }

    this.onSubmit = (e) => {
      e.preventDefault()
      const {name, email, organization, note} = this.state
      const {contactForm, reason} = this.props

      let emailError = email ? '' : t('required-field')
      if (email && !validEmail(email)) {
        emailError = t('invalid-email')
      }
      const nameError = name ? '' : t('required-field')
      const orgError = organization ? '' : t('required-field')

      if (nameError || emailError || orgError) {
        this.setState({
          nameError,
          emailError,
          orgError
        })
        return
      }

      track('CONTACT_SUBMIT')

      contactForm(name, email, organization, note, reason)
      this.setState({sent: true})
    }
  }

  render () {
    const {closeDialog, reason} = this.props
    const {sent, nameError, orgError, emailError} = this.state

    const title = reason === 'demoRequest' ? 'Request A Demo' : 'Contact Us'

    return <div>
      <Dialog
        modal={false}
        contentStyle={styles.dialog}
        bodyStyle={styles.bodyStyle}
        open={!!reason}
        onRequestClose={closeDialog}>
        <FontIcon
          onClick={closeDialog}
          style={styles.closeIcon}
          className='material-icons'>
          close
        </FontIcon>
        <h3 style={styles.header}>{sent ? 'Thanks, we\'ll reach out to you shortly.' : title}</h3>
        {
          sent
          ? <div style={styles.buttonContainer}>
            <RaisedButton
              onClick={closeDialog}
              label={t('room.close')}
              primary />
          </div>
          : <div style={styles.container} onSubmit={this.onSubmit}>
            <TextField
              id='name'
              type='text'
              floatingLabelText='Name'
              errorText={nameError}
              style={styles.input}
              onChange={this.setItem('name')}
              />
            <TextField
              id='email'
              type='text'
              floatingLabelText='E-mail'
              errorText={emailError}
              style={styles.input}
              onChange={this.setItem('email')} />
            <TextField
              id='organization'
              type='text'
              floatingLabelText='Organization'
              errorText={orgError}
              style={styles.input}
              onChange={this.setItem('organization')} />
            <TextField
              id='note'
              multiLine
              floatingLabelText={'Anything else you\'d like to add?'}
              style={styles.input}
              onChange={this.setItem('note')} />
            <div style={styles.buttonContainer}>
              <RaisedButton
                onClick={this.onSubmit}
                label={title}
                primary />
            </div>
          </div>
        }
      </Dialog>
    </div>
  }
}

const {func, string} = PropTypes

ContactDialog.propTypes = {
  closeDialog: func.isRequired,
  contactForm: func.isRequired,
  reason: string
}

export default ContactDialog

const styles = {
  dialog: {
    width: 400
  },
  header: {
    textAlign: 'center',
    color: primary
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: 20
  },
  bodyStyle: {
    overflowY: 'auto'
  },
  closeIcon: {
    float: 'right',
    cursor: 'pointer',
    color: grey
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: '100%'
  }
}
