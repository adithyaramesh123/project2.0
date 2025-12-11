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

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Paper,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";

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

import axios from "axios";

// --------------------------------------------------------------------

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [moneyData, setMoneyData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    loadStats();
    loadMoneyAnalytics();
    loadItemAnalytics();
    loadRecent();
  }, []);

  const loadStats = async () => {
    const res = await axios.get("/api/donations/admin/stats");
    setStats(res.data);
  };

  const loadMoneyAnalytics = async () => {
    const res = await axios.get("/api/donations/admin/analytics/money");

    const formatted = res.data.map((m) => ({
      month: `Month ${m._id}`,
      total: m.total,
    }));

    setMoneyData(formatted);
  };

  const loadItemAnalytics = async () => {
    const res = await axios.get("/api/donations/admin/analytics/items");

    const formatted = res.data.map((item) => ({
      name: item._id,
      value: item.total,
    }));

    setItemData(formatted);
  };

  const loadRecent = async () => {
    const res = await axios.get("/api/donations/admin/recent-donations");
    setRecent(res.data);
  };

  if (!stats) return <Typography sx={{ p: 4 }}>Loading Dashboard…</Typography>;

  // Colors for pie chart
  const COLORS = ["#1976d2", "#e53935", "#43a047", "#fbc02d", "#ab47bc"];

  return (
    <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Admin Analytics Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Users */}
        <SummaryCard
          icon={<PeopleIcon />}
          color="#1976d2"
          label="Users"
          value={stats.users}
        />

        {/* Total Donations */}
        <SummaryCard
          icon={<FavoriteIcon />}
          color="#e53935"
          label="Donations"
          value={stats.donations}
        />

        {/* Total Amount */}
        <SummaryCard
          icon={<TrendingUpIcon />}
          color="#fbc02d"
          label="Total Amount (₹)"
          value={stats.totalAmount.toLocaleString()}
        />

        {/* Top Donor */}
        <SummaryCard
          icon={<MoneyIcon />}
          color="#43a047"
          label="Top Donor"
          value={
            stats.topDonor
              ? `User ${stats.topDonor._id} (₹${stats.topDonor.amount})`
              : "No donors"
          }
        />
      </Grid>

      {/* CHARTS SECTION */}
      <Grid container spacing={3}>
        {/* Money Analytics Chart */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: 380, p: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Monthly Money Donations
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={moneyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#1976d2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Pie Chart - Categories */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: 380, p: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Item Donation Categories
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={itemData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Donations List */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Donations
        </Typography>
        <List>
          {recent.map((d) => (
            <ListItem key={d._id} divider>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: d.type === "Money" ? "#43a047" : "#1976d2" }}>
                  <MoneyIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  d.type === "Money"
                    ? `💵 Money — ₹${d.amount}`
                    : `📦 ${d.itemDetails.length} items donated`
                }
                secondary={new Date(d.createdAt).toLocaleString()}
              />

              <Chip
                label={d.status}
                color={
                  d.status === "Pending"
                    ? "warning"
                    : d.status === "Approved"
                    ? "success"
                    : "error"
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Filters + Export + Approval Table (COMING NEXT) */}
      <Typography variant="h5">Donation Management Table</Typography>
      <Typography color="gray">I will generate this next →</Typography>
    </Box>
  );
}

// --------------------------------------------------------------------
// COMPONENT: Summary Card
// --------------------------------------------------------------------

function SummaryCard({ icon, color, label, value }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>{icon}</Avatar>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            {value}
          </Typography>
          <Typography color="text.secondary">{label}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
