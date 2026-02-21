import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Avatar,
  InputAdornment,
  IconButton,
  useTheme,
  Paper,
  Container,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

// Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ShieldIcon from '@mui/icons-material/Shield';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Adminlogin = () => {
  const muiTheme = useTheme();
  const isDarkMode = muiTheme.palette.mode === 'dark';
  const [input, setInput] = useState({ ename: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const baseurl = import.meta.env.VITE_API_BASE_URL || '';
  const navigate = useNavigate();

  // forgot password dialog state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');

  const inpuHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit = input.ename.trim() !== '' && input.password.trim() !== '';

  const addhandler = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!canSubmit) {
      setError('Please enter both email and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${baseurl}/api/Adminlogin`, input);
      const data = res?.data;
      if (res?.status === 200 && data) {
        if (data.user && data.user.role) {
          sessionStorage.setItem('role', data.user.role);
          window.dispatchEvent(new Event('roleChanged'));
        }
        if (data.user?.role === 'admin') navigate('/admin');
        else navigate('/user');
      } else {
        setError(data?.message || 'Login failed');
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openForgot = () => {
    setForgotMessage('');
    setForgotEmail('');
    setForgotOpen(true);
  };

  const closeForgot = () => setForgotOpen(false);

  const submitForgot = async () => {
    if (!forgotEmail.trim()) {
      setForgotMessage('Please enter your email');
      return;
    }
    setForgotLoading(true);
    setForgotMessage('');
    try {
      const payload = { ename: forgotEmail };
      const res = await axios.post(`${baseurl}/api/forgot-password`, payload);
      setForgotMessage(res?.data?.message || 'If that email exists, instructions were sent.');
    } catch (err) {
      setForgotMessage(err?.response?.data?.message || 'Failed to send reset email');
      console.error(err);
    } finally {
      setForgotLoading(false);
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
    <Box
      sx={{
        bgcolor: isDarkMode ? '#0a0a0a' : '#f8fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDarkMode
          ? 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)'
          : 'radial-gradient(circle at 50% 50%, #f0f9ff 0%, #e0f2fe 100%)',
        px: 2
      }}
    >
      <Container maxWidth="xs">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Paper
            elevation={24}
            sx={{
              p: 5,
              borderRadius: 4,
              background: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
                mx: 'auto',
                mb: 3,
                width: 64,
                height: 64,
                boxShadow: '0 0 20px rgba(245,158,11,0.3)'
              }}
            >
              <ShieldIcon sx={{ fontSize: 32 }} />
            </Avatar>

            <Typography variant="h4" fontWeight="800" sx={{ mb: 1, letterSpacing: '-1px' }}>
              Admin Console
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
              "We Rise By Lifting Others"
            </Typography>

            <form onSubmit={addhandler}>
              <TextField
                fullWidth
                label="Admin Email"
                name="ename"
                value={input.ename}
                onChange={inpuHandler}
                autoComplete="email"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon color="primary" sx={{ opacity: 0.7 }} /></InputAdornment>,
                }}
                sx={{ ...glassInputSx, mb: 2.5 }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={input.password}
                onChange={inpuHandler}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon color="primary" sx={{ opacity: 0.7 }} /></InputAdornment>,
                }}
                sx={{ ...glassInputSx, mb: 1.5 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button onClick={openForgot} size="small" sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}>
                  Forgot Access?
                </Button>
              </Box>

              {error && (
                <Typography variant="caption" sx={{ color: 'error.main', mb: 2, display: 'block' }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || !canSubmit}
                endIcon={loading ? null : <ChevronRightIcon />}
                sx={{
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: 800,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 10px 15px -3px rgba(13,148,136,0.3)',
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Enter Dashboard'}
              </Button>
            </form>

            <Box sx={{ mt: 4 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                © 2025 Changing Lives Admin
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>

      {/* Forgot password dialog */}
      <Dialog open={forgotOpen} onClose={closeForgot} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Reset Admin Access</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Verification required. Enter your admin email to receive instructions.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Verified Email"
            type="email"
            fullWidth
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            sx={glassInputSx}
          />
          {forgotMessage && (
            <Typography variant="body2" sx={{ mt: 2, color: 'primary.main', fontWeight: 600 }}>
              {forgotMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeForgot} color="inherit">Cancel</Button>
          <Button onClick={submitForgot} variant="contained" disabled={forgotLoading}>
            {forgotLoading ? <CircularProgress size={20} /> : 'Send Reset Link'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Adminlogin;