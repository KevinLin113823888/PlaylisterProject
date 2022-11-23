import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";

    function handleCreateNewList() {
       
        store.createNewList();
       
    }
    if (store.currentList)
        text = store.currentList.name;

    let statusbar = <div></div>
    if(!store.currentList){
        statusbar = 
        <Box>
        <div id="playlister-statusbar">
            <IconButton onClick={handleCreateNewList} aria-label='extend'>
                    <AddIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton>
            <Typography variant="h4">Your Lists</Typography>
        </div>
        </Box>
    }else{
        statusbar = 
        <Box>
        <div id="playlister-statusbar">
           
            <Typography variant="h4">{text}</Typography>
        </div>
        </Box>
    }
    return (
        statusbar
    );
}

export default Statusbar;