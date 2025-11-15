 import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
 import React, { useEffect, useState } from 'react'
 import { Link, useNavigate } from 'react-router-dom'
 
 const Nav = () => {
     const [role,setRole] = useState(null);
     const navigate = useNavigate();
     useEffect(()=>{
       const savedRole = sessionStorage.getItem('role');
       setRole(savedRole);
     },[])
   
     const handleLogout = ()=>{
       sessionStorage.clear();
       navigate('/')
     }
   
   return (
     <div>
             <Box sx={{ flexGrow: 1 }}>
       <AppBar position="fixed">
         <Toolbar>
           <IconButton
             size="large"
             edge="start"
             color="inherit"
             aria-label="menu"
             sx={{ mr: 2 }}
           >
           </IconButton>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             CHANGING LIVES
           </Typography>
           <Button >
             <Link to={'/h'} style={{textDecoration:'none', color:'white'}}>
            Home
             </Link>
          </Button>
          <Button >
             <Link to={'/blog'} style={{textDecoration:'none', color:'white'}}>
             Blog
             </Link>
          </Button>
          <Button >
             <Link to={'/about'} style={{textDecoration:'none', color:'white'}}>
             About us
             </Link>
          </Button>
          
          <Button >
             <Link to={'/c'} style={{textDecoration:'none', color:'white'}}>
             Contacts 
             </Link> 
          </Button>
         <Button >
             <Link to={'/'} style={{textDecoration:'none', color:'white'}}>
             SignUp
             </Link>
          </Button>
         </Toolbar>
       </AppBar>
     </Box>
 
     </div>
   )
 }
 
 export default Nav
    