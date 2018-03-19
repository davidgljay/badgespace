module.exports = (req, res, next, conn) => {
  const {models: {Rooms}} = new Context({}, conn)
  const roomShortLink = /\/r\/([a-z0-9]+)/.exec(req.url)[1]
  return Rooms.getByShortLink(roomShortLink)
    .then(roomId =>
      roomId ? res.redirect(`/rooms/${roomId}`)
      : res.render('404.pug')
    )
    .catch(() => res.render('404.pug'))
}
