import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  useTheme,
  Divider
} from '@mui/material';
import { motion } from "framer-motion";

// Icons
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadsetIcon from '@mui/icons-material/Headset';

export default function Contactt() {
  const muiTheme = useTheme();
  const isDarkMode = muiTheme.palette.mode === 'dark';

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (name, value) => {
    let msg = '';
    if ((name === 'email' || name === 'message') && !value) msg = 'Required';
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) msg = 'Invalid email';
    setErrors(prev => {
      const copy = { ...prev };
      if (msg) copy[name] = msg; else delete copy[name];
      return copy;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (['email', 'message'].includes(name)) validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate('email', formData.email);
    validate('message', formData.message);
    if (!formData.email || !formData.message) return;

    setLoading(true);
    try {
      const baseurl = import.meta.env.VITE_API_BASE_URL || '';
      await axios.post(`${baseurl}/api/contact`, formData);
      setOpen(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error("Failed to send message", error);
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
    <Box sx={{
      bgcolor: isDarkMode ? '#0a0a0a' : '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: isDarkMode
        ? 'radial-gradient(circle at 0% 0%, #111 0%, #050505 100%)'
        : 'radial-gradient(circle at 0% 0%, #f0fdf4 0%, #ffffff 100%)',
      py: 10
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={0} sx={{
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: isDarkMode ? '0 40px 100px -20px rgba(0,0,0,0.8)' : '0 40px 100px -20px rgba(16,81,139,0.12)',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
          }}>
            {/* Info Section */}
            <Grid size={{ xs: 12, md: 5 }} sx={{
              background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
              color: 'white',
              p: { xs: 4, sm: 8 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Box>
                <Typography variant="h3" fontWeight="900" sx={{ mb: 2, letterSpacing: '-1.5px' }}>
                  Get in Touch
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 6, lineHeight: 1.8 }}>
                  Have questions about how you can contribute or need assistance? Our team is dedicated to supporting your journey in making a global impact.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 50, height: 50 }}>
                      <EmailIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 700, textTransform: 'uppercase' }}>Email Us</Typography>
                      <Typography variant="body1" fontWeight="600">contact@changinglives.org</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 50, height: 50 }}>
                      <LocationOnIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 700, textTransform: 'uppercase' }}>Our Office</Typography>
                      <Typography variant="body1" fontWeight="600">123 Charity Way, Global City</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 50, height: 50 }}>
                      <HeadsetIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 700, textTransform: 'uppercase' }}>Call Us</Typography>
                      <Typography variant="body1" fontWeight="600">+1 (234) 567-890</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 8 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Follow Our Impact</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[FacebookIcon, InstagramIcon, LinkedInIcon, LanguageIcon].map((Icon, i) => (
                    <IconButton key={i} sx={{
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.2)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-3px)' },
                      transition: 'all 0.3s ease'
                    }}>
                      <Icon fontSize="small" />
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Form Section */}
            <Grid size={{ xs: 12, md: 7 }} sx={{
              p: { xs: 4, sm: 8 },
              bgcolor: muiTheme.palette.mode === 'dark' ? 'rgba(20,20,20,0.8)' : '#ffffff',
              backdropFilter: 'blur(20px)'
            }}>
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" fontWeight="800" sx={{ mb: 1, letterSpacing: '-0.5px' }}>
                  Send us a Message
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
                  Fields marked with * are required. We usually respond within 24 hours.
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                      sx={glassInputSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                      sx={glassInputSx}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                      sx={glassInputSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                      sx={glassInputSx}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      name="message"
                      label="Your Message *"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      multiline
                      rows={5}
                      InputProps={{ startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}><MessageIcon sx={{ color: 'primary.main', opacity: 0.7 }} /></InputAdornment> }}
                      sx={glassInputSx}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      endIcon={loading ? null : <SendIcon />}
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        fontWeight: '800',
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0 10px 20px -5px rgba(13,148,136,0.3)',
                        mt: 2,
                        '&:hover': { transform: 'translateY(-2px)' }
                      }}
                    >
                      {loading ? 'Sending...' : 'Transmit Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: 3, fontWeight: 600 }} onClose={() => setOpen(false)}>
          Success! We've received your message and will reach out soon.
        </Alert>
      </Snackbar>
    </Box>
  );
}
