import React, { useContext, useEffect, useState } from 'react'
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
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh">
                    <div>
                        <Typography
                            style={{ fontSize: "4vw", fontFamily: "Satisfy", color: "#b81f1e", fontWeight: "bold" }}
                        >
                            Playlister
                        </Typography>
                    </div>
                    <div
                            id="intro-card1"
                            className="intro-card">
                    <Box>
                        
                            <Box sx={{ fontSize: "1.3vw", paddingTop: "1vw", paddingLeft: "0vw", wordWrap: "break-word" }}>
                                <Box component="span">The </Box> <Box component="span" style={{ fontFamily: "Satisfy", color: "#b81f1e", fontWeight: "bold" }}>Playlister </Box>
                                app is a free and easy to use playlist creator and player. Create, edit, and play your own playlists as well as share your playlists so that other people around the world can then play and comment on them. Play your favorite songs through a built in YouTube player and filter through the endless playlists of other users through multiple search criterias.</Box>
                    </Box>
                    </div>

                    <Box sx={{ fontSize: "1.2vw" }}>
                        Developed By Kevin Lin</Box>

                </Box>
            </Box>
        </div>
    )
}