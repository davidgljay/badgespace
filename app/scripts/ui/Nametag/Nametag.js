import React, { Component, PropTypes } from 'react'
import Certificates from '../Certificate/Certificates'
import style from '../../../styles/Nametag/Nametag.css'

class Nametag extends Component {
  componentWillMount() {
    this.props.subscribe(this.props.id, this.props.roomId)
  }

  componentDidUnMount() {
    this.props.unsubscribe(this.props.id, this.props.roomId)
  }

  render() {
    let star = ''

    // Show if user is a mod.
    if (this.props.mod === this.props.id) {
      star = <div className={style.ismod}>
          <span className={style.hosticon + ' glyphicon glyphicon-star'} aria-hidden="true"></span>
          <div className={style.modTitle}>Host</div>
          </div>
    }

    return <div key={this.props.name} >
        {star}
        <img src={this.props.icon} alt={this.props.name} className={style.icon + ' img-circle'}/>
        <div className={style.name}>{this.props.name}</div>
        <div className={style.bio}>{this.props.bio}</div>
      </div>
  }
}

Nametag.propTypes = {
  id: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
}

export default Nametag
