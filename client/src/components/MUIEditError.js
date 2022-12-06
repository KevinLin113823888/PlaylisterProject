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

export default function MUIEditError() {
    const { store } = useContext(GlobalStoreContext);
  
    
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Modal
            open={store.currentModal == "EDIT_ERROR"}
        >
            <Box sx={style}>

    <header className="dialog-header">
        <Box style={{backgroundColor:"#2c2f70", color:"white",paddingTop:"15px",paddingBottom:"10px",paddingLeft:"15px"}}>
    <Typography id="modal-modal-title" className="modal-north" variant="h4" component="h2">
            <strong>Edit Name Error</strong>
        </Typography>
        </Box>
    <Typography id="modal-modal-title"  variant="h4" component="h2" paddingTop="20px">
    <strong> This list name was already used. Please choose a different name.</strong>
    </Typography>
    </header>
    <div></div>
    <div class="modal-footer" id="confirm-cancel-container">
    
     <input type="button" 
              
              id="confirm-button" 
              class="modal-button" 
              onClick={() => {
                 handleCloseModal();}}
              value='Close' />
    </div>
    
                
            </Box>
        </Modal>
    );
}