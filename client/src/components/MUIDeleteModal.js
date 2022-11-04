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

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
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
        
    <Typography id="modal-modal-title"  variant="h4" component="h2">
        Are you sure you wish to permanently delete the {name} playlist?
    </Typography>
    </header>
    <div></div>
    <div class="modal-footer" id="confirm-cancel-container">
    <Button variant="contained" onClick={() => {
                handleDeleteList();}}>Confirm</Button>
    <Button variant="text" onClick={() => {
                handleCloseModal();}}>Cancel</Button>
    </div>
    
                
            </Box>
        </Modal>
    );
}