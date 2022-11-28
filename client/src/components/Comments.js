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
            
            
    sx={{ height: "92%",borderRadius:"10px",marginTop: '0px',justifyContent: 'center', p: 1, bgcolor:"#d4d4f5", border: 1, borderColor:"#000000"}}
    style={{ width: '77%', fontSize: '25pt' }}
    
    >
    <Box sx={{ justifyContent: 'center' ,fontSize:"20px"}}>

<List 
        id="playlist-cards" 
        sx={{ width: '100%', bgcolor: '#d4d4f5' }}
    >
        <div id="comment-selector-list">
        {
            
        }

        </div>
     </List>

   
</Box>
<Box sx={{position:"absolute",top:"90%",width:"77%"}}><TextField type="text" id="outlined-basic"  variant="outlined" size= "small"  onChange={ 
                    handleUpdateSearch} onKeyPress={handleKeyPress} placeholder="Add Comment" style={{marginLeft:"0px",background:"#ffffff",width:"100%"}}/>
                </Box>
</Box>
    if(store.currentList){
        comments = <Box
            
            
        sx={{ height: "92%",borderRadius:"10px",marginTop: '0px', display: 'flex',justifyContent: 'center', p: 1, bgcolor:"#d4d4f5", border: 1, borderColor:"#000000"}}
        style={{ width: '77%', fontSize: '25pt' }}
        
        >
        <Box sx={{ flexGrow: 1,justifyContent: 'center' ,fontSize:"20px"}}>

 <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: '#d4d4f5' }}
        >
            <div id="comment-selector-list">
            {
                store.currentList.comments.map((commentObj, index) => (
                    <CommentCard
                        key={'playlist-comment-' + (index)}
                        index={index}
                        commentObj={commentObj}
                    />
                ))  
            }

            </div>
         </List>

       <Box sx={{position:"absolute",top:"90%",width:"77%"}}><TextField type="text" id="outlined-basic"  variant="outlined" size= "small"  onChange={ 
                    handleUpdateSearch} onKeyPress={handleKeyPress} placeholder="Add Comment" style={{marginLeft:"0px",background:"#ffffff",width:"100%"}}/>
                </Box> 
</Box>

</Box>
    }
    return (
        comments
    );
}