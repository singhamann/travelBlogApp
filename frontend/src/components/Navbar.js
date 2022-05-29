import {Link, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { destToken } from "../store/actions";
import { useDispatch } from "react-redux";
import axios from 'axios';
import {  useState } from 'react';
import BASE_URL from '../Utils/baseURL';
// import NavBarStyles from './NavBarStyles'

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function Navbar(){
    const [name, setName] = useState("")
    const token = useSelector(state => state.token);
    const userId = useSelector(state => state.userId);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getUserName = () => {
        axios.get(BASE_URL + 'users/getUser/'+ userId)
        .then(response => {
            setName(response.data.body.name)
        })
    }
    const SignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        dispatch(destToken())
        navigate('/home')
    }

    return(<>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
    <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/home')}
          >
            Travel Blog
          </IconButton>

        { token ? 
            <>
            {userId && getUserName()}
            <Typography variant="h6" component="div" sx={{ flexGrow: 5 }} color='Highlight'>
                {name}
            </Typography>
            <Button color='inherit' onClick={() => navigate('/addPlace')}> Add Place</Button>
            <Button color='inherit' onClick={()=> SignOut()}> Sign Out</Button> 
            </>
         : 
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color='Highlight'>
            <Button color='inherit' onClick={()=> navigate('/SignIn')}>Login</Button>
        </Typography>
        }
        </Toolbar>
        </AppBar>  
    </Box>
    <Outlet />
    {/* <NavBarStyles /> */}
    </>)
}