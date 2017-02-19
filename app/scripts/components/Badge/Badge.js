import React, { Component, PropTypes } from 'react'
import moment from '../../../bower_components/moment/moment'
import { dragTypes } from '../../constants'
import { DragSource } from 'react-dnd'
import { Card } from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon'
import trackEvent from '../../utils/analytics'
import ImageUpload from '../Utils/ImageUpload'
import CircularProgress from 'material-ui/CircularProgress'

const certSource = {
  beginDrag (props) {
    return props.certificate
  },
  endDrag (props) {
    if (props.removeFromSource) {
      props.removeFromSource(props.certificate.id)
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    connectDragPreview: connect.dragPreview()
  }
}

class Badge extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  toggleExpanded () {
    trackEvent('TOGGLE_CERT')
    this.setState({expanded: !this.state.expanded})
  }

  componentDidMount () {
    this.setState({expanded: this.props.expanded})
  }

  render () {
    if (!this.props.certificate) {
      return null
    }

    // Show an icon if one exists, or a manu to upload an icon if showIconUpload is enabled
    let icon
    if (this.props.certificate.icon_array) {
      icon = <img style={styles.icon} alt='icon' src={this.props.certificate.icon_array[0]} />
    } else if (this.props.showIconUpload) {
      icon = this.state.uploading
      ? <CircularProgress />
        : <ImageUpload
          width={50}
          onChooseFile={() => this.setState({uploading: true})}
          onUploadFile={this.props.onUploadImage} />
    }

    // Show expanded or collapsed certificate
    let certificate
    if (this.state.expanded) {
      certificate = <div>
        <Card style={styles.certificateExpanded}>
          <FontIcon
            style={styles.close}
            className='material-icons'
            onClick={this.toggleExpanded}>
                close
              </FontIcon>
          <div style={styles.cardHeader}>
            <div>
              {icon}
            </div>
            <div>
              <div style={styles.name}>{this.props.certificate.name}</div>
              <div style={styles.granter}>
                <em>Verified by: </em><br />{this.props.certificate.granter}
              </div>
            </div>
          </div>
          <div style={styles.description}>{this.props.certificate.description_array[0]}</div>
          <div style={styles.notes}>
            {this.props.certificate.notes.map((note) => {
              return <div style={styles.note} key={note.date}>
                <div style={styles.date}>{moment(note.date).format('MMMM Do, YYYY')}</div>
                <div style={styles.msg}>{': ' + note.msg}</div>
              </div>
            })}
          </div>
        </Card>
      </div>
    } else {
      let chipStyle = styles.certificateChip
      if (this.props.isDragging && this.props.currentOffset) {
        chipStyle = Object.assign({}, styles.certificateChip,
          {
            position: 'relative',
            top: this.props.currentOffset.y - this.props.initialOffset.y - 20,
            left: this.props.currentOffset.x - this.props.initialOffset.x
          })
      }
      certificate = <div
        style={chipStyle}
        className='mdl-shadow--2dp'
        onClick={this.toggleExpanded}>
        {
            this.props.certificate.icon_array
            ? <div style={Object.assign({}, styles.miniIcon, {background: 'url(' + this.props.certificate.icon_array[0] + ') 0 0 / cover'})} />
             : <div style={styles.spacer} />
          }
        <div style={styles.chipText}>{this.props.certificate.name}</div>
      </div>
    }

    // Make some badges draggable
    if (this.props.draggable) {
      certificate = this.props.connectDragSource(certificate)
    }
    return certificate
  }
}

Badge.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  draggable: PropTypes.bool.isRequired,
  certificate: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
  removeFromSource: PropTypes.func,
  showIconUpload: PropTypes.bool,
  onUploadImage: PropTypes.func
}

export default DragSource(dragTypes.certificate, certSource, collect)(Badge)

const styles = {
  certificateChip: {
    height: 22,
    borderRadius: 11,
    display: 'inline-block',
    background: '#dedede',
    margin: 4,
    fontSize: 12,
    lineHeight: '22px',
    cursor: 'pointer',
    userSelect: 'none'
  },
  miniIcon: {
    height: 22,
    width: 22,
    borderRadius: 11,
    marginRight: 4,
    fontSize: 12,
    display: 'inline-block',
    lineHeight: '22px',
    verticalAlign: 'top'
  },
  chipText: {
    display: 'inline-block',
    paddingRight: 10
  },
  spacer: {
    width: 10,
    height: 10,
    display: 'inline-block'
  },
  certificateExpanded: {
    margin: 5,
    marginTop: 30,
    padding: 10,
    width: '96%',
    minHeight: 100,
    borderRadius: 11,
    background: '#dedede',
    textAlign: 'left'
  },
  cardHeader: {
    display: 'flex',
    flexBasis: 'auto'
  },
  close: {
    fontSize: 18,
    float: 'right',
    padding: 10,
    cursor: 'pointer'
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 3
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  granter: {
    fontSize: 12
  },
  description: {
    textAlign: 'left'
  },
  note: {
    fontSize: 12
  },
  date: {
    fontStyle: 'italic',
    float: 'left'
  }
}