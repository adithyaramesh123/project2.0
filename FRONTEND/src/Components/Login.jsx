import { Box, Button, TextField, Typography, Avatar, InputAdornment, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const Login = () => { 
  const [input, setInput] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate(); // ✅ correct usage

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Refs to support Enter-to-advance and Enter-to-submit
  const enameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleKeyDown = (e, next) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (next === 'submit') {
        addHandler();
      } else {
        const map = { ename: enameRef, password: passwordRef };
        map[next]?.current?.focus?.();
      }
    }
  };

  const validateField = (name, value) => {
    let msg = '';
    if ((name === 'ename' || name === 'password') && !value) msg = 'Required';
    if (name === 'ename' && value && !validateEmail(value)) msg = 'Invalid email';
    setErrors(prev => {
      const copy = { ...prev };
      if (msg) copy[name] = msg; else delete copy[name];
      return copy;
    });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    if (['ename','password'].includes(name)) validateField(name, value);
  };

  const toggleShowPassword = () => setShowPassword(s => !s);

  const addHandler = () => {
    axios
      .post(`${baseurl}/api/login`, input)
      .then((res) => {
        console.log(res.data);

        // save role
        if (res.data?.user?.role) {
          sessionStorage.setItem("role", res.data.user.role);
          window.dispatchEvent(new Event('roleChanged'));
        }

        if (res.status === 200) {
          alert(res.data.message); // ✅ only once

          if (res.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/donate1");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please check your credentials.");
      });

    console.log("Clicked");
  };

  return (
    <Box sx={BackgroundStyle}>
      
      <Box
        sx={{
          width: { xs: 340, sm: 480 },
          padding: { xs: '24px', sm: '36px' },
          background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,252,255,0.98))',
          borderRadius: '14px',
          boxShadow: '0 10px 36px rgba(16,81,139,0.06)',
          color: '#08306b',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(30,120,200,0.08)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: '#dff6ff', color: '#08306b', fontSize: '1.6rem' }}>🤝</Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#08306b' }}>Welcome Back</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(8,48,107,0.65)' }}>Login to your account</Typography>
          </Box>
        </Box>

        <TextField
          fullWidth
          label="Email address"
          variant="outlined"
          margin="normal"
          name="ename"
          value={input.ename || ''}
          onChange={inputHandler}
          inputRef={enameRef}
          onKeyDown={(e) => handleKeyDown(e, 'password')}
          error={!!errors.ename}
          helperText={errors.ename}
          InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon sx={{ color: '#1976d2' }} /></InputAdornment>) }}
          sx={{
            marginBottom: "16px",
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
          variant="outlined"
          margin="normal"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={input.password || ''}
          onChange={inputHandler}
          inputRef={passwordRef}
          onKeyDown={(e) => handleKeyDown(e, 'submit')}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><LockIcon sx={{ color: '#1976d2' }} /></InputAdornment>),
            endAdornment: (<InputAdornment position="end"><IconButton onClick={toggleShowPassword} edge="end" size="small" sx={{ color: '#1976d2' }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)
          }}
          sx={{
            marginBottom: "16px",
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

        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <Link to="/forgot-password" style={{ color: '#1e88e5', fontSize: 14, textDecoration: 'none', fontWeight: 600 }}>Forgot password?</Link>
        </div>

        <Button
          onClick={addHandler}
          disabled={!input.ename || !input.password || Object.keys(errors).length > 0}
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            fontWeight: 700,
            padding: '12px',
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: '16px',
            background: 'linear-gradient(90deg,#bfe8ff,#92d1ff)',
            color: '#08306b',
            boxShadow: '0 8px 20px rgba(16,81,139,0.06)',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 28px rgba(16,81,139,0.08)' }
          }}
        >
          Continue
        </Button>

        <Typography variant="body2" sx={{ color: 'rgba(8,48,107,0.7)', marginTop: 3, fontSize: 14 }}>
          Don&apos;t have an account? <Link to="/s" style={{ color: '#1e88e5', fontWeight: 700, textDecoration: 'none' }}>Signup</Link>
        </Typography>

        <div style={{ marginTop: 16 }}>
          <Typography variant="body2" sx={{ color: 'rgba(8,48,107,0.7)' }}>
            Organization? <Link to="/org/login" style={{ color: '#1e88e5', textDecoration: 'none', fontWeight: 700 }}>Login here</Link>
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Login;
