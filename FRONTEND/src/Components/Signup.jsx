import { Box, Button, Container, TextField, Typography, Link as MuiLink, Avatar, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom style for the background (Replace with your actual image URL)
const BackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const inputHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

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
                        width: { xs: '90%', sm: 400 },
                        margin: '0 auto',
                        padding: '40px 32px',
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: '20px',
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                        textAlign: 'center',
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                            borderRadius: "20px",
                            zIndex: -1,
                        },
                    }}
                >
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mx: "auto",
                            mb: 2,
                            bgcolor: "rgba(255,255,255,0.2)",
                            fontSize: "2rem",
                        }}
                    >
                        👤
                    </Avatar>

                    <Typography variant='h4'
                        sx={{
                            fontWeight: 700,
                            color: "#fff",
                            letterSpacing: "-0.5px",
                            marginBottom: "8px",
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            mb: 1
                        }}>
                        Join Helping Hands
                    </Typography>

                    <Typography variant='subtitle1' sx={{ color: "rgba(255,255,255,0.8)", mb: 3, fontSize: "16px" }}>
                        "The best way to find yourself is to lose yourself in the service of others."
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth label="Full Name *" name="fname" value={input.fname} onChange={inputHandler} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="Date of Birth" name="dob" value={input.dob} onChange={inputHandler} type="date" size="small" InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Email *" name="ename" value={input.ename} onChange={inputHandler} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Mobile Number *" name="mobile" value={input.mobile} onChange={inputHandler} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth label="Address" name="address" value={input.address} onChange={inputHandler} multiline rows={2} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="Pincode" name="pincode" value={input.pincode} onChange={(e) => { inputHandler(e); if (e.target.value.length >= 6) fetchPincode(e.target.value); }} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} helperText={loadingPin ? 'Looking up pincode...' : ''} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="City" name="city" value={input.city} onChange={inputHandler} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="State" name="state" value={input.state} onChange={inputHandler} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Country</InputLabel>
                                <Select value={input.country} label="Country" name="country" onChange={inputHandler} sx={{ bgcolor: 'rgba(255,255,255,0.03)', color: '#fff' }}>
                                    <MenuItem value="INDIA">INDIA</MenuItem>
                                    <MenuItem value="OTHER">OTHER</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Password *" name="password" value={input.password} onChange={inputHandler} type="password" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }} />
                        </Grid>
                    </Grid>

                    {/* Sign Up Button */}
                    <Button
                        onClick={addHandler}
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            mt: 3,
                            mb: 2,
                            py: 1.5,
                            fontWeight: 700,
                            backgroundColor: "#fff",
                            color: "#000",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "16px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.9)",
                                boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                    
                    {/* Login Link */}
                    <Typography variant='body2' align='center' sx={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                        Already a user?{" "}
                        <MuiLink
                            component="button"
                            onClick={() => navigate('/L')}
                            sx={{
                                color: "#fff",
                                fontWeight: 600,
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Login here
                        </MuiLink>
                    </Typography>

                </Box>
            </Container>
        </Box>
    );
};

export default Signup;
