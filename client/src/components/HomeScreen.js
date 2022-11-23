import React, { useContext, useEffect } from 'react'
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
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

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
        store.showPublishedLists();
        store.setView("users");
        //store.closeCurrentList();
        
    }
    function handleOwnPlaylists(){
        store.loadIdNamePairs();
        store.setView("home");
        //store.closeCurrentList();
    }
    let listCard = "";
    console.log("SETTING");
    console.log(auth.user);
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair,index2) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        index2 = {index2}
                        id2 = {pair._id}
                    />
                ))
            }
            </List>;
    }
    return (
        <Box sx={{ display: 'flex' }}>
            
            <div><IconButton onClick={handleOwnPlaylists} aria-label='extend'>
                    <HomeOutlinedIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton></div>
        <div><IconButton onClick={handleUsersPlaylists} aria-label='extend'>
                    <GroupsIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton></div>
                <div><IconButton onClick={handleUsersPlaylists} aria-label='extend'>
                    <PersonOutlineOutlinedIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton></div>
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
                <Statusbar/>
        
    </Box>
        
        )
}

export default HomeScreen;