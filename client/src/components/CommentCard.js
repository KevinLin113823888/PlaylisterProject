import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ClearIcon from '@mui/icons-material/Clear';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
   
    const {index,commentObj} = props;

    function handleUserNameClick(){
        
        store.showPublishedListsFilteredUsers(commentObj.user);
    }

    let cardClass = "comment-card";
    let cardElement = <div></div>
    if(store.currentPlayedList){
    cardElement = <Box>
    <div
    key={index}
    id={'song-' + index + '-card'}
    className={cardClass}>
    <Box sx={{flexGrow: 1,fontSize:"5px",paddingTop:"5px",paddingLeft:"5px"}}><Link component="button" variant="body2" color="#3b31c8"onClick={() => {handleUserNameClick();}}>By: {commentObj.user}</Link></Box>
    <Box sx={{flexGrow: 1,fontSize:"20px",paddingTop:"10px",paddingLeft:"5px", width:"440px",wordWrap:"break-word"}}>{commentObj.comment}</Box>
   
    

</div></Box>
    }else{

    cardElement = <div
    key={index}
    id={'song-' + index + '-card'}
    className={cardClass}
    
>
    {index + 1}.
 
    
</div>
    }
    return (
        cardElement
    );
}

export default CommentCard;