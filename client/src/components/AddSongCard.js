import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';

function AddSongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index,published} = props;

    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }

    let cardClass = "unpublished-card unselected-unpublished-card";
    let cardElement = <div></div>
    if(!published){
    cardElement = <div
    key={index}
    id={'addsongcard'}
    className={cardClass}
    onClick={(event) => {
        handleAddNewSong(event);}}
>
    <AddIcon style={{fontSize:'25pt', color: "white",fontWeight:"bold"}} />
</div>
    }else{

    cardElement = <div
    key={index}
    id={'song-' + index + '-card'}
    className={cardClass}
    onClick={(event) => {
        handleAddNewSong(event);}}
>
    {index + 1}.
    <a
        id={'song-' + index + '-link'}
        className="song-link"
        href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
        {song.title} by {song.artist}
    </a>
    
</div>
    }
    return (
        cardElement
    );
}

export default AddSongCard;