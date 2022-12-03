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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AuthContext from '../auth';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    
   
    const [expandActive, setExpandActive] = useState(false);
    const [nowActive, setNowActive] = useState(-1);
    const [text, setText] = useState("");
    const [editActive, setEditActive] = useState(false);
    const { idNamePair, selected,index2,id2,idA,idB,userAuth } = props;
    const [clicked,setClicked]=useState(false);
    useEffect(() => {
       //handleLoadList();
        //document.getElementById(idA).addEventListener("click", retract);
    }, [clicked]);
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
        
            store.setCurrentListThree(idNamePair._id,index2);

        
    }
    function handleLoadListe(id) {
        store.setCurrentListTwo(idNamePair._id,index2);
    }
    

    function handleToggleExpand(event) {
   
        event.stopPropagation();
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
        let ndate = new Date();
        event.stopPropagation();
        let datePublished = findUpdateDate(); 
        store.setPublished(id,datePublished,ndate);
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
    function handleLiked(event){
        event.stopPropagation();
        
        //handleLoadList();
        //alert(idNamePair._id);
        store.incrementLikes(idNamePair._id);
    }
    
    function handleDisliked(event){
        event.stopPropagation();
        
        //handleLoadList();
        //alert(idNamePair._id);
        store.incrementDislikes(idNamePair._id);
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
            //store.setListSelected(index2);
            handleLoadList();
            //setClicked(!clicked));
            //store.setListSelected(index2);
            //store.test();
            break;
          case 2:
            if(!idNamePair.published){
           
            handleToggleEdit()
            }
            break;
        }
    };
    function handleUserNameClick(event){
        event.stopPropagation();
        store.showPublishedListsFilteredUsers(idNamePair.userName);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
  
    function findUpdateDate(){
        let str = "";
        let ndate = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        str += months[ndate.getMonth()];
        str += " ";
        str += ndate.getDate();
        str += ", ";
        str += ndate.getFullYear();
        
        
        
        return str;
    }
   
    if (store.listNameActive && (idNamePair._id === store.listExtend) && store.currentList ) {
       
        
        let newActive = !expandActive;
        
        if (!newActive) {
       
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

    let likeButton = <div></div>
    let dislikeButton =<div></div>
    
    if(alreadyLiked()){
        likeButton = <Box component = "span" sx={{ position:"absolute",left:"400px",top:"0px"}}>
        <IconButton disabled= {store.guestMode} onClick={(event) => {
            handleLiked(event)
        }} aria-label='extend' value = {index2}>
            <ThumbUpIcon style={{fontSize:'30pt', color: "black",border: "1px black"}} />
        </IconButton>
        {idNamePair.likes.length}
        </Box>
    }else{
        likeButton = <Box component = "span" sx={{ position:"absolute",left:"400px",top:"0px"}}>
        <IconButton disabled= {store.guestMode} onClick={(event) => {
            handleLiked(event)
        }} aria-label='extend' value = {index2}>
            <ThumbUpOutlinedIcon style={{fontSize:'30pt', color: "black",border: "1px black"}} />
        </IconButton>
        {idNamePair.likes.length}
        </Box>
    }

    if(alreadyDisliked()){
        dislikeButton = <Box component = "span" sx={{position:"absolute",left:"500px",top:"0px"}}>
        <IconButton disabled= {store.guestMode} onClick={(event) => {
            handleDisliked(event)
        }} aria-label='extend' value = {index2}>
            <ThumbDownIcon  style={{fontSize:'30pt', color: "black",border: "1px black"}} />
        </IconButton>
        {idNamePair.dislikes.length}
        </Box>
    }else{
        dislikeButton = <Box component = "span" sx={{position:"absolute",left:"500px",top:"0px"}}>
        <IconButton disabled= {store.guestMode} onClick={(event) => {
            handleDisliked(event)
        }} aria-label='extend' value = {index2}>
            <ThumbDownOutlinedIcon style={{fontSize:'30pt', color: "black",border: "1px black"}} />
        </IconButton>
        {idNamePair.dislikes.length}
        </Box>
    }
    
    function alreadyLiked(){
  
        let i =0;

        for(i=0;i<idNamePair.likes.length;i++){
            if(idNamePair.likes[i].userLiked == userAuth){
                return true;
            }
        }
       
        return false;
    }
    function alreadyDisliked(){
        
        let i =0;
       
        for(i=0;i<idNamePair.dislikes.length;i++){
            if(idNamePair.dislikes[i].userDisliked == userAuth){
                return true;
            }
        }
       
        return false;
    }



   
   

    if(!idNamePair.published){
        let bg = "#fffff1"
        
        cardElement =
        
        <ListItem
            
            id= {idA}
            key={idNamePair._id}
            sx={{ height: "90px",borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:bg, border: 1, borderColor:"#000000"}}
            style={{ width: '100%', fontSize: '25pt' }}
            value = {index2}
            onClick={(event) => {
                handleClick(event)
            }}
          
        >
         <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}><Link component="button" variant="body2" onClick={(event) => {handleUserNameClick(event);}}>By: {idNamePair.userName}</Link></Box></Box>
        
         <Box sx={{ paddingTop: "25px", paddingRight: "30px"}}>
                <IconButton onClick={handleToggleExpand} id={idNamePair._id} aria-label='extend'>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'30pt', color: "#000000"}} />
                </IconButton>
        </Box>
        
        </ListItem>
        
        
    }else{
        let bg = "#d4d4f5";
        if(store.listCardId==index2){
            bg = "#d4af37";
        }
        cardElement =
       
        <ListItem
            
            id={index2}
            key={idNamePair._id}
            sx={{ height: "90px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:bg, border: 1, borderColor:"#000000"}}
            style={{ width: '100%', fontSize: '25pt' }}
            value = {index2}
            onClick={(event) => {
                handleClick(event)
            }}
          
        >
         <Box sx={{ flexGrow: 1, fontSize:"25px",paddingLeft:"15px" }}><Box sx={{fontWeight: 'bold'}}>{idNamePair.name} {likeButton}{dislikeButton}</Box><Box sx={{flexGrow: 1,fontSize:"12px",paddingRight:"10px" }}>By: <Link component="button" variant="body2" fontSize="10px" color="#3838fd" sx={{paddingLeft:"10px"}} onClick={(event) => {handleUserNameClick(event);}}>{idNamePair.userName}</Link></Box>
         <Box sx={{flexGrow: 1,fontSize:"12px",paddingTop: "5px"}}> Published: <Box component="span" sx={{fontSize:"12px",color: "green",paddingLeft:"10px"}}>{idNamePair.publishDate}</Box> 
         <Box component="span" sx={{fontSize:"12px",paddingLeft:"300px"}}>Listens: </Box><Box component="span" sx={{fontSize:"12px",color: "red",paddingLeft:"10px"}}>{idNamePair.listens}</Box> </Box>
         
         </Box>
         
         
         

         
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
        sx={{ maxHeight: "460px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:"#fffff1", border: 1, borderColor:"#000000"}}
        style={{ width: '100%', fontSize: '25pt',backgroundColor:"#fffff1"}}
       
        >
     <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}><Link component="button" variant="body2" onClick={() => {handleUserNameClick();}}>By: {idNamePair.userName}</Link></Box>
     <Box>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: '#fffff1' }}
        >
            <div id="unpublished-song-selector-list">
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
                variant="contained"
                style={{color:"black",backgroundColor:"gray"}}
                >
                
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
            let deleteButton;
            let duplicateButton;
            
            let margin= "500px";
            if(store.view=="home"){
                margin = "0px";
                deleteButton= <Button sx={{ marginRight: 1,marginLeft: "500px", fontSize:"10px",fontWeight:'fontWeightMedium'}}
                id='delete-button'
                onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }}
                variant="contained">
                Delete
            </Button>
            }
            if(!store.guestMode){
                duplicateButton = <Button sx={{ marginRight: 1, fontSize:"10px",fontWeight:'fontWeightMedium',marginLeft:margin}}
                id='delete-button'
                onClick={(event) => {
                    handleDuplicateList(event, idNamePair._id)
                }}
                variant="contained">
                Duplicate
            </Button>
            }
            cardElement =
            
        <ListItem
            
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ maxHeight: "400px", borderRadius:"10px",marginTop: '5px', display: 'flex', p: 1, bgcolor:"#d4af37", border: 1, borderColor:"#000000"}}
        style={{ width: '100%', fontSize: '25pt' }}
       
        >
     <Box sx={{ flexGrow: 1 }}>{idNamePair.name}<Box sx={{flexGrow: 1,fontSize:"10px" }}><Link component="button" variant="body2" onClick={() => {handleUserNameClick();}}>By: {idNamePair.userName}</Link></Box>
     <Box>
        <List 
            id="playlist-cards" 
            sx={{ width:'100%', bgcolor: '#d4af37' }}
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
         
            

            {deleteButton}
            {duplicateButton}
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