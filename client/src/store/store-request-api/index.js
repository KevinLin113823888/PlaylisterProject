/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (newListName, newSongs, userEmail, publish,userName,comments,likes,dislikes,publishDate,listens,copied) => {
    return api.post(`/playlist/`, {
        // SPECIFY THE PAYLOAD
        userName: userName,
        name: newListName,
        songs: newSongs,
        ownerEmail: userEmail,
        published: publish,
        comments:comments,
        likes:likes,
        dislikes:dislikes,
        publishDate:publishDate,
        listens:listens,
        copied:copied
    })
}
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const getPlaylists = () => api.get(`/playlistpairs/`)
export const getPlaylistPairs = () => api.get(`/playlistpairs/`)
export const getPlaylistPairsName = () => api.get(`/playlistpairsname/`)
export const getPlaylistPairsOwnCreation = () => api.get(`/playlistpairsowncreation/`)
export const getPlaylistPairsOwnEditDate = () => api.get(`/playlistpairsowneditdate/`)
export const getPublishedPlaylistPairs = () => api.get(`/playlistpublishedpairs/`)
export const getPublishedPlaylistPairsName = () => api.get(`/playlistpublishedpairsname/`)
export const getPublishedPlaylistPairsListens = () => api.get(`/playlistpublishedpairslistens/`)
export const getPublishedPlaylistPairsLikes = () => api.get(`/playlistpublishedpairslikes/`)
export const getPublishedPlaylistPairsDislikes = () => api.get(`/playlistpublishedpairsdislikes/`)
export const getPublishedPlaylistPairsDate = () => api.get(`/playlistpublishedpairsdate/`)
export const getPublishedPlaylistPairsFilter = (text) => {
    return api.get(`/playlistpublishedpairsfiltered/`, {
        
        text:text
    })
}
export const updatePlaylistById = (id, playlist) => {
    return api.put(`/playlist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist : playlist
    })
}

const apis = {
    createPlaylist,
    deletePlaylistById,
    getPlaylistById,
    getPlaylists,
    getPublishedPlaylistPairs,
    getPlaylistPairs, 
    getPlaylistPairsName,
    getPlaylistPairsOwnCreation,
    getPlaylistPairsOwnEditDate,
    updatePlaylistById,
    getPublishedPlaylistPairsFilter,
    getPublishedPlaylistPairsListens,
    getPublishedPlaylistPairsDate,
    
    getPublishedPlaylistPairsName,
    getPublishedPlaylistPairsLikes,
    getPublishedPlaylistPairsDislikes
}

export default apis
