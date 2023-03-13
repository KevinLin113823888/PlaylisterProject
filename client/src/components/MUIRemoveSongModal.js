import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#d4d4f5',
    border: '.16vw solid #000',
    boxShadow: 24,
    p: 2,
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong (event) {
        event.stopPropagation();
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong (event) {
        event.stopPropagation();
        store.hideModals();
    }
    
    let modalClass = "modal";
    console.log(store.isRemoveSongModalOpen());
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }
    console.log(store.listMarkedForDeletion);
    function handleClick(event) {
        event.stopPropagation();
        
    }

    return (
        <Modal
            open={store.currentModal == "REMOVE_SONG"}
            onClick={(event) => {
                handleClick(event);}}
        >
            <Box sx={style}>

            <header className="dialog-header">
            <Box style={{backgroundColor:"#2c2f70", color:"white",paddingTop:"1.2vw",paddingBottom:".8vw",paddingLeft:"1.2vw"}}>
        <Typography id="modal-modal-title" className="modal-north" variant="h5" component="h2">
            <strong>Remove {songTitle}?</strong>
        </Typography></Box>
        </header>
        <Typography id="modal-modal-title" className="modal-center" variant="h5" component="h2" paddingTop="1.6vw">
        <strong>Are you sure you wish to remove "{songTitle}" from the playlist?</strong>
        </Typography>
        
        <div></div>
        <div class="modal-footer" id="confirm-cancel-container">
        <div className="modal-south">
        <input type="button" 
                 
                 id="confirm-button" 
                 class="modal-button" 
                 onClick={(event) => {
                     handleConfirmRemoveSong(event);}}
                 value='Confirm' />
     <input type="button" 
              
              id="confirm-button" 
              class="modal-button" 
              onClick={(event) => {
                 handleCancelRemoveSong(event);}}
              value='Cancel' />
        </div>
        </div>
        
 
            </Box>
        </Modal>
    );
}