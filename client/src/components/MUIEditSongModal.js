import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';

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

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong(event) {
        event.stopPropagation();
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong(event) {
        event.stopPropagation();
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        
        
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentModal == "EDIT_SONG"}
        >
            <Box sx={style}>
            <header className="dialog-header">
            <Box style={{backgroundColor:"#2c2f70", color:"white",paddingTop:"15px",paddingBottom:"10px",paddingLeft:"15px"}}>
        <Typography id="modal-modal-title" className="modal-north" variant="h4" component="h2">
            <strong>Edit Song?</strong>
        </Typography></Box>
        </header>
        <div id="title-prompt" className="modal-prompt" >
        <InputLabel htmlFor="input-with-icon-adornment">
          Title:
        </InputLabel>
        <Input type="text" id="outlined-basic" label="Title:" variant="outlined" defaultValue={title} onChange={ 
                    handleUpdateTitle}/>
        </div>
        <div id="artist-prompt" className="modal-prompt">
        <InputLabel htmlFor="input-with-icon-adornment">
          Artist:
        </InputLabel>
        <Input type="text" id="outlined-basic" label="Artist" variant="outlined" defaultValue={artist} onChange={ 
                    handleUpdateArtist}/>
        </div>
        <div id="you-tube-id-prompt" className="modal-prompt">
        <InputLabel htmlFor="input-with-icon-adornment">
          You Tube Id:
        </InputLabel>
        <Input type="text" id="outlined-basic" label="You Tube Id:" variant="outlined" defaultValue={youTubeId} onChange={ 
                    handleUpdateYouTubeId}/>
        </div>
        <div class="modal-footer" id="confirm-cancel-container">
        <div className="modal-south">
        <input type="button" 
                 
                    id="confirm-button" 
                    class="modal-button" 
                    onClick={(event) => {
                        handleConfirmEditSong(event);}}
                    value='Confirm' />
        <input type="button" 
                 
                 id="confirm-button" 
                 class="modal-button" 
                 onClick={(event) => {
                    handleCancelEditSong(event);}}
                 value='Cancel' />
        
        </div>
        </div>
            
            </Box>
        </Modal>
    );
}