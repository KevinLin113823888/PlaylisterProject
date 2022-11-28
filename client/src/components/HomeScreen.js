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

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ search, setSearch ] = useState("");
    const [ tab, setTab ] = useState(true);
   ;
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
    }else{
        currentTab = <Comments/>
    }
    let commentButton = <Button 
    disabled={false}
    id='undo-button'
    onClick={handleCommentsClick}
    variant="contained"
    style={{
        borderRadius: "15px 15px 0px 0px",
        fontWeight:"bold",
        backgroundColor: "#fff",
        border: ".1px solid #000",
        color:"black",
        textTransform: 'none',
        paddingTop: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
        fontSize: "15px"
    }}
    >
    
    
    Comments  
     </Button>

    let youtubeButton = <Button 
    disabled={false}
    id='undo-button'
    onClick={handleYoutubeClick}
    variant="contained"
    style={{
        borderRadius: "15px 15px 0px 0px",
        fontWeight:"bold",
        border: ".1px solid #000",
        backgroundColor: "#cccccc",
        color:"black",
        textTransform: 'none',
        paddingTop: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
        fontSize: "15px"
    }}
    >
        
    
    Player  
</Button>

     if(tab){
        commentButton = <Button 
    disabled={false}
    id='undo-button'
    onClick={handleCommentsClick}
    variant="contained"
    style={{
        borderRadius: "15px 15px 0px 0px",
        fontWeight:"bold",
        backgroundColor: "#cccccc",
        border: ".1px solid #000",
        color:"black",
        textTransform: 'none',
        paddingTop: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
        fontSize: "15px"
    }}
    >Comments</Button>

    youtubeButton = <Button 
    disabled={false}
    id='undo-button'
    onClick={handleYoutubeClick}
    variant="contained"
    style={{
        borderRadius: "15px 15px 0px 0px",
        fontWeight:"bold",
        border: ".1px solid #000",
        backgroundColor: "#fff",
        color:"black",
        textTransform: 'none',
        paddingTop: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
        fontSize: "15px"
    }}
    >
        
    
    Player  
</Button>
     }
    
    if (store) {
        listCard = 
            <List sx={{ width: '97%', left: '0%', bgcolor: '#c4c4c4' }}>
            {
                store.idNamePairs.map((pair,index2) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        index2 = {index2}
                        userAuth = {auth.user.userName}
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

                <div id = "borderchange">  <TextField type="text" id="outlined-basic"  variant="outlined" size="small" onChange={ 
                    handleUpdateSearch} onKeyPress={handleKeyPress} height="30px" placeholder="Search" style={{marginTop:"5px",marginLeft:"70px",background:"#ffffff",width:"600px"}}/>
                </div>
                <div>
        <div id="playlist-selector">
            
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
                
            </div>
            
        </div>
            <div id="youtubePlayer">
            {youtubeButton}
            {commentButton}
             
            {currentTab}

           
            </div> 
        </div>
                <Statusbar/>
        
    </Box>
        
        )
}

export default HomeScreen;