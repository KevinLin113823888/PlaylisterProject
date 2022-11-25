import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
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
import InputLabel from '@mui/material/InputLabel';
import YouTubePlayerExample from './PlaylisterYouTubePlayer.js'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTube from 'react-youtube';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ search, setSearch ] = useState("");
    const [ tab, setTab ] = useState(true);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        
        try{
        auth.getLoggedIn();
        
        store.createNewList();
        }catch(e){}
        
    }
    function handleUsersPlaylists() {
        console.log("Hey");
        //store.setView("users");
        store.showPublishedListsUsers();
        //store.setView("users");
        //store.closeCurrentList();
        
    }
    function handleAllPlaylists() {
        //store.setView("all");
        store.showPublishedListsAll();
        //store.setView("all");
        //store.closeCurrentList();
        
    }
    function handleOwnPlaylists(){
        store.loadIdNamePairs();
        store.setView("home");
        //store.closeCurrentList();
    }
    function handleUpdateSearch(event) {
        setSearch(event.target.value);
    }
    function handleYoutubeClick() {
        setTab(true);
    }
    function handleCommentsClick() {
        setTab(false);
    }

    function handleKeyPress(event) {
        
        if (event.code === "Enter") {
            store.showPublishedListsFiltered(search);
        }
    }
    function handlePlaySong(){
        
    }
    let listCard = "";
    console.log("SETTING");
    console.log(auth.user);
    let currentTab =<div></div>
    if(tab){
        currentTab = <YouTubePlayerExample />
    }
    if (store) {
        listCard = 
            <List sx={{ width: '97%', left: '0%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair,index2) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        index2 = {index2}
                        idA = {index2 + "a"}
                        idB = {index2 + "b"}
                        id2 = {pair._id}
                    />
                ))
            }
            </List>;
    }
    return (
        <Box sx={{ display: 'flex' }}>
            
            <div><IconButton onClick={handleOwnPlaylists} aria-label='extend' id= "home">
                    <HomeOutlinedIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton></div>
        <div><IconButton onClick={handleAllPlaylists} aria-label='extend' id= "all">
                    <GroupsIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton></div>
                <div><IconButton onClick={handleUsersPlaylists} aria-label='extend' id= "users">
                    <PersonOutlineOutlinedIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton></div>

                <div>  <Input type="text" id="outlined-basic" label="Title:" variant="outlined" onChange={ 
                    handleUpdateSearch} onKeyPress={handleKeyPress} />
                </div>
                <div>
        <div id="playlist-selector">
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
                
            </div>
            
        </div>
            <div id="youtubePlayer">
            <Button sx={{ marginRight: 0, fontSize:"10px",fontWeight:'fontWeightMedium'}}
                disabled={false}
                id='undo-button'
                onClick={handleYoutubeClick}
                variant="contained">
                
                Player  
            </Button>
            <Button sx={{ marginRight: 0, fontSize:"10px",fontWeight:'fontWeightMedium'}}
                disabled={false}
                id='undo-button'
                onClick={handleCommentsClick}
                variant="contained">
                
                Comments  
            </Button>
             
            {currentTab}

           
            </div> 
        </div>
                <Statusbar/>
        
    </Box>
        
        )
}

export default HomeScreen;