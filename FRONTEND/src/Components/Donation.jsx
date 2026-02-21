import React, { useState } from 'react';
import {
	Box,
	Container,
	Grid,
	Typography,
	TextField,
	Button,
	Paper,
	Avatar,
	useTheme,
	Chip,
	InputAdornment
} from '@mui/material';
import { motion } from "framer-motion";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Donation() {
	const muiTheme = useTheme();
	const isDarkMode = muiTheme.palette.mode === 'dark';

	const initial = {
		money: '',
		sanitary: 0,
		clothes: 0,
		food: 0,
		drinks: 0,
		stationary: 0,
		notes: ''
	};

	const [form, setForm] = useState(initial);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleNumberChange = (e) => {
		const { name, value } = e.target;
		const v = Math.max(0, Number(value || 0));
		setForm(prev => ({ ...prev, [name]: v }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const any = (Number(form.money) > 0) || (Number(form.sanitary) > 0) || (Number(form.clothes) > 0) || (Number(form.food) > 0) || (Number(form.drinks) > 0) || (Number(form.stationary) > 0);
		if (!any) {
			setError('Please add at least one donation (amount or items).');
			return;
		}
		setError('');
		setSubmitted(true);
		setTimeout(() => {
			setForm(initial);
			setSubmitted(false);
		}, 3000);
	};

	const glassSx = {
		p: 3,
		borderRadius: 4,
		background: isDarkMode ? 'rgba(30,30,30,0.4)' : 'rgba(255,255,255,0.8)',
		backdropFilter: 'blur(10px)',
		border: '1px solid rgba(255,255,255,0.1)',
		transition: 'all 0.3s ease',
		'&:hover': { transform: 'translateY(-5px)', boxShadow: isDarkMode ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.05)' }
	};

	const items = [
		{ name: 'sanitary', label: 'Sanitary Kits', icon: '🧼', color: '#10b981' },
		{ name: 'clothes', label: 'Clothes', icon: '👕', color: '#3b82f6' },
		{ name: 'food', label: 'Food Packs', icon: '🍲', color: '#f59e0b' },
		{ name: 'drinks', label: 'Drinks', icon: '🥤', color: '#6366f1' },
		{ name: 'stationary', label: 'Stationary', icon: '✏️', color: '#ec4899' },
	];

	return (
		<Box sx={{
			bgcolor: isDarkMode ? '#0a0a0a' : '#f0fdf4',
			minHeight: '100vh',
			py: 12,
			background: isDarkMode
				? 'radial-gradient(circle at 100% 100%, #111 0%, #050505 100%)'
				: 'radial-gradient(circle at 100% 100%, #e0f2fe 0%, #f0fdf4 100%)'
		}}>
			<Container maxWidth="lg">
				<Box textAlign="center" mb={10}>
					<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<Chip label="Make a Global Impact" sx={{ mb: 2, fontWeight: 700, bgcolor: 'primary.main', color: 'white' }} />
						<Typography variant="h2" fontWeight="900" sx={{ mb: 2, letterSpacing: '-2px' }}>
							Support Our <span style={{ color: '#10b981' }}>Cause</span>
						</Typography>
						<Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
							Choose how you'd like to help. Whether it's a monetary contribution or essential supplies, your generosity changes lives.
						</Typography>
					</motion.div>
				</Box>

				<form onSubmit={handleSubmit}>
					<Grid container spacing={4}>
						{/* Money Support */}
						<Grid size={{ xs: 12, md: 4 }}>
							<Paper sx={{ ...glassSx, borderTop: '4px solid #10b981', height: '100%' }}>
								<Avatar sx={{ bgcolor: '#10b98120', color: '#10b981', mb: 2 }}>
									<AttachMoneyIcon />
								</Avatar>
								<Typography variant="h5" fontWeight="800" gutterBottom>Monetary Support</Typography>
								<Typography variant="body2" color="text.secondary" mb={3}>Enter an amount in INR to support our operations.</Typography>
								<TextField
									fullWidth
									name="money"
									type="number"
									label="Amount (₹)"
									value={form.money}
									onChange={handleChange}
									placeholder="e.g. 500"
									InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
								/>
							</Paper>
						</Grid>

						{/* Items Grid */}
						<Grid size={{ xs: 12, md: 8 }}>
							<Grid container spacing={2}>
								{items.map((item, i) => (
									<Grid size={{ xs: 12, sm: 4 }} key={item.name}>
										<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
											<Paper sx={{ ...glassSx, p: 2, textAlign: 'center' }}>
												<Typography fontSize="2rem" mb={1}>{item.icon}</Typography>
												<Typography variant="subtitle1" fontWeight="800">{item.label}</Typography>
												<TextField
													type="number"
													name={item.name}
													value={form[item.name]}
													onChange={handleNumberChange}
													size="small"
													sx={{ mt: 1, width: '100px' }}
												/>
											</Paper>
										</motion.div>
									</Grid>
								))}
							</Grid>
						</Grid>

						{/* Notes & Submit */}
						<Grid size={{ xs: 12 }}>
							<Paper sx={{ ...glassSx, mt: 4 }}>
								<Grid container spacing={4} alignItems="center">
									<Grid size={{ xs: 12, md: 8 }}>
										<TextField
											fullWidth
											multiline
											rows={3}
											name="notes"
											label="Pickup Address & Preferences"
											value={form.notes}
											onChange={handleChange}
											placeholder="Tell us where to pick up the items or any special instructions..."
										/>
									</Grid>
									<Grid size={{ xs: 12, md: 4 }}>
										{error && <Typography color="error" variant="caption" display="block" mb={1}>{error}</Typography>}
										<Button
											fullWidth
											size="large"
											variant="contained"
											type="submit"
											sx={{ py: 2, borderRadius: 3, fontWeight: 900, bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
										>
											Complete Donation
										</Button>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</form>

				{submitted && (
					<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
						<Box sx={{
							position: 'fixed', bottom: 40, right: 40, zIndex: 100,
							bgcolor: '#10b981', color: 'white', p: 3, borderRadius: 4,
							display: 'flex', alignItems: 'center', gap: 2,
							boxShadow: '0 20px 50px rgba(16,185,129,0.3)'
						}}>
							<CheckCircleIcon />
							<Box>
								<Typography fontWeight="800">Donation Recorded!</Typography>
								<Typography variant="caption">Thank you for your incredible support.</Typography>
							</Box>
						</Box>
					</motion.div>
				)}
			</Container>
		</Box>
	);
}
