import { AppBar, Box, Button, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { Handshake, Menu, Close } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
 
 const Nav = () => {
    const [role,setRole] = useState(null);
    const [adminSidebar, setAdminSidebar] = useState({ open: false, width: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {};
      setAdminSidebar({ open: !!detail.open, width: detail.width || 0 });
    };
    window.addEventListener('adminSidebarChanged', handler);
    // cleanup
    return () => window.removeEventListener('adminSidebarChanged', handler);
  }, []);
     useEffect(()=>{
      const savedRole = sessionStorage.getItem('role');
      setRole(savedRole);

      const onRoleChanged = () => setRole(sessionStorage.getItem('role'));
      window.addEventListener('roleChanged', onRoleChanged);
      window.addEventListener('storage', onRoleChanged);
      return () => {
        window.removeEventListener('roleChanged', onRoleChanged);
        window.removeEventListener('storage', onRoleChanged);
      };
     },[])
   
     const handleLogout = ()=>{
      // Clear session and relevant localStorage keys
      sessionStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('orgId');
      localStorage.removeItem('orgName');
      localStorage.removeItem('orgEmail');
      // notify other components
      window.dispatchEvent(new Event('roleChanged'));
      navigate('/')
     }
  
  const renderLinks = () => {
    if (role === 'admin') {
      return (
        <>
          <Button component={Link} to={'/admin'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 700, '&:hover': { color: '#bfe6ff' } }}>Dashboard</Button>
          <Button component={Link} to={'/admin/items'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 700, '&:hover': { color: '#bfe6ff' } }}>Items</Button>
          <Button component={Link} to={'/admin/org'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 700, '&:hover': { color: '#bfe6ff' } }}>Organizations</Button>
        </>
      )
    }

    if (role === 'organization') {
      return (
        <>
          <Button component={Link} to={'/admin/org'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 700, '&:hover': { color: '#bfe6ff' } }}>Organization Dashboard</Button>
          <Button component={Link} to={'/admin/org'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 700, '&:hover': { color: '#bfe6ff' } }}>My Requests</Button>
        </>
      )
    }

    // default / guest / user
    return (
      <>
        <Button onClick={() => handleScroll('mission')} sx={{ color: 'white', textTransform: 'uppercase', fontSize: 13, fontWeight: 700, '&:hover': { color: '#bfe6ff' } }}>Our Mission</Button>
        <Button onClick={() => handleScroll('impact')} sx={{ color: 'white', textTransform: 'uppercase', fontSize: 13, fontWeight: 700, '&:hover': { color: '#bfe6ff' } }}>Impact</Button>
        <Button onClick={() => handleScroll('get-involved')} sx={{ color: 'white', textTransform: 'uppercase', fontSize: 13, fontWeight: 700, '&:hover': { color: '#bfe6ff' } }}>Get Involved</Button>
        <Button component={Link} to={'/about'} sx={{ color: 'white', textTransform: 'uppercase', fontSize: 13, fontWeight: 700 }}>About</Button>
        <Button component={Link} to={'/c'} sx={{ color: 'white', textTransform: 'uppercase', fontSize: 13, fontWeight: 700 }}>Contact</Button>
      </>
    )
  }

  const handleScroll = (id) => {
    // If already on home, scroll immediatelyy; otherwise navigate then scroll after a short delay
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 220);
  }

  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  const renderMobileNavLinks = () => {
    if (role === 'admin') {
      return (
        <>
          <ListItem component={Link} to={'/admin'} onClick={handleMobileMenuClose}>
            <ListItemText primary="Dashboard" sx={{ color: '#08306b' }} />
          </ListItem>
          <ListItem component={Link} to={'/admin/items'} onClick={handleMobileMenuClose}>
            <ListItemText primary="Items" sx={{ color: '#08306b' }} />
          </ListItem>
          <ListItem component={Link} to={'/admin/org'} onClick={handleMobileMenuClose}>
            <ListItemText primary="Organizations" sx={{ color: '#08306b' }} />
          </ListItem>
        </>
      )
    }

    if (role === 'organization') {
      return (
        <>
          <ListItem component={Link} to={'/admin/org'} onClick={handleMobileMenuClose}>
            <ListItemText primary="Organization Dashboard" sx={{ color: '#08306b' }} />
          </ListItem>
          <ListItem component={Link} to={'/admin/org'} onClick={handleMobileMenuClose}>
            <ListItemText primary="My Requests" sx={{ color: '#08306b' }} />
          </ListItem>
        </>
      )
    }

    return (
      <>
        <ListItem onClick={() => { handleScroll('mission'); handleMobileMenuClose(); }}>
          <ListItemText primary="Our Mission" sx={{ color: '#08306b' }} />
        </ListItem>
        <ListItem onClick={() => { handleScroll('impact'); handleMobileMenuClose(); }}>
          <ListItemText primary="Impact" sx={{ color: '#08306b' }} />
        </ListItem>
        <ListItem onClick={() => { handleScroll('get-involved'); handleMobileMenuClose(); }}>
          <ListItemText primary="Get Involved" sx={{ color: '#08306b' }} />
        </ListItem>
        <ListItem component={Link} to={'/about'} onClick={handleMobileMenuClose}>
          <ListItemText primary="About" sx={{ color: '#08306b' }} />
        </ListItem>
        <ListItem component={Link} to={'/c'} onClick={handleMobileMenuClose}>
          <ListItemText primary="Contact" sx={{ color: '#08306b' }} />
        </ListItem>
      </>
    )
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            background: 'linear-gradient(135deg,#0a2a4d 0%,#1e3a8a 100%)',
            boxShadow: '0 4px 12px rgba(2,6,23,0.2)',
            transition: 'margin 225ms cubic-bezier(0,0,0.2,1), width 225ms cubic-bezier(0,0,0.2,1)',
            ml: { md: location.pathname.startsWith('/admin') ? `${adminSidebar.width}px` : 0 },
            width: { md: location.pathname.startsWith('/admin') ? `calc(100% - ${adminSidebar.width}px)` : '100%' },
            zIndex: (theme) => theme.zIndex.appBar + 1
          }}
        >
          <Toolbar sx={{ display: 'flex', gap: 2 }}>
            <IconButton 
              size="large" 
              edge="start" 
              color="inherit" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              {mobileMenuOpen ? <Close /> : <Menu />}
            </IconButton>
            <Button component={Link} to={'/'} sx={{ display: 'flex', alignItems: 'center', gap: 1, textTransform: 'none', color: 'white', '&:hover': { opacity: 0.8 } }}>
              <Handshake sx={{ color: 'white', fontSize: { xs: 20, md: 28 } }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', display: { xs: 'none', sm: 'block' } }}>CHANGING LIVES</Typography>
            </Button>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              {/* Main links */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>{renderLinks()}</Box>

              {/* Right-side auth links */}
              {role ? (
                <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'none' }}>Logout</Button>
              ) : (
                <>
                <Button component={Link} to={'/L'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 600, fontSize: { md: 14 } }}>Login</Button>
                  <Button component={Link} to={'/s'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 600, fontSize: { md: 14 } }}>SignUp</Button>
                  <Button component={Link} to={'/org/login'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 600, fontSize: { md: 14 } }}>Org Login</Button>
                </>
              )}
            </Box>

            {/* Mobile auth buttons */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 0.5 }}>
              {role ? (
                <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'none', fontSize: 12 }}>Logout</Button>
              ) : (
                <>
                <Button component={Link} to={'/L'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 600, fontSize: 11 }}>Login</Button>
                  <Button component={Link} to={'/s'} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 600, fontSize: 11 }}>SignUp</Button>
                </>
              )}
            </Box>
          </Toolbar>

          {/* Mobile Menu Drawer */}
          <Drawer
            anchor="top"
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <Box sx={{ width: '100%', pt: 2, pb: 2 }}>
              <List>
                {renderMobileNavLinks()}
                {!role && (
                  <>
                    <ListItem component={Link} to={'/org/login'} onClick={handleMobileMenuClose}>
                      <ListItemText primary="Organization Login" sx={{ color: '#08306b' }} />
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </Drawer>
        </AppBar>
        {/* spacer so page content isn't hidden under fixed AppBar */}
        <Toolbar />
      </Box>
    </div>
  )
 }
 
 export default Nav
    