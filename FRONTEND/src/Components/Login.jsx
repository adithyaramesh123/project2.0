import { Box, Button, TextField, Typography, Avatar, InputAdornment, IconButton, useTheme, Card, CardContent, Grid, CardMedia } from "@mui/material";
import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DonationHero from '../assets/donation_hero.png';
import CommunityImage from '../assets/community.png';
import TrustImage from '../assets/trust_hands.png';

const Login = () => {
  const theme = useTheme();
  const [input, setInput] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const enameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleKeyDown = (e, next) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (next === 'submit') addHandler();
      else {
        const map = { ename: enameRef, password: passwordRef };
        map[next]?.current?.focus?.();
      }
    }
  };

  const validateField = (name, value) => {
    let msg = '';
    if ((name === 'ename' || name === 'password') && !value) msg = 'Required';
    if (name === 'ename' && value && !validateEmail(value)) msg = 'Invalid email';
    setErrors(prev => {
      const copy = { ...prev };
      if (msg) copy[name] = msg; else delete copy[name];
      return copy;
    });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    if (['ename', 'password'].includes(name)) validateField(name, value);
  };

  const toggleShowPassword = () => setShowPassword(s => !s);

  const addHandler = () => {
    if (!input.ename || !input.password) { alert("Please fill in all fields"); return; }
    axios
      .post(`${baseurl}/api/login`, input)
      .then((res) => {
        if (res.data?.user?.role) {
          sessionStorage.setItem("role", res.data.user.role);
          sessionStorage.setItem("userId", res.data.user._id);
          sessionStorage.setItem("userName", res.data.user.fname);
          window.dispatchEvent(new Event('roleChanged'));
        }
        if (res.status === 200) {
          alert(res.data.message);
          if (res.data.user.role === "admin") navigate("/admin");
          else navigate("/donate1");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <>
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${DonationHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflowX: 'hidden',
        py: 4
      }}>
        {/* Dark Overlay for better text contrast */}
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }} />

        <Box sx={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card sx={{
            width: { xs: '90%', sm: 480 },
            borderRadius: 4,
            background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}>
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 56, height: 56 }}>🤝</Avatar>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  Helping Hands
                </Typography>
              </Box>

              <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="text.primary">
                Welcome Back
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary" mb={4}>
                Sign in to continue making a difference.
              </Typography>

              <TextField
                fullWidth
                label="Email address"
                variant="outlined"
                name="ename"
                value={input.ename || ''}
                onChange={inputHandler}
                inputRef={enameRef}
                onKeyDown={(e) => handleKeyDown(e, 'password')}
                error={!!errors.ename}
                helperText={errors.ename}
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><EmailIcon color="action" /></InputAdornment>),
                  sx: { borderRadius: 2, bgcolor: 'rgba(255,255,255,0.5)' }
                }}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={input.password || ''}
                onChange={inputHandler}
                inputRef={passwordRef}
                onKeyDown={(e) => handleKeyDown(e, 'submit')}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><LockIcon color="action" /></InputAdornment>),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2, bgcolor: 'rgba(255,255,255,0.5)' }
                }}
                sx={{ mb: 1 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Link to="/forgot-password" style={{ color: theme.palette.secondary.main, textDecoration: 'none', fontWeight: 600 }}>
                  Forgot password?
                </Link>
              </Box>

              <Button
                onClick={addHandler}
                fullWidth
                variant="contained"
                size="large"
                disabled={!input.ename || !input.password}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                Sign In
              </Button>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link to="/s" style={{ color: theme.palette.primary.main, fontWeight: 'bold', textDecoration: 'none' }}>
                    Sign up
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <Link to="/org/login" style={{ color: theme.palette.secondary.dark, fontWeight: 'bold', textDecoration: 'none' }}>
                    Organization Login
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Why Join Us Section */}
      <Box sx={{ py: 8, px: { xs: '20px', sm: '40px' }, background: theme.palette.mode === 'dark' ? 'background.default' : 'linear-gradient(180deg, #f5f9fc 0%, #ffffff 100%)' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', textAlign: 'center', mb: 6, fontSize: { xs: '1.8rem', sm: '2.2rem' } }}>
            Why Join a Community?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', borderRadius: '12px', boxShadow: '0 8px 24px rgba(16,81,139,0.1)', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardMedia component="img" height="200" image={DonationHero} alt="Community Impact" sx={{ objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>Full Transparency</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    Track donations and volunteer hours in real-time. Know exactly where your contributions go.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', borderRadius: '12px', boxShadow: '0 8px 24px rgba(16,81,139,0.1)', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardMedia component="img" height="200" image={CommunityImage} alt="Joy of Giving" sx={{ objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>Community Impact</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    Connect with like-minded individuals and communities. Together we can achieve more.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', borderRadius: '12px', boxShadow: '0 8px 24px rgba(16,81,139,0.1)', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardMedia component="img" height="200" image={TrustImage} alt="Trusted Network" sx={{ objectFit: 'cover', objectPosition: 'top' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>Trusted Network</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    Join a verified network of volunteers and organizations committed to making a real difference.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
