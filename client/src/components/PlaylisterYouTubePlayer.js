import { Box } from '@mui/material';

import YouTube from 'react-youtube';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { fontSize } from '@mui/system';
import { GlobalStoreContext } from '../store'
import React, { useContext, useEffect,useState } from 'react'

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { store } = useContext(GlobalStoreContext);
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    const [ songNum, setSongNum ] = useState(0);
    const [playered, setPlayered] = useState(null);
    const [title, setTitle] = useState("");
    let playlist = getYouTubeIdsFromCurrentList();
    
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    //let currentSong = 0;
    let player;
    const playerOptions = {
        height: '232',
        width: '530',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    function getYouTubeIdsFromCurrentList(){
        let ytplaylist = [];
        
        if(store.currentList){
            ytplaylist = [];
        let i =0;
        
        for(i=0;i<store.currentList.songs.length;i++){
            ytplaylist.push(store.currentList.songs[i].youTubeId);
            console.log(store.currentList.songs);
        }
        console.log(ytplaylist);
        
        }
        
        return ytplaylist;
    }
    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    let curSong;
    if(store.currentList){
     curSong = store.currentList.songs[songNum];
     console.log("WHO");
     console.log(curSong);
    }
    function loadAndPlayCurrentSong(player) {
        
        let song = playlist[songNum];
        
        //if(playered){
        player.loadVideoById(song);
        
        player.playVideo();
        
        //}
        
    }
    function handlePlaySong(){
        playered.playVideo();
        store.incrementListens();
    }
    function handlePauseSong(){
        playered.pauseVideo();
    }
    function handleNextSong(){
        
        console.log(player);
       incSong();
       let song = playlist[songNum];
       
       playered.loadVideoById(song);
       curSong = store.currentList.songs[songNum];
       setTitle(store.currentList.songs[songNum].title);
       console.log("TOOT");
       console.log(curSong);
       
    }
    function handlePreviousSong(){
        decSong();
       let song = playlist[songNum];
       playered.loadVideoById(song);
       curSong = store.currentList.songs[songNum];
    }
    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        let currentSong = songNum+1;
        
        currentSong = currentSong % playlist.length;
        setSongNum(currentSong);
        //setSongNum();
    }
    function decSong() {
        let currentSong = songNum;
        if(currentSong>0){
        currentSong--;
        }else{
            currentSong = playlist.length-1;
        }
        setSongNum(currentSong);
    }
    function nextVid(){
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
        setPlayered(player);
        
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
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
        }
    }
    let youTubeP = <Box> <YouTube
    videoId={playlist[songNum]}
    opts={playerOptions}
    onReady={onPlayerReady}
    onStateChange={onPlayerStateChange} />  <Box
        
        
    sx={{ height: "187px",borderRadius:"10px",marginTop: '0px', display: 'flex',justifyContent: 'center', p: 1, bgcolor:"#fff", border: 1, borderColor:"#000000"}}
    style={{ width: '77%', fontSize: '25pt' }}
    
    >
 <Box sx={{ flexGrow: 1,justifyContent: 'center' ,fontSize:"20px"}}><Box sx={{textAlign:"center"}}>Now Playing</Box><Box sx={{flexGrow: 1,fontSize:"20px" }}>Playlist: </Box>
 <Box sx={{flexGrow: 1,fontSize:"20px" }}>Song #:  </Box> <Box sx={{flexGrow: 1,fontSize:"20px" }}>Title:  </Box> <Box sx={{flexGrow: 1,fontSize:"20px" }}>Artist:  </Box>
 <Box
    
    
    sx={{ height: "50px",borderRadius:"10px",marginLeft: '30px', display: 'flex', p: 1,justifyContent: 'center', bgcolor:"#fff", border: 1, borderColor:"#000000"}}
    style={{ width: '80%', fontSize: '25pt' }}
    
    >
        <div><IconButton onClick={handlePreviousSong} aria-label='extend' id= "users">
            <FastRewindIcon style={{fontSize:'30pt', color: "#000000"}} />
        </IconButton></div>
        <div><IconButton onClick={handlePauseSong} aria-label='extend' id= "users">
            <StopIcon style={{fontSize:'30pt', color: "#000000"}} />
        </IconButton></div>
        <div><IconButton onClick={handlePlaySong} aria-label='extend' id= "users">
            <PlayArrowIcon style={{fontSize:'30pt', color: "#000000"}} />
        </IconButton></div>
        <div><IconButton onClick={handleNextSong} aria-label='extend' id= "users">
            <FastForwardIcon style={{fontSize:'30pt', color: "#000000"}} />
        </IconButton></div>

</Box>
</Box>
 

</Box></Box>;
    if(store.currentList&&store.currentList.songs.length>0){
        youTubeP = <Box> <YouTube
        videoId={playlist[songNum]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />  <Box
            
            
        sx={{ height: "187px",borderRadius:"10px",marginTop: '0px', display: 'flex',justifyContent: 'center', p: 1, bgcolor:"#fff", border: 1, borderColor:"#000000"}}
        style={{ width: '77%', fontSize: '25pt' }}
        
        >
     <Box sx={{ flexGrow: 1,justifyContent: 'center' ,fontSize:"20px"}}><Box sx={{textAlign:"center"}}>Now Playing</Box><Box sx={{flexGrow: 1,fontSize:"20px" }}>Playlist: {store.currentList.name} </Box>
     <Box sx={{flexGrow: 1,fontSize:"20px" }}>Song #: {songNum+1} </Box> <Box sx={{flexGrow: 1,fontSize:"20px" }}>Title: {store.currentList.songs[songNum].title} </Box> <Box sx={{flexGrow: 1,fontSize:"20px" }}>Artist: {store.currentList.songs[songNum].artist} </Box>
     
     <Box
        
        
        sx={{ height: "50px",borderRadius:"10px",marginLeft: '40px', display: 'flex', p: 1,justifyContent: 'center', bgcolor:"#fff", border: 1, borderColor:"#000000"}}
        style={{ width: '80%', fontSize: '25pt' }}
        
        >
            <div><IconButton onClick={handlePreviousSong} aria-label='extend' id= "users">
                <FastRewindIcon style={{fontSize:'30pt', color: "#000000"}} />
            </IconButton></div>
            <div><IconButton onClick={handlePauseSong} aria-label='extend' id= "users">
                <StopIcon style={{fontSize:'30pt', color: "#000000"}} />
            </IconButton></div>
            <div><IconButton onClick={handlePlaySong} aria-label='extend' id= "users">
                <PlayArrowIcon style={{fontSize:'30pt', color: "#000000"}} />
            </IconButton></div>
            <div><IconButton onClick={handleNextSong} aria-label='extend' id= "users">
                <FastForwardIcon style={{fontSize:'30pt', color: "#000000"}} />
            </IconButton></div>
    
    </Box>
    </Box>
     
    
    </Box></Box>;
    }
    return youTubeP;
}