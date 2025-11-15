import React, { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tabs,
    Tab,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
    Stack,
} from "@mui/material";

const mockStats = {
users: 1240,
donations: 320,
totalAmount: 45200,
topDonor: { name: "Jane Doe", amount: 5000 },
};

const mockRecentDonations = [
    { id: 1, name: "Alice Smith", amount: 200, date: "2024-06-10", status: 'completed' },
    { id: 2, name: "Bob Johnson", amount: 150, date: "2024-06-09", status: 'pending' },
    { id: 3, name: "Charlie Lee", amount: 300, date: "2024-06-08", status: 'completed' },
    { id: 4, name: "Dana White", amount: 100, date: "2024-06-07", status: 'refunded' },
];

const mockOrgs = [
    { id: 1, name: 'Helping Hands', contact: 'info@helpinghands.org', active: true },
    { id: 2, name: 'Care Givers', contact: 'contact@caregivers.org', active: true },
];

const mockUsers = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', active: true },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', active: false },
    { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', active: true },
];

export default function Admindash() {
    const [stats, setStats] = useState(mockStats);
    const [recentDonations, setRecentDonations] = useState(mockRecentDonations);
    const [orgs, setOrgs] = useState(mockOrgs);
    const [users, setUsers] = useState(mockUsers);
    const [tab, setTab] = useState(0);

    // In real app, fetch stats and donations from API
    useEffect(() => {
        // fetchStats().then(setStats);
        // fetchRecentDonations().then(setRecentDonations);
        // fetchOrgs().then(setOrgs);
        // fetchUsers().then(setUsers);
    }, []);

    const handleDeleteOrg = (id) => {
        setOrgs((prev) => prev.filter((o) => o.id !== id));
    }

    const toggleUserActive = (id) => {
        setUsers((prev) => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
    }

    const approveDonation = (id) => {
        setRecentDonations((prev) => prev.map(d => d.id === id ? { ...d, status: 'completed' } : d));
    }

    const refundDonation = (id) => {
        setRecentDonations((prev) => prev.map(d => d.id === id ? { ...d, status: 'refunded' } : d));
    }

    return (
        <Box sx={{ p: 4, background: '#eaf4ff', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom fontWeight={700} color="#0b57a4">
                Admin Dashboard
            </Typography>

            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                            <PeopleIcon />
                        </Avatar>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{stats.users}</Typography>
                            <Typography color="text.secondary" fontSize={14}>
                                Users
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <Avatar sx={{ bgcolor: '#43a047', mr: 2 }}>
                            <AttachMoneyIcon />
                        </Avatar>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{stats.donations}</Typography>
                            <Typography color="text.secondary" fontSize={14}>
                                Donations
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <Avatar sx={{ bgcolor: '#fbc02d', mr: 2 }}>
                            <TrendingUpIcon />
                        </Avatar>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">${stats.totalAmount.toLocaleString()}</Typography>
                            <Typography color="text.secondary" fontSize={14}>
                                Total Amount
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <Avatar sx={{ bgcolor: '#e53935', mr: 2 }}>
                            <FavoriteIcon />
                        </Avatar>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{stats.topDonor.name}</Typography>
                            <Typography color="text.secondary" fontSize={14}>
                                Top Donor (${stats.topDonor.amount})
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Tabs value={tab} onChange={(e, val) => setTab(val)} textColor="primary" indicatorColor="primary">
                    <Tab label="Overview" />
                    <Tab label="Organizations" />
                    <Tab label="Donations" />
                    <Tab label="Users" />
                </Tabs>
            </Paper>

            {tab === 0 && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Recent Donations
                    </Typography>
                    <List>
                        {recentDonations.map((donation) => (
                            <ListItem key={donation.id} divider>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: '#1976d2' }}>
                                        <AttachMoneyIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${donation.name} donated $${donation.amount}`}
                                    secondary={`${donation.date} — ${donation.status}`}
                                />
                                <Stack direction="row" spacing={1}>
                                    {donation.status !== 'completed' && (
                                        <Tooltip title="Approve">
                                            <IconButton size="small" color="primary" onClick={() => approveDonation(donation.id)}>
                                                <CheckCircleIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    {donation.status !== 'refunded' && (
                                        <Tooltip title="Refund">
                                            <IconButton size="small" color="warning" onClick={() => refundDonation(donation.id)}>
                                                <BlockIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}

            {tab === 1 && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Organizations
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orgs.map((org) => (
                                <TableRow key={org.id}>
                                    <TableCell>{org.name}</TableCell>
                                    <TableCell>{org.contact}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton size="small" onClick={() => console.log('edit', org.id)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => handleDeleteOrg(org.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}

            {tab === 2 && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Donation Management
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Donor</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>When</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentDonations.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>${d.amount}</TableCell>
                                    <TableCell>{d.status}</TableCell>
                                    <TableCell>{d.date}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View">
                                            <IconButton size="small">
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        {d.status !== 'completed' && (
                                            <Tooltip title="Approve">
                                                <IconButton size="small" onClick={() => approveDonation(d.id)}>
                                                    <CheckCircleIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {d.status !== 'refunded' && (
                                            <Tooltip title="Refund">
                                                <IconButton size="small" onClick={() => refundDonation(d.id)}>
                                                    <BlockIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}

            {tab === 3 && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Users
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>{u.active ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title={u.active ? 'Deactivate' : 'Activate'}>
                                            <IconButton size="small" onClick={() => toggleUserActive(u.id)}>
                                                {u.active ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton size="small" onClick={() => console.log('edit user', u.id)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Box>
    );
}