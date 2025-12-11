import React, { useEffect, useState } from "react";

// /C:/FSD/project2.0/FRONTEND/src/Components/Organization.jsx

/**
 * Organization.jsx
 * Simple admin UI to manage organizations and "share" donations with them.
 * - List organizations
 * - Add / Edit / Remove organizations
 * - Share donation (amount) to an organization
 * - Shows donation history
 *
 * This component is intentionally self-contained and uses localStorage
 * so it works in an empty project without an API. Replace storage calls
 * with real API requests when ready.
 */

const STORAGE_KEYS = {
    ORGS: "orgs_v1",
    HISTORY: "donation_history_v1",
};

const sampleOrgs = [
    { id: "org-1", name: "Hope Foundation", description: "Food & shelter", received: 1200 },
    { id: "org-2", name: "Green Hands", description: "Environmental projects", received: 560 },
];

function uid(prefix = "id") {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function Organization() {
    const [orgs, setOrgs] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Forms
    const [form, setForm] = useState({ name: "", description: "" });
    const [editingId, setEditingId] = useState(null);

    const [share, setShare] = useState({ orgId: "", amount: "" });
    const [error, setError] = useState("");

    // Load from localStorage or seed sample data
    useEffect(() => {
        const rawOrgs = localStorage.getItem(STORAGE_KEYS.ORGS);
        const rawHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);

        if (rawOrgs) {
            try {
                setOrgs(JSON.parse(rawOrgs));
            } catch {
                setOrgs(sampleOrgs);
            }
        } else {
            setOrgs(sampleOrgs);
            localStorage.setItem(STORAGE_KEYS.ORGS, JSON.stringify(sampleOrgs));
        }

        if (rawHistory) {
            try {
                setHistory(JSON.parse(rawHistory));
            } catch {
                setHistory([]);
            }
        } else {
            setHistory([]);
            localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
        }

        setLoading(false);
    }, []);

    // Persist orgs/history on change
    useEffect(() => {
        if (!loading) localStorage.setItem(STORAGE_KEYS.ORGS, JSON.stringify(orgs));
    }, [orgs, loading]);

    useEffect(() => {
        if (!loading) localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    }, [history, loading]);

    // CRUD: Add/Update org
    function handleAddOrUpdateOrg(e) {
        e.preventDefault();
        setError("");
        const name = form.name.trim();
        const description = form.description.trim();

        if (!name) {
            setError("Organization name is required.");
            return;
        }

        if (editingId) {
            setOrgs((prev) =>
                prev.map((o) => (o.id === editingId ? { ...o, name, description } : o))
            );
            setEditingId(null);
        } else {
            const newOrg = { id: uid("org"), name, description, received: 0 };
            setOrgs((prev) => [newOrg, ...prev]);
            setShare((s) => ({ ...s, orgId: newOrg.id }));
        }

        setForm({ name: "", description: "" });
    }

    function startEdit(org) {
        setEditingId(org.id);
        setForm({ name: org.name, description: org.description });
    }

    function removeOrg(id) {
        if (!window.confirm("Delete this organization? This will remove its data.")) return;
        setOrgs((prev) => prev.filter((o) => o.id !== id));
        setHistory((prev) => prev.filter((h) => h.orgId !== id));
        if (share.orgId === id) setShare({ orgId: "", amount: "" });
    }

    // Share donation
    function handleShare(e) {
        e.preventDefault();
        setError("");
        const orgId = share.orgId;
        const amount = parseFloat(share.amount);

        if (!orgId) {
            setError("Select an organization to share with.");
            return;
        }
        if (!amount || amount <= 0) {
            setError("Enter a positive donation amount.");
            return;
        }

        const orgExists = orgs.find((o) => o.id === orgId);
        if (!orgExists) {
            setError("Selected organization not found.");
            return;
        }

        // Update org received amount
        setOrgs((prev) =>
            prev.map((o) => (o.id === orgId ? { ...o, received: Number(o.received) + amount } : o))
        );

        // Add history entry
        const entry = {
            id: uid("don"),
            orgId,
            orgName: orgExists.name,
            amount,
            date: new Date().toISOString(),
        };
        setHistory((prev) => [entry, ...prev]);

        setShare({ orgId: "", amount: "" });
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Organization Admin — Share Donations</h2>

            <div style={styles.grid}>
                <section style={styles.card}>
                    <h3 style={styles.subtitle}>{editingId ? "Edit Organization" : "Add Organization"}</h3>
                    <form onSubmit={handleAddOrUpdateOrg} style={styles.form}>
                        <input
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            style={styles.input}
                        />
                        <input
                            placeholder="Short description"
                            value={form.description}
                            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                            style={styles.input}
                        />
                        <div style={{ display: "flex", gap: 8 }}>
                            <button type="submit" style={styles.button}>
                                {editingId ? "Update" : "Add"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setForm({ name: "", description: "" });
                                    }}
                                    style={{ ...styles.button, background: "#e0e0e0", color: "#111" }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                <section style={styles.card}>
                    <h3 style={styles.subtitle}>Share Donation</h3>
                    <form onSubmit={handleShare} style={styles.form}>
                        <select
                            value={share.orgId}
                            onChange={(e) => setShare((s) => ({ ...s, orgId: e.target.value }))}
                            style={styles.input}
                        >
                            <option value="">-- Select organization --</option>
                            {orgs.map((o) => (
                                <option key={o.id} value={o.id}>
                                    {o.name} (received ${o.received})
                                </option>
                            ))}
                        </select>
                        <input
                            placeholder="Amount (USD)"
                            value={share.amount}
                            onChange={(e) => setShare((s) => ({ ...s, amount: e.target.value }))}
                            style={styles.input}
                        />
                        <button type="submit" style={styles.button}>
                            Share
                        </button>
                    </form>
                    {error && <div style={styles.error}>{error}</div>}
                </section>
            </div>

            <section style={{ marginTop: 20 }}>
                <h3 style={styles.subtitle}>Organizations</h3>
                {orgs.length === 0 ? (
                    <div>No organizations yet.</div>
                ) : (
                    <ul style={styles.list}>
                        {orgs.map((o) => (
                            <li key={o.id} style={styles.listItem}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600 }}>{o.name}</div>
                                    <div style={{ color: "#555", fontSize: 13 }}>{o.description}</div>
                                    <div style={{ marginTop: 6, fontSize: 13 }}>Received: ${o.received}</div>
                                </div>
                                <div style={{ display: "flex", gap: 6 }}>
                                    <button onClick={() => startEdit(o)} style={styles.smallButton}>
                                        Edit
                                    </button>
                                    <button onClick={() => removeOrg(o.id)} style={styles.smallButtonDanger}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section style={{ marginTop: 20 }}>
                <h3 style={styles.subtitle}>Donation History</h3>
                {history.length === 0 ? (
                    <div>No donations shared yet.</div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Organization</th>
                                <th style={styles.th}>Amount (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((h) => (
                                <tr key={h.id}>
                                    <td style={styles.td}>{new Date(h.date).toLocaleString()}</td>
                                    <td style={styles.td}>{h.orgName}</td>
                                    <td style={styles.td}>${h.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 940,
        margin: "24px auto",
        padding: 18,
        fontFamily: "Segoe UI, Roboto, system-ui, sans-serif",
    },
    title: { margin: "0 0 12px 0" },
    grid: { display: "flex", gap: 16, alignItems: "flex-start" },
    card: {
        flex: 1,
        padding: 12,
        border: "1px solid #e6e6e6",
        borderRadius: 6,
        background: "#fff",
    },
    subtitle: { margin: "0 0 8px 0", fontSize: 18 },
    form: { display: "flex", flexDirection: "column", gap: 8 },
    input: {
        padding: "8px 10px",
        borderRadius: 4,
        border: "1px solid #ccc",
        fontSize: 14,
    },
    button: {
        padding: "8px 12px",
        background: "#0b5fff",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },
    error: { marginTop: 8, color: "#b00020" },
    list: { listStyle: "none", padding: 0, margin: 0 },
    listItem: {
        display: "flex",
        gap: 12,
        padding: "10px 12px",
        borderBottom: "1px solid #f0f0f0",
        alignItems: "center",
    },
    smallButton: {
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid #bbb",
        background: "#fff",
        cursor: "pointer",
    },
    smallButtonDanger: {
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid #e0a0a0",
        background: "#fff",
        color: "#b00020",
        cursor: "pointer",
    },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
    th: { textAlign: "left", padding: "8px 6px", borderBottom: "1px solid #ddd" },
    td: { padding: "8px 6px", borderBottom: "1px solid #f5f5f5" },
};