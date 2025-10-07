import React, { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
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
} from "@mui/material";

const mockStats = {
users: 1240,
donations: 320,
totalAmount: 45200,
topDonor: { name: "Jane Doe", amount: 5000 },
};

const mockRecentDonations = [
{ name: "Alice Smith", amount: 200, date: "2024-06-10" },
{ name: "Bob Johnson", amount: 150, date: "2024-06-09" },
{ name: "Charlie Lee", amount: 300, date: "2024-06-08" },
{ name: "Dana White", amount: 100, date: "2024-06-07" },
];

export default function Admindash() {
const [stats, setStats] = useState(mockStats);
const [recentDonations, setRecentDonations] = useState(mockRecentDonations);

// In real app, fetch stats and donations from API
useEffect(() => {
    // fetchStats().then(setStats);
    // fetchRecentDonations().then(setRecentDonations);
}, []);

return (
    <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
            Admin Dashboard
        </Typography>
        <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
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
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#43a047", mr: 2 }}>
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
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#fbc02d", mr: 2 }}>
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
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#e53935", mr: 2 }}>
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
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Recent Donations
            </Typography>
            <List>
                {recentDonations.map((donation, idx) => (
                    <ListItem key={idx} divider>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "#1976d2" }}>
                                <AttachMoneyIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${donation.name} donated $${donation.amount}`}
                            secondary={donation.date}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    </Box>
);
}