import { Box } from '@mui/material';

import YouTube from 'react-youtube';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { fontSize } from '@mui/system';
import { GlobalStoreContext } from '../store'
import React, { useContext, useEffect, useState } from 'react'

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { store } = useContext(GlobalStoreContext);
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    const [songNum, setSongNum] = useState(0);
    const [curId, setcurId] = useState("");
    const [playered, setPlayered] = useState(null);
    const [title, setTitle] = useState("");
    let curSong;
    let playlist = getYouTubeIdsFromCurrentList();

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    //let currentSong = 0;
    let player;
    const playerOptions = {
        height: '175vw',
        width: '80%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    function getYouTubeIdsFromCurrentList() {
        let ytplaylist = [];

        if (store.currentPlayedList) {
            ytplaylist = [];
            let i = 0;

            for (i = 0; i < store.currentPlayedList.songs.length; i++) {
                ytplaylist.push(store.currentPlayedList.songs[i].youTubeId);

            }
            if (store.currentPlayedList._id != curId) {
                setcurId(store.currentPlayedList._id);

                setSongNum(0);
                curSong = store.currentPlayedList.songs[0];
                store.setCurrentSongInd(0);
            }


        }

        return ytplaylist;
    }
    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT

    if (store.currentPlayedList) {
        if (store.currentPlayedList.songs.length - 1 >= songNum) {
            curSong = store.currentPlayedList.songs[songNum];
        } else {

            if (store.currentPlayedList.songs.length > 0) {
                setSongNum(0);
                curSong = store.currentPlayedList.songs[songNum];
                store.setCurrentSongInd(0);
            }
        }

    }
    function loadAndPlayCurrentSong(player) {

        let song = playlist[songNum];

        //if(playered){
        player.loadVideoById(song);

        player.playVideo();

        //}

    }
    function handlePlaySong() {
        playered.playVideo();
        store.incrementListens();
    }
    function handlePauseSong() {
        playered.pauseVideo();
    }
    function handleNextSong() {


        incSong();
        let song = playlist[songNum];

        playered.loadVideoById(song);
        playered.playVideo();
        curSong = store.currentPlayedList.songs[songNum];
        setTitle(store.currentPlayedList.songs[songNum].title);


    }
    function handlePreviousSong() {
        decSong();
        let song = playlist[songNum];
        playered.loadVideoById(song);
        playered.playVideo();
        curSong = store.currentPlayedList.songs[songNum];
    }
    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        let currentSong = songNum + 1;

        currentSong = currentSong % playlist.length;
        setSongNum(currentSong);
        store.setCurrentSongInd(currentSong);

        playered.playVideo();
        //setSongNum();
    }
    function decSong() {
        let currentSong = songNum;
        if (currentSong > 0) {
            currentSong--;
        } else {
            currentSong = playlist.length - 1;
        }
        setSongNum(currentSong);
        store.setCurrentSongInd(currentSong);
    }
    function nextVid() {
        player.nextVideo();
    }

    function onPlayerReady(event) {

        player = event.target;
        //setPlayered(player);

        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();

    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        player = event.target;
        console.log(player);
        setPlayered(player);

        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            //playered.playVideo();
            incSong();
            //playered.playVideo();
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
            if (songNum != 0) {
                player.playVideo();
            }

        }
    }
    let youTubeP = <Box> <YouTube
        videoId={playlist[songNum]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />
        <Box

            sx={{ height: "10.35vw", borderRadius: ".8vw", marginTop: '0vw', display: 'flex', justifyContent: 'center', p: 1, bgcolor: "#fff", border: 1, borderColor: "#000000" }}
            style={{ width: '77%', fontSize: '25pt', backgroundColor: "#d4d4f5" }}

        >
            <Box sx={{ flexGrow: 1, justifyContent: 'center', fontSize: "1.2vw" }} style={{ fontWeight: "bold" }}><Box sx={{ textAlign: "center" }}>Now Playing</Box><Box sx={{ flexGrow: 1, fontSize: "1.2vw" }}>Playlist: </Box>
                <Box sx={{ flexGrow: 1, fontSize: "1.2vw" }}>Song #:  </Box> <Box sx={{ flexGrow: 1, fontSize: "1.2vw" }}>Title:  </Box> <Box sx={{ flexGrow: 1, fontSize: "1.2vw" }}>Artist:  </Box>
                <Box


                    sx={{ height: "3.5vw", borderRadius: ".8vw", marginLeft: '4vw', display: 'flex', p: 0, justifyContent: 'center', bgcolor: "#fff", border: 1, borderColor: "#000000" }}
                    style={{ width: '80%' }}

                >
                    <div><IconButton onClick={handlePreviousSong} disabled={true} aria-label='extend' id="users">
                        <FastRewindIcon style={{ fontSize: '2.5vw', color: "#000000" }} />
                    </IconButton></div>
                    <div><IconButton onClick={handlePauseSong} disabled={true} aria-label='extend' id="users">
                        <StopIcon style={{ fontSize: '2.5vw', color: "#000000" }} />
                    </IconButton></div>
                    <div><IconButton onClick={handlePlaySong} disabled={true} aria-label='extend' id="users">
                        <PlayArrowIcon style={{ fontSize: '2.5vw', color: "#000000" }} />
                    </IconButton></div>
                    <div><IconButton onClick={handleNextSong} disabled={true} aria-label='extend' id="users">
                        <FastForwardIcon style={{ fontSize: '2.5vw', color: "#000000" }} />
                    </IconButton></div>

                </Box>
            </Box>


        </Box></Box>;
    if (store.currentPlayedList && store.currentPlayedList.songs.length > 0 && (store.currentPlayedList.songs.length - 1 >= songNum)) {
        youTubeP = <Box> <YouTube
            videoId={playlist[songNum]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />  <Box


                sx={{ height: "10.35vw", borderRadius: ".8vw", marginTop: '0vw', display: 'flex', justifyContent: 'center', p: 1, bgcolor: "#fff", border: 1, borderColor: "#000000" }}
                style={{ width: '77%', fontSize: '25pt', backgroundColor: "#d4d4f5" }}

            >
                <Box sx={{ flexGrow: 1, justifyContent: 'center', fontSize: "1.2vw" }} style={{ fontWeight: "bold" }}><Box sx={{ textAlign: "center" }}>Now Playing</Box><Box sx={{ flexGrow: 1, fontSize: "1.2vw" }}>Playlist: {store.currentPlayedList.name} </Box>
                    <Box sx={{ flexGrow: 1, fontSize: "1.2vw" }}>Song #: {songNum + 1} </Box> <Box sx={{ flexGrow: 1, fontSize: "1.2vw" }}>Title: {store.currentPlayedList.songs[songNum].title} </Box> <Box sx={{ flexGrow: 1, fontSize: "1.2vw" }}>Artist: {store.currentPlayedList.songs[songNum].artist} </Box>

                    <Box


                        sx={{ height: "3.5vw", borderRadius: ".8vw", marginLeft: '4vw', display: 'flex', p: 0, justifyContent: 'center', bgcolor: "#fff", border: 1, borderColor: "#000000" }}
                        style={{ width: '80%', fontSize: '25pt' }}

                    >
                        <div><IconButton onClick={handlePreviousSong} aria-label='extend' id="users">
                            <FastRewindIcon style={{ fontSize: '2.5vw', color: "#000000" }} />
                        </IconButton></div>
                        <div><IconButton onClick={handlePauseSong} aria-label='extend' id="users">
                            <StopIcon style={{ fontSize: '2.5vw', color: "#000000" }} />
                        </IconButton></div>
                        <div><IconButton onClick={handlePlaySong} aria-label='extend' id="users">
                            <PlayArrowIcon style={{ fontSize: '2.5vw', color: "#000000" }} />
                        </IconButton></div>
                        <div><IconButton onClick={handleNextSong} aria-label='extend' id="users">
                            <FastForwardIcon style={{ fontSize: '2.5vw', color: "#000000" }} />
                        </IconButton></div>

                    </Box>
                </Box>


            </Box></Box>;
    }
    return youTubeP;
}