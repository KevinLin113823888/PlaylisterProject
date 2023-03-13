import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MUIEditError from './MUIEditError'
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

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ search, setSearch ] = useState("");
    const [ tab, setTab ] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    useEffect(() => {
        if(!store.guestMode){
           
        store.loadIdNamePairs();
        }else{
            
            store.showPublishedListsAll();
        }
    }, []);

    function handleCreateNewList() {
        
        try{
        auth.getLoggedIn();
        
        store.createNewList();
        }catch(e){}
        
    }
    function handleUsersPlaylists() {
        console.log("Hey");
       
        store.showPublishedListsUsers();

        store.closeCurrentList();
        
    }
    function handleAllPlaylists() {

        store.showPublishedListsAll();

        store.closeCurrentList();
        
    }
    function handleOwnPlaylists(){
        store.loadIdNamePairsHome();
        store.setView("home");
        store.closeCurrentList();
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

    const menuId = 'primary-search-account-menu';


    const handleSortMenuOpen=(event)=>{
        
            setAnchorEl(event.currentTarget);
        
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuCloseName = () => {
        store.showPublishedListsName();
        setAnchorEl(null);
    };
    const handleMenuClosePublish = () => {
        store.showPublishedListsDate();
        setAnchorEl(null);
    };
    const handleMenuCloseListens = () => {
        store.showPublishedListsListens();
        setAnchorEl(null);
    };
    const handleMenuCloseLikes = () => {
        store.showPublishedListsLikes();
        setAnchorEl(null);
    };
    const handleMenuCloseDislikes = () => {
        store.showPublishedListsDislikes();
        setAnchorEl(null);
    };
    const handleMenuCloseOwnCreation = () => {
        store.showListsOwnCreation();
        setAnchorEl(null);
    };
    const handleMenuCloseOwnEditDate = () => {
        store.showListsOwnEditDate();
        setAnchorEl(null);
    };
    const handleMenuCloseOwnName= () => {
        store.showListsOwnName();
        setAnchorEl(null);
    };


    const publishedMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id="{menuId}"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            
        >
            
            <MenuItem onClick={handleMenuCloseName} style={{border:".008vw solid #000",fontSize:"1vw"}}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleMenuClosePublish} style={{border:".008vw solid #000",fontSize:"1vw"}}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleMenuCloseListens} style={{border:".008vw solid #000",fontSize:"1vw"}}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuCloseLikes} style={{border:".008vw solid #000",fontSize:"1vw"}}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuCloseDislikes} style={{border:".008vw solid #000",fontSize:"1vw"}}>Dislikes (High - Low)</MenuItem>
        </Menu>
    );
    const ownMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id="{menuId}"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            
        >
            
            <MenuItem onClick={handleMenuCloseOwnName} style={{border:".008vw solid #000",fontSize:"1vw"}}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleMenuCloseOwnCreation} style={{border:".008vw solid #000",fontSize:"1vw"}}>Creation Date (Old-New)</MenuItem>
            <MenuItem onClick={handleMenuCloseOwnEditDate} style={{border:".008vw solid #000",fontSize:"1vw"}}>Last Edit Date (New-Old)</MenuItem>

        </Menu>
    );
    let menu = publishedMenu;
    if(store.view == "home"){
        menu = ownMenu;
    }
    function handleKeyPress(event) {
        if(search != ""){
        if (event.code === "Enter") {
            if(store.view!="home"){
            store.showPublishedListsFiltered(search);
            }else{
                store.showUnpublishedListsFiltered(search);
            }
        }
        }else{
            store.setIdNamePairEmpty();
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
    onClick={handleCommentsClick}
    variant="contained"
    style={{
        borderRadius: ".8vw .8vw 0vw 0vw",
        fontWeight:"bold",
        backgroundColor: "#fff",
        border: ".01vw solid #000",
        color:"black",
        textTransform: 'none',
        paddingTop: "0vw",
        paddingBotton: "0vw",
        paddingLeft: "1vw",
        paddingRight: "1vw",
        fontSize: "1vw"
    }}
    sx={{
        paddingBottom:"0vw"
    }}
    >
    
    
    Comments  
     </Button>

    let youtubeButton = <Button 
    disabled={false}
    onClick={handleYoutubeClick}
    variant="contained"
    style={{
        borderRadius: ".8vw .8vw 0vw 0vw",
        fontWeight:"bold",
        border: ".01vw solid #000",
        backgroundColor: "#cccccc",
        color:"black",
        textTransform: 'none',
        paddingTop: "0vw",
        paddingBottom:"0vw",
        paddingLeft: "1vw",
        paddingRight: "1vw",
        fontSize: "1vw"
    }}
    sx={{
        paddingBottom:"0vw",
        paddingLeft: "1vw",
        paddingRight: "1vw"
    }}
    >
        
    
    Player  
</Button>

     if(tab){
        commentButton = <Button 
    disabled={false}
    onClick={handleCommentsClick}
    variant="contained"
    style={{
        borderRadius: ".8vw .8vw 0vw 0vw",
        fontWeight:"bold",
        backgroundColor: "#cccccc",
        border: ".01vw solid #000",
        color:"black",
        textTransform: 'none',
        paddingTop: "0vw",
        paddingLeft: "1vw",
        paddingRight: "1vw",
        fontSize: "1vw"
    }}
    sx={{
        paddingBottom:"0vw"
    }}
    >Comments</Button>

    youtubeButton = <Button 
    disabled={false}
    onClick={handleYoutubeClick}
    variant="contained"
    style={{
        borderRadius: ".8vw .8vw 0vw 0vw",
        fontWeight:"bold",
        border: ".01vw solid #000",
        backgroundColor: "#fff",
        color:"black",
        textTransform: 'none',
        paddingLeft: "1vw",
        paddingRight: "1vw",
        paddingTop: "0vw",
        fontSize: "1vw"
    }}
    sx={{
        paddingBottom:"0vw",
        paddingLeft: "1vw",
        paddingRight: "1vw"
    }}
    >
        
    
    Player  
</Button>
     }
    
    if (store && auth && store.idNamePairs ) {
        if(auth.user){
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
        }else{
            listCard =
            <List sx={{ width: '97%', left: '0%', bgcolor: '#c4c4c4' }}>
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
    }
    
    let homeBorder = ".24vw solid #c4c4c4";
    if(store.view == "home"){
        homeBorder = ".24vw solid #53d333";
    }
    let usersBorder = ".24vw solid #c4c4c4";
    if(store.view === "users"){
        
        usersBorder = ".24vw solid #53d333";
    }
    let allBorder = ".24vw solid #c4c4c4";

    if(store.view == "all"){
        
        allBorder = ".24vw solid #53d333";
    }
    let homeColor = "#000000"
    if(store.guestMode){
        homeColor = "#c4c4c4";
    }
    return (
        <Box sx={{ display: 'flex' }}>
            
            <div><IconButton onClick={handleOwnPlaylists} style={{border:homeBorder, borderRadius:"0vw",padding:"0vw"}} disabled= {store.guestMode} aria-label='extend' id= "home">
                    <HomeOutlinedIcon style={{fontSize:'2.5vw', color: homeColor}} />
                </IconButton></div>
        <div><IconButton onClick={handleAllPlaylists} style={{border:allBorder, borderRadius:"0vw",padding:"0vw"}} aria-label='extend' id= "all">
                    <GroupsIcon style={{fontSize:'2.5vw', color: "#000000"}} />
                </IconButton></div>
                <div><IconButton onClick={handleUsersPlaylists} style={{border:usersBorder, borderRadius:"0vw",padding:"0vw"}} aria-label='extend' id= "users">
                    <PersonOutlineOutlinedIcon style={{fontSize:'2.5vw', color: "#000000"}} />
                </IconButton></div>
                

                <div id = "borderchange">  <TextField type="text" id="outlined-basic"  variant="outlined" onChange={ 
                    handleUpdateSearch} onKeyPress={handleKeyPress} height="2.2vw" placeholder="Search" style={{marginTop:"0.1vw",marginLeft:"5vw",background:"#ffffff",width:"45vw"}} 
                    inputProps={{
                        style: {
                          fontSize:"1vw",
                          height: "0vw"
                        }}} />
                </div>
                <span><IconButton onClick={handleSortMenuOpen}  aria-label='extend' id= "users" style={{borderRadius:".8vw",fontSize:"1vw",fontWeight:"bold"}} sx={{position:"absolute",left:"87%"}}>
                    SORT BY<SortIcon style={{fontSize:'2vw', color: "#000000"}} sx={{marginLeft:"1.3vw"}}/>
                </IconButton></span>
                <div>
        <div id="playlist-selector">
            
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
                <MUIEditError/>
                
            </div>
            
        </div>
            <div id="youtubePlayer">
            {youtubeButton}
            {commentButton}
             
            {currentTab}

           
            </div> 
        </div>
                <Statusbar/>
        {menu}
    </Box>
        
        )
}

export default HomeScreen;