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
    Alert,
    Tabs,
    Tab,
    Badge,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import LocationPicker from './LocationPicker';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from './ThemeContext';

/* ------------------------------------------------------------------
   🎨 THEME DEFINITIONS
------------------------------------------------------------------ */
const DARK_THEME = {
    mode: 'dark',
    bg: "#020905",
    card: "#0d1f16",
    primary: "#10b981",
    secondary: "#3b82f6",
    text: "#f9fafb",
    textSec: "#9ca3af",
    danger: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
    borderColor: "#1f2937"
};

const LIGHT_THEME = {
    mode: 'light',
    bg: "#f0fdf4",       // Mint Cream
    card: "#ffffff",     // White
    primary: "#059669",  // Darker Emerald for Light mode
    secondary: "#2563eb",
    text: "#111827",     // Gray 900
    textSec: "#6b7280",  // Gray 500
    danger: "#dc2626",
    warning: "#d97706",
    success: "#059669",
    borderColor: "#e5e7eb"
};

const Organization = () => {
    const { darkMode } = useTheme();
    const theme = darkMode ? DARK_THEME : LIGHT_THEME;

    const [tab, setTab] = useState(0);
    const [wantedItems, setWantedItems] = useState([]);
    const [assignedPickups, setAssignedPickups] = useState([]); // From Requests
    const [assignedDonations, setAssignedDonations] = useState([]); // Direct assignments
    const [notifications, setNotifications] = useState([]);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [submitting, setSubmitting] = useState(false);

    // Verify Modal State
    const [verifyModal, setVerifyModal] = useState({ open: false, donationId: null, code: '' });

    // Settings State
    const [orgSettings, setOrgSettings] = useState({ location: null, radius: 5000, address: '' });

    const navigate = useNavigate();
    const baseurl = import.meta.env.VITE_API_BASE_URL || '';

    const orgId = localStorage.getItem('orgId');
    const orgName = localStorage.getItem('orgName') || '';
    const orgEmail = localStorage.getItem('orgEmail') || '';

    useEffect(() => {
        if (!orgId) return navigate('/org/login');
        fetchWantedItems();
        fetchAssignedPickups();
        fetchAssignedDonations();
        fetchNotifications();
        fetchSettings();
    }, [orgId]);

    const fetchWantedItems = async () => {
        try {
            if (!orgId) return;
            const response = await axios.get(`${baseurl}/api/donations/wanted-items?organizationId=${orgId}`);
            setWantedItems(response.data || []);
        } catch (error) { console.error('Error fetching wanted items:', error); }
    };

    const fetchAssignedPickups = async () => {
        try {
            if (!orgId) return;
            const response = await axios.get(`${baseurl}/api/donations/assigned-pickups?organizationId=${orgId}`);
            setAssignedPickups(response.data || []);
        } catch (error) { console.error('Error fetching assigned pickups:', error); }
    };

    const fetchAssignedDonations = async () => {
        try {
            if (!orgId) return;
            const res = await axios.get(`${baseurl}/api/donations/org/${orgId}/assigned`);
            setAssignedDonations(res.data || []);
        } catch (error) { console.error('Error fetching assigned donations:', error); }
    };

    const fetchNotifications = async () => {
        try {
            if (!orgId) return;
            const res = await axios.get(`${baseurl}/api/organizations/${orgId}/notifications`);
            setNotifications(res.data || []);
        } catch (error) { console.error('Error fetching notifications:', error); }
    }

    const fetchSettings = async () => {
        // Placeholder for fetching settings if an endpoint existed
        // For now, relies on defaults or handled via other means
    }

    const handleRequestItem = async (e) => {
        e.preventDefault();
        if (!itemName.trim() || !quantity) return;

        setLoading(true);
        setSubmitting(true);
        try {
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
            setSnackbar({ open: true, message: error?.response?.data?.error || 'Failed', severity: 'error' });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleMarkRead = async (id) => {
        try {
            await axios.put(`${baseurl}/api/organizations/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
        } catch (e) { console.error(e); }
    };

    const handleSaveSettings = async () => {
        try {
            if (!orgSettings.location) return alert("Please select a location on the map");
            await axios.put(`${baseurl}/api/organizations/${orgId}/location`, {
                latitude: orgSettings.location.lat,
                longitude: orgSettings.location.lng,
                radius: orgSettings.radius,
                address: orgSettings.address
            });
            setSnackbar({ open: true, message: 'Location updated!', severity: 'success' });
        } catch (e) {
            setSnackbar({ open: true, message: 'Failed to update location', severity: 'error' });
        }
    };

    const handleOutForPickup = async (id) => {
        try {
            await axios.post(`${baseurl}/api/donations/${id}/out-for-pickup`, { organizationId: orgId });
            setSnackbar({ open: true, message: 'Status updated to Out for Pickup', severity: 'success' });
            fetchAssignedDonations();
        } catch (e) { console.error(e); }
    };

    const handleVerifyPickup = async () => {
        try {
            await axios.post(`${baseurl}/api/donations/${verifyModal.donationId}/verify`, {
                organizationId: orgId,
                code: verifyModal.code
            });
            setSnackbar({ open: true, message: 'Pickup Verified & Completed!', severity: 'success' });
            setVerifyModal({ open: false, donationId: null, code: '' });
            fetchAssignedDonations();
        } catch (e) {
            setSnackbar({ open: true, message: e.response?.data?.error || 'Verification Failed', severity: 'error' });
        }
    };

    // Unread count
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: theme.bg, color: theme.text, pb: 4 }}>
            {/* Header / Navbar */}
            <Box sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: darkMode
                    ? 'linear-gradient(135deg, #0d1f16 0%, #020905 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                mb: 4,
                boxShadow: 1
            }}>
                <Box>
                    <Typography variant="h4" fontWeight={800} sx={{ color: theme.primary, letterSpacing: '-1px' }}>
                        {orgName || 'Organization Dashboard'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.textSec }}>
                        {orgEmail}
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => { localStorage.clear(); navigate('/org/login'); }}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                    Logout
                </Button>
            </Box>

            <Container maxWidth="lg">
                <Box sx={{ borderBottom: 1, borderColor: theme.borderColor, mb: 3 }}>
                    <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="primary" indicatorColor="primary">
                        <Tab icon={<DashboardIcon />} label="Dashboard" sx={{ color: theme.textSec }} />
                        <Tab icon={
                            <Badge badgeContent={notifications.filter(n => !n.isRead).length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        } label="Notifications" sx={{ color: theme.textSec }} />
                        <Tab icon={<SettingsIcon />} label="Settings" sx={{ color: theme.textSec }} />
                    </Tabs>
                </Box>

                <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
                    <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
                </Snackbar>

                {/* DASHBOARD TAB */}
                {tab === 0 && (
                    <Grid container spacing={3}>
                        {/* MAP SECTION */}
                        <Grid size={{ xs: 12 }}>
                            <Card sx={{ p: 0, borderRadius: 3, height: 450, overflow: 'hidden', bgcolor: theme.card, boxShadow: 3, border: `1px solid ${theme.borderColor}` }}>
                                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ color: theme.text }}>Active Pickup Map</Typography>
                                    <Chip label="Live" color="success" size="small" variant="outlined" />
                                </Box>
                                <LocationPicker
                                    markers={assignedDonations.filter(d => d.status !== 'Completed' && d.location?.coordinates).map(d => ({
                                        position: [d.location.coordinates[1], d.location.coordinates[0]], // lat, lng
                                        popup: (
                                            <div>
                                                <Typography variant="subtitle2" fontWeight="bold">{d.itemDetails?.map(i => i.name).join(', ')}</Typography>
                                                <Typography variant="caption" display="block">Donor: {d.userId?.ename || d.donorName || 'Unknown'}</Typography>
                                                <Typography variant="caption" display="block">{d.address}</Typography>
                                                <Chip label={d.status} size="small" color={d.status === 'OutForPickup' ? 'warning' : 'info'} sx={{ mt: 0.5, height: 20, fontSize: '0.65rem' }} />
                                            </div>
                                        )
                                    }))}
                                    onLocationSelect={() => { }}
                                    initialLocation={orgSettings.location}
                                />
                            </Card>
                        </Grid>

                        {/* ASSIGNED DONATIONS LIST (New Flow) */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ p: 0, borderRadius: 3, height: '100%', bgcolor: theme.card, boxShadow: 3, border: `1px solid ${theme.borderColor}` }}>
                                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.borderColor}`, bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ color: theme.text }}>Pending Pickups</Typography>
                                </Box>
                                <List sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
                                    {assignedDonations.filter(d => d.status !== 'Completed').map(d => (
                                        <Card key={d._id} variant="outlined" sx={{ mb: 2, p: 2, bgcolor: 'transparent', borderColor: theme.borderColor }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                <Box>
                                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.primary }}>
                                                        {d.itemDetails?.map(i => i.name).join(', ')}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: theme.textSec }}>Donor: {d.userId?.ename || d.donorName || 'Unknown'}</Typography>
                                                    <Typography variant="caption" display="block" sx={{ color: theme.textSec, mt: 0.5 }}>📍 {d.address}</Typography>
                                                    <Chip
                                                        label={d.status}
                                                        size="small"
                                                        sx={{
                                                            mt: 1,
                                                            bgcolor: d.status === 'OutForPickup' ? theme.warning + '20' : theme.secondary + '20',
                                                            color: d.status === 'OutForPickup' ? theme.warning : theme.secondary,
                                                            fontWeight: 'bold'
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    {d.status === 'Assigned' && (
                                                        <Button size="small" variant="contained" sx={{ bgcolor: theme.warning }} onClick={() => handleOutForPickup(d._id)}>
                                                            Start Pickup
                                                        </Button>
                                                    )}
                                                    {d.status === 'OutForPickup' && (
                                                        <Button size="small" variant="contained" sx={{ bgcolor: theme.success }} onClick={() => setVerifyModal({ open: true, donationId: d._id, code: '' })}>
                                                            Verify Code
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Card>
                                    ))}
                                    {assignedDonations.filter(d => d.status !== 'Completed').length === 0 && (
                                        <Typography align="center" sx={{ color: theme.textSec, py: 4 }}>No pending pickups</Typography>
                                    )}
                                </List>
                            </Card>
                        </Grid>

                        {/* REQUEST ITEMS SECTION */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ p: 0, borderRadius: 3, bgcolor: theme.card, boxShadow: 3, border: `1px solid ${theme.borderColor}` }}>
                                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.borderColor}` }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ color: theme.text }}>Request Items</Typography>
                                </Box>
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                        <TextField
                                            label="Item Name"
                                            fullWidth
                                            size="small"
                                            value={itemName}
                                            onChange={e => setItemName(e.target.value)}
                                            sx={{
                                                input: { color: theme.text },
                                                label: { color: theme.textSec },
                                                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: theme.borderColor } }
                                            }}
                                        />
                                        <TextField
                                            label="Qty"
                                            type="number"
                                            size="small"
                                            sx={{
                                                width: 100,
                                                input: { color: theme.text },
                                                label: { color: theme.textSec },
                                                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: theme.borderColor } }
                                            }}
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleRequestItem}
                                            disabled={loading || submitting}
                                            sx={{ bgcolor: theme.primary }}
                                        >
                                            {submitting ? <CircularProgress size={24} /> : 'Request'}
                                        </Button>
                                    </Box>

                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: theme.text, mb: 1 }}>Active Requests</Typography>
                                    <List>
                                        {wantedItems.map(req => (
                                            <ListItem key={req._id} divider sx={{ borderColor: theme.borderColor }}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    {req.items?.map((item, idx) => (
                                                        <Typography key={idx} variant="body1" sx={{ color: theme.text }}>
                                                            {item.name} (Qty: {item.quantity})
                                                        </Typography>
                                                    ))}
                                                    {(!req.items || req.items.length === 0) && (
                                                        <Typography variant="body1" sx={{ color: theme.text }}>
                                                            {req.itemName || 'Unnamed Item'} (Qty: {req.quantity || 1})
                                                        </Typography>
                                                    )}
                                                    <Typography variant="caption" sx={{ color: theme.textSec }}>{new Date(req.createdAt).toLocaleDateString()}</Typography>
                                                </Box>
                                                <Chip
                                                    label={req.status}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: req.status === 'Approved' ? theme.success + '20' : theme.textSec + '20',
                                                        color: req.status === 'Approved' ? theme.success : theme.textSec
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                        {wantedItems.length === 0 && <Typography align="center" sx={{ color: theme.textSec }}>No active requests</Typography>}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                {/* NOTIFICATIONS TAB */}
                {tab === 1 && (
                    <Card sx={{ borderRadius: 3, bgcolor: theme.card, boxShadow: 3, border: `1px solid ${theme.borderColor}` }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: theme.text }}>Notifications</Typography>
                            <List>
                                {notifications.map(n => (
                                    <ListItem key={n._id} divider sx={{ bgcolor: n.isRead ? 'transparent' : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'), borderColor: theme.borderColor }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="subtitle1" fontWeight={n.isRead ? 400 : 700} sx={{ color: theme.text }}>{n.message}</Typography>
                                                {!n.isRead && (
                                                    <Box>
                                                        {n.type === 'DonationAlert' && n.relatedDonationId && (
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                sx={{ mr: 1, bgcolor: theme.primary }}
                                                                onClick={async () => {
                                                                    try {
                                                                        await axios.post(`${baseurl}/api/donations/${n.relatedDonationId}/accept`, { organizationId: orgId });
                                                                        handleMarkRead(n._id);
                                                                        alert("Donation Accepted!");
                                                                        fetchAssignedDonations();
                                                                    } catch (e) { alert("Failed to accept or already accepted"); }
                                                                }}
                                                            >
                                                                Accept
                                                            </Button>
                                                        )}
                                                        <IconButton size="small" onClick={() => handleMarkRead(n._id)} sx={{ color: theme.primary }}>
                                                            <CheckCircleIcon />
                                                        </IconButton>
                                                    </Box>
                                                )}
                                            </Box>
                                            {n.pickupAddress && <Typography variant="body2" sx={{ color: theme.textSec }}>📍 {n.pickupAddress}</Typography>}
                                            <Typography variant="caption" sx={{ color: theme.textSec }}>{new Date(n.createdAt).toLocaleString()}</Typography>
                                        </Box>
                                    </ListItem>
                                ))}
                                {notifications.length === 0 && <Box sx={{ p: 4, textAlign: 'center', color: theme.textSec }}>No notifications</Box>}
                            </List>
                        </CardContent>
                    </Card>
                )}

                {/* SETTINGS TAB */}
                {tab === 2 && (
                    <Card sx={{ borderRadius: 3, bgcolor: theme.card, boxShadow: 3, border: `1px solid ${theme.borderColor}` }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: theme.text }}>Coverage Settings</Typography>
                            <Typography variant="body2" paragraph sx={{ color: theme.textSec }}>
                                Update your location to receive notifications for nearby donations.
                            </Typography>

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Coverage Radius (meters)"
                                        type="number"
                                        fullWidth
                                        value={orgSettings.radius}
                                        onChange={e => setOrgSettings({ ...orgSettings, radius: Number(e.target.value) })}
                                        sx={{
                                            input: { color: theme.text },
                                            label: { color: theme.textSec },
                                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: theme.borderColor } }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Address Label"
                                        fullWidth
                                        value={orgSettings.address}
                                        onChange={e => setOrgSettings({ ...orgSettings, address: e.target.value })}
                                        sx={{
                                            input: { color: theme.text },
                                            label: { color: theme.textSec },
                                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: theme.borderColor } }
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="subtitle2" gutterBottom sx={{ color: theme.text }}>Select Location on Map:</Typography>
                            <LocationPicker
                                initialLocation={null}
                                onLocationSelect={(loc) => setOrgSettings(prev => ({ ...prev, location: loc }))}
                            />

                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" size="large" onClick={handleSaveSettings} sx={{ bgcolor: theme.primary }}>Save Settings</Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Container>

            {/* VERIFY MODAL */}
            <Dialog
                open={verifyModal.open}
                onClose={() => setVerifyModal({ open: false, donationId: null, code: '' })}
                PaperProps={{ sx: { bgcolor: theme.card, color: theme.text } }}
            >
                <DialogTitle sx={{ color: theme.text }}>Verify Pickup</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom sx={{ color: theme.textSec }}>Enter the 4-digit code provided by the donor:</Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Pickup Code"
                        value={verifyModal.code}
                        onChange={(e) => setVerifyModal({ ...verifyModal, code: e.target.value })}
                        inputProps={{ maxLength: 4 }}
                        sx={{
                            mt: 2,
                            input: { color: theme.text },
                            label: { color: theme.textSec },
                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: theme.borderColor } }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVerifyModal({ open: false, donationId: null, code: '' })} sx={{ color: theme.textSec }}>Cancel</Button>
                    <Button variant="contained" onClick={handleVerifyPickup} sx={{ bgcolor: theme.primary }}>Verify & Complete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Organization;