import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  useTheme,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Images
import DonationHero from '../assets/donation_hero.png';
import CommunityImage from '../assets/community.png';
import TrustImage from '../assets/trust_hands.png';

const Login = () => {
  const muiTheme = useTheme();
  const isDarkMode = muiTheme.palette.mode === 'dark';
  const [input, setInput] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
          if (res.data.user.role === "admin") navigate("/admin");
          else navigate("/donate1");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response?.data?.message || "Login failed. Please check your credentials.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ bgcolor: isDarkMode ? '#0a0a0a' : '#f0fdfa', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Hero Section with Login Form */}
      <Box sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${DonationHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        px: 2
      }}>
        {/* Animated Background Circles */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(13,148,136,0.2) 0%, rgba(13,148,136,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0
        }} component={motion.div} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
        <Box sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          zIndex: 0
        }} component={motion.div} animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} />

        <Container maxWidth="sm" sx={{ zIndex: 1, position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={24}
              sx={{
                p: { xs: 3, sm: 6 },
                borderRadius: 4,
                background: isDarkMode ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    mx: 'auto', 
                    mb: 2, 
                    width: 70, 
                    height: 70,
                    boxShadow: '0 0 20px rgba(13,148,136,0.5)'
                  }}
                >
                  🤝
                </Avatar>
                <Typography variant="h4" fontWeight="800" sx={{ color: 'text.primary', mb: 1, letterSpacing: '-0.5px' }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Sign in to continue making an impact
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="ename"
                    value={input.ename || ''}
                    onChange={inputHandler}
                    inputRef={enameRef}
                    onKeyDown={(e) => handleKeyDown(e, 'password')}
                    error={!!errors.ename}
                    helperText={errors.ename}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: 'primary.main', opacity: 0.8 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        '&:hover': { bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={input.password || ''}
                    onChange={inputHandler}
                    inputRef={passwordRef}
                    onKeyDown={(e) => handleKeyDown(e, 'submit')}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: 'primary.main', opacity: 0.8 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end" size="small">
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        '&:hover': { bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5, mb: 3 }}>
                <Typography 
                  component={Link} 
                  to="/forgot-password" 
                  variant="body2" 
                  sx={{ 
                    color: 'secondary.main', 
                    textDecoration: 'none', 
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                onClick={addHandler}
                fullWidth
                variant="contained"
                disabled={loading || !input.ename || !input.password}
                endIcon={<ChevronRightIcon />}
                sx={{
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  textTransform: 'none',
                  boxShadow: '0 10px 20px -5px rgba(13,148,136,0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 25px -5px rgba(13,148,136,0.5)',
                  },
                }}
              >
                {loading ? 'Signing in...' : 'Sign In to Your Account'}
              </Button>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  New to Helping Hands?{' '}
                  <Typography 
                    component={Link} 
                    to="/s" 
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: '800', 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Join us today
                  </Typography>
                </Typography>
                
                <Divider sx={{ my: 2, opacity: 0.1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', px: 1 }}>OR SIGN IN AS</Typography>
                </Divider>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button 
                    component={Link} 
                    to="/admin/login" 
                    size="small" 
                    variant="outlined" 
                    sx={{ borderRadius: 2, textTransform: 'none', opacity: 0.8 }}
                  >
                    Admin
                  </Button>
                  <Button 
                    component={Link} 
                    to="/org/login" 
                    size="small" 
                    variant="outlined" 
                    sx={{ borderRadius: 2, textTransform: 'none', opacity: 0.8 }}
                  >
                    Organization
                  </Button>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Why Join Section */}
      <Box sx={{ py: 10, px: 2, bgcolor: isDarkMode ? '#0d0d0d' : '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" fontWeight="800" sx={{ mb: 2, background: 'linear-gradient(45deg, #0d9488 30%, #2dd4bf 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Why Join our Community?
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
              Join thousands of volunteers and donors making a real impact every single day.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { title: "Full Transparency", text: "Track your contributions in real-time. Know exactly how your help is changing lives.", img: DonationHero },
              { title: "Community Impact", text: "Connect with local communities and see the direct result of your generosity.", img: CommunityImage },
              { title: "Trusted Network", text: "Work with verified organizations and volunteers in a safe, secure environment.", img: TrustImage }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card sx={{ 
                    height: '100%', 
                    borderRadius: 4, 
                    overflow: 'hidden',
                    bgcolor: isDarkMode ? 'rgba(30, 30, 30, 0.4)' : '#fff',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
                  }}>
                    <CardMedia component="img" height="180" image={item.img} sx={{ filter: isDarkMode ? 'brightness(0.8)' : 'none' }} />
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h6" fontWeight="700" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {item.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;

