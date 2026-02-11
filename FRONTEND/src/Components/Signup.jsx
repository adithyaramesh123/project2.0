import { Box, Button, TextField, Typography, Avatar, InputAdornment, IconButton, useTheme, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, CardMedia } from "@mui/material";
import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';

// Images
import CommunityImage from '../assets/community.png';
import DonationHero from '../assets/donation_hero.png';
import TrustImage from '../assets/trust_hands.png';

const Signup = () => {
    const theme = useTheme();
    const [input, setInput] = useState({ fname: '', ename: '', password: '', dob: '', mobile: '', address: '', pincode: '', city: '', state: '', country: 'INDIA' });
    const [loadingPin, setLoadingPin] = useState(false);
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
        if (name === 'pincode' && value.length >= 6) fetchPincode(value);
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
        try {
            const res = await axios.post(`${baseurl}/api`, input);
            alert(res.data?.message || 'Signed up successfully');
            navigate('/L');
        } catch (err) {
            alert(err.response?.data?.message || 'Sign-up failed. Try again.');
        }
    };

    const glassInputSx = { borderRadius: 2, bgcolor: 'rgba(255,255,255,0.4)', '&:hover': { bgcolor: 'rgba(255,255,255,0.6)' } };

    return (
        <>
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${CommunityImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                py: 4,
                overflowX: 'hidden'
            }}>
                {/* Dark Overlay */}
                <Box sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: 1
                }} />

                <Box sx={{ zIndex: 2, width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card sx={{
                        width: { xs: '92%', md: 650 },
                        maxHeight: '85vh',
                        overflowY: 'auto',
                        borderRadius: 4,
                        background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        border: '1px solid rgba(255, 255, 255, 0.18)'
                    }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Avatar sx={{ bgcolor: 'primary.main', height: 50, width: 50, fontSize: '1.8rem', m: 'auto', mb: 1 }}>🚀</Avatar>
                                <Typography variant="h5" fontWeight="bold" color="text.primary">Join Our Community</Typography>
                                <Typography variant="body2" color="text.secondary">Create an account to verify and contribute.</Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth size="small" label="Full Name" name="fname" value={input.fname} onChange={inputHandler}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon color="action" fontSize="small" /></InputAdornment>, sx: glassInputSx }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth size="small" label="Date of Birth" type="date" name="dob" value={input.dob} onChange={inputHandler} InputLabelProps={{ shrink: true }}
                                        InputProps={{ sx: glassInputSx }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth size="small" label="Email" name="ename" value={input.ename} onChange={inputHandler} error={!!errors.ename} helperText={errors.ename}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon color="action" fontSize="small" /></InputAdornment>, sx: glassInputSx }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth size="small" label="Mobile" name="mobile" value={input.mobile} onChange={inputHandler}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon color="action" fontSize="small" /></InputAdornment>, sx: glassInputSx }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth size="small" multiline rows={2} label="Address" name="address" value={input.address} onChange={inputHandler}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><HomeIcon color="action" fontSize="small" /></InputAdornment>, sx: glassInputSx }} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth size="small" label="Pincode" name="pincode" value={input.pincode} onChange={inputHandler} helperText={loadingPin ? "Looking up..." : ""}
                                        InputProps={{ sx: glassInputSx }} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth size="small" label="City" name="city" value={input.city} onChange={inputHandler} InputProps={{ sx: glassInputSx }} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth size="small" label="State" name="state" value={input.state} onChange={inputHandler} InputProps={{ sx: glassInputSx }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Country</InputLabel>
                                        <Select value={input.country} label="Country" name="country" onChange={inputHandler} sx={glassInputSx}>
                                            <MenuItem value="INDIA">INDIA</MenuItem>
                                            <MenuItem value="OTHER">OTHER</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth size="small" label="Password" name="password" type={showPassword ? 'text' : 'password'} value={input.password} onChange={inputHandler} error={!!errors.password} helperText={errors.password}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><LockIcon color="action" fontSize="small" /></InputAdornment>,
                                            endAdornment: <InputAdornment position="end"><IconButton onClick={toggleShowPassword} size="small">{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</IconButton></InputAdornment>,
                                            sx: glassInputSx
                                        }} />
                                </Grid>
                            </Grid>

                            <Button
                                fullWidth
                                variant="contained"
                                size="medium"
                                onClick={addHandler}
                                sx={{ mt: 3, mb: 1, py: 1.2, borderRadius: 2, fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                            >
                                Create Account
                            </Button>

                            <Typography variant="body2" align="center" color="text.secondary">
                                Already have an account? <Link to="/L" style={{ color: theme.palette.primary.main, fontWeight: 'bold', textDecoration: 'none' }}>Log in</Link>
                            </Typography>

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

export default Signup;
