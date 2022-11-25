import { useContext, useState,useEffect, Component } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { borders } from '@mui/system';
import List from '@mui/material/List';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Collapse from '@mui/material/Collapse';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import SongCard from './SongCard.js'
import AddSongCard from './AddSongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import ClickAwayListener from '@mui/material/ClickAwayListener';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [expandActive, setExpandActive] = useState(false);
    const [nowActive, setNowActive] = useState(-1);
    const [text, setText] = useState("");
    const [editActive, setEditActive] = useState(false);
    const { idNamePair, selected,index2,id2,idA,idB } = props;
    useEffect(() => {
       
        //document.getElementById(idA).addEventListener("click", retract);
    }, []);
    function retract() {
        handleToggleExpandThree();
        
        document.getElementById("home").removeEventListener("click", retract);
        document.getElementById("all").removeEventListener("click", retract);
        document.getElementById("users").removeEventListener("click", retract);
        //document.getElementById(idA).removeEventListener("click", retract);
        //document.getElementById(idB).removeEventListener("click", retract);
    }


    function handleToggleEdit() {
        
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }


    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    
    
    function handleLoadList() {
        
            store.setCurrentListTwo(idNamePair._id);

        
    }
    function handleLoadListe(id) {
            store.setCurrentList(id);
    }
    

    function handleToggleExpand(event) {
        //alert(event.target.id);
        //alert(idA);
        console.log(idNamePair._id);
        event.stopPropagation();
        
        console.log("BEGIN");
        
        toggleExpandTwo();
        handleLoadListe(idNamePair._id);
        
      
    }
    function handleToggleExpandThree() {
        //handleLoadListe(idNamePair._id);
        store.closeCurrentList();
       
        
        toggleExpand();
        
        
    }
    function handleToggleExpandTwo(event) {
        //handleLoadListe(idNamePair._id);
        store.closeCurrentList();
        event.stopPropagation();
        
        toggleExpand();
        
        
    }
    function handlePublishList(event,id){
        event.stopPropagation();
        store.setPublished(id);
    }
    //let now = true;
    function toggleExpandTwo() {
        let newActive = !expandActive;
        
        if (newActive) {
            document.getElementById("home").addEventListener("click", retract);
            document.getElementById("all").addEventListener("click", retract);
            document.getElementById("users").addEventListener("click", retract);
            
            //document.getElementById(idA).addEventListener("click", retract);
            
            store.setIsListNameEditActive(true);
            console.log("STARTING");
            setExpandActive(newActive);
 
            
        }else{
   
        }
    }
    function toggleExpand() {
        let newActive = !expandActive;
        
       
        setExpandActive(false);
        
    }

    function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }
    function handleDuplicateList(event, id) {
        event.stopPropagation();
       store.duplicateList(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            if(text == ""){
                store.changeListName(id, idNamePair.name);
            }else{
                store.changeListName(id, text);
            }

            toggleEdit();
        }
    }   
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleClick(event) {
        switch (event.detail) {
          case 1:
            handleLoadList()
            break;
          case 2:
            console.log("double click");
            handleToggleEdit()
            break;
        }
    };
    function handleUserNameClick(){
        
        store.showPublishedListsFilteredUsers(idNamePair.userName);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    
   
    if (store.listNameActive && (idNamePair._id === store.listExtend) && store.currentList ) {
        //cardStatus = true;
        console.log("HEYY");
        console.log(nowActive);
        console.log(store.listExtend);
        
        let newActive = !expandActive;
        
        if (!newActive) {
           console.log("HUH");
            setExpandActive(newActive);
           
        }
        
    }
    let hi = "#FFFFFF";

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    let cardElement = <div></div>
    
    if(!idNamePair.published){
        cardElement =
        
        <ListItem
            
            id= {idA}
            key={idNamePair._id}
            sx={{ height: "90px",borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:hi, border: 1, borderColor:"#000000"}}
            style={{ width: '100%', fontSize: '25pt' }}
            value = {index2}
            onClick={(event) => {
                handleClick(event)
            }}
          
        >
         <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}><Link component="button" variant="body2" onClick={() => {handleUserNameClick();}}>By: {idNamePair.userName}</Link></Box></Box>
        
         <Box sx={{ paddingTop: "25px", paddingRight: "30px"}}>
                <IconButton onClick={handleToggleExpand} id={idNamePair._id} aria-label='extend'>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton>
        </Box>
        
        </ListItem>
        
    }else{
        cardElement =
       
        <ListItem
            
            id={index2}
            key={idNamePair._id}
            sx={{ height: "90px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:"#ABCDEF", border: 1, borderColor:"#000000"}}
            style={{ width: '100%', fontSize: '25pt' }}
            value = {index2}
            onClick={(event) => {
                handleClick(event)
            }}
          
        >
         <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}><Link component="button" variant="body2" onClick={() => {handleUserNameClick();}}>By: {idNamePair.userName}</Link></Box></Box>
         
         <Box sx={{ paddingTop: "25px", paddingRight: "30px"}}>
                <IconButton onClick={(event) => {
                    handleToggleExpand(event)
                }} aria-label='extend' value = {index2}>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton>
        </Box>
        </ListItem>
       
    }


    if (expandActive && store.currentList!=null) {
        if( !idNamePair.published){
        cardElement =
        
        <ListItem
            
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ maxHeight: "400px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:hi, border: 1, borderColor:"#000000"}}
        style={{ width: '100%', fontSize: '25pt' }}
       
        >
     <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}><Link component="button" variant="body2" onClick={() => {handleUserNameClick();}}>By: {idNamePair.userName}</Link></Box>
     <Box>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: '#A4A3A3' }}
        >
            <div id="song-selector-list">
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
            <AddSongCard/>

            </div>
         </List>
         <Box > 
         <Button sx={{ marginRight: 1, fontSize:"10px",fontWeight:'fontWeightMedium'}}
                disabled={!store.canUndo()}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                
                Undo   
            </Button>
            
            <Button sx={{ marginRight: 10, fontSize:"10px",fontWeight:'fontWeightMedium'}}
                disabled={!store.canRedo()}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                Redo
        </Button>
            <Button sx={{ marginRight: 1, fontSize:"10px",fontWeight:'fontWeightMedium'}}
                id='delete-button'
                onClick={(event) => {
                    handlePublishList(event, idNamePair._id)
                }}
                variant="contained">
                Publish
            </Button>

            <Button sx={{ marginRight: 1, fontSize:"10px",fontWeight:'fontWeightMedium'}}
                id='delete-button'
                onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }}
                variant="contained">
                Delete
            </Button>
            <Button sx={{ marginRight: 1, fontSize:"10px",fontWeight:'fontWeightMedium'}}
                id='delete-button'
                onClick={(event) => {
                    handleDuplicateList(event, idNamePair._id)
                }}
                variant="contained">
                Duplicate
            </Button>
        </Box>
        
         { modalJSX }            
         
       
    </Box>
     <Box sx={{ paddingTop: "25px", paddingLeft: "500px"}}>
            <IconButton onClick={handleToggleExpandTwo} aria-label='retract'>
                <KeyboardDoubleArrowUpIcon style={{fontSize:'30pt', color: "#000000"}} />
            </IconButton>
    </Box>
    </Box>
       
    </ListItem>
    
        }else{
            cardElement =
            
        <ListItem
            
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ maxHeight: "400px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:hi, border: 1, borderColor:"#000000"}}
        style={{ width: '100%', fontSize: '25pt' }}
       
        >
     <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}><Link component="button" variant="body2" onClick={() => {handleUserNameClick();}}>By: {idNamePair.userName}</Link></Box>
     <Box>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: '#A4A3A3' }}
        >
            <div id="song-selector-list">
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                        published = {idNamePair.published}
                    />
                ))  
            }

            </div>
         </List>
         <Box > 
         
            

            <Button sx={{ marginRight: 1,marginLeft: "500px", fontSize:"10px",fontWeight:'fontWeightMedium'}}
                id='delete-button'
                onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }}
                variant="contained">
                Delete
            </Button>
            <Button sx={{ marginRight: 1, fontSize:"10px",fontWeight:'fontWeightMedium'}}
                id='delete-button'
                onClick={(event) => {
                    handleDuplicateList(event, idNamePair._id)
                }}
                variant="contained">
                Duplicate
            </Button>
        </Box>
         { modalJSX }            
         
       
    </Box>
     <Box sx={{ paddingTop: "25px", paddingLeft: "500px"}}>
            <IconButton onClick={handleToggleExpandTwo} aria-label='retract'>
                <KeyboardDoubleArrowUpIcon style={{fontSize:'30pt', color: "#000000"}} />
            </IconButton>
    </Box>
    </Box>
       
    </ListItem>
    
        }


        
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;