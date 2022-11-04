import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AuthContext from '../auth';
import Button from '@mui/material/Button';

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

export default function MUIAccessErrModal() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    store.history = useHistory();
    

    function handleCloseModal(event) {
        auth.hideAccountErr();
        store.history.push("/");
    }
    console.log(auth.accounterr);
    console.log(auth.message);
//open={store.currentModal === "ACCOUNT_ERROR"}
    return (
        
        <Modal
            open={true}
        >
            <Box sx={style}>
            <Alert severity="error">
             <AlertTitle>Error</AlertTitle>
             <strong>Authentication Error</strong>
            </Alert>
            <div id="confirm-cancel-container">
            <Button variant="outlined" color="error" onClick={() => {
                handleCloseModal();}}>
                Close
            </Button>
            </div>
            </Box>
        </Modal>
    );
}