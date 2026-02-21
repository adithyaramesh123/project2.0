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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CardMedia,
    Container,
    Paper,
    Divider,
    Fade,
} from "@mui/material";
import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Icons
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Images
import CommunityImage from '../assets/community.png';
import DonationHero from '../assets/donation_hero.png';
import TrustImage from '../assets/trust_hands.png';

const Signup = () => {
    const muiTheme = useTheme();
    const isDarkMode = muiTheme.palette.mode === 'dark';
    const [input, setInput] = useState({ fname: '', ename: '', password: '', dob: '', mobile: '', address: '', pincode: '', city: '', state: '', country: 'INDIA' });
    const [loadingPin, setLoadingPin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const toggleShowPassword = () => setShowPassword((s) => !s);
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const validateField = (name, value) => {
        let msg = '';
        if ((name === 'fname' || name === 'ename' || name === 'password') && !value) msg = 'Required';
        if (name === 'ename' && value && !validateEmail(value)) msg = 'Invalid email';
        if (name === 'password' && value && value.length < 6) msg = 'Min 6 chars';
        setErrors(prev => {
            const copy = { ...prev };
            if (msg) copy[name] = msg; else delete copy[name];
            return copy;
        });
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
        if (['fname', 'ename', 'password', 'pincode'].includes(name)) validateField(name, value);
        if (name === 'pincode' && value.length === 6) fetchPincode(value);
    };

    const fetchPincode = async (pin) => {
        setLoadingPin(true);
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
            const data = await res.json();
            if (data?.[0]?.Status === 'Success') {
                const po = data[0].PostOffice[0];
                setInput(prev => ({ ...prev, city: po.District || prev.city, state: po.State || prev.state, country: po.Country || prev.country }));
            }
        } catch (err) { console.warn(err); }
        setLoadingPin(false);
    };

    const addHandler = async () => {
        if (!input.fname || !input.ename || !input.password) return alert('Please complete required fields');
        setLoading(true);
        try {
            const res = await axios.post(`${baseurl}/api`, input);
            navigate('/L');
        } catch (err) {
            alert(err.response?.data?.message || 'Sign-up failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const glassInputSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            '&:hover': { bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
            transition: 'all 0.2s ease',
        }
    };

    return (
        <Box sx={{ bgcolor: isDarkMode ? '#0a0a0a' : '#f0fdfa', minHeight: '100vh', overflowX: 'hidden' }}>
            <Box sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${CommunityImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                py: 6,
                px: 2
            }}>
                {/* Animated Background Blobs */}
                <Box sx={{
                    position: 'absolute',
                    top: '5%',
                    right: '10%',
                    width: '350px',
                    height: '350px',
                    background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(50px)',
                    zIndex: 0
                }} component={motion.div} animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 7, repeat: Infinity }} />

                <Container maxWidth="md" sx={{ zIndex: 1, position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Paper
                            elevation={24}
                            sx={{
                                p: { xs: 3, md: 6 },
                                borderRadius: 5,
                                background: isDarkMode ? 'rgba(20, 20, 20, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: isDarkMode ? '0 30px 60px -12px rgba(0, 0, 0, 0.8)' : '0 30px 60px -12px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <Box sx={{ textAlign: 'center', mb: 5 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: 'primary.main',
                                        height: 64,
                                        width: 64,
                                        fontSize: '2rem',
                                        mx: 'auto',
                                        mb: 2,
                                        boxShadow: '0 0 25px rgba(13,148,136,0.5)'
                                    }}
                                >
                                    🚀
                                </Avatar>
                                <Typography variant="h4" fontWeight="900" sx={{ color: 'text.primary', mb: 1, letterSpacing: '-0.5px' }}>
                                    Join Our Community
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                                    Create an account to start your journey of giving
                                </Typography>
                            </Box>

                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Full Name" name="fname" value={input.fname} onChange={inputHandler}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                                        sx={glassInputSx} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Date of Birth" type="date" name="dob" value={input.dob} onChange={inputHandler} InputLabelProps={{ shrink: true }}
                                        sx={glassInputSx} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email" name="ename" value={input.ename} onChange={inputHandler} error={!!errors.ename} helperText={errors.ename}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                                        sx={glassInputSx} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Mobile" name="mobile" value={input.mobile} onChange={inputHandler}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                                        sx={glassInputSx} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline rows={2} label="Address" name="address" value={input.address} onChange={inputHandler}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><HomeIcon sx={{ color: 'primary.main', opacity: 0.7, mt: 1 }} /></InputAdornment> }}
                                        sx={glassInputSx} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="Pincode" name="pincode" value={input.pincode} onChange={inputHandler}
                                        helperText={loadingPin ? <Fade in={loadingPin}><Typography variant="caption">Fetching details...</Typography></Fade> : ""}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><MapIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                                        sx={glassInputSx} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="City" name="city" value={input.city} onChange={inputHandler}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><LocationCityIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                                        sx={glassInputSx} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="State" name="state" value={input.state} onChange={inputHandler} sx={glassInputSx} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth sx={glassInputSx}>
                                        <InputLabel>Country</InputLabel>
                                        <Select value={input.country} label="Country" name="country" onChange={inputHandler} sx={{ borderRadius: 2 }}>
                                            <MenuItem value="INDIA">INDIA</MenuItem>
                                            <MenuItem value="OTHER">OTHER</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} value={input.password} onChange={inputHandler} error={!!errors.password} helperText={errors.password}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment>,
                                            endAdornment: <InputAdornment position="end"><IconButton onClick={toggleShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>,
                                        }} sx={glassInputSx} />
                                </Grid>
                            </Grid>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={addHandler}
                                disabled={loading || !input.fname || !input.ename || !input.password}
                                endIcon={<ChevronRightIcon />}
                                sx={{
                                    mt: 5,
                                    mb: 2,
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: '800',
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    boxShadow: '0 10px 20px -5px rgba(13,148,136,0.5)',
                                    backgroundImage: 'linear-gradient(45deg, #0d9488, #14b8a6)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 15px 30px -5px rgba(13,148,136,0.6)',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {loading ? 'Creating Account...' : 'Create Your Account'}
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 3 }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Already have an account?{' '}
                                    <Typography
                                        component={Link}
                                        to="/L"
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: '800',
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        Sign in
                                    </Typography>
                                </Typography>
                            </Box>
                        </Paper>
                    </motion.div>
                </Container>
            </Box>

            {/* Features/Info Section */}
            <Box sx={{ py: 12, px: 2, bgcolor: isDarkMode ? '#0d0d0d' : '#f8fafc' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {[
                            { title: "Transparency", text: "We believe in direct impact. 100% of your contributions go to the field.", img: DonationHero, icon: "💎" },
                            { title: "Community", text: "Join a global network of volunteers and organizations dedicated to change.", img: CommunityImage, icon: "🌍" },
                            { title: "Trust", text: "Security and trust are our priorities. Your data and donations are safe with us.", img: TrustImage, icon: "🛡️" }
                        ].map((item, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                                    <Card sx={{
                                        height: '100%',
                                        borderRadius: 4,
                                        bgcolor: isDarkMode ? 'rgba(30, 30, 30, 0.4)' : '#fff',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                                        overflow: 'hidden'
                                    }}>
                                        <CardMedia component="img" height="160" image={item.img} sx={{ filter: isDarkMode ? 'brightness(0.8)' : 'none' }} />
                                        <CardContent sx={{ p: 4 }}>
                                            <Typography variant="h6" fontWeight="800" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span>{item.icon}</span> {item.title}
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

export default Signup;

