import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';

function AddSongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index,published} = props;

    function handleAddNewSong() {
        store.addNewSong();
    }

    let cardClass = "list-card unselected-list-card";
    let cardElement = <div></div>
    if(!published){
    cardElement = <div
    key={index}
    id={'addsongcard'}
    className={cardClass}
    onClick={handleAddNewSong}
>
    <AddIcon style={{fontSize:'30pt', color: "#000000"}} />
</div>
    }else{

    cardElement = <div
    key={index}
    id={'song-' + index + '-card'}
    className={cardClass}
    onClick={handleAddNewSong}
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