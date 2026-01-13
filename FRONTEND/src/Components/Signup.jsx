import { Box, Button, Container, TextField, Typography, Link as MuiLink, Avatar, Grid, FormControl, InputLabel, Select, MenuItem, InputAdornment, IconButton, FormHelperText, Stack } from '@mui/material';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons for modern inputs
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Custom background using a pastel-blue palette
const BackgroundStyle = {
    backgroundImage: `linear-gradient(135deg, #eaf6ff 0%, #dff3ff 40%, #d3ecff 70%, #c8e6ff 100%), linear-gradient(90deg, #eaf6ff 0%, #dff3ff 25%, #d3ecff 50%, #c8e6ff 75%, #bfe6ff 100%)`,
    backgroundSize: 'cover, 100% 60px',
    backgroundPosition: 'center, bottom',
    backgroundRepeat: 'no-repeat, no-repeat',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
    fontFamily: "'Poppins', sans-serif",
};

const Signup = () => {
    const [input, setInput] = useState({ fname: '', ename: '', password: '', dob: '', mobile: '', address: '', pincode: '', city: '', state: '', country: 'INDIA' });
    const [loadingPin, setLoadingPin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    // Refs for inputs to support Enter-to-advance and auto-advance
    const fnameRef = useRef(null);
    const dobRef = useRef(null);
    const enameRef = useRef(null);
    const mobileRef = useRef(null);
    const addressRef = useRef(null);
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);
    const passwordRef = useRef(null);

    const handleKeyDown = (e, next) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (next === 'submit') {
                addHandler();
            } else {
                const map = { fname: fnameRef, dob: dobRef, ename: enameRef, mobile: mobileRef, address: addressRef, pincode: pincodeRef, city: cityRef, state: stateRef, country: countryRef, password: passwordRef };
                map[next]?.current?.focus?.();
            }
        }
    };

    const toggleShowPassword = () => setShowPassword((s) => !s);

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const validateField = (name, value) => {
        let msg = '';
        if ((name === 'fname' || name === 'ename' || name === 'password') && !value) msg = 'Required';
        if (name === 'ename' && value && !validateEmail(value)) msg = 'Invalid email';
        if (name === 'password' && value && value.length < 6) msg = 'Use at least 6 characters';
        setErrors(prev => {
            const copy = { ...prev };
            if (msg) copy[name] = msg; else delete copy[name];
            return copy;
        });
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
        if (['fname','ename','password','pincode'].includes(name)) validateField(name, value);
        if (name === 'pincode' && value && value.length >= 6) {
            fetchPincode(value);
            // auto-focus city after pincode entry
            setTimeout(() => cityRef.current?.focus(), 0);
        }
    };  

    const fetchPincode = async (pin) => {
        if (!pin || pin.toString().length < 6) return;
        setLoadingPin(true);
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
            const data = await res.json();
            if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length) {
                const po = data[0].PostOffice[0];
                setInput(prev => ({ ...prev, city: po.District || prev.city, state: po.State || prev.state, country: po.Country || prev.country }));
            }
        } catch (err) {
            console.warn('Pincode lookup failed', err);
        } finally {
            setLoadingPin(false);
        }
    };

    const addHandler = async () => {
        if (!input.fname || !input.ename || !input.password) return alert('Please complete required fields (name, email, password)');
        try {
            const res = await axios.post(`${baseurl}/api`, input);
            alert(res.data?.message || 'Signed up successfully');
            navigate('/L');
        } catch (err) {
            console.error('Signup failed', err);
            alert('Sign-up failed. Please check your network and try again.');
        }
    };

    return (
        <Box sx={BackgroundStyle}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        width: { xs: '92%', sm: 520 },
                        margin: '0 auto',
                        padding: { xs: '24px', sm: '36px' },
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,252,255,0.98))',
                        borderRadius: '14px',
                        boxShadow: '0 8px 30px rgba(16,81,139,0.06)',
                        color: '#08306b',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid rgba(30,120,200,0.08)'
                    }}
                >
                
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ width: 64, height: 64, bgcolor: '#dff6ff', color: '#08306b', fontSize: '1.8rem' }}>🤝</Avatar>
                        <Box>
                            <Typography variant='h4' sx={{ fontWeight: 700, color: '#08306b' }}>Join Helping Hands</Typography>
                            <Typography variant='body2' sx={{ color: 'rgba(8,48,107,0.65)' }}>
                                The best way to find yourself is to lose yourself in the service of others.
                            </Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={{ span: 12 }} sm={{ span: 8 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Full Name *"
                                name="fname"
                                value={input.fname}
                                onChange={inputHandler}
                                inputRef={fnameRef}
                                onKeyDown={(e) => handleKeyDown(e, 'dob')}
                                size="small"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                                error={!!errors.fname}
                                helperText={errors.fname}
                                sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }}
                            />
                        </Grid>
                        <Grid item xs={{ span: 12 }} sm={{ span: 4 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Date of Birth"
                                name="dob"
                                value={input.dob}
                                onChange={inputHandler}
                                inputRef={dobRef}
                                onKeyDown={(e) => handleKeyDown(e, 'ename')}
                                type="date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><CalendarTodayIcon fontSize="small" sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                                sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }}
                            />
                        </Grid>

                        <Grid item xs={{ span: 12 }} sm={{ span: 6 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email *"
                                name="ename"
                                value={input.ename}
                                onChange={inputHandler}
                                inputRef={enameRef}
                                onKeyDown={(e) => handleKeyDown(e, 'mobile')}
                                size="small"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                                error={!!errors.ename}
                                helperText={errors.ename}
                                sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }}
                            />
                        </Grid>
                        <Grid item xs={{ span: 12 }} sm={{ span: 6 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Mobile Number"
                                name="mobile"
                                value={input.mobile}
                                onChange={inputHandler}
                                inputRef={mobileRef}
                                onKeyDown={(e) => handleKeyDown(e, 'address')}
                                size="small"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                                sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }}
                            />
                        </Grid>

                        <Grid item xs={{ span: 12 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Address"
                                name="address"
                                value={input.address}
                                onChange={inputHandler}
                                inputRef={addressRef}
                                onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); pincodeRef.current?.focus(); } }}
                                multiline
                                rows={2}
                                size="small"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><HomeIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                                sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }}
                            />
                        </Grid>

                        <Grid item xs={{ span: 12 }} sm={{ span: 4 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Pincode"
                                name="pincode"
                                value={input.pincode}
                                onChange={(e) => { inputHandler(e); if (e.target.value.length >= 6) fetchPincode(e.target.value); }}
                                size="small"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOnIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                                helperText={loadingPin ? 'Looking up pincode...' : ''}
                                sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }}
                            />
                        </Grid>
                        <Grid item xs={{ span: 12 }} sm={{ span: 4 }}>
                            <TextField variant="outlined" fullWidth label="City" name="city" value={input.city} onChange={inputHandler} inputRef={cityRef} onKeyDown={(e) => handleKeyDown(e, 'state')} size="small" sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }} />
                        </Grid>
                        <Grid item xs={{ span: 12 }} sm={{ span: 4 }}>
                            <TextField variant="outlined" fullWidth label="State" name="state" value={input.state} onChange={inputHandler} inputRef={stateRef} onKeyDown={(e) => handleKeyDown(e, 'country')} size="small" sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }} />
                        </Grid>

                        <Grid item xs={{ span: 12 }} sm={{ span: 6 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel sx={{ color: 'rgba(255,255,255,0.85)' }}>Country</InputLabel>
                                <Select value={input.country} label="Country" name="country" onChange={inputHandler} inputRef={countryRef} onKeyDown={(e) => handleKeyDown(e, 'password')} sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1, border: '1px solid rgba(30,120,200,0.06)' }}>
                                    <MenuItem value="INDIA">INDIA</MenuItem>
                                    <MenuItem value="OTHER">OTHER</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={{ span: 12 }} sm={{ span: 6 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Password *"
                                name="password"
                                value={input.password}
                                onChange={inputHandler}
                                inputRef={passwordRef}
                                onKeyDown={(e) => handleKeyDown(e, 'submit')}
                                type={showPassword ? 'text' : 'password'}
                                size="small"
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),
                                    endAdornment: (<InputAdornment position="end"><IconButton onClick={toggleShowPassword} edge="end" size="small" sx={{ color: '#fff' }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)
                                }}
                                error={!!errors.password}
                                helperText={errors.password}
                                sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        onClick={addHandler}
                        disabled={!input.fname || !input.ename || !input.password || Object.keys(errors).length > 0}
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            mt: 3,
                            mb: 1.5,
                            py: 1.5,
                            fontWeight: 700,
                            borderRadius: '10px',
                            background: 'linear-gradient(90deg,#bfe8ff,#92d1ff)',
                            color: '#08306b',
                            boxShadow: '0 8px 20px rgba(16,81,139,0.06)',
                            textTransform: 'none',
                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 28px rgba(16,81,139,0.08)' }
                        }} 
                    >
                        Sign Up
                    </Button>

                    <Typography variant='body2' align='center' sx={{ color: 'rgba(8,48,107,0.7)', mt: 1 }}>
                        Already a user? <MuiLink component="button" onClick={() => navigate('/L')} sx={{ color: '#1e88e5', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Login here</MuiLink>
                    </Typography>

                </Box>
            </Container>
        </Box>
    );
};

export default Signup;
