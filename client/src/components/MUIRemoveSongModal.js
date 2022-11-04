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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
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

    return (
        <Modal
            open={store.currentModal == "REMOVE_SONG"}
        >
            <Box sx={style}>

            <header className="dialog-header">
        <Typography id="modal-modal-title" className="modal-north" variant="h4" component="h2">
            <strong>Remove {songTitle}?</strong>
        </Typography>
        </header>
        <Typography id="modal-modal-title" className="modal-center" variant="h5" component="h2">
            Are you sure you wish to permanently remove {songTitle} from the playlist?
        </Typography>
        
        <div></div>
        <div class="modal-footer" id="confirm-cancel-container">
        <div className="modal-south">
        <Button variant="contained" onClick={() => {
                    handleConfirmRemoveSong();}}>Confirm</Button>
        <Button variant="text" onClick={() => {
                    handleCancelRemoveSong();}}>Cancel</Button>
        </div>
        </div>
        
 
            </Box>
        </Modal>
    );
}