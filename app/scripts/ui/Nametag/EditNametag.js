import React, { Component, PropTypes } from 'react';
import errorLog from '../../utils/errorLog';
import Alert from '../Utils/Alert';
import { DropTarget } from 'react-dnd';
import { dragTypes } from '../../constants';

const nametagTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class EditNametag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      alertType: null,
    };
  }

  render() {
    // TODO: Figure out image caching
    // TODO: change id to make sense once dragging works
    return this.props.connectDropTarget(<div id="editNametag" className="profile">
          <div className="form-group">
            <img
              src="https://s3.amazonaws.com/badgeproject_icons/users/dj_cropped.jpg"
              className="img-circle icon"/>
            <div className="nametagFields">
                <input
                  type="text"
                  className="form-control name"
                  id="participantName"
                  onChange={this.props.updateNametag('name')}
                  value={this.props.nametag.name}
                  placeholder='Name'/>
                <textarea
                  rows="3"
                  className="form-control bio"
                  id="participantDescription"
                  onChange={this.props.updateNametag('bio')}
                  value={this.props.nametag.bio}
                  placeholder='Why are you joining this conversation?'/>
            </div>
          </div>
        </div>);
  }
}

EditNametag.propTypes = {
  updateNametag: PropTypes.func,
  nametag: PropTypes.object,
  isOver: PropTypes.bool.isRequired,
};

export default DropTarget(dragTypes.certificate, nametagTarget, collect)(EditNametag);
