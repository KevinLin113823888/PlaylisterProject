import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        store.setGuestMode(false);
    };
    const handleMenuCloseGuest=()=>{
        store.setGuestMode(true);
        setAnchorEl(null);
    }

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
        //store.resetCurrentList();
    }
    const handleHome = () => {
        store.closeCurrentList();
    }

    const menuId = 'primary-search-account-menu';
    const introMenu = <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
>
    
    <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
    <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
    <MenuItem onClick={handleMenuCloseGuest}><Link to='/playlist/'>Continue as Guest</Link></MenuItem>
</Menu>
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = introMenu;

    if (auth.loggedIn) {
        menu = loggedInMenu;
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }else if(store.guestMode){
        menu = loggedOutMenu;
    }
    
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="black"
            style={{border:"2px solid #000000", backgroundColor:"#d236df", color:"black", fontSize:"20px"}}
        >
            <div>{userInitials}</div>
        </IconButton>;
        else
            return <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="black"
            style={{border:"2px solid #000000",color:"black"}}
        >
            <AccountCircle />
        </IconButton>;
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{background: '#e0e0e0'}}>
                <Toolbar>
                    <Typography                        
                        
                        sx={{ }}
                        style={{fontSize:"35px", fontFamily:"Satisfy" ,color:"#b81f1e",fontWeight:"bold"}}                        
                    >
                        Playlister
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        
                            { getAccountMenu(auth.loggedIn) }
                        
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}