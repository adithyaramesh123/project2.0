import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Avatar, InputAdornment, IconButton, Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Pastel-blue page background (matches Signup)
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

const OrganizationLogin = () => { 
    const [input, setInput] = useState({ contactEmail: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const baseurl = import.meta.env.VITE_API_BASE_URL;

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validateField = (name, value) => {
        let msg = '';
        if ((name === 'contactEmail' || name === 'password') && !value) msg = 'Required';
        if (name === 'contactEmail' && value && !validateEmail(value)) msg = 'Invalid email';
        setErrors(prev => {
            const copy = { ...prev };
            if (msg) copy[name] = msg; else delete copy[name];
            return copy;
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
        if (name === 'contactEmail' || name === 'password') validateField(name, value);
    };

    const toggleShowPassword = () => setShowPassword((s) => !s);

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
        <>
            <Box sx={{
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
            }}>
                <Box
                    sx={{
                        width: { xs: '94%', sm: 720, md: 900 },
                        maxWidth: 1100,
                        padding: { xs: '28px', sm: '48px' },
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,252,255,0.98))',
                        borderRadius: '16px',
                        boxShadow: '0 14px 48px rgba(16,81,139,0.08)',
                        textAlign: 'center',
                        border: '1px solid rgba(30,120,200,0.08)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, justifyContent: 'center' }}>
                        <Avatar sx={{ width: 96, height: 96, bgcolor: '#dff6ff', color: '#08306b', fontSize: '2.2rem' }}>🏢</Avatar>
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 800, color: '#08306b', fontSize: { xs: '1.6rem', sm: '1.9rem' } }}>Organization Portal</Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(8,48,107,0.65)', fontSize: 16 }}>Login to your organization account</Typography>
                        </Box>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 2, backgroundColor: "rgba(255,235,238,0.95)", color: "#6b0d0d" }}>{error}</Alert>}
                    <form onSubmit={onSubmit}>
                        <TextField
                            fullWidth
                            label="Contact Email"
                            name="contactEmail"
                            value={input.contactEmail}
                            onChange={onChange}
                            error={!!errors.contactEmail}
                            helperText={errors.contactEmail}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(246,251,255,0.95)",
                                    "& fieldset": { borderColor: "rgba(30,120,200,0.06)" },
                                    "&:hover fieldset": { borderColor: "rgba(30,120,200,0.12)" },
                                    "&.Mui-focused fieldset": { borderColor: "rgba(30,120,200,0.2)" },
                                },
                                "& .MuiInputLabel-root": { color: "rgba(8,48,107,0.6)" },
                                "& .MuiInputBase-input": { color: "#08306b" },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={input.password}
                            onChange={onChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><LockIcon sx={{ color: '#1976d2' }} /></InputAdornment>),
                                endAdornment: (<InputAdornment position="end"><IconButton onClick={toggleShowPassword} edge="end" size="small" sx={{ color: '#1976d2' }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)
                            }}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(246,251,255,0.95)",
                                    "& fieldset": { borderColor: "rgba(30,120,200,0.06)" },
                                    "&:hover fieldset": { borderColor: "rgba(30,120,200,0.12)" },
                                    "&.Mui-focused fieldset": { borderColor: "rgba(30,120,200,0.2)" },
                                },
                                "& .MuiInputLabel-root": { color: "rgba(8,48,107,0.6)" },
                                "& .MuiInputBase-input": { color: "#08306b" },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!input.contactEmail || !input.password || Object.keys(errors).length > 0}
                            sx={{
                                mt: 2,
                                background: 'linear-gradient(90deg,#bfe8ff,#92d1ff)',
                                color: '#08306b',
                                fontWeight: 800,
                                padding: '14px',
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontSize: '18px',
                                boxShadow: '0 10px 28px rgba(16,81,139,0.08)',
                                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 16px 36px rgba(16,81,139,0.1)' },
                            }}
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Box>

            {/* NGO Organization Cards Section */}
            <Box sx={{ py: 8, px: { xs: '20px', sm: '40px' }, background: 'linear-gradient(180deg, #f5f9fc 0%, #ffffff 100%)' }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#08306b', textAlign: 'center', mb: 6, fontSize: { xs: '1.8rem', sm: '2.2rem' } }}>
                        Why Partner With Us?
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Card 1 */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                height: '100%',
                                borderRadius: '12px',
                                boxShadow: '0 8px 24px rgba(16,81,139,0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 16px 40px rgba(16,81,139,0.15)'
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"
                                    alt="Community Support"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#08306b', mb: 1 }}>
                                        Community Impact
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(8,48,107,0.7)', lineHeight: 1.6 }}>
                                        Connect with communities that need your support. Make a tangible difference in lives.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Card 2 */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                height: '100%',
                                borderRadius: '12px',
                                boxShadow: '0 8px 24px rgba(16,81,139,0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 16px 40px rgba(16,81,139,0.15)'
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                                    alt="Transparency"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#08306b', mb: 1 }}>
                                        Full Transparency
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(8,48,107,0.7)', lineHeight: 1.6 }}>
                                        Track donations and requests in real-time. Know exactly where your contributions go.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Card 3 */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                height: '100%',
                                borderRadius: '12px',
                                boxShadow: '0 8px 24px rgba(16,81,139,0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 16px 40px rgba(16,81,139,0.15)'
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
                                    alt="Easy Management"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#08306b', mb: 1 }}>
                                        Easy Management
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(8,48,107,0.7)', lineHeight: 1.6 }}>
                                        Simple dashboard to manage requests and coordinate donations. Built for efficiency.
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

export default OrganizationLogin;
