import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid, TextField, Button, Typography, Avatar, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';

// Theme-aware page background
const BackgroundStyle = (theme) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 40%, #1e1e1e 70%, #121212 100%)'
    : 'linear-gradient(135deg, #eaf6ff 0%, #dff3ff 40%, #d3ecff 70%, #c8e6ff 100%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 0',
  fontFamily: "'Poppins', sans-serif",
});

export default function Contactt() {
  const theme = useTheme();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

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
    // Basic validation
    validate('email', formData.email);
    validate('message', formData.message);
    if (!formData.email || !formData.message) return;

    try {
      const baseurl = import.meta.env.VITE_API_BASE_URL || '';
      await axios.post(`${baseurl}/api/contact`, formData);
      setOpen(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <Box sx={BackgroundStyle(theme)}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>Get in Touch</Typography>
                <Typography sx={{ color: 'rgba(8,48,107,0.7)', mb: 2 }}>I'd love to hear from you! Whether you have a question or just want to say hi, feel free to drop a message.</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : '#dff6ff', color: theme.palette.mode === 'dark' ? 'primary.contrastText' : '#08306b' }}>📧</Avatar>
                  <Typography sx={{ color: 'rgba(8,48,107,0.7)' }}>youremail@example.com</Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 3, fontSize: 22 }}>
                  <a href="#" style={{ color: '#1e88e5', textDecoration: 'none' }}>🌐</a>
                  <a href="#" style={{ color: '#1e88e5', textDecoration: 'none' }}>📘</a>
                  <a href="#" style={{ color: '#1e88e5', textDecoration: 'none' }}>📸</a>
                  <a href="#" style={{ color: '#1e88e5', textDecoration: 'none' }}>🔗</a>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box sx={{ p: { xs: 2, sm: 3 }, background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,252,255,0.98))', borderRadius: 2, boxShadow: '0 10px 36px rgba(16,81,139,0.06)' }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                        sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                        sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                        sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                        sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="message"
                        label="Message *"
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        multiline
                        rows={5}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><MessageIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
                        sx={{ bgcolor: 'rgba(246,251,255,0.95)', borderRadius: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ background: 'primary.main', color: 'primary.contrastText', fontWeight: 700, padding: '12px 20px', borderRadius: 2 }}>Send Message</Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ width: '100%' }} onClose={() => setOpen(false)}>Message sent — we will get back to you shortly.</Alert>
      </Snackbar>
    </Box>
  );
}
