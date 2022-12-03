/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', PlaylistController.getPlaylistById)


router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/playlistpairsname', auth.verify, PlaylistController.getPlaylistPairsName)
router.get('/playlistpairsowncreation', auth.verify, PlaylistController.getPlaylistPairsOwnCreation)
router.get('/playlistpairsowneditdate', auth.verify, PlaylistController.getPlaylistPairsOwnEditDate)
router.get('/playlistpublishedpairs', PlaylistController.getPublishedPlaylistPairs)

router.get('/playlistpublishedpairsfiltered', PlaylistController.getPublishedPlaylistPairsFilter)
router.get('/playlistpublishedpairsname', PlaylistController.getPublishedPlaylistPairsName)
router.get('/playlistpublishedpairslistens', PlaylistController.getPublishedPlaylistPairsListens)
router.get('/playlistpublishedpairslikes', PlaylistController.getPublishedPlaylistPairsLikes)
router.get('/playlistpublishedpairsdislikes', PlaylistController.getPublishedPlaylistPairsDislikes)
router.get('/playlistpublishedpairsdate', PlaylistController.getPublishedPlaylistPairsDate)
//router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
//router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylists)

router.put('/playlist/:id', PlaylistController.updatePlaylist)

module.exports = router