import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Avatar,
    Chip,
    List,
    ListItem,
    Divider,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';

const Organization = () => {
    const [wantedItems, setWantedItems] = useState([]);
    const [assignedPickups, setAssignedPickups] = useState([]);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [submitting, setSubmitting] = useState(false);


    const navigate = useNavigate();
    const baseurl = import.meta.env.VITE_API_BASE_URL || '';

    const orgId = localStorage.getItem('orgId');
    const orgName = localStorage.getItem('orgName') || '';
    const orgEmail = localStorage.getItem('orgEmail') || '';

    useEffect(() => {
        if (!orgId) return navigate('/org/login');
        fetchWantedItems();
        fetchAssignedPickups();
    }, [orgId]);

    const fetchWantedItems = async () => {
        try {
            if (!orgId) {
                setWantedItems([]);
                return;
            }
            const response = await axios.get(`${baseurl}/api/donations/wanted-items?organizationId=${orgId}`);
            setWantedItems(response.data);
        } catch (error) {
            console.error('Error fetching wanted items:', error);
            setSnackbar({ open: true, message: 'Failed to load requested items', severity: 'error' });
        }
    };

    const fetchAssignedPickups = async () => {
        try {
            if (!orgId) {
                setAssignedPickups([]);
                return;
            }
            const response = await axios.get(`${baseurl}/api/donations/assigned-pickups?organizationId=${orgId}`);
            setAssignedPickups(response.data);
        } catch (error) {
            console.error('Error fetching assigned pickups:', error);
            setSnackbar({ open: true, message: 'Failed to load assigned pickups', severity: 'error' });
        }
    };

    const handleRequestItem = async (e) => {
        e.preventDefault();
        if (!itemName.trim() || !quantity) return;

        setLoading(true);
        setSubmitting(true);
        try {
            if (!orgId) {
                setSnackbar({ open: true, message: 'Organization ID is missing. Please log in as organization.', severity: 'warning' });
                return;
            }
            await axios.post(`${baseurl}/api/donations/wanted-items`, {
                itemName,
                quantity,
                organizationId: orgId,
            });
            setItemName('');
            setQuantity('');
            fetchWantedItems();
            setSnackbar({ open: true, message: 'Request created', severity: 'success' });
        } catch (error) {
            console.error('Error requesting item:', error);
            setSnackbar({ open: true, message: error?.response?.data?.error || 'Failed to create request', severity: 'error' });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleCancelRequest = async (id) => {
        if (!window.confirm('Cancel this request?')) return;
        try {
            setLoading(true);
            await axios.delete(`${baseurl}/api/donations/wanted-items/${id}?organizationId=${orgId}`);
            setSnackbar({ open: true, message: 'Request cancelled', severity: 'success' });
            fetchWantedItems();
        } catch (err) {
            console.error('Cancel request error', err);
            setSnackbar({ open: true, message: err?.response?.data?.error || 'Failed to cancel request', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Organization accepts an assigned donation for a request
    const handleAcceptAssignment = async (requestId) => {
        if (!window.confirm('Accept this assigned donation?')) return;
        try {
            setLoading(true);
            const res = await axios.patch(`${baseurl}/api/donations/requests/${requestId}/status`, { status: 'Accepted', organizationId: orgId });
            setSnackbar({ open: true, message: 'Assignment accepted', severity: 'success' });
            fetchAssignedPickups();
            // Also refresh wanted items in case status changed
            fetchWantedItems();
            // Emit a global event so admin views can react
            window.dispatchEvent(new Event('requestUpdated'));
        } catch (err) {
            console.error('Accept assignment error', err);
            setSnackbar({ open: true, message: err?.response?.data?.error || 'Failed to accept assignment', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 6, background: 'linear-gradient(180deg,#f5f7fa 0%,#eef2ff 100%)' }}>
            <Container maxWidth="lg">
                <Card sx={{ mb: 4, overflow: 'visible', position: 'relative', borderRadius: 3, boxShadow: 4 }}>
                    <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'center', py: 4, px: { xs: 3, md: 6 } }}>
                        <Avatar sx={{ width: 84, height: 84, bgcolor: 'primary.main', fontSize: 28 }}>{orgName ? orgName[0]?.toUpperCase() : 'O'}</Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" fontWeight={700}>{orgName || 'Organization Dashboard'}</Typography>
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>{orgEmail}</Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip label={`Requests ${wantedItems.length}`} color="primary" size="small" />
                                <Chip label={`Assigned ${assignedPickups.length}`} color={assignedPickups.length ? 'success' : 'default'} size="small" />
                            </Box>
                        </Box>
                        <Box>
                            <Button variant="contained" color="primary" sx={{ mr: 2 }}>Edit Profile</Button>
                            <Button variant="outlined" onClick={() => { localStorage.removeItem('orgId'); localStorage.removeItem('orgName'); sessionStorage.removeItem('role'); window.location.href = '/' }}>Logout</Button>
                        </Box>
                    </CardContent>
                </Card>


                <Snackbar open={snackbar.open} autoHideDuration={4200} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>{snackbar.message}</Alert>
                </Snackbar>

                <Grid container spacing={4}>
                    {/* Assigned Pickups */}
                    <Grid item xs={12} md={6}><Card sx={{ p: 2, borderRadius: 3 }}><CardContent>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Request Items</Typography>
                        <Box component="form" onSubmit={handleRequestItem} sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
                            <TextField label="Item name" placeholder="Item name" value={itemName} onChange={(e) => setItemName(e.target.value)} sx={{ flex: 1 }} required />
                            <TextField label="Quantity" type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} sx={{ width: 140 }} required />
                            <Button type="submit" variant="contained" disabled={!orgId || submitting} color="primary">{submitting ? <CircularProgress size={20} color="inherit" /> : 'Request'}</Button>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="h6" fontWeight={700} sx={{ mt: 2, mb: 1 }}>Your Requests</Typography>
                        {wantedItems.length === 0 ? (
                            <Box sx={{ py: 6, textAlign: 'center' }}><Typography color="text.secondary">No requests yet</Typography></Box>
                        ) : (
                            <List>
                                {wantedItems.map(req => (
                                    <Card key={req._id} sx={{ p: 1, mb: 1, borderRadius: 2, boxShadow: 0 }}>
                                        <CardContent sx={{ p: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="subtitle2" color="text.secondary">{req?.createdAt ? new Date(req.createdAt).toLocaleString() : ''}</Typography>
                                                <Chip label={req.status} color={
                                                    req.status === 'Approved' ? 'success' :
                                                    req.status === 'Rejected' ? 'error' :
                                                    req.status === 'Accepted' ? 'info' : 'warning'
                                                } size="small" />
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                {req.items?.map((it, i) => <Typography key={i} sx={{ fontSize: 14 }}>• {it.name} <strong>x{it.quantity}</strong></Typography>)}
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                                {req.status === 'Pending' && (
                                                    <Button size="small" color="error" variant="outlined" onClick={() => handleCancelRequest(req._id)} disabled={loading}>Cancel</Button>
                                                )}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </List>
                        )}
                        </CardContent></Card></Grid>

                    {/* Requested Items */}
                    <Grid item xs={12} md={6}><Card sx={{ p: 2, borderRadius: 3 }}><CardContent>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Assigned Pickups</Typography>
                        {assignedPickups.length === 0 ? (
                            <Box sx={{ py: 8, textAlign: 'center' }}>
                                <Typography color="text.secondary">No pickups assigned yet — you will be notified when an assigned donation is available.</Typography>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'grid', gap: 2 }}>
                                {assignedPickups.map((pickup) => (
                                    <Card key={pickup._id || pickup.id} sx={{ p: 2, borderRadius: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                                            <div>
                                                <Typography variant="subtitle1" fontWeight={700}>Request</Typography>
                                                {pickup.items?.map((it, i) => (<Typography key={i} sx={{ fontSize: 14 }}>• {it.name} <strong>x{it.quantity}</strong></Typography>))}
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                {pickup.assignedDonation ? (
                                                    <Box>
                                                        <Typography variant="subtitle2">Assigned Donation</Typography>
                                                        <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{pickup.assignedDonation.userId?.ename || pickup.donorName || 'Donor'}</Typography>
                                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                                                            <Chip label={pickup.assignedDonation.status} color="success" size="small" />
                                                            <Chip label={pickup.status} color={pickup.status === 'Assigned' ? 'warning' : pickup.status === 'Accepted' ? 'info' : 'default'} size="small" />
                                                        </Box>
                                                        {/* If this request is Assigned, allow the organization to Accept the assignment */}
                                                        {pickup.status === 'Assigned' && (
                                                            <Box sx={{ mt: 1 }}>
                                                                <Button size="small" variant="contained" color="primary" onClick={() => handleAcceptAssignment(pickup.requestId || pickup.id)}>
                                                                    Accept Assignment
                                                                </Button>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                ) : (
                                                    <Chip label="Awaiting" color="warning" size="small" />
                                                )}
                                            </div>
                                        </Box>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="caption" color="text.secondary">Requested {pickup?.createdAt ? new Date(pickup.createdAt).toLocaleString() : ''}</Typography>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </CardContent></Card></Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Organization;