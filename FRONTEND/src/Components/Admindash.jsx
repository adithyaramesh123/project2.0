// import React, { useEffect, useState } from "react";
// import PeopleIcon from "@mui/icons-material/People";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
// } from "@mui/material";

// const mockStats = {
// users: 1240,
// donations: 320,
// totalAmount: 45200,
// topDonor: { name: "Jane Doe", amount: 5000 },
// };

// const mockRecentDonations = [
// { name: "Alice Smith", amount: 200, date: "2024-06-10" },
// { name: "Bob Johnson", amount: 150, date: "2024-06-09" },
// { name: "Charlie Lee", amount: 300, date: "2024-06-08" },
// { name: "Dana White", amount: 100, date: "2024-06-07" },
// ];

// export default function Admindash() {
// const [stats, setStats] = useState(mockStats);
// const [recentDonations, setRecentDonations] = useState(mockRecentDonations);

// // In real app, fetch stats and donations from API
import AdminOrganizationView from './AdminOrganizationView'; // New import added
// useEffect(() => {
//     // fetchStats().then(setStats);
//     // fetchRecentDonations().then(setRecentDonations);
// }, []);

// return (
//     <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
//         <Typography variant="h4" gutterBottom fontWeight={700}>
//             Admin Dashboard
//         </Typography>
//         <Grid container spacing={3} mb={4}>
//             <Grid item xs={12} sm={6} md={3}>
//                 <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
//                     <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
//                         <PeopleIcon />
//                     </Avatar>
//                     <CardContent sx={{ flex: 1 }}>
//                         <Typography variant="h6">{stats.users}</Typography>
//                         <Typography color="text.secondary" fontSize={14}>
//                             Users
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//                 <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
//                     <Avatar sx={{ bgcolor: "#43a047", mr: 2 }}>
//                         <AttachMoneyIcon />
//                     </Avatar>
//                     <CardContent sx={{ flex: 1 }}>
//                         <Typography variant="h6">{stats.donations}</Typography>
//                         <Typography color="text.secondary" fontSize={14}>
//                             Donations
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//                 <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
//                     <Avatar sx={{ bgcolor: "#fbc02d", mr: 2 }}>
//                         <TrendingUpIcon />
//                     </Avatar>
//                     <CardContent sx={{ flex: 1 }}>
//                         <Typography variant="h6">${stats.totalAmount.toLocaleString()}</Typography>
//                         <Typography color="text.secondary" fontSize={14}>
//                             Total Amount
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//                 <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
//                     <Avatar sx={{ bgcolor: "#e53935", mr: 2 }}>
//                         <FavoriteIcon />
//                     </Avatar>
//                     <CardContent sx={{ flex: 1 }}>
//                         <Typography variant="h6">{stats.topDonor.name}</Typography>
//                         <Typography color="text.secondary" fontSize={14}>
//                             Top Donor (${stats.topDonor.amount})
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//         </Grid>
//         <Paper sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//                 Recent Donations
//             </Typography>
//             <List>
//                 {recentDonations.map((donation, idx) => (
//                     <ListItem key={idx} divider>
//                         <ListItemAvatar>
//                             <Avatar sx={{ bgcolor: "#1976d2" }}>
//                                 <AttachMoneyIcon />
//                             </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText
//                             primary={`${donation.name} donated $${donation.amount}`}
//                             secondary={donation.date}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//         </Paper>
//     </Box>
// );
// }

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Paper,
    TextField,
  Button,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Tabs, // NEW
  Tab, // NEW
  Table, // NEW
  TableBody, // NEW
  TableCell, // NEW
  TableContainer, // NEW
  TableHead, // NEW
  TableRow, // NEW
  IconButton, // NEW
  Drawer, // NEW
  Toolbar, // NEW
  Divider, // NEW
  Tooltip as MuiTooltip, // NEW
  Select, // NEW
  MenuItem, // NEW
  FormControl, // NEW
  InputLabel, // NEW
  InputAdornment, // NEW (for search)
  CircularProgress // NEW
    ,Snackbar,Alert
    ,Dialog,DialogTitle,DialogContent,DialogActions,Radio,RadioGroup,FormControlLabel
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { DataGrid } from '@mui/x-data-grid'; // NEW for Organization Management

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import PeopleIcon from "@mui/icons-material/People";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DashboardIcon from "@mui/icons-material/Dashboard"; // NEW
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // NEW
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"; // NEW
import CheckIcon from "@mui/icons-material/CheckCircleOutline"; // NEW
import BlockIcon from "@mui/icons-material/Block"; // NEW
import SearchIcon from "@mui/icons-material/Search"; // NEW

import axios from "axios";

// --------------------------------------------------------------------
// 🔑 AUTH HELPER (Placeholder)
// --------------------------------------------------------------------
const getToken = () => localStorage.getItem("token");

// --------------------------------------------------------------------
// 🎨 STATUS & COLOR HELPERS
// --------------------------------------------------------------------
const getStatusColor = (status) => {
    switch (status) {
        case "Active": return "success";
        case "Inactive": return "error";
        case "Approved": return "success";
        case "Rejected": return "error";
        case "Pending": return "warning";
            case "Assigned": return "warning";
        case "Accepted": return "info"; // Organization accepted the assignment
        case "Completed": return "primary";
        case "Picked": return "info";
        default: return "default";
    }
};

// Helper: returns total item quantity for an item-donation
const getItemCount = (d) => {
    if (!d || !d.itemDetails) return 0;
    return (d.itemDetails || []).reduce((sum, it) => sum + (it?.quantity || 0), 0);
};

// Helper: returns a short string of item names and quantities
const getItemNames = (d) => {
    if (!d || !d.itemDetails) return '';
    return (d.itemDetails || []).map(it => `${it.name || 'Item'} x${it.quantity || 0}`).join(', ');
};

// --------------------------------------------------------------------
// 📦 COMPONENT: Summary Card (Unchanged from original code)
// --------------------------------------------------------------------
function SummaryCard({ icon, color, label, value }) {
  return (
    <Grid item xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
      <Card sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>{icon}</Avatar>
        <CardContent sx={{ flex: 1, p: '8px !important' }}>
          <Typography variant="h6" fontWeight={700}>
            {value}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14 }}>{label}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

// --------------------------------------------------------------------
// 📊 COMPONENT: Analytics View (Your original component logic)
// --------------------------------------------------------------------
function DashboardAnalytics({ stats, moneyData, itemData, recent, COLORS, reloadData }) {
    const [processing, setProcessing] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, action: '', id: null, message: '' });

    // UI: filter by category and search by user/place
    const [filterType, setFilterType] = useState('All');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const filteredRecent = (recent || []).filter(d => {
        const typeMatch = filterType === 'All' ? true : d.type === filterType;
        const q = (query || '').trim().toLowerCase();
        if (!q) return typeMatch;
        const donorName = (d.user?.name || d.name || '').toString().toLowerCase();
        const place = (d.address || d.user?.city || '').toString().toLowerCase();
        const amount = d.amount ? d.amount.toString() : '';
        return typeMatch && (donorName.includes(q) || place.includes(q) || amount.includes(q) || (d.itemDetails || []).map(i => i.name?.toLowerCase()).join(' ').includes(q));
    });

    if (!stats) return <Typography sx={{ p: 4 }}>Loading Analytics...</Typography>;

    const approveDonation = async (id) => {
        setProcessing(prev => ({ ...prev, [id]: 'approving' }));
        try {
            const token = getToken();
            await axios.put(`/api/donations/admin/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
            if (reloadData) reloadData();
            // notify other components (assignments) to refresh
            window.dispatchEvent(new Event('donationUpdated'));
            setSnackbar({ open: true, message: 'Donation approved', severity: 'success' });
        } catch (err) {
            console.error('Approve donation error', err);
            setSnackbar({ open: true, message: 'Failed to approve donation', severity: 'error' });
        } finally {
            setProcessing(prev => ({ ...prev, [id]: null }));
        }
    };

    const rejectDonation = async (id) => {
        setProcessing(prev => ({ ...prev, [id]: 'rejecting' }));
        try {
            const token = getToken();
            await axios.put(`/api/donations/admin/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
            if (reloadData) reloadData();
            window.dispatchEvent(new Event('donationUpdated'));
            setSnackbar({ open: true, message: 'Donation rejected', severity: 'info' });
        } catch (err) {
            console.error('Reject donation error', err);
            setSnackbar({ open: true, message: 'Failed to reject donation', severity: 'error' });
        } finally {
            setProcessing(prev => ({ ...prev, [id]: null }));
        }
    };

    const openConfirm = (action, id, message) => {
        setConfirmDialog({ open: true, action, id, message });
    };

    const handleConfirm = async () => {
        const { action, id } = confirmDialog;
        setConfirmDialog(prev => ({ ...prev, open: false }));
        if (action === 'approve') {
            await approveDonation(id);
        } else if (action === 'reject') {
            await rejectDonation(id);
        }
    };

    return (
        <Box>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <SummaryCard icon={<PeopleIcon />} color="#1976d2" label="Users" value={stats.users} />
                <SummaryCard icon={<FavoriteIcon />} color="#e53935" label="Donations" value={stats.donations} />
                <SummaryCard icon={<TrendingUpIcon />} color="#fbc02d" label="Total Amount (₹)" value={stats.totalAmount.toLocaleString()} />
                <SummaryCard
                    icon={<MoneyIcon />}
                    color="#43a047"
                    label="Top Donor"
                    value={
                        stats.topDonor
                            ? `User ${stats.topDonor._id} (₹${stats.topDonor.amount.toLocaleString()})`
                            : "No donors"
                    }
                />
            </Grid>

            {/* CHARTS SECTION */}
            <Grid container spacing={3}>
                <Grid item xs={{ span: 12 }} md={{ span: 4 }}>
                    {/* <Card sx={{ height: 380, p: 2 }}>
                        <Typography variant="h6" fontWeight={600}>Monthly Money Donations</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={moneyData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total" fill="#1976d2" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card> */}
                </Grid>
                <Grid item xs={{ span: 12 }} md={{ span: 8 }}>
                    <Card sx={{ height: 480, p: 2 }}>
                        <Typography variant="h6" fontWeight={600}>
            Item Donation Categories
        </Typography>
        <ResponsiveContainer width="100%" height={420}>
            <PieChart>
                <Pie
                    data={itemData}
                    cx="50%"
                    cy="48%"
                    labelLine={false}
                    outerRadius="85%"
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {itemData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ marginTop: 8 }} />
            </PieChart>
        </ResponsiveContainer>
    </Card>
</Grid>
            </Grid>

            {/* Recent Donations List - Modern Detailed View */}
            <Paper sx={{ p: 3, mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="h6">Recent Donations</Typography>

                    <FormControl size="small" sx={{ minWidth: 140, ml: 'auto' }}>
                        <InputLabel>Category</InputLabel>
                        <Select value={filterType} label="Category" onChange={(e) => setFilterType(e.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Money">Money</MenuItem>
                            <MenuItem value="Item">Item</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        placeholder="Search user/place or amount"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                        sx={{ width: 300 }}
                    />
                </Box>

                <List disablePadding>
                    {filteredRecent.slice(0, 20).map((d) => (
                        <ListItem key={d._id} divider sx={{ py: 1.5, alignItems: 'flex-start' }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: d.type === 'Money' ? '#43a047' : '#1976d2', width: 52, height: 52, fontWeight: 700 }}>
                                    {d.type === 'Money' ? '₹' : '📦'}
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                sx={{ mx: 2 }}
                                primary={
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Typography fontWeight={700}>{d.user?.name || d.name || 'Anonymous'}</Typography>
                                        <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>• {d.address ? d.address.split(',')[0] : (d.user?.city || '—')}</Typography>
                                    </Box>
                                }
                                secondary={
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.6, flexWrap: 'wrap' }}>
                                        {d.type === 'Money' ? (
                                            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>₹{(d.amount || 0).toLocaleString()}</Typography>
                                        ) : (
                                            <MuiTooltip title={getItemNames(d) || 'No items listed'}>
                                                <Chip label={`${getItemCount(d)} item${getItemCount(d) === 1 ? '' : 's'}`} size="small" color="primary" />
                                            </MuiTooltip>
                                        )}

                                        <Chip label={d.type} size="small" variant="outlined" />

                                        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{d?.createdAt ? new Date(d.createdAt).toLocaleString() : ''}</Typography>

                                        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{d.user?.email ? `• ${d.user.email}` : ''}</Typography>

                                    </Box>
                                }
                                secondaryTypographyProps={{ component: 'div' }}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, ml: 1 }}>
                                <Chip label={d.status} color={getStatusColor(d.status)} size="small" />

                                <Box>
                                    {d.status !== 'Approved' && (
                                        <MuiTooltip title={d.status === 'Rejected' ? 'Approve (reconsider)' : 'Approve'}>
                                            <IconButton
                                                size="small"
                                                color="success"
                                                onClick={() => openConfirm('approve', d._id, 'Are you sure you want to approve this donation?')}
                                                disabled={!!processing[d._id]}
                                                sx={{ mr: 0.5 }}
                                            >
                                                {processing[d._id] === 'approving' ? <CircularProgress size={18} /> : <CheckIcon fontSize="small" />}
                                            </IconButton>
                                        </MuiTooltip>
                                    )}

                                    {d.status !== 'Rejected' && (
                                        <MuiTooltip title={d.status === 'Approved' ? 'Reject (mark as rejected)' : 'Reject'}>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => openConfirm('reject', d._id, 'Are you sure you want to reject this donation?')}
                                                disabled={!!processing[d._id]}
                                            >
                                                {processing[d._id] === 'rejecting' ? <CircularProgress size={18} /> : <BlockIcon fontSize="small" />}
                                            </IconButton>
                                        </MuiTooltip>
                                    )}
                                </Box>
                            </Box>
                        </ListItem>
                    ))}

                    {filteredRecent.length === 0 && (
                        <Typography sx={{ p: 2, color: 'text.secondary' }}>No donations found.</Typography>
                    )}

                </List>



                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3500}
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>

                <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog(prev => ({ ...prev, open: false }))}>
                    <DialogTitle>Confirm action</DialogTitle>
                    <DialogContent>
                        <Typography>{confirmDialog.message}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDialog(prev => ({ ...prev, open: false }))}>Cancel</Button>
                        <Button onClick={handleConfirm} color="primary">Confirm</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Box>
    );
}

// --------------------------------------------------------------------
// 🏛️ COMPONENT: Organization Management View
// --------------------------------------------------------------------
function AdminOrganizationPage() {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newOrg, setNewOrg] = useState({ name: '', contactEmail: '', location: '', password: '' });
    const [submittingOrg, setSubmittingOrg] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [statusDialog, setStatusDialog] = useState({ open: false, id: null, target: '', name: '' });

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const res = await axios.get('/api/admin/organizations', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const cleaned = res.data.map(org => ({ ...org, id: org._id }));
            setOrganizations(cleaned);
        } catch (err) {
            console.error("❌ Error fetching organizations:", err);
            setOrganizations([]);
        } finally {
            setLoading(false);
        }
    };
    
    const updateStatus = async (id, status) => {
        const token = getToken();
        try {
            await axios.patch(`/api/admin/organizations/status/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrganizations(prev => prev.map(org => 
                org.id === id ? { ...org, status } : org
            ));
            setSnackbar({ open: true, message: `Organization ${status.toLowerCase()}`, severity: status === 'Active' ? 'success' : 'warning' });
        } catch (error) {
            console.error(`❌ Error updating status to ${status}:`, error);
            setSnackbar({ open: true, message: 'Failed to update organization status', severity: 'error' });
        }
    };

    const createOrganization = async () => {
        if (!newOrg.name || newOrg.name.trim() === '') {
            setSnackbar({ open: true, message: 'Organization name is required', severity: 'error' });
            return;
        }
        if (!newOrg.password || newOrg.password.trim() === '') {
            setSnackbar({ open: true, message: 'Organization password is required', severity: 'error' });
            return;
        }
        setSubmittingOrg(true);
        try {
            const token = getToken();
            const res = await axios.post('/api/admin/organizations', newOrg, { headers: { Authorization: `Bearer ${token}` } });
            const org = res.data.org;
            setOrganizations(prev => [{ ...org, id: org._id }, ...prev]);
            setNewOrg({ name: '', contactEmail: '', location: '' });
            setSnackbar({ open: true, message: 'Organization created successfully', severity: 'success' });
        } catch (err) {
            console.error('Create org error', err);
            setSnackbar({ open: true, message: 'Failed to create organization', severity: 'error' });
        } finally {
            setSubmittingOrg(false);
        }
    };

    const columns = [
        { field: 'name', headerName: 'Organization Name', width: 200 },
        { field: 'contactEmail', headerName: 'Contact Email', width: 220 },
        { field: 'location', headerName: 'Location', width: 250 },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 120,
            renderCell: (params) => { try { return <Chip label={params.value} color={getStatusColor(params.value)} size="small" /> } catch (err) { console.error('Org status cell error', err, params); return <Chip label="err" size="small" /> } },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => { try { return (
                    <Box>
                        <MuiTooltip title={params.row.status === 'Active' ? 'Set Inactive' : 'Set Active'}>
                            <IconButton
                                color={params.row.status === 'Active' ? 'error' : 'success'}
                                size="small"
                                onClick={() => {
                                        const target = params.row.status === 'Active' ? 'Inactive' : 'Active';
                                        setStatusDialog({ open: true, id: params.row.id, target, name: params.row.name });
                                    }}
                            >
                                {params.row.status === 'Active' ? <BlockIcon /> : <CheckIcon />}
                            </IconButton>
                        </MuiTooltip>
                        <MuiTooltip title="View Details">
                            <IconButton color="primary" size="small" onClick={() => window.location.href = `/admin/orgs/${params.row.id}`}>
                                <SearchIcon />
                            </IconButton>
                        </MuiTooltip>
                    </Box>
                ); } catch (err) { console.error('Org actions cell error', err, params); return <Typography color="error">Err</Typography>; } },
        },
    ];

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom fontWeight={700}>
                🏛️ Organization Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Manage organizations and set them Active/Inactive for assignments.
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={{ span: 12 }} sm={{ span: 4 }}>
                        <TextField
                            label="Organization Name"
                            fullWidth
                            size="small"
                            value={newOrg.name}
                            onChange={(e) => setNewOrg(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </Grid>
                    <Grid item xs={{ span: 12 }} sm={{ span: 4 }}>
                        <TextField
                            label="Contact Email"
                            fullWidth
                            size="small"
                            value={newOrg.contactEmail}
                            onChange={(e) => setNewOrg(prev => ({ ...prev, contactEmail: e.target.value }))}
                        />
                    </Grid>
                    <Grid item xs={{ span: 12 }} sm={{ span: 3 }}>
                        <TextField
                            label="Password"
                            fullWidth
                            size="small"
                            type="password"
                            value={newOrg.password}
                            onChange={(e) => setNewOrg(prev => ({ ...prev, password: e.target.value }))}
                        />
                    </Grid>
                    <Grid item xs={{ span: 12 }} sm={{ span: 3 }}>
                        <TextField
                            label="Location"
                            fullWidth
                            size="small"
                            value={newOrg.location}
                            onChange={(e) => setNewOrg(prev => ({ ...prev, location: e.target.value }))}
                        />
                    </Grid>
                    <Grid item xs={{ span: 12 }} sm={{ span: 1 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={createOrganization}
                            disabled={submittingOrg}
                        >
                            {submittingOrg ? <CircularProgress size={18} color="inherit" /> : 'Add'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <DataGrid
                rows={organizations}
                columns={columns}
                loading={loading}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[10, 25, 50]}
                autoHeight
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
            />
            <Dialog open={statusDialog.open} onClose={() => setStatusDialog(prev => ({ ...prev, open: false }))}>
                <DialogTitle>Confirm Organization Status Change</DialogTitle>
                <DialogContent>
                    <Typography>Set organization "{statusDialog.name}" to {statusDialog.target}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusDialog(prev => ({ ...prev, open: false }))}>Cancel</Button>
                    <Button onClick={() => { updateStatus(statusDialog.id, statusDialog.target); setStatusDialog(prev => ({ ...prev, open: false })); }} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

// --------------------------------------------------------------------
// 📦 COMPONENT: Item Assignment View
// --------------------------------------------------------------------
function AdminItemAssignmentPage() {
    const [donations, setDonations] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assigningId, setAssigningId] = useState(null);
    const [assignSnackbar, setAssignSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [selectedOrg, setSelectedOrg] = useState({});

    useEffect(() => {
        fetchData();
        const listener = () => fetchData();
        window.addEventListener('donationUpdated', listener);
        return () => window.removeEventListener('donationUpdated', listener);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = getToken();

            const donationRes = await axios.get('/api/donations/admin/unassigned-items', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const orgRes = await axios.get('/api/admin/organizations?status=Active', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setDonations(donationRes.data);
            setOrganizations(orgRes.data);
            
            const initialOrgState = donationRes.data.reduce((acc, d) => ({
                ...acc,
                [d._id]: ''
            }), {});
            setSelectedOrg(initialOrgState);

        } catch (error) {
            console.error("❌ Error fetching assignment data:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleOrgChange = (donationId, orgId) => {
        setSelectedOrg(prev => ({ ...prev, [donationId]: orgId }));
    };

    const handleAssignment = async (donationId) => {
        const orgId = selectedOrg[donationId];
        if (!orgId) return setAssignSnackbar({ open: true, message: 'Please select an organization first', severity: 'warning' });
        
        setAssigningId(donationId);
        try {
            const token = getToken();
            
            await axios.patch(`/api/donations/admin/assign/${donationId}`, { organizationId: orgId }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setDonations(prev => prev.filter(d => d._id !== donationId));
            // Notify other components that donation changed
            window.dispatchEvent(new Event('donationUpdated'));
            setAssignSnackbar({ open: true, message: 'Donation assigned successfully', severity: 'success' });
            
        } catch (error) {
            console.error("❌ Error assigning donation:", error);
            setAssignSnackbar({ open: true, message: 'Assignment failed. See console for details', severity: 'error' });
        } finally {
            setAssigningId(null);
        }
    };

    const unassignedItemDonations = donations.filter(d => d.type === 'Item' && d.status === 'Approved');
    
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Item Assignment Queue
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Assign Approved Item Donations to an active organization.
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
            ) : unassignedItemDonations.length === 0 ? (
                <Typography variant="h6" color="text.secondary" sx={{ p: 5, textAlign: 'center' }}>
                    ✅ No approved item donations available for assignment.
                </Typography>
            ) : (
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Donation ID</TableCell>
                                <TableCell>Items Donated</TableCell>
                                <TableCell>Donor Address</TableCell>
                                <TableCell>Assign To Organization</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {unassignedItemDonations.map((d) => (
                                <TableRow key={d._id} hover>
                                    <TableCell>{d._id.substring(0, 8)}...</TableCell>
                                    <TableCell>
                                        <Box>
                                            <Chip label={`${d.itemDetails?.length || 0} items`} size="small" color="primary" />
                                            <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.6 }}>
                                                {d.itemDetails?.map(it => `${it.name} x${it.quantity}`).join(', ')}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{d.address ? (d.address.substring(0, 30) + '...') : '—'}</TableCell>
                                    <TableCell sx={{ minWidth: 250 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Select Organization</InputLabel>
                                            <Select
                                                value={selectedOrg[d._id] || ''}
                                                label="Select Organization"
                                                onChange={(e) => handleOrgChange(d._id, e.target.value)}
                                                disabled={assigningId === d._id || organizations.length === 0}
                                            >
                                                <MenuItem value="">
                                                    <em>{organizations.length === 0 ? "No organizations available" : "Select an organization"}</em>
                                                </MenuItem>
                                                {organizations.map((org) => (
                                                    <MenuItem key={org._id} value={org._id}>
                                                        {org.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleAssignment(d._id)}
                                            disabled={!selectedOrg[d._id] || assigningId === d._id}
                                        >
                                            {assigningId === d._id ? <CircularProgress size={20} color="inherit" /> : 'Assign'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Snackbar
                open={assignSnackbar.open}
                autoHideDuration={3500}
                onClose={() => setAssignSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={assignSnackbar.severity} onClose={() => setAssignSnackbar(prev => ({ ...prev, open: false }))}>
                    {assignSnackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Fetch users error', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      const token = getToken();
      const res = await axios.patch(`/api/users/${id}/role`, { role: newRole }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data && res.data.user) setUsers(prev => prev.map(u => u._id === id ? res.data.user : u));
      setSnack({ open: true, message: 'User role updated', severity: 'success' });
    } catch (err) {
      console.error('Update role error', err);
      setSnack({ open: true, message: 'Update failed', severity: 'error' });
    }
  };

  const columns = [
    { field: 'fname', headerName: 'Name', width: 220, renderCell: (params) => { try { if (!params || !params.row) return null; const val = params?.value ?? params.row?.fname ?? params.row?.name; return <Typography sx={{ fontWeight: 700 }}>{val || '—'}</Typography>; } catch (err) { console.error('User name cell render error', err, params); return <Typography color="error">Err</Typography>; } } },
    { field: 'ename', headerName: 'Email', width: 260, valueGetter: (params) => { if (!params) return ''; return params?.value ?? params?.row?.ename ?? params?.row?.email; } },
    { field: 'role', headerName: 'Role', width: 120, renderCell: (params) => { try { if (!params || !params.row) return null; const v = params?.value ?? params.row?.role ?? 'user'; return <Chip size="small" label={v} color={v === 'admin' ? 'primary' : 'default'} /> } catch (err) { console.error('User role cell render error', err, params); return <Chip size="small" label="err" /> } } },
    { field: 'city', headerName: 'City', width: 160 },
    { field: 'createdAt', headerName: 'Joined', width: 180, valueGetter: (params) => { try { if (!params) return ''; const raw = params?.row?.createdAt ?? params?.value; if (!raw) return ''; const dt = new Date(raw); return isNaN(dt.getTime()) ? '' : dt.toLocaleString(); } catch (err) { console.error('createdAt formatter error', err, params); return ''; } } },
    { field: 'actions', headerName: 'Actions', width: 180, sortable: false, filterable: false, renderCell: (params) => { try { if (!params || !params.row) return null; return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button size="small" variant="outlined" onClick={() => toggleRole(params.row._id, params.row.role)}>
          {params.row.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
        </Button>
      </Box>
    ); } catch (err) { console.error('User actions cell render error', err, params); return <Typography color="error">Err</Typography>; } } }
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>Users</Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>Manage registered users</Typography>
      <DataGrid rows={users} columns={columns} loading={loading} autoHeight getRowId={(row) => row._id} />
      <Snackbar open={snack.open} autoHideDuration={3500} onClose={() => setSnack(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snack.severity} onClose={() => setSnack(prev => ({ ...prev, open: false }))}>{snack.message}</Alert>
      </Snackbar>
    </Paper>
  );
}

// --------------------------------------------------------------------
// ⭐️ MAIN COMPONENT (Refactored to be the Tab Container)
// --------------------------------------------------------------------

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState("Analytics");
  
  // State for Analytics data (lifted up for potential refresh)
  const [stats, setStats] = useState(null);
  const [moneyData, setMoneyData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Sidebar responsive helpers
  const drawerWidth = 240;
  const collapsedWidth = 72;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleSidebarToggle = () => setSidebarOpen((s) => !s);

  // Broadcast sidebar state so other components (like the main Nav) can adjust
  useEffect(() => {
    const detail = { open: sidebarOpen, width: sidebarOpen ? drawerWidth : collapsedWidth };
    window.dispatchEvent(new CustomEvent('adminSidebarChanged', { detail }));
  }, [sidebarOpen]);


  const loadAllAnalyticsData = async () => {
    setLoadingAnalytics(true);
    try {
        const token = getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, moneyRes, itemRes, recentRes] = await Promise.all([
            axios.get("/api/donations/admin/stats", { headers }),
            axios.get("/api/donations/admin/analytics/money", { headers }),
            axios.get("/api/donations/admin/analytics/items", { headers }),
            axios.get("/api/donations/admin/recent-donations", { headers }),
        ]);

        setStats(statsRes.data);
        
        setMoneyData(moneyRes.data.map((m) => ({ month: `Month ${m._id}`, total: m.total })));
        
        setItemData(itemRes.data.map((item) => ({ name: item._id, value: item.total })));
        
        setRecent(recentRes.data);
    } catch (error) {
        console.error("Error loading dashboard data:", error);
    } finally {
        setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    loadAllAnalyticsData();
  }, []);

  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };
  
  const COLORS = ["#1976d2", "#e53935", "#43a047", "#fbc02d", "#ab47bc"];

  // Tab content mapping
  const TABS = {
    Analytics: { 
        component: <DashboardAnalytics 
                        stats={stats} 
                        moneyData={moneyData} 
                        itemData={itemData} 
                        recent={recent} 
                        COLORS={COLORS}
                        loading={loadingAnalytics}
                        reloadData={loadAllAnalyticsData}
                   />, 
        label: "Analytics & Summary",
        icon: <DashboardIcon />
    },
    Users: {
        component: <AdminUsersPage />,
        label: "Users",
        icon: <PeopleIcon />
    },
    Organizations: { 
        component: <AdminOrganizationPage />, 
        label: "Manage Organizations",
        icon: <AccountBalanceIcon />
    },
    Assignments: { 
        component: <AdminItemAssignmentPage />, 
        label: "Donation Assignments",
        icon: <AssignmentTurnedInIcon />
    },
    Requests: {
        component: <AdminRequestsPage />,
        label: "Organization Requests",
        icon: <AssignmentTurnedInIcon />
    },
  };

  const drawer = (
    <Box sx={{ width: sidebarOpen ? drawerWidth : collapsedWidth, transition: 'width 225ms cubic-bezier(0,0,0.2,1)' }} role="presentation">
      <Toolbar sx={{ display: 'flex', justifyContent: sidebarOpen ? 'flex-end' : 'center', px: 1 }}>
        <IconButton size="small" onClick={handleSidebarToggle} sx={{ color: '#1976d2' }}>
          {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {Object.keys(TABS).map((key) => (
            <MuiTooltip key={key} title={!sidebarOpen ? TABS[key].label : ''} placement="right" arrow>
              <ListItemButton
                selected={currentTab === key}
                onClick={() => { setCurrentTab(key); setMobileOpen(false); }}
                sx={{ borderRadius: 1, mb: 1, justifyContent: sidebarOpen ? 'flex-start' : 'center', px: sidebarOpen ? 2 : 1 }}
              >
                <ListItemIcon sx={{ minWidth: sidebarOpen ? 40 : 'auto', justifyContent: 'center' }}>{TABS[key].icon}</ListItemIcon>
                {sidebarOpen && <ListItemText primary={TABS[key].label} primaryTypographyProps={{ fontWeight: 700 }} />}
              </ListItemButton>
            </MuiTooltip>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', background: "#f4f6f8", minHeight: "100vh" }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', ml: { md: `${sidebarOpen ? drawerWidth : collapsedWidth}px` }, transition: 'margin 225ms cubic-bezier(0,0,0.2,1)', position: 'relative', zIndex: (theme) => theme.zIndex.drawer + 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" fontWeight={700} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Global Administrator Control Panel
            </Typography>
          </Box>
        </Box>

        <Box component="nav" aria-label="admin sidebar">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: 'block', md: 'none' }, zIndex: (theme) => theme.zIndex.drawer + 10, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            PaperProps={{ sx: { width: drawerWidth } }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{ display: { xs: 'none', md: 'block' }, zIndex: (theme) => theme.zIndex.drawer + 1, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarOpen ? drawerWidth : collapsedWidth, position: 'fixed', transition: 'width 225ms cubic-bezier(0,0,0.2,1)' } }}
            open
            PaperProps={{ sx: { width: sidebarOpen ? drawerWidth : collapsedWidth } }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 4, ml: { md: `${sidebarOpen ? drawerWidth : collapsedWidth}px` }, transition: 'margin 225ms cubic-bezier(0,0,0.2,1)', minHeight: '100vh', overflow: 'auto' }}>
          <Box sx={{ mb: 3 }}>
            {/* Keep the existing header spacing */}
          </Box>

          <Box>
            {TABS[currentTab].component}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// --------------------------------------------------------------------
// 🧾 COMPONENT: Organization Requests (Admin)
// --------------------------------------------------------------------
function AdminRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAssign, setOpenAssign] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [unassignedDonations, setUnassignedDonations] = useState([]); // flattened item-lines
    const [pickedDonation, setPickedDonation] = useState(''); // stores 'donationId:itemIndex'
    const [assignQuantity, setAssignQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchRequests();

        // Refresh when other components update requests/donations
        const handler = () => fetchRequests();
        window.addEventListener('requestUpdated', handler);
        window.addEventListener('donationUpdated', handler);
        return () => {
            window.removeEventListener('requestUpdated', handler);
            window.removeEventListener('donationUpdated', handler);
        };
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const res = await axios.get('/api/admin/requests', { headers: { Authorization: `Bearer ${token}` } });
            setRequests(res.data);
        } catch (err) {
            console.error('Fetch requests error', err);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchUnassignedDonations = async () => {
        try {
            const token = getToken();
            const res = await axios.get('/api/donations/admin/unassigned-item-lines', { headers: { Authorization: `Bearer ${token}` } });
            setUnassignedDonations(res.data);
        } catch (err) {
            console.error('Fetch unassigned item lines failed', err);
            setUnassignedDonations([]);
        }
    };

    const openAssignDialog = async (request) => {
        setSelectedRequest(request);
        await fetchUnassignedDonations();
        setPickedDonation('');
        setAssignQuantity(1);
        setOpenAssign(true);
    };

    const closeAssignDialog = () => {
        setOpenAssign(false);
        setPickedDonation('');
        setAssignQuantity(1);
        setSelectedRequest(null);
    };

    const assignDonationToRequest = async () => {
        if (!pickedDonation || !selectedRequest) return;
        setProcessing(true);
        try {
            const token = getToken();
            const [donationId, itemIndex] = pickedDonation.split(':');
            await axios.patch(`/api/admin/requests/assign-item/${selectedRequest._id}`, { donationId, itemIndex: Number(itemIndex), quantity: Number(assignQuantity) }, { headers: { Authorization: `Bearer ${token}` } });
            setProcessing(false);
            closeAssignDialog();
            fetchRequests();
            window.dispatchEvent(new Event('donationUpdated'));
            setSnack({ open: true, message: 'Assigned donation item to request.', severity: 'success' });
        } catch (err) {
            console.error('Assign item to request error', err);
            setProcessing(false);
            setSnack({ open: true, message: 'Assignment failed', severity: 'error' });
        }
    };

    const updateReqStatus = async (id, status) => {
        try {
            const token = getToken();
            await axios.patch(`/api/admin/requests/status/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
            fetchRequests();
        } catch (err) {
            console.error('Update request status error', err);
        }
    };

    const columns = [
        { field: 'organization', headerName: 'Organization', width: 240, renderCell: (params) => {
            const org = params?.row?.organizationId;
            let name = '';
            if (org && typeof org === 'object') name = org.name || org.contactEmail || String(org._id || '');
            else if (org && typeof org === 'string') name = org;
            else name = params?.row?.organizationName || 'Unknown org';
            return <Typography sx={{ fontWeight: 600 }}>{name}</Typography>;
        } },
        { field: 'items', headerName: 'Requested Items', width: 360, renderCell: (params) => { try { return (
            <Box>
                {Array.isArray(params?.row?.items) ? params.row.items.map((it, i) => <Chip key={i} label={`${it.name} x${it.quantity}`} sx={{ mr: 0.5 }} size="small" />) : <Typography color="text.secondary">—</Typography>}
            </Box>
        ); } catch (err) { console.error('Requested items cell error', err, params); return <Typography color="error">Err</Typography>; } } },
        { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => <Chip label={params?.value} color={getStatusColor(params?.value)} size="small" /> },
        { field: 'assignedDonationId', headerName: 'Assigned Donation (Donated Items)', width: 300, renderCell: (params) => { try { const d = params?.row?.assignedDonationId; if (!d) return <Typography color="text.secondary">—</Typography>; const idShort = d._id ? `${d._id.substring(0,8)}...` : 'Donation'; const items = d.itemDetails && Array.isArray(d.itemDetails) && d.itemDetails.length ? d.itemDetails.map(it => `${it.name} x${it.quantity}`).join(', ') : ''; return (
                <Box>
                    <Typography sx={{ fontWeight: 700 }}>{idShort}</Typography>
                    {items && <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{items}</Typography>}
                </Box>
            ); } catch (err) { console.error('Assigned donation cell error', err, params); return <Typography color="error">Err</Typography>; } } },
        { field: 'createdAt', headerName: 'Requested', width: 160, valueGetter: (params) => {
            const raw = params?.row?.createdAt;
            const dt = raw ? new Date(raw) : null;
            return dt && !isNaN(dt.getTime()) ? dt.toLocaleString() : '';
        } },
        { field: 'actions', headerName: 'Actions', width: 180, sortable: false, filterable: false, renderCell: (params) => (
            <Box>
                {params.row.status === 'Pending' && (
                    <MuiTooltip title="Approve request">
                        <IconButton size="small" color="success" onClick={() => updateReqStatus(params.row._id, 'Approved')}><CheckIcon /></IconButton>
                    </MuiTooltip>
                )}
                {params.row.status !== 'Rejected' && (
                    <MuiTooltip title="Reject request">
                        <IconButton size="small" color="error" onClick={() => updateReqStatus(params.row._id, 'Rejected')}><BlockIcon /></IconButton>
                    </MuiTooltip>
                )}
                {params.row.status === 'Approved' && (
                    <MuiTooltip title="Assign donation">
                        <IconButton size="small" color="primary" onClick={() => openAssignDialog(params.row)}><AssignmentTurnedInIcon /></IconButton>
                    </MuiTooltip>
                )}
            </Box>
        ) }
    ];

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>Organization Requests</Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>Review requests submitted by organizations and assign donations for pickup.</Typography>
            <DataGrid rows={requests} columns={columns} loading={loading} autoHeight getRowId={(row) => row._id} />

            <Dialog open={openAssign} onClose={closeAssignDialog} fullWidth maxWidth="md">
                <DialogTitle>Assign Donation to Request</DialogTitle>
                <DialogContent>
                    {unassignedDonations.length === 0 ? (
                        <Typography>No unassigned item donations available</Typography>
                    ) : (
                        <>
                            <RadioGroup value={pickedDonation} onChange={(e) => {
                                const val = e.target.value;
                                setPickedDonation(val);
                                // set default quantity to available for the selected line
                                const [donationId, idx] = val.split(':');
                                const line = unassignedDonations.find(l => String(l.donationId) === donationId && String(l.itemIndex) === idx);
                                setAssignQuantity(line ? Math.max(1, Math.min(line.quantity, line.quantity)) : 1);
                            }}>
                                {unassignedDonations.map((line, i) => (
                                    <FormControlLabel 
                                        key={`${line.donationId}-${line.itemIndex}-${i}`} 
                                        value={`${line.donationId}:${line.itemIndex}`} 
                                        control={<Radio />} 
                                        label={`${line.donationShort} - ${line.name} (qty: ${line.quantity}) - ${line.createdAt ? new Date(line.createdAt).toLocaleDateString() : 'Unknown'}`} 
                                    />
                                ))}
                            </RadioGroup>

                            <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                                <TextField
                                    label="Quantity to assign"
                                    size="small"
                                    type="number"
                                    value={assignQuantity}
                                    onChange={(e) => {
                                        const val = Math.max(1, Number(e.target.value || 1));
                                        // cap at selected line quantity
                                        if (!pickedDonation) return setAssignQuantity(val);
                                        const [donationId, idx] = pickedDonation.split(':');
                                        const line = unassignedDonations.find(l => String(l.donationId) === donationId && String(l.itemIndex) === idx);
                                        if (line) setAssignQuantity(Math.min(val, line.quantity));
                                        else setAssignQuantity(val);
                                    }}
                                    InputProps={{ inputProps: { min: 1 } }}
                                />
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAssignDialog}>Cancel</Button>
                    <Button onClick={assignDonationToRequest} disabled={!pickedDonation || processing}>{processing ? <CircularProgress size={18} /> : 'Assign'}</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snack.open} autoHideDuration={3500} onClose={() => setSnack(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={snack.severity} onClose={() => setSnack(prev => ({ ...prev, open: false }))}>{snack.message}</Alert>
            </Snackbar>
        </Paper>
    );
}