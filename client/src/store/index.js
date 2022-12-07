import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
import { formHelperTextClasses, stepperClasses } from '@mui/material'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    ACCOUNT_ERROR:"ACCOUNT_ERROR",
    SET_EXTEND:"SET_EXTEND",
    DELETE_LIST_MARKED: "DELETE_LIST_MARKED",
    SET_VIEW:"SET_VIEW",
    SET_CURRENT_LIST_TWO: "SET_CURRENT_LIST_TWO",
    LOAD_ID_NAME_PAIRS_HOME: "LOAD_ID_NAME_PAIRS_HOME",
    LOAD_ID_NAME_PAIRS_USERS: "LOAD_ID_NAME_PAIRS_USERS",
    LOAD_ID_NAME_PAIRS_ALL: "LOAD_ID_NAME_PAIRS_ALL",
    LOAD_ID_NAME_PAIRS_TWO: "LOAD_ID_NAME_PAIRS_TWO",
    SET_LIST_SELECTED: "SET_LIST_SELECTED",
    SET_GUEST_MODE:"SET_GUEST_MODE",
    SET_CURRENT_SONG_PLAYED:"SET_CURRENT_SONG_PLAYED",
    SET_CURRENT_PLAYED_LIST:"SET_CURRENT_PLAYED_LIST",
    LOAD_ID_NAME_PAIRS_NEW:"LOAD_ID_NAME_PAIRS_NEW",
    SHOW_EDIT_ERROR:"SHOW_EDIT_ERROR"

}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
    ACCOUNT_ERROR: "ACCOUNT_ERROR",
    EDIT_ERROR:"EDIT_ERROR"
    
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        listExtend: "",
        view: "home",
        listCardId: "",
        guestMode: false,
        currentSongPlayed : 0,
        currentPlayedList: null,
        currentListInd:-1
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: "637957f7be0590af103933c7",
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                    
                    
                });
            }
            case GlobalStoreActionType.SET_VIEW: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: payload.stri,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                    
                    
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: "",
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter++,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS_NEW: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.pairsArray,
                    currentList: payload.nlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:payload.ind
                });
            }
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS_HOME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: "home",
                    listCardId: -1,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS_TWO: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS_USERS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: "users",
                    listCardId: -1,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS_ALL: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: "all",
                    listCardId: -1,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.SET_LIST_SELECTED: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: payload,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.DELETE_LIST_MARKED: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: payload.id,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.SET_CURRENT_LIST_TWO: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: payload.id,
                    view: store.view,
                    listCardId: payload.ind,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:payload.curInd
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: payload,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.SHOW_EDIT_ERROR: {
                return setStore({
                    currentModal : CurrentModal.EDIT_ERROR,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.ACCOUNT_ERROR: {
                return setStore({
                    currentModal : CurrentModal.ACCOUNT_ERROR,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.SET_EXTEND: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: payload,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.SET_GUEST_MODE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: payload,
                    view: "all",
                    listCardId: store.listCardId,
                    guestMode: payload,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.SET_CURRENT_SONG_PLAYED: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: store.listCardId,
                    guestMode: store.guestMode,
                    currentSongPlayed : payload,
                    currentPlayedList: store.currentPlayedList,
                    currentListInd:store.currentListInd
                });
            }
            case GlobalStoreActionType.SET_CURRENT_PLAYED_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    listExtend: store.listExtend,
                    view: store.view,
                    listCardId: payload.ind,
                    guestMode: store.guestMode,
                    currentSongPlayed : store.currentSongPlayed,
                    currentPlayedList: payload.playlist,
                    currentListInd:store.currentListInd
                });
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                console.log("HERE");
                let i=0;
                let bool = true;
                for(i=0;i<store.idNamePairs.length;i++){
                    if(store.idNamePairs[i].name===newName){
                        bool = false;
                    }
                }
                console.log(store.idNamePairs);
                if(bool==true){
                playlist.name = newName;
                
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
                }else{
                    //alert("HI");
                    store.showEditErrorModal();
                }
            }
        }
        asyncChangeListName(id);
    }

    store.setGuestMode= function(bool){
        storeReducer({
            type: GlobalStoreActionType.SET_GUEST_MODE,
            payload: bool
        });
    }
    
    
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        history.push("/playlist/");
    }
    store.resetCurrentList =function(){
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        try{
        let newListName = "Untitled" + store.newListCounter ;
        const response = await api.createPlaylist(newListName, [], auth.user.email,false,auth.user.userName,[],[],[],"",0,0,0,0);
        
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/playlist/" + newList._id);
            store.loadIdNamePairsWithNewList(newList);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }catch(e){

    }
    }
   
    store.setIdNamePairEmpty = function(){
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: null
        });
    }
    
    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.loadIdNamePairsWithNewList=function(nlist){
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let ind=pairsArray.length-1;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS_NEW,
                    payload: {pairsArray:pairsArray,
                             nlist:nlist,
                            ind:ind}
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    };



    store.loadIdNamePairsHome = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS_HOME,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }
    
    store.loadIdNamePairsWithCurrent = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS_TWO,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = function (id) {
        
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.status === 200) {
                store.loadIdNamePairs();
                
                storeReducer({
                    type: GlobalStoreActionType.DELETE_LIST_MARKED,
                    payload: {id: null, playlist: null}
                });
                history.push("/playlist/");
            }
            //store.loadIdNamePairs();
        }
        processDelete(id);
        
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    store.unmarkListForDeletion= function(){
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: {id: null, playlist: null}
        });
        store.hideModals();
    }

    store.setView = function(str){
        
        storeReducer({
            type: GlobalStoreActionType.SET_VIEW,
            payload: {stri:str}
        });
        
    }
    
    
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showAccountErrorModal = () => {
        storeReducer({
            type: GlobalStoreActionType.ACCOUNT_ERROR,
            payload: null
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.showEditErrorModal = ()=>{
        storeReducer({
            type: GlobalStoreActionType.SHOW_EDIT_ERROR,
            payload:null
        }); 
    }
    
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }
    store.isAccountError=()=>{
        storeReducer({
            type: GlobalStoreActionType.ACCOUNT_ERROR,
            payload: {}
        });   
    }
    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.status === 200) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.status === 200) {
                    //store.loadIdNamePairs();
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: {
                            playlist :playlist,
                            id : id
                        }
                    });
                    tps.clearAllTransactions();
                    history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.setListSelected=function(ind){
        
        storeReducer({
        type: GlobalStoreActionType.SET_LIST_SELECTED,
        payload: ind
        });
    }
    store.test=function(){
        alert(store.listCardId);
        
    }
    store.setCurrentListTwo = function (id,ind) {
        async function asyncSetCurrentListTwo(id) {
            let response = await api.getPlaylistById(id);
            if (response.status === 200) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.status === 200) {
                    //store.loadIdNamePairs();
                  
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST_TWO,
                        payload: {
                            playlist:playlist,
                            ind: store.listCardId,
                            curInd: ind,
                            id:id
                        }
                    });
                    tps.clearAllTransactions();
                    history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentListTwo(id);
    }
    store.setCurrentListThree = function (id,ind) {
        async function asyncSetCurrentListTwo(id) {
            let response = await api.getPlaylistById(id);
            if (response.status === 200) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.status === 200) {
                    //store.loadIdNamePairs();
                  
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST_TWO,
                        payload: {
                            playlist:playlist,
                            ind:ind,
                            curInd: store.currentListInd,   
                            id:""
                        }
                    });
                    tps.clearAllTransactions();
                    history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentListTwo(id);
    }
    store.setCurrentPlayedList = function(id,ind){
        async function asyncSetCurrentListTwo(id) {
            let response = await api.getPlaylistById(id);
            if (response.status === 200) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.status === 200) {
                    //store.loadIdNamePairs();
                  
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_PLAYED_LIST,
                        payload: {  
                                    playlist:playlist,
                                    ind:ind
                                 }
                    });
                    
                }
            }
        }
        asyncSetCurrentListTwo(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }

    
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }


    store.addComment = function(comment){
        let list = store.currentPlayedList;
        let newComment = {comment:comment,user:auth.user.userName};
        list.comments.splice(list.comments.length, 0, newComment);
        async function asyncUpdateCurrentList() {
           
            const response = await api.updatePlaylistById(store.currentPlayedList._id, store.currentPlayedList);
            if (response.data.success) {
                
                let pairs = store.idNamePairs;
                let i = 0;
                for(i=0;i<pairs.length;i++){
                    if(pairs[i]._id==store.currentPlayedList._id){
                        pairs[i].comments.splice(list.comments.length, 0, newComment);
                    }
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairs
                });

               
            }
        }
        asyncUpdateCurrentList();
        

    }
    
    store.incrementLikes = function (id) {
        async function asyncSetCurrentListLikes(id) {
            let response = await api.getPlaylistById(id);
        
            if (response.status === 200) {
                let playlist = response.data.playlist;
                let newLike = {userLiked:auth.user.userName};
                let i = 0;
                let found = false;
                let index = -1;
                for(i =0;i<playlist.likes.length;i++){
                if(playlist.likes[i].userLiked == auth.user.userName){
                    found = true;
                    
                    index=i;
                    
                }
                }
                if(playlist.likes.indexOf(newLike)>-1){
                    alert('spotted!');

                }
            if(found == false){
                playlist.likes.splice(playlist.likes.length, 0, newLike);
                
            }else{
                playlist.likes.splice(index,1);
               
               // playlist.likes.splice(playlist.likes.length, 0, newLike);
            }
            playlist.likesNum= playlist.likes.length;
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.status === 200) {
                    let pairs = store.idNamePairs;
                    let i = 0;
                    for(i=0;i<pairs.length;i++){
                        if(pairs[i]._id==playlist._id){
                            if(found==false){
                            pairs[i].likes.splice(playlist.likes.length, 0, newLike);
                            }else{
                                pairs[i].likes.splice(index,1);
                            }
                        }
                    }
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: pairs
                    });
                  
                    history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentListLikes(id);
    }

    store.incrementDislikes = function (id) {
        async function asyncSetCurrentListDislikes(id) {
            let response = await api.getPlaylistById(id);
            if (response.status === 200) {
                let playlist = response.data.playlist;
                let newDislike = {userDisliked:auth.user.userName};
                let i = 0;
                let found = false;
                let index = -1;
                for(i =0;i<playlist.dislikes.length;i++){
                if(playlist.dislikes[i].userDisliked == auth.user.userName){
                    found = true;
                    
                    index=i;
                    
                }
                }
                if(playlist.likes.indexOf(newDislike)>-1){
                    alert('spotted!');

                }
            if(found == false){
                playlist.dislikes.splice(playlist.dislikes.length, 0, newDislike);
                
            }else{
                playlist.dislikes.splice(index,1);
                
               // playlist.likes.splice(playlist.likes.length, 0, newLike);
            }
            playlist.dislikesNum= playlist.dislikes.length;
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.status === 200) {
                    let pairs = store.idNamePairs;
                    let i = 0;
                    for(i=0;i<pairs.length;i++){
                        if(pairs[i]._id==playlist._id){
                            if(found==false){
                            pairs[i].dislikes.splice(playlist.likes.length, 0, newDislike);
                            }else{
                                pairs[i].dislikes.splice(index,1);
                            }
                        }
                    }
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: pairs
                    });
                }
            }
        }
        asyncSetCurrentListDislikes(id);
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.showListsOwnName= function(){
        let pairs = store.idNamePairs;
        pairs.sort((a, b) => a.name.localeCompare(b.name));
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: pairs
        });
      
    }

    store.showListsOwnCreation= function(){
        let pairs = store.idNamePairs;
        pairs.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: pairs
        });
        
    }

    store.showListsOwnEditDate= function(){
        let pairs = store.idNamePairs;
        pairs.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });
       
    }


    store.showPublishedListsName= function(){
        let pairs = store.idNamePairs;
        console.log(pairs);
        pairs.sort((a, b) => a.name.localeCompare(b.name));
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: pairs
        });
    }
    store.showPublishedListsListens= function(){
        let pairs = store.idNamePairs;
        console.log(pairs);
  
        for(let i = 0; i < pairs.length - 1; i++){

            //Loop after the i till the last element
            for(let j = i + 1; j < pairs.length; j++){
      
               //if jth element is less than the ith element then swap
               //change < to > for sorting in descending order
               if(pairs[j].listens > pairs[i].listens){
                 let temp = pairs[i];
                 pairs[i] = pairs[j];
                 pairs[j] = temp;
               }
      
            }
      
         }
         
         
        
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: pairs
        });
    }

    store.showPublishedListsLikes= function(){

        let pairs = store.idNamePairs;
        pairs.sort(function(a, b){return b.likesNum - a.likesNum});
        
        
    }


    store.showPublishedListsDislikes= function(){
        let pairs = store.idNamePairs;
        pairs.sort(function(a, b){return b.dislikesNum - a.dislikesNum});
        
    }

    store.showPublishedListsDate= function(){
        let pairs = store.idNamePairs;
        pairs.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.actualPublishDate) - new Date(a.actualPublishDate);
          });
       
        
    }

    store.showPublishedListsUsers= function(){
        async function asyncLoadPublishedIdNamePairs() {
            const response = await api.getPublishedPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS_USERS,
                    payload: pairsArray
                });
                //store.loadIdNamePairs();
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadPublishedIdNamePairs();
    }
    store.showPublishedListsAll= function(){
        async function asyncLoadPublishedIdNamePairs() {
            const response = await api.getPublishedPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS_ALL,
                    payload: pairsArray
                });
                //store.loadIdNamePairs();
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadPublishedIdNamePairs();
    }

    store.showPublishedListsFilteredUsers= function(text){
        async function asyncLoadPublishedIdNamePairsFiltered() {
            
            const response = await api.getPublishedPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let updatedPairs = pairsArray;
                
                
                    updatedPairs = store.filterPairsArrayByUser(text,pairsArray);
                   
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS_USERS,
                    payload: updatedPairs
                });
                //store.loadIdNamePairs();
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadPublishedIdNamePairsFiltered();
    }

    store.showPublishedListsFilteredAll= function(text){
        async function asyncLoadPublishedIdNamePairsFiltered() {
            
            const response = await api.getPublishedPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let updatedPairs = pairsArray;
                
                
                    
                    updatedPairs = store.filterPairsArrayByName(text,pairsArray);
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: updatedPairs
                });
                //store.loadIdNamePairs();
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadPublishedIdNamePairsFiltered();
    }

    store.showPublishedListsFiltered= function(text){
        async function asyncLoadPublishedIdNamePairsFiltered() {
            
            const response = await api.getPublishedPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let updatedPairs = pairsArray;
                
                
                    if(store.view =="all"){
                    updatedPairs = store.filterPairsArrayByName(text,pairsArray);
                    }
                    if(store.view =="users"){
                        updatedPairs = store.filterPairsArrayByUser(text,pairsArray);
                    }
                    
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: updatedPairs
                });
                //store.loadIdNamePairs();
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadPublishedIdNamePairsFiltered();
    }

    store.showUnpublishedListsFiltered= function(text){
        async function asyncLoadUnpublishedIdNamePairsFiltered() {
            
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let updatedPairs = pairsArray;
            
                    updatedPairs = store.filterPairsArrayByName(text,pairsArray);
                    
                       
                    
                    
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: updatedPairs
                });
                //store.loadIdNamePairs();
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadUnpublishedIdNamePairsFiltered();
    }
    
    store.filterPairsArrayByName = (text,pairsArray)=>{
        let pairs = [];
        let i= 0;
        
        for( i=0;i<pairsArray.length;i++){
            if(pairsArray[i].name.indexOf(text)>-1){
                pairs.push(pairsArray[i]);
            }
        }
        
        return pairs;
    }

    store.filterPairsArrayByUser = (text,pairsArray)=>{
        let pairs = [];
        let i= 0;
        
        for( i=0;i<pairsArray.length;i++){
            if(pairsArray[i].userName.indexOf(text)>-1){
                pairs.push(pairsArray[i]);
            }
        }
       
        return pairs;
    }

    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
           
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                
                /*if(store.view=="home"){
                    store.loadIdNamePairsWithCurrent();
                }else if(store.view =="all"){
                    store.showPublishedListsAll();
                }else if(store.view =="users"){
                    store.showPublishedListsUsers();
                }*/
               
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {
                        playlist: store.currentList,
                        id : store.listExtend
                    }
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.updateCurrentPlayedList= function(){
        async function asyncUpdateCurrentList() {
           
            const response = await api.updatePlaylistById(store.currentPlayedList._id, store.currentPlayedList);
            if (response.data.success) {
                
                if(store.view=="home"){
                    store.loadIdNamePairsWithCurrent();
                }else if(store.view =="all"){
                    store.showPublishedListsAll();
                }else if(store.view =="users"){
                    store.showPublishedListsUsers();
                }
               
               
            }
        }
        asyncUpdateCurrentList();
    }

    store.setPublished = function(id,pdate,ndate){
  
        let list = store.currentList;
        list.published = true;
    
        list.publishDate = pdate;
        list.actualPublishDate = ndate;

        store.updateCurrentList();
       
    }
    store.incrementListens= function(){
        let list = store.currentPlayedList;
        list.listens++;
        //store.updateCurrentPlayedList();
        async function asyncUpdateCurrentList() {
           
            const response = await api.updatePlaylistById(store.currentPlayedList._id, store.currentPlayedList);
            if (response.data.success) {
                
                let pairs = store.idNamePairs;
                let i = 0;
                for(i=0;i<pairs.length;i++){
                    if(pairs[i]._id==store.currentPlayedList._id){
                        pairs[i].listens++;
                    }
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairs
                });

               
            }
        }
        asyncUpdateCurrentList();
    }
    store.incrementCopy=function(){
        let list = store.currentList;
        list.copied++;

        store.updateCurrentList();
    }
    store.setCurrentSongInd=function(ind){
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SONG_PLAYED,
            payload: ind
        });
    }
  
    store.duplicateList = async function(){
            let newListName = "Untitled" + store.newListCounter ;
            store.incrementCopy();
            const response = await api.createPlaylist(store.currentList.name + " ("+ store.currentList.copied + ")", store.currentList.songs, auth.user.email,false,auth.user.userName,store.currentList.comments,store.currentList.likes,store.currentList.dislikes,"",0,0,0,0);
            
            if (response.status === 201) {
                tps.clearAllTransactions();
                let newList = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                }
                );
    
                // IF IT'S A VALID LIST THEN LET'S START EDITING IT
                //history.push("/playlist/");
                //store.loadIdNamePairs();
                
            }
            else {
                console.log("API FAILED TO CREATE A NEW LIST");
            }
    }
    

    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null && store.currentModal=="NONE");
    }
    
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo() && store.currentModal=="NONE");
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo() && store.currentModal=="NONE");
    }
    store.canClose = function() {
        return (store.currentList !== null && store.currentModal=="NONE");
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function (active) {
       
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: active
        });
        
    }
    store.isListNameEditActive = function (){
        
        return store.listNameActive;
    }
    
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };