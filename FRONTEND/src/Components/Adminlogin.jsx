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
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import Divider from '@mui/material/Divider';
//import GitHubIcon from '@mui/icons-material/GitHub';
const Adminlogin = () => {
  const [input, setInput] = useState({ ename: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const baseurl = import.meta.env.VITE_API_BASE_URL || ''
  const navigate = useNavigate()

  // forgot password dialog state
  const [forgotOpen, setForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotMessage, setForgotMessage] = useState('')

  const inpuHandler = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const canSubmit = input.ename.trim() !== '' && input.password.trim() !== ''

  const addhandler = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!canSubmit) {
      setError('Please enter both email and password')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${baseurl}/api/Adminlogin`, input)
      const data = res?.data
      if (res?.status === 200 && data) {
        if (data.user && data.user.role) {
          sessionStorage.setItem('role', data.user.role)
          window.dispatchEvent(new Event('roleChanged'))
        }
        if (data.user?.role === 'admin') navigate('/admin')
        else navigate('/user')
      } else {
        setError(data?.message || 'Login failed')
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'An error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const openForgot = () => {
    setForgotMessage('')
    setForgotEmail('')
    setForgotOpen(true)
  }

  const closeForgot = () => setForgotOpen(false)

  const submitForgot = async () => {
    if (!forgotEmail.trim()) {
      setForgotMessage('Please enter your email')
      return
    }
    setForgotLoading(true)
    setForgotMessage('')
    try {
      // Assumption: backend endpoint is /api/forgot-password and expects { ename: email }
      const payload = { ename: forgotEmail }
      const res = await axios.post(`${baseurl}/api/forgot-password`, payload)
      setForgotMessage(res?.data?.message || 'If that email exists, instructions were sent.')
    } catch (err) {
      setForgotMessage(err?.response?.data?.message || 'Failed to send reset email')
      console.error(err)
    } finally {
      setForgotLoading(false)
    }
  }
    
  return (

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f2ff 0%, #ffffff 100%)',
      }}
    >
      <Box
        sx={{
          width: 420,
          padding: '36px 32px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(14, 30, 37, 0.06)',
          textAlign: 'center',
          border: '1px solid rgba(66,153,225,0.12)'
        }}
      >
    <Typography 
      variant="h4" 
      gutterBottom 
      sx={{ 
        fontFamily:"italian", 
        fontWeight: 600, 
        color: '#2d3748',
        letterSpacing: '-0.5px',
        marginBottom: '24px'
      }}
    >
      "We Rise By Lifting Others"
    </Typography>
    
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          color: '#3269a8',
          marginBottom: 3,
          fontSize: '15px',
        }}
      >
       Please Login to Admin Dasboard
      </Typography>

      <form onSubmit={addhandler} noValidate>
        <TextField
          fullWidth
          label="Email address"
          variant="outlined"
          margin="normal"
          name="ename"
          value={input.ename}
          onChange={inpuHandler}
          required
          autoComplete="email"
          sx={{
            marginBottom: '12px',
            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          name="password"
          type="password"
          value={input.password}
          onChange={inpuHandler}
          required
          autoComplete="current-password"
          sx={{
            marginBottom: '8px',
            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
          }}
        />

        {error && (
          <Typography variant="body2" sx={{ color: 'error.main', mb: 1 }} role="alert">
            {error}
          </Typography>
        )}

        <div style={{ textAlign: 'right', marginBottom: '18px' }}>
          <Button
            onClick={openForgot}
            size="small"
            sx={{ textTransform: 'none', color: '#2b6cb0' }}
          >
            Forgot password?
          </Button>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#1976d2',
            marginTop: 1,
            fontWeight: '600',
            padding: '12px',
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '15px',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#1669bb', boxShadow: 'none' },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Continue'}
        </Button>
      </form>

    
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: 18 }}>
        <Button
          variant="outlined"
          sx={{ borderRadius: '8px', padding: '8px 16px', borderColor: '#e6eefb', color: '#1976d2' }}
        >
          
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: '8px', padding: '8px 16px', borderColor: '#e6eefb', color: '#1976d2' }}
        >
          
        </Button>
      </div>
  </Box>
      
      {/* Forgot password dialog */}
      <Dialog open={forgotOpen} onClose={closeForgot} fullWidth maxWidth="xs">
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1, color: '#475569' }}>
            Enter your email and we'll send instructions to reset your password.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Email address"
            type="email"
            fullWidth
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          {forgotMessage && (
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              {forgotMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForgot} disabled={forgotLoading} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={submitForgot}
            disabled={forgotLoading}
            sx={{ textTransform: 'none', color: '#1976d2' }}
          >
            {forgotLoading ? <CircularProgress size={18} /> : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>
</div>
  )
}
 export default Adminlogin