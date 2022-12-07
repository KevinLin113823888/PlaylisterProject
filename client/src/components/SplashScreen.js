import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import AuthContext from '../auth';
import Statusbar from './Statusbar';
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import YouTubePlayerExample from './PlaylisterYouTubePlayer.js'
import Comments from './Comments.js'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTube from 'react-youtube';
import SortIcon from '@mui/icons-material/Sort';
import Sort from '@mui/icons-material/Sort';
import { borderRadius } from '@mui/system';
import { useHistory } from 'react-router-dom';
export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const handleGuestMode = () => {
        store.setGuestMode(true);
        
        //store.resetCurrentList();
        history.push("/playlist/");
        
    }
    const handleLogin = () => {
        //store.setGuestMode(true);
        
        //store.resetCurrentList();
        //history.push("/playlist/");
        
    }
    return (
        <div id="splash-screen">
        <Box>
        <Box>
        <Typography                        
                        
                        sx={{marginRight:"100px"}}
                        style={{fontSize:"72px", fontFamily:"Satisfy" ,color:"#b81f1e",fontWeight:"bold"}}                        
                    >
                        Playlister
        </Typography>
        </Box>
        <Box>
        <div
        
        id="intro-card1"
        className="intro-card">
        <Box sx={{position:"relative",flexGrow: 1,fontSize:"20px",paddingTop:"10px",paddingLeft:"0px", width:"100%",wordWrap:"break-word"}}>
            <Box component = "span">The </Box> <Box component = "span" style={{fontFamily:"Satisfy" ,color:"#b81f1e",fontWeight:"bold"}}>Playlister </Box>
            app is a free and easy to use playlist creator and player. Create, edit, and play your own playlists as well as share your playlists so that other people around the world can then play and comment on them. Play your favorite songs through a built in YouTube player and filter through the endless playlists of other users through multiple search criterias.</Box>
    

        </div>
        </Box>
        <Box sx={{position:"absolute",fontSize:"18px",paddingTop:"20px",paddingRight:"70px", left:"43%"}}>
           Developed By Kevin Lin</Box>
        
                
           
        
        </Box>
        </div>
    )
}