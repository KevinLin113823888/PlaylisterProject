import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index,published} = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.preventDefault();
    
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            store.showEditSongModal(index, song);
        }
    }
    let buttonClass = "list-card-button";

    let cardClass = "list-card unselected-list-card";
    if(index == store.currentSongPlayed){
        cardClass = "list-card played-list-card";
    }
    if(!published){
        cardClass = "unpublished-card unselected-unpublished-card";
    }
    if(!published && index == store.currentSongPlayed){
        cardClass = "unpublished-card unpublished-played-list-card";
        buttonClass = "unpublished-list-card-button";
    }
    let cardElement = <div></div>
    if(!published){
    cardElement = <div
    key={index}
    id={'song-' + index + '-card'}
    className={cardClass}
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    draggable="true"
    onClick={handleClick}
>
    {index + 1}. {song.title} by {song.artist}
    


    <input
        position="absolute"
        type="button"
        id={"remove-song-" + index}
        className={buttonClass}
        value="X"
        onClick={handleRemoveSong}
    />

</div>
    }else{

    cardElement = <div
    key={index}
    id={'song-' + index + '-card'}
    className={cardClass}
>
    {index + 1}. {song.title} by {song.artist}
    
    
</div>
    }
    return (
        cardElement
    );
}

export default SongCard;