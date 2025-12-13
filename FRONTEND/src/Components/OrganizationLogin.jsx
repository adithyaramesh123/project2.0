import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
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
                navigate('/admin/org');
            }
        } catch (err) {
            console.error('Org login failed', err);
            setError(err?.response?.data?.error || 'Login failed');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <Box sx={{ width: 420, p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Organization Login</Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={onSubmit}>
                    <TextField fullWidth label="Contact Email" name="contactEmail" value={input.contactEmail} onChange={onChange} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Password" name="password" type="password" value={input.password} onChange={onChange} sx={{ mb: 2 }} />
                    <Button type="submit" fullWidth variant="contained">Login</Button>
                </form>
            </Box>
        </Box>
    );
};

export default OrganizationLogin;
