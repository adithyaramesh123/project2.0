// src/pages/DonationPage.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51YourActualPublishableKeyHere123...");

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

      alert("Thank you! Your item donation is received.");

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
        background: "linear-gradient(135deg, #e0f2ff, #f6fbff)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          bgcolor: "rgba(255,255,255,0.9)",
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
            color: "#12325a",
          }}
        >
          Support Our Cause
        </Typography>

        <Typography sx={{ mb: 4, color: "#51637b" }}>
          Choose how you'd like to help — money or needed items.
        </Typography>

        <Grid container spacing={3}>
          {/* MONEY CARD */}
          <Grid item xs={12} md={4}>
            <Elements stripe={stripePromise}>
              <MoneyCard
                amount={form.money}
                onChangeAmount={(v) =>
                  setForm((prev) => ({ ...prev, money: v }))
                }
              />
            </Elements>
          </Grid>

          {/* DYNAMIC ITEMS */}
          {adminItems.map((item) => (
            <Grid item xs={12} md={4} key={item._id}>
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
            sx={{ mb: 2, color: "#12325a", fontWeight: 600 }}
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
    </Box>
  );
};

/* ---------------------------------------------------
   MONEY DONATION CARD
---------------------------------------------------- */
const MoneyCard = ({ amount, onChangeAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleMoneySubmit = async () => {
    if (!stripe || !elements) return;

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    setLoading(true);

    const cardEl = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardEl,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/donations/money", {
        amount: Number(amount),
        userId: "testUser",
        stripeToken: paymentMethod.id,
      });

      if (res.data.success) {
        alert("Thank you for your donation!");
        onChangeAmount("");
        cardEl.clear();
      } else {
        alert("Payment failed.");
      }
    } catch (e) {
      alert("Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ borderRadius: 4, boxShadow: "0 12px 24px rgba(15,30,60,0.12)" }}>
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
              background: "radial-gradient(circle, #fffde7, #ffe082)",
            }}
          >
            <span style={{ fontSize: 30 }}>💵</span>
          </Box>
          <Typography variant="h6">Money Donation</Typography>
        </Box>

        <TextField
          type="number"
          fullWidth
          value={amount ?? ""}
          placeholder="500"
          onChange={(e) => onChangeAmount(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: "1px solid #dde3ee",
            mb: 2,
          }}
        >
          <CardElement />
        </Box>

        <Button variant="contained" fullWidth disabled={loading} onClick={handleMoneySubmit}>
          {loading ? "Processing…" : "Donate Money"}
        </Button>
      </CardContent>
    </Card>
  );
};

/* ---------------------------------------------------
   ITEM CARD
---------------------------------------------------- */
const ItemCard = ({ icon, title, subtitle, value, placeholder, onChange }) => (
  <Card sx={{ borderRadius: 4, boxShadow: "0 12px 24px rgba(15,30,60,0.12)" }}>
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
            background: "radial-gradient(circle, #e3f2fd, #bbdefb)",
          }}
        >
          <span style={{ fontSize: 30 }}>{icon}</span>
        </Box>
        <Typography variant="h6">{title}</Typography>
        <Typography sx={{ fontSize: 13, color: "#6b7a90" }}>{subtitle}</Typography>
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
