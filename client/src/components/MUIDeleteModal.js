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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        //store.closeCurrentList();
        store.deleteMarkedList();
        
    }
    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>

    <header className="dialog-header">
        <Box style={{backgroundColor:"#2c2f70", color:"white",paddingTop:"15px",paddingBottom:"10px",paddingLeft:"15px"}}>
    <Typography id="modal-modal-title" className="modal-north" variant="h4" component="h2">
            <strong>Delete Playlist?</strong>
        </Typography>
        </Box>
    <Typography id="modal-modal-title"  variant="h4" component="h2" paddingTop="20px">
    <strong> Are you sure you wish to delete the "{name}" playlist?</strong>
    </Typography>
    </header>
    <div></div>
    <div class="modal-footer" id="confirm-cancel-container">
    <input type="button" 
                 
                 id="confirm-button" 
                 class="modal-button" 
                 onClick={() => {
                     handleDeleteList();}}
                 value='Confirm' />
     <input type="button" 
              
              id="confirm-button" 
              class="modal-button" 
              onClick={() => {
                 handleCloseModal();}}
              value='Cancel' />
    </div>
    
                
            </Box>
        </Modal>
    );
}