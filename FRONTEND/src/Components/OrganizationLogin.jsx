import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert,Avatar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrganizationLogin = () => {
    const [input, setInput] = useState({ contactEmail: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const baseurl = import.meta.env.VITE_API_BASE_URL;

    const onChange = (e) => setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(`${baseurl}/api/organizations/login`, input);
            if (res.data && res.data.organization) {
                const org = res.data.organization;
                localStorage.setItem('orgId', org._id);
                localStorage.setItem('orgName', org.name || 'Organization');
                localStorage.setItem('orgEmail', org.contactEmail || '');
                // Optionally store org token or role
                sessionStorage.setItem('role', 'organization');
                window.dispatchEvent(new Event('roleChanged'));
                navigate('/admin/org');
            }
        } catch (err) {
            console.error('Org login failed', err);
            setError(err?.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <Box
                sx={{
                    width: { xs: 350, sm: 420 },
                    padding: "40px 32px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
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
                    🏢
                </Avatar>

                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: "-0.5px",
                        marginBottom: "8px",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                >
                    Organization Portal
                </Typography>

                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                        color: "rgba(255,255,255,0.8)",
                        marginBottom: 4,
                        fontSize: "16px",
                    }}
                >
                    Login to your organization account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2, backgroundColor: "rgba(255,0,0,0.1)", color: "#fff" }}>{error}</Alert>}
                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        label="Contact Email"
                        name="contactEmail"
                        value={input.contactEmail}
                        onChange={onChange}
                        sx={{
                            mb: 2,
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
                        name="password"
                        type="password"
                        value={input.password}
                        onChange={onChange}
                        sx={{
                            mb: 2,
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: "#fff",
                            color: "#000",
                            fontWeight: "600",
                            padding: "12px",
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
                        Login
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default OrganizationLogin;
