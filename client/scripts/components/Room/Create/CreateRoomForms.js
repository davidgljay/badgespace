import React, {PropTypes} from 'react'
import WelcomeForm from './WelcomeForm'
// import ChoosePrivacy from './ChoosePrivacy'
import HostIntro from './HostIntro'
import Login from '../../User/Login'
import ChooseNorms from './ChooseNorms'
import {grey400} from 'material-ui/styles/colors'
import {track} from '../../../utils/analytics'

const getForm = ({
    error,
    stepIndex,
    updateRoom,
    nametagEdits,
    updateNametagEdit,
    setClosed,
    closedIn,
    room,
    badges,
    selectedBadges,
    searchImage,
    handleNext,
    handlePrev,
    setImageFromUrl,
    addNametagEditBadge,
    removeNametagEditBadge,
    addSelectedBadge,
    removeSelectedBadge,
    me,
    norms,
    addNorm,
    removeNorm
  }) => {
  switch (stepIndex) {
    case 0:
      return <div>
        <WelcomeForm
          error={error}
          updateRoom={updateRoom}
          welcome={room.welcome} />
      </div>
    case 1:
      return <div>
        <ChooseNorms
          error={error}
          style={styles.chooseNorms}
          addNorm={addNorm}
          normsObj={norms}
          updateRoom={updateRoom}
          room={room}
          removeNorm={removeNorm} />
      </div>
      // return <div>
      //   <h4>What would you like to talk about?</h4>
      //   <TitleForm
      //     error={error}
      //     updateRoom={updateRoom}
      //     setClosed={setClosed}
      //     closedIn={closedIn}
      //     title={room.title}
      //     desc={room.description} />
      //   <ChoosePrivacy
      //     badges={badges}
      //     adminTemplates={me.adminTemplates}
      //     selectedBadges={selectedBadges}
      //     addSelectedBadge={addSelectedBadge}
      //     removeSelectedBadge={removeSelectedBadge} />
      // </div>
    case 2:
      // track('CREATE_ROOM_TITLE')
      return <h1>Login</h1>
      //TODO: Add Login
      // return <div>
      //   {
      //     !room.image && <h4>Please select an image for this conversation.</h4>
      //   }
      //   <ImageSearch
      //     error={error}
      //     style={styles.imageSearch}
      //     handleNext={handleNext}
      //     handlePrev={handlePrev}
      //     setImageFromUrl={setImageFromUrl}
      //     searchImage={searchImage}
      //     updateRoom={updateRoom} />
      // </div>
    case 3:
      return <div>
        <HostIntro
          nametagEdits={nametagEdits}
          selectedBadges={selectedBadges}
          addNametagEditBadge={addNametagEditBadge}
          removeNametagEditBadge={removeNametagEditBadge}
          updateNametagEdit={updateNametagEdit}
          me={me}
          error={error}
          />
      </div>
    case 3:
      track('CREATE_ROOM_NAMETAG')
    case 4:
      track('CREATE_ROOM_NORMS')
      return <div>
        <h4>Ready to publish this conversation?</h4>
      </div>
    default:
      return 'Something has gone wrong!'
  }
}

const CreateRoomForms = (props) => {
  return <div>
    {
      getForm(props)
    }
  </div>
}

const {string, number, func, shape, object, arrayOf} = PropTypes

CreateRoomForms.propTypes = {
  error: object,
  stepIndex: number.isRequired,
  updateRoom: func.isRequired,
  updateNametagEdit: func.isRequired,
  room: shape({
    title: string.isRequired,
    image: string.isRequired,
    description: string.isRequired
  }).isRequired,
  searchImage: func.isRequired,
  setImageFromUrl: func.isRequired,
  nametagEdits: object.isRequired,
  addNametagEditBadge: func.isRequired,
  removeNametagEditBadge: func.isRequired,
  me: shape({
    badges: arrayOf(shape({
      id: string.isRequired
    })).isRequired
  }).isRequired,
  norms: object.isRequired,
  addNorm: func.isRequired,
  removeNorm: func.isRequired
}

export default CreateRoomForms

const styles = {
  imageSearch: {
    maxWidth: 600
  },
  userBadges: {
    width: 270,
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: 100,
    verticalAlign: 'top',
    padding: 5,
    margin: 5
  },
  userBadgeText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: grey400
  },
  editNametagContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  chooseNorms: {
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}
