import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Avatar,
    InputAdornment,
    IconButton,
    Card,
    CardContent,
    CardMedia,
    Grid,
    useTheme,
    Container,
    Paper,
    Divider,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Globe, ShieldCheck } from "lucide-react";

// Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BusinessIcon from '@mui/icons-material/Business';

const OrganizationLogin = () => {
    const muiTheme = useTheme();
    const isDarkMode = muiTheme.palette.mode === 'dark';
    const [input, setInput] = useState({ contactEmail: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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

    const contactEmailRef = useRef(null);
    const passwordRef = useRef(null);
    const handleKeyDown = (e, next) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (next === 'submit') onSubmit();
            else {
                const map = { contactEmail: contactEmailRef, password: passwordRef };
                map[next]?.current?.focus?.();
            }
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
        if (name === 'contactEmail' || name === 'password') validateField(name, value);
    };

    const toggleShowPassword = () => setShowPassword((s) => !s);

    const onSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!input.contactEmail || !input.password) return;
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${baseurl}/api/organizations/login`, input);
            if (res.data && res.data.organization) {
                const org = res.data.organization;
                localStorage.setItem('orgId', org._id);
                localStorage.setItem('orgName', org.name || 'Organization');
                localStorage.setItem('orgEmail', org.contactEmail || '');
                sessionStorage.setItem('role', 'organization');
                window.dispatchEvent(new Event('roleChanged'));
                navigate('/admin/org');
            }
        } catch (err) {
            console.error('Org login failed', err);
            setError(err?.response?.data?.error || 'Login failed. Please verify your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const glassInputSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            '&:hover': { bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
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
                background: isDarkMode
                    ? 'linear-gradient(135deg, #111 0%, #050505 100%)'
                    : 'linear-gradient(135deg, #f0fdf4 0%, #e1f1ff 100%)',
                px: 2,
                py: 6
            }}>
                {/* Decorative Blobs */}
                <Box sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    zIndex: 0
                }} component={motion.div} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} />

                <Container maxWidth="sm" sx={{ zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <Paper
                            elevation={24}
                            sx={{
                                p: { xs: 3, sm: 6 },
                                borderRadius: 5,
                                background: isDarkMode ? 'rgba(25, 25, 25, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: isDarkMode ? '0 40px 80px -12px rgba(0, 0, 0, 0.9)' : '0 40px 80px -12px rgba(16, 81, 139, 0.12)',
                            }}
                        >
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: 'primary.main',
                                        mx: 'auto',
                                        mb: 2,
                                        width: 80,
                                        height: 80,
                                        boxShadow: '0 0 30px rgba(13,148,136,0.4)',
                                        fontSize: '2.5rem'
                                    }}
                                >
                                    🏢
                                </Avatar>
                                <Typography variant="h4" fontWeight="900" sx={{ color: 'text.primary', mb: 1, letterSpacing: '-1px' }}>
                                    Organization Portal
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Access your dashboard to manage impact
                                </Typography>
                            </Box>

                            {error && (
                                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={onSubmit}>
                                <Grid container spacing={2.5}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Contact Email"
                                            name="contactEmail"
                                            value={input.contactEmail}
                                            onChange={onChange}
                                            inputRef={contactEmailRef}
                                            onKeyDown={(e) => handleKeyDown(e, 'password')}
                                            error={!!errors.contactEmail}
                                            helperText={errors.contactEmail}
                                            InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                                            sx={glassInputSx}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={input.password}
                                            onChange={onChange}
                                            inputRef={passwordRef}
                                            onKeyDown={(e) => handleKeyDown(e, 'submit')}
                                            error={!!errors.password}
                                            helperText={errors.password}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment>,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={toggleShowPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={glassInputSx}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading || !input.contactEmail || !input.password}
                                    endIcon={loading ? null : <ChevronRightIcon />}
                                    sx={{
                                        mt: 5,
                                        py: 2,
                                        borderRadius: 3,
                                        fontWeight: '800',
                                        fontSize: '1.1rem',
                                        textTransform: 'none',
                                        boxShadow: '0 10px 20px -5px rgba(13,148,136,0.5)',
                                        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 15px 30px -5px rgba(13,148,136,0.6)' },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {loading ? 'Authenticating...' : 'Sign In to Portal'}
                                </Button>
                            </form>

                            <Box sx={{ mt: 4, textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Need assistance? <Typography component={Link} to="/contact" sx={{ color: 'primary.main', fontWeight: 800, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Contact Support</Typography>
                                </Typography>
                            </Box>
                        </Paper>
                    </motion.div>
                </Container>
            </Box>

            {/* Partner Info Section */}
            <Box sx={{ py: 12, px: 2, bgcolor: isDarkMode ? '#0d0d0d' : '#fff' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h3" fontWeight="900" gutterBottom sx={{ background: 'linear-gradient(45deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Partner With Us
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
                            Join a network of organizations dedicated to creating sustainable change across the globe.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            { title: "Global Impact", text: "Reach communities that need your specific expertise and support.", icon: <Globe size={32} />, img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop" },
                            { title: "Transparency", text: "Tools built for real-time tracking and reporting of donor contributions.", icon: <ShieldCheck size={32} />, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" },
                            { title: "Management", text: "Efficient dashboard to manage requests and coordinate with volunteers.", icon: <BusinessIcon sx={{ fontSize: 32 }} />, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" }
                        ].map((item, idx) => (
                            <Grid item xs={12} md={4} key={idx}>
                                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                                    <Card sx={{
                                        height: '100%',
                                        borderRadius: 4,
                                        bgcolor: isDarkMode ? 'rgba(30, 30, 30, 0.4)' : '#f8fafc',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                                        overflow: 'hidden'
                                    }}>
                                        <CardMedia component="img" height="180" image={item.img} sx={{ filter: isDarkMode ? 'brightness(0.7)' : 'none' }} />
                                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                            <Typography variant="h6" fontWeight="800" gutterBottom>{item.title}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.text}</Typography>
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

export default OrganizationLogin;
