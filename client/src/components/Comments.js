import React, { useContext, useEffect,useState } from 'react'
import GlobalStoreContext from '../store';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import SongCard from './SongCard.js'
import CommentCard from './CommentCard.js'


export default function Comments() {
    const { store } = useContext(GlobalStoreContext);
    const [ search, setSearch ] = useState("");
    function handleUpdateSearch(event) {
        setSearch(event.target.value);
    }
    function handleKeyPress(event) {
        
        if (event.code === "Enter") {
            store.addComment(search);
            //setSearch("");
        }
    }
    let comments = <Box
            
            
    sx={{ height: "24vw",borderRadius:".8vw",marginTop: '0vw',justifyContent: 'center', p: 1, bgcolor:"#d4d4f5", border: 1, borderColor:"#000000"}}
    style={{ width: '77%', fontSize: '25pt' }}
    
    >
    <Box sx={{ justifyContent: 'center' ,fontSize:"1.6vw"}}>

<List 
        id="playlist-cards" 
        sx={{ width: '80%', bgcolor: '#d4d4f5' }}
    >
        <div id="comment-selector-list">
        {
            
        }

        </div>
     </List>

   
</Box>
<Box sx={{position:"absolute",top:"77%",width:"77%"}}><TextField type="text" id="outlined-basic"  variant="outlined" size= "small" disabled={true} onChange={ 
                    handleUpdateSearch} onKeyPress={handleKeyPress} placeholder="Add Comment" style={{marginLeft:"0vw",background:"#ffffff",width:"100%"}}/>
                </Box>
</Box>
    if(store.currentPlayedList){
        comments = <Box
            
            
        sx={{ height: "24vw",borderRadius:".8vw",marginTop: '0vw', display: 'flex',justifyContent: 'center', p: 1, bgcolor:"#d4d4f5", border: 1, borderColor:"#000000"}}
        style={{ width: '77%', fontSize: '25pt' }}
        
        >
        <Box sx={{ flexGrow: 1,justifyContent: 'center' ,fontSize:"1.6vw"}}>

 <List 
            id="playlist-cards" 
            sx={{ width: '95%', bgcolor: '#d4d4f5',left:"3%", height:"80%" }}
        >
            <div id="comment-selector-list">
            {
                store.currentPlayedList.comments.map((commentObj, index) => (
                    <CommentCard
                        key={'playlist-comment-' + (index)}
                        index={index}
                        commentObj={commentObj}
                    />
                ))  
            }

            </div>
         </List>

       <Box sx={{position:"absolute",top:"77%",width:"77%",left:"2%"}}><TextField type="text" id="outlined-basic"  variant="outlined" disabled= {store.guestMode} size= "small"  onChange={ 
                    handleUpdateSearch} onKeyPress={handleKeyPress} placeholder="Add Comment" style={{marginLeft:"0vw",background:"#ffffff",width:"100%"}}/>
                </Box> 
</Box>

</Box>
    }
    return (
        comments
    );
}