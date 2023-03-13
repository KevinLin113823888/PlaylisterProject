import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AuthContext from '../auth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '.16vw solid #000',
    boxShadow: 24,
    p: 2,
};

export default function MUIAccErrModalR() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleCloseModal(event) {
        auth.hideAccountErr();
    }
    console.log(auth.accounterr);
    console.log(auth.message);
//open={store.currentModal === "ACCOUNT_ERROR"}
    return (
        
        <Modal
            open={auth.accounterr ==true}
        >
            <Box sx={style}>
            <Alert severity="warning">
             <AlertTitle>Warning</AlertTitle>
             <strong>{auth.message}</strong>
            </Alert>
                <div className="modal-dialog">
                
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Close</button>
                </div>
            </div>
            
            </Box>
        </Modal>
    );
}