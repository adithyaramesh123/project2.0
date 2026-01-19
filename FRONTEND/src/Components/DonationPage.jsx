// src/pages/DonationPage.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

/* ---------------------------------------------------
   CATEGORY ICONS
---------------------------------------------------- */
const getCategoryIcon = (category) => {
  const icons = {
    Clothing: "👕",
    Food: "🍲",
    Books: "📚",
    Electronics: "🔌",
    Drinks: "🥤",
    Sanitary: "🧼",
    Stationary: "✏️",
    Other: "📦",
  };
  return icons[category] || "📦";
};

const DonationPage = () => {
  const [form, setForm] = useState({
    money: "",
    notes: "",
    address: "",
  });
  const [loadingItems, setLoadingItems] = useState(false);
  const [adminItems, setAdminItems] = useState([]);

  // Success popup lifted to page so all donation flows can trigger it
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  /* ---------------------------------------------------
     FETCH ADMIN ITEMS
---------------------------------------------------- */
  useEffect(() => {
    fetchAdminItems();
  }, []);

  const fetchAdminItems = async () => {
    try {
      const res = await axios.get("/api/donations/items");

      const cleaned = Array.isArray(res.data)
        ? res.data.filter((i) => i && i._id)
        : [];

      setAdminItems(cleaned);

      // initialize each item qty as "0"
      const initial = {};
      cleaned.forEach((item) => (initial[item.name] = "0"));

      setForm((prev) => ({
        ...prev,
        ...initial,
      }));
    } catch (err) {
      console.error("❌ Error fetching admin items:", err);
    }
  };

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  /* ---------------------------------------------------
     SUBMIT ITEM DONATION
---------------------------------------------------- */
  const handleItemsSubmit = async () => {
    setLoadingItems(true);

    try {
      const items = adminItems
        .map((item) => ({
          name: item.name,
          quantity: Number(form[item.name]) || 0,
        }))
        .filter((i) => i.quantity > 0);

      await axios.post("/api/donations/item", {
        userId: "testUser",
        items,
        notes: form.notes,
        address: form.address,
      });

      // Show success popup
      const msg = 'Thanks! Your item donation has been received — we appreciate your support.';
      setSuccessMessage(msg);
      setSuccessOpen(true);
      setTimeout(() => setSuccessOpen(false), 3500);

      // reset item quantities
      const reset = {};
      adminItems.forEach((item) => (reset[item.name] = "0"));

      setForm((prev) => ({
        ...prev,
        ...reset,
        notes: "",
        address: "",
      }));
    } catch (err) {
      console.error("📦 Item submission error:", err);
      alert("Item donation failed.");
    } finally {
      setLoadingItems(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 2,
        background: 'background.default',
      }}
    >
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(15,30,60,0.18)",
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "2rem", md: "2.4rem" },
            color: "text.primary",
          }}
        >
          Support Our Cause
        </Typography>

        <Typography sx={{ mb: 4, color: "text.secondary" }}>
          Choose how you'd like to help — money or needed items.
        </Typography>

        <Grid container spacing={3}>
          {/* MONEY CARD */}
          <Grid item xs={{ span: 12 }} md={{ span: 4 }}>
            <MoneyCard
              amount={form.money}
              onChangeAmount={(v) => setForm((prev) => ({ ...prev, money: v }))}
              onSuccess={(msg) => { setSuccessMessage(msg); setSuccessOpen(true); setTimeout(() => setSuccessOpen(false), 3500); }}
            />
          </Grid>

          {/* DYNAMIC ITEMS */}
          {adminItems.map((item) => (
            <Grid item key={item._id} xs={{ span: 12 }} md={{ span: 4 }}>
              <ItemCard
                icon={getCategoryIcon(item.category)}
                title={item.name}
                subtitle={item.description}
                value={form[item.name] ?? "0"}
                placeholder="0"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [item.name]: e.target.value === "" ? "0" : e.target.value,
                  }))
                }
              />
            </Grid>
          ))}
        </Grid>

        {/* NOTES + ADDRESS */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
          >
            Notes / Pickup Info
          </Typography>

          <TextField
            label="Notes (optional)"
            multiline
            rows={3}
            fullWidth
            value={form.notes}
            onChange={handleChange("notes")}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Pickup Address"
            fullWidth
            required
            value={form.address}
            onChange={handleChange("address")}
            sx={{ mb: 2 }}
          />
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleItemsSubmit}
            disabled={loadingItems || !form.address}
          >
            Submit Item Donation
          </Button>
        </Stack>
      </Box>

      <SuccessPopup open={successOpen} onClose={() => setSuccessOpen(false)} title={'Thank you!'} message={successMessage} />
    </Box>
  );
};

/* ---------------------------------------------------
   MONEY DONATION CARD
---------------------------------------------------- */
const MoneyCard = ({ amount, onChangeAmount, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  // Dummy Stripe modal state
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/34');
  const [cardCVC, setCardCVC] = useState('123');
  const [cardName, setCardName] = useState('Test User');
  const [cardEmail, setCardEmail] = useState('test@example.com');
  const [processing, setProcessing] = useState(false);



  const handleMoneySubmit = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }
    // Open dummy Stripe modal
    setOpen(true);
  };

  const handleDummyPayment = async () => {
    // Minimal client-side validation
    if (!cardNumber || !cardExpiry || !cardCVC) return alert('Enter card details');
    setProcessing(true);
    try {
      // Call backend with provider indicated as stripe_dummy
      const res = await axios.post('/api/donations/money', {
        amount: Number(amount),
        userId: 'testUser',
        provider: 'stripe_dummy',
        providerPaymentId: `stripe_dummy_${Date.now()}`,
        card: { number: cardNumber, expiry: cardExpiry, cvc: cardCVC, name: cardName, email: cardEmail }
      });

      if (res.data && res.data.success) {
        // trigger page-level success popup via callback
        if (typeof onSuccess === 'function') onSuccess('Thanks a lot! Your donation means the world to us.');
        onChangeAmount('');
        setOpen(false);
      } else {
        alert('Payment failed');
      }
    } catch (err) {
      console.error(' payment error', err);
      alert('Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Card sx={{ borderRadius: 4, boxShadow: "0 12px 24px rgba(15,30,60,0.12)", bgcolor: 'background.paper' }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                mx: "auto",
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "primary.main",
                color: 'primary.contrastText',
              }}
            >
              <span style={{ fontSize: 30 }}>💵</span>
            </Box>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>Money Donation</Typography>
          </Box>

          <TextField
            type="number"
            fullWidth
            value={amount ?? ""}
            placeholder="500"
            onChange={(e) => onChangeAmount(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="caption"></Typography>
          </Box>

          <Button variant="contained" fullWidth disabled={loading} onClick={handleMoneySubmit}>
            {loading ? "Processing…" : "Donate Money"}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { bgcolor: 'background.paper' } }}>
        <DialogTitle sx={{ color: 'text.primary' }}> Checkout</DialogTitle>
        <DialogContent dividers>
          <TextField label="Cardholder name" fullWidth value={cardName} onChange={(e) => setCardName(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Email" fullWidth value={cardEmail} onChange={(e) => setCardEmail(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Card number" fullWidth value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField label="Expiry" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} sx={{ flex: 1 }} />
            <TextField label="CVC" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} sx={{ width: 120 }} />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>Amount: ₹{Number(amount).toLocaleString()}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={processing}>Cancel</Button>
          <Button onClick={handleDummyPayment} variant="contained" disabled={processing}>
            {processing ? <CircularProgress size={18} /> : 'Pay'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

/* ---------------------------------------------------
   SUCCESS POPUP
---------------------------------------------------- */
const SuccessPopup = ({ open, onClose, title, message }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (open) {
      // play Lottie animation (if available)
      try { lottieRef.current && lottieRef.current.play && lottieRef.current.play(); } catch (e) {}
      // play short chime
      playChime();
    }
  }, [open]);

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(880, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.25);
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 1.1);
    } catch (e) {
      /* ignore */
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { overflow: 'visible', p: 0, bgcolor: 'transparent', boxShadow: 'none' } }}>
      <Box sx={{ position: 'relative', width: 360, mx: 'auto', textAlign: 'center' }}>
        <style>{`
          @keyframes checkScale { 0% {transform: scale(0.6); opacity:0} 60% {transform: scale(1.05); opacity:1} 100% {transform: scale(1)} }
          @keyframes dash { to { stroke-dashoffset: 0; } }
          @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity:1 } 100% { transform: translateY(-140px) scale(1.05); opacity:0 } }
        `}</style>

        <Box sx={{ position: 'relative', mt: 2 }}>
          <Box sx={{ width: 120, height: 120, borderRadius: '50%', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg,#ff9aa2,#ff6b81)', boxShadow: '0 8px 28px rgba(255,107,129,0.18)', animation: 'checkScale .6s ease' }}>
            <lottie-player
              ref={lottieRef}
              src="https://assets2.lottiefiles.com/packages/lf20_touohxv0.json"
              background="transparent"
              speed="1"
              style={{ width: 96, height: 96 }}
              loop="false"
              autoplay="false"
            ></lottie-player>
          </Box>

          {/* floating hearts */}
          <Box sx={{ position: 'absolute', inset: '-40px -10px auto auto', pointerEvents: 'none', width: 140, height: 160 }}>
            <Box component="span" sx={{ position: 'absolute', left: 10, bottom: 0, fontSize: 18, animation: 'floatUp 3s linear', opacity: 0.95 }}>💖</Box>
            <Box component="span" sx={{ position: 'absolute', left: 46, bottom: 0, fontSize: 20, animation: 'floatUp 3.4s linear', animationDelay: '0.2s', opacity: 0.95 }}>💕</Box>
            <Box component="span" sx={{ position: 'absolute', left: 86, bottom: 0, fontSize: 16, animation: 'floatUp 2.8s linear', animationDelay: '0.1s', opacity: 0.95 }}>❤️</Box>
          </Box>
        </Box>

        <Box sx={{ mt: 2, bgcolor: 'background.paper', p: 2.5, borderRadius: 2, boxShadow: '0 10px 30px rgba(15,30,60,0.08)' }}>
          <Typography variant="h6" fontWeight={800} sx={{ color: 'text.primary' }}>{title || 'Payment Successful'}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{message || 'Thanks for your generous donation!'}</Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

/* ---------------------------------------------------
   ITEM CARD
---------------------------------------------------- */
const ItemCard = ({ icon, title, subtitle, value, placeholder, onChange }) => (
  <Card sx={{ borderRadius: 4, boxShadow: "0 12px 24px rgba(15,30,60,0.12)", bgcolor: 'background.paper' }}>
    <CardContent>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            mx: "auto",
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "secondary.main",
            color: 'secondary.contrastText',
          }}
        >
          <span style={{ fontSize: 30 }}>{icon}</span>
        </Box>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>{title}</Typography>
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{subtitle}</Typography>
      </Box>

      <TextField
        type="number"
        fullWidth
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        inputProps={{ min: 0 }}
      />
    </CardContent>
  </Card>
);

export default DonationPage;
