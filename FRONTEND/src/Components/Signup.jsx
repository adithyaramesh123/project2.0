import { Box, Button, Container, TextField, Typography, Link as MuiLink, Avatar } from '@mui/material';
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
    // Note: Corrected var to const
    const [input, setInput] = useState({});
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate(); // Corrected capitalization from 'Navigate' to 'navigate'nn

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

                    {/* Input Fields */}
                    <TextField
                        fullWidth
                        label="Full name"
                        variant="outlined"
                        name="fname"
                        onChange={inputHandler}
                        margin="normal"
                        sx={{
                            marginBottom: "16px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                                "&.Mui-focused fieldset": { borderColor: "#fff" },
                            },
                            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                            "& .MuiInputBase-input": { color: "#fff" },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email id"
                        variant="outlined"
                        name="ename"
                        onChange={inputHandler}
                        margin="normal"
                        sx={{
                            marginBottom: "16px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                                "&.Mui-focused fieldset": { borderColor: "#fff" },
                            },
                            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                            "& .MuiInputBase-input": { color: "#fff" },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        onChange={inputHandler}
                        margin="normal"
                        sx={{
                            marginBottom: "16px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                                "&.Mui-focused fieldset": { borderColor: "#fff" },
                            },
                            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                            "& .MuiInputBase-input": { color: "#fff" },
                        }}
                    />

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
