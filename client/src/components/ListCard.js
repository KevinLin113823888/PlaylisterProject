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
    const [editActive, setEditActive] = useState(false);
    const [nowActive, setNowActive] = useState(-1);
    const [text, setText] = useState("");
    const { idNamePair, selected,index2,id2 } = props;
    useEffect(() => {
        setNowActive(-1);
    }, []);
    
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    /*if(store.listExtend==true){
        let newActive = !editActive;
        if (newActive==false) {
            setEditActive(newActive);
            alert(editActive);
        }
        store.setExtend(false);
    }*/
    
    function handleLoadList(event) {
        //alert(event.currentTarget.value);
        let current = event.currentTarget.value;
        //console.log(idNamePair._id);
        //setNowActive(current);
        //event.stopPropagation();
            // CHANGE THE CURRENT LIST
            store.setCurrentListTwo(idNamePair._id);
        
    }
    function handleLoadListe(id) {
            store.setCurrentList(id);
    }
    

    function handleToggleEdit(event) {
        //alert(event.currentTarget.value);
    
        console.log(idNamePair._id);
        event.stopPropagation();
        
        console.log("BEGIN");
        
        toggleEditTwo();
        handleLoadListe(idNamePair._id);
        
      
    }
    
    function handleToggleEditTwo(event) {
        //handleLoadListe(idNamePair._id);
        store.closeCurrentList();
        event.stopPropagation();
        
        toggleEdit();
        
        
    }
    function handlePublishList(event,id){
        event.stopPropagation();
        store.setPublished(id);
    }
    //let now = true;
    function toggleEditTwo() {
        let newActive = !editActive;
        
        if (newActive) {
            store.setIsListNameEditActive(true);
            console.log("STARTING");
            setEditActive(newActive);
 
            
        }else{
   
        }
    }
    function toggleEdit() {
        let newActive = !editActive;
        
        /*if (newActive) {
            store.setIsListNameEditActive(true);
        }else{
            setEditActive(newActive);
           // store.setIsListNameEditActive(false);
        }*/
        setEditActive(false);
        //alert(editActive);
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

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    
   
    if (store.listNameActive && (idNamePair._id === store.listExtend) && store.currentList ) {
        //cardStatus = true;
        console.log("HEYY");
        console.log(nowActive);
        console.log(store.listExtend);
        
        let newActive = !editActive;
        
        if (!newActive) {
           console.log("HUH");
            setEditActive(newActive);
           
        }
        //store.setIsListNameEditActive(true);
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
            
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ height: "90px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:hi, border: 1, borderColor:"#000000"}}
            style={{ width: '100%', fontSize: '25pt' }}
            value = {index2}
            onClick={(event) => {
                handleLoadList(event)
            }}
          
        >
         <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}>By:   {idNamePair.name}</Box></Box>
        
         <Box sx={{ paddingTop: "25px", paddingRight: "30px"}}>
                <IconButton onClick={handleToggleEdit} id={idNamePair._id} aria-label='extend'>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton>
        </Box>
        
        </ListItem>
        
    }else{
        cardElement =
       
        <ListItem
            
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ height: "90px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:"#ABCDEF", border: 1, borderColor:"#000000"}}
            style={{ width: '100%', fontSize: '25pt' }}
            value = {index2}
            onClick={(event) => {
                handleLoadList(event)
            }}
          
        >
         <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}>By:   {idNamePair.name}</Box></Box>
         
         <Box sx={{ paddingTop: "25px", paddingRight: "30px"}}>
                <IconButton onClick={(event) => {
                    handleToggleEdit(event)
                }} aria-label='extend' value = {index2}>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton>
        </Box>
        </ListItem>
       
    }


    if (editActive && store.currentList!=null) {
        if( !idNamePair.published){
        cardElement =
        <ClickAwayListener onClickAway={handleToggleEditTwo}>
        <ListItem
            
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ maxHeight: "400px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:hi, border: 1, borderColor:"#000000"}}
        style={{ width: '100%', fontSize: '25pt' }}
       
        >
     <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1 }}>{idNamePair.name}</Box>
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
            <IconButton onClick={handleToggleEditTwo} aria-label='retract'>
                <KeyboardDoubleArrowUpIcon style={{fontSize:'30pt', color: "#000000"}} />
            </IconButton>
    </Box>
    </Box>
       
    </ListItem>
    </ClickAwayListener>
        }else{
            cardElement =
            <ClickAwayListener onClickAway={handleToggleEditTwo}>
        <ListItem
            
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ maxHeight: "400px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:hi, border: 1, borderColor:"#000000"}}
        style={{ width: '100%', fontSize: '25pt' }}
       
        >
     <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1 }}>{idNamePair.name}</Box>
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
            <IconButton onClick={handleToggleEditTwo} aria-label='retract'>
                <KeyboardDoubleArrowUpIcon style={{fontSize:'30pt', color: "#000000"}} />
            </IconButton>
    </Box>
    </Box>
       
    </ListItem>
    </ClickAwayListener>
        }
    }
    return (
        cardElement
    );
}

export default ListCard;