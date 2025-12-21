import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Button, Grid, Card, CardContent, Divider } from '@mui/material';
import axios from 'axios';
// token is read from localStorage directly

export default function AdminOrganizationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrg();

    const handler = () => fetchOrg();
    window.addEventListener('requestUpdated', handler);
    window.addEventListener('donationUpdated', handler);
    return () => {
      window.removeEventListener('requestUpdated', handler);
      window.removeEventListener('donationUpdated', handler);
    };
  }, [id]);

  const fetchOrg = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/admin/organizations/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setOrg(res.data.organization);
      setRequests(res.data.requests);
    } catch (err) {
      console.error('Fetch org details error', err);
    } finally {
      setLoading(false);
    }
  };

  if (!org) return <Typography sx={{ p: 4 }}>Loading organization...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Button onClick={() => navigate('/admin')}>Back</Button>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>{org.name}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Contact</Typography>
              <Typography>{org.contactEmail || '—'}</Typography>
              <Typography variant="subtitle2">Location: {org.location || '—'}</Typography>
              <Chip label={org.status} sx={{ mt: 2 }} color={org.status === 'Active' ? 'success' : 'warning'} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Requests</Typography>
              <Divider sx={{ my: 1 }} />
              {requests.length === 0 ? (
                <Typography>No requests</Typography>
              ) : (
                requests.map(r => (
                  <Box key={r._id} sx={{ mb: 1 }}>
                    <Typography variant="body1">{r.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</Typography>
                    <Typography variant="caption">{r?.createdAt ? new Date(r.createdAt).toLocaleString() : 'Unknown'} — {r.status}</Typography>
                    {r.assignedDonationId && (
                      <Typography variant="body2">Assigned Donation: {r.assignedDonationId._id.substring(0, 8)}...</Typography>
                    )}
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
