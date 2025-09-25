import { Box, Button, Container, TextField, Typography, Link as MuiLink } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Note: Corrected 'use' to 'useState' and 'useNavigate' import

// Custom style for the background (Replace with your actual image URL)
const BackgroundStyle = {
    // A high-quality image that provides a calm, green backdrop is crucial for transparency.
    backgroundImage: 'url("https://images.unsplash.com/photo-1517594422361-5e581c793623?fit=crop&w=1920&q=80")', // Example: forest, moss, or nature shot
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
};

const Signup = () => {
    // Note: Corrected var to const
    const [input, setInput] = useState({});
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate(); // Corrected capitalization from 'Navigate' to 'navigate'

    const inputHandler = (e) => {
        // console.log(e.target.value); // Keep console logs clean for production
        setInput({ ...input, [e.target.name]: e.target.value });
        // console.log(input);
    };

    const addHandler = () => {
        console.log("Attempting sign up...");
        axios.post(`${baseurl}/api`, input)
            .then((res) => {
                console.log(res);
                alert(res.data.message);
                navigate('/L'); // Redirect to login page on success
            })
            .catch((err) => {
                console.log(err);
                alert("Sign-up failed. Please check your network and try again.");
            });
    };

    return (
        <Box sx={BackgroundStyle}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        width: { xs: '90%', sm: 400 },
                        margin: '0 auto',
                        padding: '40px 32px',
                        // KEY CHANGE: Translucent background effect
                        backgroundColor: "rgba(255, 255, 255, 0.9)", 
                        borderRadius: '16px',
                        // Enhanced, clean shadow
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)", 
                        textAlign: 'center',
                        // Optional: slight border to define the box
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        backdropFilter: 'blur(3px)', // Optional: Glassmorphism effect
                    }}
                >
                    <Typography variant='h4' 
                        sx={{
                            fontWeight: 700, 
                            color: 'success.dark', // Use a deeper green for the title
                            mb: 1
                        }}>
                        Join Helping Hands
                    </Typography>
                    
                    <Typography variant='subtitle1' color="text.secondary" sx={{ mb: 3 }}>
                        "The best way to find yourself is to lose yourself in the service of others."
                    </Typography>

                    {/* Donation Image Placeholder */}
                    <Box sx={{ mb: 3 }}>
                       
                    </Box>

                    {/* Input Fields */}
                    <TextField 
                        fullWidth 
                        label="Full name" 
                        variant="outlined" 
                        name="fname" 
                        onChange={inputHandler}
                        margin="normal" // Adds vertical spacing
                    /><br />
                    <TextField 
                        fullWidth 
                        label="Email id" 
                        variant="outlined" 
                        name="ename" 
                        onChange={inputHandler}
                        margin="normal"
                    /><br />
                    <TextField 
                        fullWidth 
                        label="Password" 
                        variant="outlined" 
                        name="password" 
                        type="password"
                        onChange={inputHandler}
                        margin="normal"
                    /><br />

                    {/* Sign Up Button */}
                    <Button 
                        onClick={addHandler} 
                        variant="contained" 
                        color="success"
                        fullWidth
                        size="large"
                        sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 700 }}
                    >
                        Sign Up
                    </Button>
                    
                    {/* Login Link */}
                    <Typography variant='body2' align='center'>
                        Already a user?{" "}
                        <MuiLink component="button" onClick={() => navigate('/L')} underline="hover" color="primary">
                            Login here
                        </MuiLink>
                    </Typography>

                </Box>
            </Container>
        </Box>
    );
};

export default Signup;
