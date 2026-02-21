import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Icons
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'; // Donation
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Impact
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"; // Urgent

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

/* ------------------------------------------------------------------
   🏆 PODIUM COMPONENT
------------------------------------------------------------------ */
const Podium = ({ winners, themeProp }) => {
  const theme = themeProp || DARK_THEME;
  const first = winners[0] || {};
  const second = winners[1] || {};
  const third = winners[2] || {};

  const PodiumStep = ({ rank, user, color, height, delay }) => {
    if (!user || (!user.name && !user.donorName)) return <Box sx={{ width: 80 }} />;
    const name = user.name || user.donorName || "Anonymous";
    const amt = user.amount || 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar sx={{ width: rank === 1 ? 64 : 48, height: rank === 1 ? 64 : 48, border: `3px solid ${color}`, mx: "auto", boxShadow: `0 0 15px ${color}80` }}>
            {name.charAt(0)}
          </Avatar>
          <Typography variant="body2" sx={{ color: theme.text, mt: 1, fontWeight: "bold", fontSize: '0.8rem' }}>{name.split(' ')[0]}</Typography>
          <Typography variant="caption" sx={{ color: color, fontWeight: "bold" }}>₹{amt.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ width: { xs: 60, sm: 80 }, height: height, background: `linear-gradient(180deg, ${color}20 0%, ${color}10 100%)`, borderTop: `4px solid ${color}`, borderRadius: "8px 8px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h4" sx={{ color: color, opacity: 0.3, fontWeight: 900 }}>{rank}</Typography>
        </Box>
      </motion.div>
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 2, height: 260, mt: 2 }}>
      <PodiumStep rank={2} user={second} color="#3b82f6" height={100} delay={0.2} />
      <PodiumStep rank={1} user={first} color="#f59e0b" height={150} delay={0} />
      <PodiumStep rank={3} user={third} color="#10b981" height={70} delay={0.4} />
    </Box>
  );
};

/* ------------------------------------------------------------------
   📊 STAT CARD
------------------------------------------------------------------ */
const StatCard = ({ title, value, icon, color, subtitle, themeProp }) => {
  const theme = themeProp || DARK_THEME;
  return (
    <Card sx={{
      background: `linear-gradient(135deg, ${theme.card} 0%, ${color}15 100%)`,
      borderRadius: 4,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      border: `1px solid ${theme.borderColor}`,
      height: "100%",
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', bgcolor: color, opacity: 0.05 }} />
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ p: 1.5, borderRadius: "12px", background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`, color: color }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" sx={{ color: theme.text, fontWeight: 800, mb: 0.5 }}>{value}</Typography>
        <Typography variant="body2" sx={{ color: theme.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</Typography>
        {subtitle && <Typography variant="caption" sx={{ color: color, mt: 1, display: 'block' }}>{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------------------
   🧩 MAIN DASHBOARD COMPONENT
------------------------------------------------------------------ */
import LocationPicker from './LocationPicker';

/* ------------------------------------------------------------------
   🧩 MAIN DASHBOARD COMPONENT
------------------------------------------------------------------ */
const DonationPage = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL || '';
  const userId = sessionStorage.getItem('userId');
  const userName = sessionStorage.getItem('userName') || 'User';

  const [history, setHistory] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [stats, setStats] = useState({ totalMoney: 0, totalItems: 0 });
  const [neededItems, setNeededItems] = useState([]);
  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [mapOrgs, setMapOrgs] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // UI States
  const [openDonate, setOpenDonate] = useState(false);
  const [donateTab, setDonateTab] = useState('Money');
  const [prefillItem, setPrefillItem] = useState(null);

  const muiTheme = useTheme();
  const isDarkMode = muiTheme.palette.mode === 'dark';
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const histRes = await axios.get(`${baseurl}/api/donations/history/${userId}`);
          const hist = histRes.data || [];
          setHistory(hist);
          const money = hist.filter(d => d.type === 'Money').reduce((sum, d) => sum + (d.amount || 0), 0);
          const items = hist.filter(d => d.type === 'Item').reduce((sum, d) => sum + (d.itemDetails?.length || 0), 0);
          setStats({ totalMoney: money, totalItems: items });
        }
        const lbRes = await axios.get(`${baseurl}/api/donations/admin/stats`);
        setTopDonors(lbRes.data.topDonors || []);
        const itemsRes = await axios.get(`${baseurl}/api/donations/items`);
        setNeededItems(itemsRes.data || []);
        const mapRes = await axios.get(`${baseurl}/api/organizations/map-data`);
        setMapOrgs(mapRes.data || []);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            try {
              const nearbyRes = await axios.get(`${baseurl}/api/organizations/requests/nearby?lat=${latitude}&lng=${longitude}`);
              setNearbyRequests(nearbyRes.data || []);
            } catch (e) { console.error("Nearby req error", e); }
          });
        }
      } catch (err) {
        console.error("Dashboard data load error", err);
      }
    };
    fetchData();
  }, [baseurl, userId]);

  return (
    <Box sx={{ bgcolor: theme.bg, minHeight: '100vh', color: theme.text, pb: 8 }}>

      {/* PREMIUM HERO SECTION */}
      <Box sx={{
        position: 'relative',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden',
        background: isDarkMode
          ? `linear-gradient(rgba(2,9,5,0.85), rgba(2,9,5,0.95)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')`
          : `linear-gradient(rgba(240,253,244,0.8), rgba(240,253,244,0.9)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: `1px solid ${theme.borderColor}`
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Chip
                  label="Your Impact Dashboard"
                  sx={{
                    bgcolor: theme.primary + '20',
                    color: theme.primary,
                    fontWeight: 700,
                    mb: 2,
                    border: `1px solid ${theme.primary}40`
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: 900, color: theme.text, mb: 2, letterSpacing: '-2px' }}>
                  Welcome, <span style={{ color: theme.primary }}>{userName}</span>
                </Typography>
                <Typography variant="h6" sx={{ color: theme.textSec, mb: 4, maxWidth: '600px', lineHeight: 1.6 }}>
                  "We make a living by what we get, but we make a life by what we give." Every contribution you make creates a ripple of hope across the globe.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<VolunteerActivismIcon />}
                    onClick={() => { setDonateTab('Money'); setOpenDonate(true); setPrefillItem(null); }}
                    sx={{
                      bgcolor: theme.primary,
                      color: '#fff',
                      px: 4, py: 2,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      boxShadow: `0 8px 30px ${theme.primary}50`,
                      '&:hover': { bgcolor: theme.primary, transform: 'translateY(-3px)' }
                    }}
                  >
                    Donate Money
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => { setDonateTab('Item'); setOpenDonate(true); setPrefillItem(null); }}
                    sx={{
                      borderColor: theme.primary,
                      color: theme.primary,
                      px: 4, py: 2,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      '&:hover': { bgcolor: theme.primary + '10', transform: 'translateY(-3px)' }
                    }}
                  >
                    Donate Items
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              {/* LEADERBOARD PREVIEW / PODIUM */}
              <Box sx={{
                p: 3,
                borderRadius: 5,
                bgcolor: theme.card + '80',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.borderColor}`,
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
              }}>
                <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 2, textAlign: 'center', color: theme.text }}>
                  🌟 Top Heroes This Month
                </Typography>
                <Podium winners={topDonors.slice(0, 3)} themeProp={theme} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* DASHBOARD CONTENT */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, mt: 4 }}>
        <Grid container spacing={3}>

          {/* NEARBY REQUESTS SECTION (NEW) */}
          {nearbyRequests.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Card sx={{ bgcolor: theme.card, borderRadius: 4, border: `1px solid ${theme.primary}50`, p: 2 }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VolunteerActivismIcon sx={{ color: theme.primary }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.text }}>Nearby Organization Requests</Typography>
                </Box>
                <Grid container spacing={2}>
                  {nearbyRequests.map(req => (
                    <Grid size={{ xs: 12, md: 4 }} key={req._id}>
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: theme.bg, border: `1px solid ${theme.borderColor}` }}>
                        <Typography variant="subtitle1" fontWeight="bold">{req.organizationId?.name}</Typography>
                        <Typography variant="caption" color={theme.textSec}>{req.organizationId?.address}</Typography>
                        <Box sx={{ my: 1 }}>
                          {req.items.map((i, idx) => (
                            <Chip key={idx} label={`${i.name} (x${i.quantity})`} size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: theme.primary + '20', color: theme.primary }} />
                          ))}
                        </Box>
                        <Button fullWidth variant="contained" size="small"
                          onClick={() => {
                            setDonateTab('Item');
                            setOpenDonate(true);
                            // Pre-fill logic could be more complex, simplification for now
                            setPrefillItem(null);
                          }}
                          sx={{ bgcolor: theme.secondary }}>
                          Direct Donate
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          )}

          {/* STATS ROW */}
          <Grid size={{ xs: 12, md: 6 }}>
            <StatCard
              themeProp={theme}
              title="Total Impact"
              value={`₹${stats.totalMoney.toLocaleString()}`}
              icon={<AccountBalanceWalletIcon sx={{ fontSize: 32 }} />}
              color={theme.success}
              subtitle="Lifetime Money Distributed"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatCard
              themeProp={theme}
              title="Donations Made"
              value={String(history.length)}
              icon={<VolunteerActivismIcon sx={{ fontSize: 32 }} />}
              color={theme.secondary}
              subtitle="Money & Items"
            />
          </Grid>

          {/* DIRECT IMPACT STORIES (Visual "Wow" factor) */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Heart color={theme.danger} size={24} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.text }}>Your Support in Action</Typography>
            </Box>
            <Grid container spacing={3}>
              {[
                { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop", title: "Education Grant", loc: "Kenya" },
                { img: "https://www.unicef.org/india/sites/unicef.org.india/files/styles/hero_extended/public/UNI535228.webp?itok=7QvT5lOC", title: "Clean Water", loc: "India" },
                { img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop", title: "Medical Relief", loc: "Syria" }
              ].map((item, i) => (
                <Grid size={{ xs: 12, md: 4 }} key={i}>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Card sx={{
                      height: 180,
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      border: `1px solid ${theme.borderColor}`,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                      <Box component="img" src={item.img} sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                      <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                      }}>
                        <Typography variant="caption" sx={{ color: theme.primary, fontWeight: 900, textTransform: 'uppercase' }}>{item.loc}</Typography>
                        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 800 }}>{item.title}</Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* MAIN UTILITY SECTION: URGENT NEEDS */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ bgcolor: theme.card, borderRadius: 4, border: `1px solid ${theme.borderColor}`, overflow: 'hidden', height: '100%' }}>
              <Box sx={{ p: 3, borderBottom: `1px solid ${theme.borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ color: theme.text, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PriorityHighIcon sx={{ color: theme.warning }} /> Urgent Needs & Utilities
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.textSec }}>Items currently requested by organizations</Typography>
                </Box>
                <Button size="small" variant="outlined" onClick={() => { setDonateTab('Item'); setOpenDonate(true); setPrefillItem(null); }} sx={{ borderColor: theme.borderColor, color: theme.textSec }}>
                  View All Items
                </Button>
              </Box>

              <CardContent sx={{ p: 3 }}>
                {neededItems.length > 0 ? (
                  <Grid container spacing={2}>
                    {neededItems.slice(0, 4).map((item) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={item._id}>
                        <Box sx={{
                          p: 2, borderRadius: 3,
                          bgcolor: `${theme.bg}80`,
                          border: `1px solid ${theme.borderColor}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: theme.text }}>{item.name}</Typography>
                            <Typography variant="caption" sx={{ color: theme.textSec }}>Priority: High</Typography>
                          </Box>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ bgcolor: theme.secondary, fontSize: '0.7rem', textTransform: 'none' }}
                            onClick={() => { setDonateTab('Item'); setOpenDonate(true); setPrefillItem(item.name); }}
                          >
                            Donate
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4, color: theme.textSec }}>
                    <VolunteerActivismIcon sx={{ fontSize: 40, opacity: 0.2, mb: 1 }} />
                    <Typography>No urgent requests at the moment.</Typography>
                    <Button sx={{ mt: 1 }} onClick={() => { setDonateTab('Money'); setOpenDonate(true); setPrefillItem(null); }}>Donate Money Instead</Button>
                  </Box>
                )}

                <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${theme.borderColor}` }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: theme.textSec }}>Quick Utilities</Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button startIcon={<VolunteerActivismIcon />} variant="outlined" sx={{ borderRadius: 2, borderColor: theme.borderColor, color: theme.text }} onClick={() => { setDonateTab('Money'); setOpenDonate(true); setPrefillItem(null); }}>
                      Donate ₹500
                    </Button>
                    <Button startIcon={<VolunteerActivismIcon />} variant="outlined" sx={{ borderRadius: 2, borderColor: theme.borderColor, color: theme.text }} onClick={() => { setDonateTab('Money'); setOpenDonate(true); setPrefillItem(null); }}>
                      Donate ₹1000
                    </Button>
                    <Button startIcon={<VolunteerActivismIcon />} variant="outlined" sx={{ borderRadius: 2, borderColor: theme.borderColor, color: theme.text }} onClick={() => { setDonateTab('Money'); setOpenDonate(true); setPrefillItem(null); }}>
                      Custom Amount
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* HIGH PRIORITIES (DYNAMIC) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: theme.card, borderRadius: 4, border: `1px solid ${theme.borderColor}`, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: theme.text, fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PriorityHighIcon sx={{ color: theme.danger }} /> High Priorities
                </Typography>
                <List>
                  {neededItems.slice(0, 3).map((item, index) => (
                    <ListItem
                      key={item._id}
                      disablePadding
                      sx={{ mb: 1, borderRadius: 2, border: `1px solid ${theme.borderColor}`, overflow: 'hidden' }}
                    >
                      <ListItemButton
                        onClick={() => { setDonateTab('Item'); setOpenDonate(true); setPrefillItem(item.name); }}
                        sx={{ bgcolor: `${theme.bg}80`, '&:hover': { bgcolor: `${theme.primary}10`, borderColor: theme.primary } }}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: `${[theme.warning, theme.success, theme.secondary][index % 3]}20`, color: [theme.warning, theme.success, theme.secondary][index % 3] }}>
                            <VolunteerActivismIcon />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="subtitle1" fontWeight="bold" color={theme.text}>{item.name}</Typography>}
                          secondary={<Typography variant="caption" color={theme.textSec}>Urgent Need</Typography>}
                        />
                        <Chip label="Donate" size="small" sx={{ bgcolor: [theme.danger, theme.warning, theme.success][index % 3], color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {neededItems.length === 0 && (
                    <Box sx={{ p: 2, textAlign: 'center', color: theme.textSec }}>
                      <Typography variant="body2">No urgent priorities at the moment.</Typography>
                    </Box>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* RECENT ACTIVITY */}
          <Grid size={{ xs: 12 }}>
            <Card sx={{ bgcolor: theme.card, borderRadius: 4, border: `1px solid ${theme.borderColor}` }}>
              <Box sx={{ p: 3, borderBottom: `1px solid ${theme.borderColor}` }}>
                <Typography variant="h6" sx={{ color: theme.text, fontWeight: 'bold' }}>Your Recent Activity</Typography>
              </Box>
              <CardContent sx={{ p: 0 }}>
                <List sx={{ width: '100%', bgcolor: 'transparent' }}>
                  {history.slice(0, 5).map((d) => (
                    <React.Fragment key={d._id}>
                      <ListItem alignItems="center" sx={{ px: 3, py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 50 }}>
                          <Avatar sx={{
                            bgcolor: d.type === 'Money' ? `${theme.success}20` : `${theme.secondary}20`,
                            color: d.type === 'Money' ? theme.success : theme.secondary,
                            borderRadius: 2
                          }}>
                            {d.type === 'Money' ? '₹' : <VolunteerActivismIcon />}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: theme.text, fontWeight: 600 }}>
                              {d.type === 'Money' ? `Donated ₹${d.amount}` : `Donated ${d.itemDetails?.length || 1} Items`}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="caption" sx={{ color: theme.textSec, display: 'block' }}>
                                {new Date(d.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </Typography>
                              {d.type === 'Item' && d.status !== 'Completed' && d.status !== 'Cancelled' && (
                                <Box sx={{ mt: 0.5 }}>
                                  <Chip
                                    label={d.status}
                                    size="small"
                                    color={d.status === 'OutForPickup' ? 'warning' : d.status === 'Assigned' ? 'info' : 'default'}
                                    sx={{ mr: 1, height: 20, fontSize: '0.65rem' }}
                                  />
                                  {d.pickupCode && (
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: theme.primary, border: `1px dashed ${theme.primary}`, px: 1, py: 0.2, borderRadius: 1 }}>
                                      Code: {d.pickupCode}
                                    </Typography>
                                  )}
                                </Box>
                              )}
                            </Box>
                          }
                        />
                        <Chip
                          label={d.status}
                          size="small"
                          sx={{
                            height: 24, fontSize: '0.75rem', fontWeight: 'bold',
                            bgcolor: d.status === 'Completed' || d.status === 'Approved' ? `${theme.success}20` : `${theme.warning}20`,
                            color: d.status === 'Completed' || d.status === 'Approved' ? theme.success : theme.warning
                          }}
                        />
                      </ListItem>
                      <Box sx={{ borderBottom: `1px solid ${theme.borderColor}`, mx: 3 }} />
                    </React.Fragment>
                  ))}
                  {history.length === 0 && <Box sx={{ p: 4, textAlign: 'center', color: theme.textSec }}>No recent activity.</Box>}
                </List>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Box>

      {/* DONATION MODAL */}
      <DonationModal
        open={openDonate}
        onClose={() => { setOpenDonate(false); setPrefillItem(null); }}
        initialTab={donateTab}
        theme={theme}
        baseurl={baseurl}
        prefillItem={prefillItem}
        mapOrgs={mapOrgs} // Pass map data
      />

    </Box>
  );
};

/* ------------------------------------------------------------------
   🎁 DONATION MODAL
------------------------------------------------------------------ */
const DonationModal = ({ open, onClose, initialTab, theme, baseurl, prefillItem, mapOrgs }) => {
  const [tab, setTab] = useState(initialTab || 'Money');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState({});
  const [availableItems, setAvailableItems] = useState([]);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null); // { lat, lng }

  // Update tab when prop changes
  useEffect(() => { setTab(initialTab || 'Money'); }, [initialTab, open]);

  // Handle Prefill
  useEffect(() => {
    if (open && prefillItem) {
      setItems({ [prefillItem]: 1 });
    } else if (!open) {
      setItems({}); // Reset on close
      setSelectedLocation(null);
      setAddress('');
      setNotes('');
    }
  }, [open, prefillItem]);

  // Fetch Items
  useEffect(() => {
    if (open && tab === 'Item') {
      axios.get(`${baseurl}/api/donations/items`).then(res => {
        setAvailableItems(res.data || []);
      });
    }
  }, [open, tab, baseurl]);

  const handleMoneyDonate = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      await axios.post(`${baseurl}/api/donations/money`, {
        amount: Number(amount),
        userId,
        provider: 'stripe_dummy',
        providerPaymentId: `manual_${Date.now()}`
      });
      alert("Donation Successful!");
      onClose();
      window.location.reload();
    } catch (e) { alert("Failed"); }
  };

  const handleItemDonate = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const donationItems = Object.keys(items)
        .map(name => ({ name, quantity: Number(items[name]) }))
        .filter(i => i.quantity > 0);

      if (donationItems.length === 0) return alert("Select at least one item");
      if (!address) return alert("Please enter pickup address");

      await axios.post(`${baseurl}/api/donations/item`, {
        userId,
        items: donationItems,
        notes,
        address,
        latitude: selectedLocation?.lat,
        longitude: selectedLocation?.lng
      });
      alert("Items Recorded! We will notify nearby organizations.");
      onClose();
      window.location.reload();
    } catch (e) { alert("Failed"); }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg" // Increased size for map
      fullWidth
      PaperProps={{ sx: { bgcolor: theme.card, color: theme.text, borderRadius: 3, border: `1px solid ${theme.borderColor}` } }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', pt: 4 }}>
        Make a Difference
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, gap: 2, mt: 2 }}>
          <Button
            variant={tab === 'Money' ? "contained" : "outlined"}
            onClick={() => setTab('Money')}
            sx={{ borderRadius: 4, px: 4, bgcolor: tab === 'Money' ? theme.primary : 'transparent', color: tab === 'Money' ? 'white' : theme.textSec, borderColor: theme.borderColor }}
          >
            Money
          </Button>
          <Button
            variant={tab === 'Item' ? "contained" : "outlined"}
            onClick={() => setTab('Item')}
            sx={{ borderRadius: 4, px: 4, bgcolor: tab === 'Item' ? theme.secondary : 'transparent', color: tab === 'Item' ? 'white' : theme.textSec, borderColor: theme.borderColor }}
          >
            Items
          </Button>
        </Box>

        {tab === 'Money' ? (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography sx={{ color: theme.textSec, mb: 2 }}>Enter amount to donate (INR)</Typography>
            <TextField
              autoFocus
              fullWidth
              placeholder="e.g. 500"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ mb: 3, input: { color: theme.text, textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }, '& fieldset': { borderColor: theme.borderColor } }}
            />
            <Button fullWidth variant="contained" size="large" onClick={handleMoneyDonate} sx={{ bgcolor: theme.success, py: 1.5, fontSize: '1.1rem' }}>Donate ₹{amount || '0'}</Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* LEFT: FORM */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ maxHeight: 500, overflowY: 'auto', pr: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: theme.text }}>Select Items:</Typography>
                {availableItems.map(item => (
                  <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 2, border: `1px solid ${theme.borderColor}`, borderRadius: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
                      <Typography variant="caption" color={theme.textSec}>{item.description}</Typography>
                    </Box>
                    <TextField
                      type="number"
                      placeholder="0"
                      size="small"
                      value={items[item.name] || ''}
                      sx={{ width: 80, input: { color: theme.text }, fieldset: { borderColor: theme.borderColor } }}
                      onChange={(e) => setItems({ ...items, [item.name]: e.target.value })}
                    />
                  </Box>
                ))}
                <TextField
                  fullWidth label="Notes (Optional)" variant="outlined" multiline rows={2}
                  value={notes} onChange={e => setNotes(e.target.value)}
                  sx={{ mt: 2, textarea: { color: theme.text }, label: { color: theme.textSec }, fieldset: { borderColor: theme.borderColor } }}
                />
              </Box>
            </Grid>
            {/* RIGHT: MAP & ADDRESS */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: theme.text }}>Pickup Location:</Typography>
              <LocationPicker
                organizations={mapOrgs}
                onLocationSelect={(loc) => {
                  setSelectedLocation(loc);
                  // Optional: Reverse geocode here to set Address string
                }}
              />
              <Typography variant="caption" sx={{ color: theme.textSec, display: 'block', mt: 1 }}>
                Click on the map to set location. Green circles show organization coverage.
              </Typography>
              <TextField
                fullWidth label="Pickup Address / Landmark" variant="outlined"
                value={address} onChange={e => setAddress(e.target.value)}
                sx={{ mt: 2, input: { color: theme.text }, label: { color: theme.textSec }, fieldset: { borderColor: theme.borderColor } }}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      {tab === 'Item' && (
        <DialogActions sx={{ p: 3 }}>
          <Button fullWidth variant="contained" size="large" onClick={handleItemDonate} sx={{ bgcolor: theme.secondary }}>Submit Items</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DonationPage;
