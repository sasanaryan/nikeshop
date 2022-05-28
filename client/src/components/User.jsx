import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch , useSelector} from "react-redux";
import {logout} from "../redux/userRedux";
import { Delete } from "../redux/apiC";



const  User=({username}) => {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

        
    const dispatch = useDispatch();

    const user =useSelector(state=>state.user.currentUser);
    
    

    const handleDelete = () => {
    handleClose();
    Delete(dispatch,user);
    };

    
    const handleLogout = () => {
    handleClose();
    dispatch(logout());
    };

    return (
    <div>
    <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
    >
        {username}
    </Button>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
        'aria-labelledby': 'basic-button',
        }}
    >
        <MenuItem 
        onClick={handleLogout}
        >Logout</MenuItem>
        <MenuItem 
        onClick={handleDelete}
        >Delet account</MenuItem>
    </Menu>
    </div>
    );
}


export default User
