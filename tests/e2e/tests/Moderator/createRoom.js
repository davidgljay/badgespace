module.exports = {
  '@tags': ['login', 'MODERATOR'],
  before: client => {
    const page = client.page.RoomCards()
    const {launchUrl} = client

    client
    .url(launchUrl)

    page
    .ready()
  },
  'Moderator initiates the process to create a room': client => {
    const {room} = client.globals
    const page = client.page.RoomCards()

    page
      .startConvo(room.title)
  },
  'Moderator creates a room': client => {
    const page = client.page.CreateRoom()
    const {room, users} = client.globals

    page
      .createRoom(room, users.mod)
      .waitForElementVisible('#room')
  },
  'Moderator enters a room and posts a message': client => {
    const page = client.page.Room()
    const {room, messages, users} = client.globals

    page
      .assertLoaded(room, users.mod)
      .postMessage(messages[0])
  },
  'Moderator exits and re-enters the room': client => {
    const page = client.page.Room()
    const {room} = client.globals

    page
      .exitRoom()
      .waitForElementVisible('.roomNotif')
      .assert.containsText('.roomTitle', room.title)
      .click('.roomNotif')
  },
  'Moderator posts another message': client => {
    const page = client.page.Room()
    const {room, messages, users} = client.globals

    page
      .assertLoaded(room, users.mod)
      .postMessage(messages[1])
  },
  after: client => {
    client.end()
  }
}
