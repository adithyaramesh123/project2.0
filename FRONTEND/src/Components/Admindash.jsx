import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Drawer // Imported Drawer
} from "@mui/material";
import { useTheme } from "./ThemeContext"; // Use Custom Theme Context
import { useTheme as useMuiTheme } from "@mui/material/styles"; // Rename MUI hook

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MessageIcon from "@mui/icons-material/Message";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import HistoryIcon from '@mui/icons-material/History';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from "@mui/icons-material/Menu"; // Imported MenuIcon

// Third-party
import {
    BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

/* ------------------------------------------------------------------
   🎨 THEME CONSTANTS (Dark + Green)
------------------------------------------------------------------ */
const DARK_THEME = {
    mode: 'dark',
    bg: "#020905",       // Deep Dark Green
    card: "#0d1f16",     // Dark Jungle Green Cards
    primary: "#10b981",  // Emerald Green
    secondary: "#3b82f6",// Blue accent (keeping for contrast)
    text: "#f9fafb",     // White text
    textSec: "#9ca3af",  // Gray text
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

// Custom Scrollbar
const scrollbarStyle = {
    "&::-webkit-scrollbar": { width: "6px", height: "6px" },
    "&::-webkit-scrollbar-thumb": { background: "#374151", borderRadius: "10px" },
    "&::-webkit-scrollbar-track": { background: "transparent" },
};

const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

/* ------------------------------------------------------------------
   🏆 PODIUM COMPONENT
------------------------------------------------------------------ */
const Podium = ({ winners, theme }) => {
    const first = winners[0];
    const second = winners[1];
    const third = winners[2];

    const PodiumStep = ({ rank, user, color, height, delay }) => {
        if (!user) return <Box sx={{ width: 100 }} />;
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.5 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}
            >
                <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Avatar sx={{ width: rank === 1 ? 80 : 60, height: rank === 1 ? 80 : 60, border: `3px solid ${color}`, mx: "auto", boxShadow: `0 0 15px ${color}80` }}>
                        {user.name ? user.name.charAt(0) : "U"}
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ color: theme.text, mt: 1, fontWeight: "bold" }}>{user.name}</Typography>
                    <Typography variant="caption" sx={{ color: color, fontWeight: "bold" }}>{user.amount ? `₹${user.amount.toLocaleString()}` : "0 pts"}</Typography>
                </Box>
                <Box sx={{ width: { xs: 80, sm: 120 }, height: height, background: `linear-gradient(180deg, ${color}20 0%, ${color}10 100%)`, borderTop: `4px solid ${color}`, borderRadius: "8px 8px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h3" sx={{ color: color, opacity: 0.3, fontWeight: 900 }}>{rank}</Typography>
                </Box>
            </motion.div>
        );
    };

    return (
        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: { xs: 1, sm: 3 }, height: 320, mt: 4 }}>
            <PodiumStep rank={2} user={second} color="#3b82f6" height={160} delay={0.2} />
            <PodiumStep rank={1} user={first} color="#f59e0b" height={220} delay={0} />
            <PodiumStep rank={3} user={third} color="#10b981" height={120} delay={0.4} />
        </Box>
    );
};

/* ------------------------------------------------------------------
   📊 STAT CARD
------------------------------------------------------------------ */
const StatCard = ({ title, value, icon, color, theme }) => (
    <Card sx={{
        background: `linear-gradient(135deg, ${theme.card} 0%, ${color}15 100%)`,
        borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        border: `1px solid ${theme.borderColor}`,
        height: "100%",
        position: 'relative',
        overflow: 'hidden'
    }}>
        <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', bgcolor: color, opacity: 0.05 }} />
        <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 3 }}>
            <Box sx={{ zIndex: 1 }}>
                <Typography variant="body2" sx={{ color: theme.textSec, mb: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</Typography>
                <Typography variant="h3" sx={{ color: color, fontWeight: 800 }}>{value}</Typography>
            </Box>
            <Box sx={{ p: 2, borderRadius: "16px", background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`, color: color, boxShadow: `0 8px 16px ${color}30` }}>{icon}</Box>
        </CardContent>
    </Card>
);

/* ------------------------------------------------------------------
   📋 RECENT DONATIONS LIST COMPONENT
------------------------------------------------------------------ */
const RecentDonationsList = ({ donations, onUpdateStatus, theme }) => {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = (donations || []).filter(d => {
        const matchesSearch = (d.donorName || "").toLowerCase().includes(search.toLowerCase()) ||
            (d.type || "").toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || d.type === filter;
        return matchesSearch && matchesFilter;
    });

    const formatDate = (str) => {
        if (!str) return "";
        return new Date(str).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const DonationDetailTooltip = ({ d }) => (
        <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, borderBottom: '1px solid #555' }}>Donation Details</Typography>
            <Typography variant="body2"><strong>Type:</strong> {d.type}</Typography>
            {d.type === 'Money' ? (
                <Typography variant="body2"><strong>Amount:</strong> ₹{d.amount}</Typography>
            ) : (
                <Box>
                    <Typography variant="body2"><strong>Items:</strong></Typography>
                    <ul style={{ margin: '4px 0', paddingLeft: 20 }}>
                        {(d.itemDetails || []).map((i, x) => <li key={x}><Typography variant="caption">{i.name} (x{i.quantity})</Typography></li>)}
                    </ul>
                </Box>
            )}
            {d.address && <Typography variant="body2"><strong>Address:</strong> {d.address}</Typography>}
            {d.notes && <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>"{d.notes}"</Typography>}
        </Box>
    );

    return (
        <Card sx={{ bgcolor: theme.card, borderRadius: 3, border: `1px solid ${theme.borderColor}`, mb: 4 }}>
            <CardContent>
                {/* Header */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
                    <Typography variant="h6" sx={{ color: theme.text, fontWeight: 'bold' }}>Recent Donations</Typography>

                    <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ color: theme.text, '.MuiOutlinedInput-notchedOutline': { borderColor: theme.borderColor }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.primary }, '.MuiSvgIcon-root': { color: theme.text } }}>
                                <MenuItem value="All">All Category</MenuItem>
                                <MenuItem value="Money">Money</MenuItem>
                                <MenuItem value="Item">Item</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder="Search user..."
                            size="small"
                            variant="outlined"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: theme.textSec }} /></InputAdornment>) }}
                            sx={{ bgcolor: theme.bg, borderRadius: 1, input: { color: theme.text }, fieldset: { border: `1px solid ${theme.borderColor}` } }}
                        />
                    </Box>
                </Box>

                {/* List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filtered.map((d) => (
                        <Tooltip key={d._id} title={<DonationDetailTooltip d={d} />} placement="left" arrow componentsProps={{ tooltip: { sx: { bgcolor: theme.card, border: `1px solid ${theme.borderColor}`, p: 1, color: theme.text } } }}>
                            <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: theme.bg, border: `1px solid ${theme.borderColor}`, borderRadius: 2, transition: '0.2s', '&:hover': { borderColor: theme.primary, bgcolor: theme.mode === 'dark' ? '#111827' : '#f9fafb' } }}>
                                {/* Left: Icon + Text */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: d.type === 'Money' ? '#10b98120' : '#3b82f620', color: d.type === 'Money' ? '#10b981' : '#3b82f6', borderRadius: 2 }}>
                                        {d.type === 'Money' ? '₹' : <AssignmentIcon />}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ color: theme.text, fontWeight: 'bold' }}>
                                            {d.donorName} <span style={{ color: theme.textSec, fontSize: '0.8em', fontWeight: 'normal' }}>• {d.address ? d.address.split(',')[0] : 'Online'}</span>
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            <Chip label={d.type === 'Money' ? `₹${d.amount}` : `${(d.itemDetails || []).length} items`} size="small" sx={{ height: 20, fontSize: '0.7rem', bgcolor: d.type === 'Money' ? '#10b98120' : '#3b82f620', color: d.type === 'Money' ? '#10b981' : '#3b82f6' }} />
                                            <Typography variant="caption" sx={{ color: theme.textSec }}>{formatDate(d.createdAt)}</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Right: Status + Actions */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Chip
                                        label={d.status || 'Pending'}
                                        sx={{
                                            bgcolor: d.status === 'Approved' || d.status === 'Completed' ? '#10b98120' : d.status === 'Rejected' ? '#ef444420' : '#f59e0b20',
                                            color: d.status === 'Approved' || d.status === 'Completed' ? '#10b981' : d.status === 'Rejected' ? '#ef4444' : '#f59e0b',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    {d.status === 'Pending' && onUpdateStatus && (
                                        <Box>
                                            <IconButton size="small" sx={{ color: theme.success, border: `1px solid ${theme.success}40`, mr: 1 }} onClick={(e) => { e.stopPropagation(); onUpdateStatus(d._id, 'Approved'); }}>
                                                <CheckCircleIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" sx={{ color: theme.danger, border: `1px solid ${theme.danger}40` }} onClick={(e) => { e.stopPropagation(); onUpdateStatus(d._id, 'Rejected'); }}>
                                                <CancelIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                    {(d.status === 'Approved' || d.status === 'Completed') && <CheckCircleIcon sx={{ color: theme.success, opacity: 0.5 }} />}
                                    {(d.status === 'Rejected') && <CancelIcon sx={{ color: theme.danger, opacity: 0.5 }} />}
                                </Box>
                            </Paper>
                        </Tooltip>
                    ))}
                    {filtered.length === 0 && <Typography sx={{ color: theme.textSec, textAlign: 'center', py: 4 }}>No donations found.</Typography>}
                </Box>
            </CardContent>
        </Card>
    );
};

/* ------------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------------ */
export default function Admindash() {
    const navigate = useNavigate();
    const baseurl = import.meta.env.VITE_API_BASE_URL || '';

    // Use Custom Context for Global State
    const { darkMode, toggleTheme } = useTheme();

    const [activeTab, setActiveTab] = useState("Dashboard");
    const [stats, setStats] = useState({ users: 0, donations: 0, totalAmount: 0, topDonors: [] });
    const [itemData, setItemData] = useState([]);
    const [recent, setRecent] = useState([]);

    const [mobileOpen, setMobileOpen] = useState(false); // Mobile drawer state

    const theme = darkMode ? DARK_THEME : LIGHT_THEME;

    const MENU_ITEMS = [
        { id: "Dashboard", label: "Dashboard", icon: <DashboardIcon /> },
        { id: "Recent", label: "Recent Donations", icon: <HistoryIcon /> },
        { id: "Students", label: "Users List", icon: <PeopleIcon /> },
        { id: "Faculty", label: "Organizations", icon: <StorefrontIcon /> },
        { id: "Tasks", label: "Assignments", icon: <AssignmentIcon /> },
        { id: "Submissions", label: "Requests", icon: <MessageIcon /> },
    ];

    /* FETCH DATA */
    useEffect(() => {
        const loadData = async () => {
            try {
                const headers = { Authorization: `Bearer ${getToken()}` };
                const [statsRes, itemRes] = await Promise.all([
                    axios.get(`${baseurl}/api/donations/admin/stats`, { headers }),
                    axios.get(`${baseurl}/api/donations/admin/analytics/items`, { headers })
                ]);

                setStats({
                    users: statsRes.data.users || 0,
                    donations: statsRes.data.donations || 0,
                    totalAmount: statsRes.data.totalAmount || 0,
                    topDonors: statsRes.data.topDonors || []
                });
                setItemData(itemRes.data.map(i => ({ name: i._id, value: i.total })));

                // Load recent donations too
                const recentRes = await axios.get(`${baseurl}/api/donations/admin/recent-donations`, { headers });
                setRecent(recentRes.data || []);
            } catch (err) {
                if (err.response?.status === 401) navigate('/login');
                console.error(err);
            }
        };
        loadData();
    }, [baseurl, navigate]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    /* REUSABLE SIDEBAR CONTENT (Used in both Desktop and Mobile Drawer) */
    const drawerContent = (
        <Box sx={{ height: '100%', display: "flex", flexDirection: "column", p: 2, bgcolor: theme.bg, color: theme.text }}>
            <Typography variant="h5" sx={{ color: theme.primary, fontWeight: 900, mb: 4, px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>Changing<span style={{ color: theme.text }}>Lives</span></Typography>
            <List sx={{ flex: 1 }}>
                {MENU_ITEMS.map((item) => (
                    <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            onClick={() => { setActiveTab(item.id); setMobileOpen(false); }}
                            sx={{
                                borderRadius: 2,
                                bgcolor: activeTab === item.id ? theme.primary : "transparent",
                                color: activeTab === item.id ? (theme.mode === 'dark' ? "#fff" : theme.bg) : theme.textSec,
                                "&:hover": {
                                    bgcolor: activeTab === item.id ? theme.primary : theme.mode === 'dark' ? "#1f2937" : "#e5e7eb",
                                    color: activeTab === item.id ? "white" : theme.text
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ p: 2, bgcolor: theme.mode === 'dark' ? "#1f2937" : "#e5e7eb", borderRadius: 2, mt: "auto" }}>
                <Typography variant="subtitle2" sx={{ color: theme.text, fontWeight: "bold" }}>Admin User</Typography>
                <Typography variant="caption" sx={{ color: theme.textSec }}>admin@changinglives.com</Typography>
                <Button startIcon={<LogoutIcon />} fullWidth size="small" sx={{ mt: 1, color: theme.danger, justifyContent: "flex-start", px: 0 }} onClick={() => { localStorage.clear(); sessionStorage.clear(); navigate("/login"); }}>Logout</Button>
            </Box>
        </Box>
    );

    /* DASHBOARD RENDER */
    const renderDashboard = () => (
        <Box sx={{ animate: { opacity: 1 } }}>
            <Typography variant="h5" sx={{ color: theme.text, fontWeight: "bold", mb: 3 }}>Dashboard Overview</Typography>

            {/* 1. Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}><StatCard title="Total Users" value={stats.users} icon={<PeopleIcon sx={{ fontSize: 32 }} />} color="#3b82f6" theme={theme} /></Grid>
                <Grid item xs={12} md={4}><StatCard title="Total Donations (₹)" value={stats.totalAmount.toLocaleString()} icon={<EmojiEventsIcon sx={{ fontSize: 32 }} />} color="#10b981" theme={theme} /></Grid>
                <Grid item xs={12} md={4}><StatCard title="Total Activities" value={stats.donations} icon={<AssignmentIcon sx={{ fontSize: 32 }} />} color="#ec4899" theme={theme} /></Grid>
            </Grid>

            {/* 2. Main Content Row (Podium + Charts) */}
            <Grid container spacing={3} sx={{ mb: 4, alignItems: 'stretch' }}>
                {/* Top Donors */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        background: `linear-gradient(135deg, ${theme.card} 0%, ${theme.primary}05 100%)`,
                        borderRadius: 4,
                        border: `1px solid ${theme.borderColor}`,
                        height: "100%",
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ color: theme.text, fontWeight: 'bold' }}>🏆 Top Donors</Typography>
                                <Chip label="All Time" size="small" sx={{ bgcolor: theme.mode === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", color: theme.text }} />
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Podium winners={stats.topDonors} theme={theme} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Pie Chart */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        background: `linear-gradient(135deg, ${theme.card} 0%, ${theme.secondary}05 100%)`,
                        borderRadius: 4,
                        border: `1px solid ${theme.borderColor}`,
                        height: "100%",
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ color: theme.text, mb: 2, fontWeight: 'bold' }}>Donation Categories</Typography>
                            <Box sx={{ flex: 1, minHeight: 0 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={itemData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                                            {itemData.map((_, index) => (<Cell key={index} fill={[theme.primary, theme.secondary, "#f59e0b", "#ec4899"][index % 4]} />))}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ backgroundColor: theme.card, border: "1px solid " + theme.borderColor, borderRadius: 12, color: theme.text, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }} itemStyle={{ color: theme.text }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                                {itemData.slice(0, 4).map((d, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: [theme.primary, theme.secondary, "#f59e0b", "#ec4899"][i % 4] }} />
                                        <Typography variant="caption" sx={{ color: theme.textSec, fontWeight: 500 }}>{d.name}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bar Chart */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        background: `linear-gradient(135deg, ${theme.card} 0%, #8b5cf605 100%)`,
                        borderRadius: 4,
                        border: `1px solid ${theme.borderColor}`,
                        height: "100%",
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ color: theme.text, mb: 2, fontWeight: 'bold' }}>Activity Volume</Typography>
                            <Box sx={{ flex: 1, minHeight: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[{ n: 'Mon', v: 12 }, { n: 'Tue', v: 19 }, { n: 'Wed', v: 3 }, { n: 'Thu', v: 5 }, { n: 'Fri', v: 2 }]}>
                                        <XAxis dataKey="n" stroke={theme.textSec} tick={{ fill: theme.textSec, fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                                        <RechartsTooltip
                                            cursor={{ fill: theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', radius: 4 }}
                                            contentStyle={{ backgroundColor: theme.card, border: "1px solid " + theme.borderColor, borderRadius: 12, color: theme.text, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
                                        />
                                        <Bar dataKey="v" fill="#8b5cf6" radius={[6, 6, 6, 6]} barSize={24}>
                                            {/* Optional: Add gradient to bars */}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 4. Recent Donations */}
            <RecentDonationsList
                theme={theme}
                donations={recent}
                onUpdateStatus={async (id, status) => {
                    // Optimistic update for UI responsiveness
                    setRecent(prev => prev.map(d => d._id === id ? { ...d, status } : d));
                    try {
                        const endpoint = status === 'Approved' ? 'approve' : 'reject';
                        await axios.put(`${baseurl}/api/donations/admin/${endpoint}/${id}`);
                        // Background refresh
                        const headers = { Authorization: `Bearer ${getToken()}` };
                        const recentRes = await axios.get(`${baseurl}/api/donations/admin/recent-donations`, { headers });
                        setRecent(recentRes.data || []);
                    } catch (e) { console.error(e); }
                }}
            />
        </Box>
    );

    return (
        <Box sx={{ display: "flex", bgcolor: theme.bg, minHeight: "100vh", color: theme.text }}>
            {/* Desktop Sidebar (Permanent) */}
            <Box sx={{ width: 260, borderRight: `1px solid ${theme.borderColor}`, display: { xs: "none", md: "block" } }}>
                {drawerContent}
            </Box>

            {/* Mobile Sidebar (Temporary Drawer) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260, bgcolor: theme.bg, borderRight: `1px solid ${theme.borderColor}` },
                }}
            >
                {drawerContent}
            </Drawer>

            <Box sx={{ flex: 1, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <Box sx={{ height: 64, borderBottom: `1px solid ${theme.borderColor}`, display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Hamburger Button - Visible on Mobile */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' }, color: theme.text }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{MENU_ITEMS.find(i => i.id === activeTab)?.label || 'Overview'}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <TextField placeholder="Search..." size="small" variant="outlined" InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: theme.textSec }} /></InputAdornment>) }} sx={{ display: { xs: 'none', sm: 'block' }, bgcolor: darkMode ? "#1f2937" : "#f3f4f6", borderRadius: 2, "& fieldset": { border: "none" }, input: { color: theme.text } }} />
                        <IconButton onClick={toggleTheme} sx={{ color: theme.text }}>
                            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <IconButton sx={{ color: theme.textSec }}><NotificationsIcon /></IconButton>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 4 }, ...scrollbarStyle }}>
                    {activeTab === "Dashboard" && renderDashboard()}
                    {activeTab === "Recent" && <RecentDonationsList donations={recent} theme={theme} />}
                    {activeTab === "Students" && <AdminUsersPage darkTheme={theme} baseurl={baseurl} />}
                    {activeTab === "Faculty" && <AdminOrganizationPage darkTheme={theme} baseurl={baseurl} />}
                    {activeTab === "Tasks" && <AdminItemAssignmentPage darkTheme={theme} baseurl={baseurl} />}
                    {activeTab === "Submissions" && <AdminRequestsPage darkTheme={theme} baseurl={baseurl} />}
                </Box>
            </Box>
        </Box>
    );
}

/* =================================================================================
   SUB-COMPONENTS (Fully Functional)
================================================================================= */

/* --- USERS LIST --- */
function AdminUsersPage({ baseurl, darkTheme }) {
    const [users, setUsers] = useState([]);
    useEffect(() => { axios.get(`${baseurl}/api/users`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(r => setUsers(r.data)).catch(console.error); }, []);

    return (
        <TableContainer component={Paper} sx={{ bgcolor: darkTheme.card, color: darkTheme.text }}>
            <Table>
                <TableHead><TableRow sx={{ "& th": { color: darkTheme.textSec, borderBottom: "1px solid #374151" } }}><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Role</TableCell><TableCell>Joined</TableCell></TableRow></TableHead>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u._id} sx={{ "& td": { color: darkTheme.text, borderBottom: "1px solid #374151" } }}>
                            <TableCell>{u.fname} {u.lname}</TableCell><TableCell>{u.ename}</TableCell>
                            <TableCell><Chip label={u.role} color={u.role === 'admin' ? 'primary' : 'default'} size="small" /></TableCell>
                            <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

/* --- ORGANIZATION MANAGEMENT --- */
function AdminOrganizationPage({ baseurl, darkTheme }) {
    const [orgs, setOrgs] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', contactEmail: '', location: '', password: '' });

    const fetchOrgs = () => { axios.get(`${baseurl}/api/admin/organizations`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(r => setOrgs(r.data)).catch(console.error); }
    useEffect(() => { fetchOrgs(); }, []);

    const handleSubmit = async () => {
        try {
            await axios.post(`${baseurl}/api/admin/organizations`, form, { headers: { Authorization: `Bearer ${getToken()}` } });
            setOpen(false); fetchOrgs(); setForm({ name: '', contactEmail: '', location: '', password: '' });
        } catch (e) { alert("Failed to add Org"); }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        try {
            await axios.patch(`${baseurl}/api/admin/organizations/status/${id}`, { status: newStatus }, { headers: { Authorization: `Bearer ${getToken()}` } });
            fetchOrgs();
        } catch (e) { console.error(e); }
    }

    return (
        <Box>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: darkTheme.primary, mb: 3 }} onClick={() => setOpen(true)}>Add Organization</Button>
            <TableContainer component={Paper} sx={{ bgcolor: darkTheme.card, color: darkTheme.text }}>
                <Table>
                    <TableHead><TableRow sx={{ "& th": { color: darkTheme.textSec, borderBottom: "1px solid #374151" } }}><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Location</TableCell><TableCell>Status</TableCell><TableCell>Action</TableCell></TableRow></TableHead>
                    <TableBody>
                        {orgs.map((o) => (
                            <TableRow key={o._id} sx={{ "& td": { color: darkTheme.text, borderBottom: "1px solid #374151" } }}>
                                <TableCell>{o.name}</TableCell><TableCell>{o.contactEmail}</TableCell><TableCell>{o.location}</TableCell>
                                <TableCell><Chip label={o.status || 'Unknown'} color={o.status === 'Active' ? 'success' : 'default'} size="small" /></TableCell>
                                <TableCell>
                                    <IconButton size="small" sx={{ color: o.status === 'Active' ? darkTheme.success : darkTheme.textSec }} onClick={() => toggleStatus(o._id, o.status)}>
                                        {o.status === 'Active' ? <ToggleOnIcon fontSize="large" /> : <ToggleOffIcon fontSize="large" />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { bgcolor: darkTheme.card, color: 'white' } }}>
                <DialogTitle>Add Organization</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Name" fullWidth variant="outlined" sx={{ mb: 2, input: { color: 'white' }, label: { color: 'gray' } }} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <TextField margin="dense" label="Email" fullWidth variant="outlined" sx={{ mb: 2, input: { color: 'white' }, label: { color: 'gray' } }} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
                    <TextField margin="dense" label="Location" fullWidth variant="outlined" sx={{ mb: 2, input: { color: 'white' }, label: { color: 'gray' } }} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                    <TextField margin="dense" label="Password" type="password" fullWidth variant="outlined" sx={{ mb: 2, input: { color: 'white' }, label: { color: 'gray' } }} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} sx={{ color: 'gray' }}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: darkTheme.primary }}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

/* --- ITEM ASSIGNMENT --- */
function AdminItemAssignmentPage({ baseurl, darkTheme }) {
    const [donations, setDonations] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState({});

    useEffect(() => {
        const fetch = async () => {
            try {
                const [dRes, oRes] = await Promise.all([
                    axios.get(`${baseurl}/api/donations/admin/unassigned-items`, { headers: { Authorization: `Bearer ${getToken()}` } }),
                    axios.get(`${baseurl}/api/admin/organizations?status=Active`, { headers: { Authorization: `Bearer ${getToken()}` } })
                ]);
                setDonations(dRes.data);
                setOrganizations(oRes.data);
            } catch (e) { console.error(e); }
        };
        fetch();
    }, [baseurl]);

    const handleAssign = async (donationId) => {
        if (!selectedOrg[donationId]) return alert("Select Org");
        try {
            await axios.patch(`${baseurl}/api/donations/admin/assign/${donationId}`, { organizationId: selectedOrg[donationId] }, { headers: { Authorization: `Bearer ${getToken()}` } });
            setDonations(p => p.filter(d => d._id !== donationId));
            alert("Assigned Successfully");
        } catch (e) { alert("Assignment Failed"); }
    }

    return (
        <TableContainer component={Paper} sx={{ bgcolor: darkTheme.card, color: darkTheme.text }}>
            <Table>
                <TableHead><TableRow sx={{ "& th": { color: darkTheme.textSec, borderBottom: "1px solid #374151" } }}><TableCell>Items</TableCell><TableCell>Address</TableCell><TableCell>Assign To</TableCell><TableCell>Action</TableCell></TableRow></TableHead>
                <TableBody>
                    {donations.map((d) => (
                        <TableRow key={d._id} sx={{ "& td": { color: darkTheme.text, borderBottom: "1px solid #374151" } }}>
                            <TableCell>{(d.itemDetails || []).map(i => `${i.name} x${i.quantity}`).join(', ')}</TableCell>
                            <TableCell>{d.address}</TableCell>
                            <TableCell>
                                <select style={{ background: "#374151", color: "white", padding: "8px", borderRadius: 4, border: '1px solid #4b5563', width: '100%' }} onChange={(e) => setSelectedOrg(p => ({ ...p, [d._id]: e.target.value }))}>
                                    <option value="">Select Organization</option>
                                    {organizations.map(o => <option key={o._id} value={o._id}>{o.name}</option>)}
                                </select>
                            </TableCell>
                            <TableCell>
                                <Button size="small" variant="contained" sx={{ bgcolor: darkTheme.primary }} onClick={() => handleAssign(d._id)}>Assign</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {donations.length === 0 && <TableRow><TableCell colSpan={4} align="center" sx={{ color: darkTheme.textSec, py: 4 }}>No unassigned items found.</TableCell></TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

/* --- REQUEST MANAGEMENT --- */
function AdminRequestsPage({ baseurl, darkTheme }) {
    const [requests, setRequests] = useState([]);
    const [openAssign, setOpenAssign] = useState(false);
    const [selectedReq, setSelectedReq] = useState(null);
    const [availableDonations, setAvailableDonations] = useState([]);

    const fetchRequests = () => {
        axios.get(`${baseurl}/api/admin/requests`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(r => setRequests(r.data)).catch(console.error);
    };
    useEffect(() => { fetchRequests(); }, []); // eslint-disable-line

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`${baseurl}/api/admin/requests/status/${id}`, { status }, { headers: { Authorization: `Bearer ${getToken()}` } });
            fetchRequests();
        } catch (e) { console.error(e); }
    };

    const handleOpenAssign = async (req) => {
        setSelectedReq(req);
        try {
            const res = await axios.get(`${baseurl}/api/donations/admin/unassigned-items`, { headers: { Authorization: `Bearer ${getToken()}` } });
            setAvailableDonations(res.data);
            setOpenAssign(true);
        } catch (e) { alert("Failed to fetch donations"); }
    };

    const handleAssignConfirm = async (donationId) => {
        try {
            await axios.patch(`${baseurl}/api/admin/requests/assign-donation/${selectedReq._id}`, { donationId }, { headers: { Authorization: `Bearer ${getToken()}` } });
            setOpenAssign(false);
            fetchRequests();
        } catch (e) {
            console.error(e);
            alert("Assignment Failed: " + (e.response?.data?.error || e.message));
        }
    };

    return (
        <Box>
            <TableContainer component={Paper} sx={{ bgcolor: darkTheme.card, color: darkTheme.text }}>
                <Table>
                    <TableHead><TableRow sx={{ "& th": { color: darkTheme.textSec, borderBottom: "1px solid #374151" } }}><TableCell>Org</TableCell><TableCell>Items</TableCell><TableCell>Status</TableCell><TableCell>Action</TableCell></TableRow></TableHead>
                    <TableBody>
                        {requests.map((r) => (
                            <TableRow key={r._id} sx={{ "& td": { color: darkTheme.text, borderBottom: "1px solid #374151" } }}>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">{r.organizationName || 'Unavailable'}</Typography>
                                    <Typography variant="caption" sx={{ color: darkTheme.textSec }}>{new Date(r.createdAt).toLocaleDateString()}</Typography>
                                </TableCell>
                                <TableCell>
                                    {(r.items || []).map(i => `${i.name}`).join(', ')}
                                    {r.assignedDonationId && <Chip label="Assigned" size="small" sx={{ ml: 1, bgcolor: darkTheme.primary, color: 'white' }} />}
                                </TableCell>
                                <TableCell><Chip label={r.status} color={r.status === 'Approved' ? 'success' : r.status === 'Rejected' ? 'error' : r.status === 'Assigned' ? 'primary' : 'warning'} size="small" /></TableCell>
                                <TableCell>
                                    {r.status === 'Pending' && (
                                        <>
                                            <Tooltip title="Approve"><IconButton size="small" sx={{ color: darkTheme.success }} onClick={() => updateStatus(r._id, 'Approved')}><CheckCircleIcon /></IconButton></Tooltip>
                                            <Tooltip title="Reject"><IconButton size="small" sx={{ color: darkTheme.danger }} onClick={() => updateStatus(r._id, 'Rejected')}><CancelIcon /></IconButton></Tooltip>
                                        </>
                                    )}
                                    {r.status === 'Approved' && (
                                        <Tooltip title="Assign Item"><Button size="small" startIcon={<AssignmentIcon />} sx={{ color: darkTheme.primary }} onClick={() => handleOpenAssign(r)}>Assign</Button></Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {requests.length === 0 && <TableRow><TableCell colSpan={4} align="center" sx={{ color: darkTheme.textSec, py: 4 }}>No requests found.</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ASSIGN DIALOG */}
            <Dialog open={openAssign} onClose={() => setOpenAssign(false)} maxWidth="md" fullWidth PaperProps={{ sx: { bgcolor: darkTheme.card, color: darkTheme.text } }}>
                <DialogTitle>Assign Donation to Request</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: darkTheme.textSec, mb: 2 }}>
                        Select an available donation to fulfill this request for <strong>{selectedReq?.organizationName}</strong>.
                        <br />Requesting: {(selectedReq?.items || []).map(i => i.name).join(', ')}
                    </DialogContentText>
                    <TableContainer component={Paper} sx={{ bgcolor: darkTheme.bg, border: `1px solid ${darkTheme.borderColor}` }}>
                        <Table size="small">
                            <TableHead><TableRow><TableCell sx={{ color: darkTheme.textSec }}>Donor</TableCell><TableCell sx={{ color: darkTheme.textSec }}>Items</TableCell><TableCell sx={{ color: darkTheme.textSec }}>Action</TableCell></TableRow></TableHead>
                            <TableBody>
                                {availableDonations.map(d => (
                                    <TableRow key={d._id}>
                                        <TableCell sx={{ color: darkTheme.text }}>{d.donorName || 'Donor'} <br /><Typography variant="caption" sx={{ color: darkTheme.textSec }}>{d.address}</Typography></TableCell>
                                        <TableCell sx={{ color: darkTheme.text }}>
                                            <ul style={{ margin: 0, paddingLeft: 16 }}>{(d.itemDetails || []).map((i, x) => <li key={x}>{i.name} (x{i.quantity})</li>)}</ul>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" variant="contained" sx={{ bgcolor: darkTheme.primary }} onClick={() => handleAssignConfirm(d._id)}>Select</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {availableDonations.length === 0 && <TableRow><TableCell colSpan={3} align="center" sx={{ color: darkTheme.textSec, py: 2 }}>No unassigned donations available.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAssign(false)} sx={{ color: darkTheme.textSec }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
