import React, { useState } from 'react';
import './Donation.css';

export default function Donation() {
	const initial = {
		money: '',
		sanitary: 0,
		clothes: 0,
		food: 0,
		drinks: 0,
		stationary: 0,
	};

	const [form, setForm] = useState(initial);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');

	function handleChange(e) {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	}

	function handleNumberChange(e) {
		const { name, value } = e.target;
		const v = Math.max(0, Number(value || 0));
		setForm(prev => ({ ...prev, [name]: v }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		// simple validation: require at least one non-empty / non-zero donation
		const any = (Number(form.money) > 0) || (Number(form.sanitary) > 0) || (Number(form.clothes) > 0) || (Number(form.food) > 0) || (Number(form.drinks) > 0);
		if (!any) {
			setError('Please add at least one donation (amount or items).');
			return;
		}
		setError('');
		// simulate submit
		setSubmitted(true);
		// reset form after a short delay so user sees the success state
		setTimeout(() => {
			setForm(initial);
		}, 600);
	}

	function resetForm() {
		setSubmitted(false);
		setError('');
		setForm(initial);
	}

	return (
		<div className="donation-page">
			<div className="donation-shimmer" />
			<div className="donation-container">
				<header className="donation-header">
					<h1>Support Our Cause</h1>
					<p className="subtitle">Choose how you'd like to help — money, sanitary kits, clothes, food, drinks, or stationary.</p>
				</header>

				<form className="donation-grid" onSubmit={handleSubmit}>
					<div className="donation-card money">
						<div className="card-icon">💵</div>
						<h3>Money</h3>
						<p>Enter an amount (INR)</p>
						<input
							name="money"
							type="number"
							min="0"
							step="1"
							value={form.money}
							onChange={handleChange}
							placeholder="e.g., 500"
						/>
					</div>

					<div className="donation-card">
						<div className="card-icon">🧼</div>
						<h3>Sanitary Kits</h3>
						<p>Number of kits</p>
						<input
							name="sanitary"
							type="number"
							min="0"
							value={form.sanitary}
							onChange={handleNumberChange}
						/>
					</div>

					<div className="donation-card">
						<div className="card-icon">👕</div>
						<h3>Clothes</h3>
						<p>Number of items</p>
						<input
							name="clothes"
							type="number"
							min="0"
							value={form.clothes}
							onChange={handleNumberChange}
						/>
					</div>

					<div className="donation-card">
						<div className="card-icon">🍲</div>
						<h3>Food Packs</h3>
						<p>Number of packs</p>
						<input
							name="food"
							type="number"
							min="0"
							value={form.food}
							onChange={handleNumberChange}
						/>
					</div>

					<div className="donation-card">
						<div className="card-icon">🥤</div>
						<h3>Drinks</h3>
						<p>Bottles / cartons</p>
						<input
							name="drinks"
							type="number"
							min="0"
							value={form.drinks}
							onChange={handleNumberChange}
						/>
					</div>
                    <div className="donation-card">
						<div className="card-icon">✏️</div>
						<h3>Stationary</h3>
						<p>Number of items</p>
						<input
							name="stationary"
							type="number"
							min="0"
							value={form.stationary}
							onChange={handleNumberChange}
						/>
					</div>

					<div className="notes-card">
						<h3>Notes / Pickup info</h3>
						<textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any notes, pickup address or preferences" />
						<div className="form-actions">
							<button type="button" className="btn ghost" onClick={resetForm}>Reset</button>
							<button type="submit" className="btn primary">Donate</button>
						</div>
						{error && <div className="form-error">{error}</div>}
					</div>
				</form>

				{submitted && (
					<div className="success-toast" role="status">
						<div className="toast-content">
							<div className="check">✓</div>
							<div>
								<h4>Thank you!</h4>
								<p>Your generous donation has been recorded. We'll contact you if pickup is required.</p>
							</div>
						</div>
						<button className="close" onClick={() => setSubmitted(false)}>Close</button>
					</div>
				)}
			</div>
		</div>
	);
}
