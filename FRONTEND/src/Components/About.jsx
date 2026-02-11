import React from "react";

// /C:/FSD/project2.0/FRONTEND/src/Components/About.jsx

/**
 * About.jsx
 * Simple "About Us" page with a full-bleed background image and readable overlay.
 * - Replace BACKGROUND_URL with a local import if you have an image in your project:
 *     import bg from '../assets/about-bg.jpg';
 *   then set backgroundImage: `url(${bg})`
 */

const BACKGROUND_URL =
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80";

const styles = {
    page: {
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.55)), url(${BACKGROUND_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "48px 16px",
        boxSizing: "border-box",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    },
    card: {
        maxWidth: 1000,
        width: "100%",
        background: "rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: 28,
        boxShadow: "0 8px 30px rgba(2,6,23,0.6)",
        backdropFilter: "blur(6px)",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 18,
    },
    title: {
        fontSize: 28,
        margin: 0,
        fontWeight: 700,
        letterSpacing: -0.2,
    },
    subtitle: {
        margin: 0,
        color: "rgba(255,255,255,0.85)",
        fontSize: 14,
    },
    body: {
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
    },
    left: {
        flex: "1 1 320px",
        minWidth: 260,
    },
    right: {
        flex: "1 1 320px",
        minWidth: 260,
    },
    sectionTitle: {
        color: "#fff",
        fontWeight: 600,
        marginBottom: 8,
        fontSize: 18,
    },
    paragraph: {
        color: "rgba(255,255,255,0.9)",
        lineHeight: 1.6,
        marginBottom: 12,
        fontSize: 15,
    },
    statsRow: {
        display: "flex",
        gap: 12,
        marginTop: 12,
        flexWrap: "wrap",
    },
    stat: {
        background: "rgba(255,255,255,0.06)",
        padding: "8px 12px",
        borderRadius: 8,
        fontWeight: 700,
        color: "#fff",
        fontSize: 14,
    },
    teamList: {
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        marginTop: 8,
    },
    member: {
        display: "flex",
        gap: 12,
        alignItems: "center",
        background: "rgba(255,255,255,0.03)",
        padding: 10,
        borderRadius: 10,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 15,
        flexShrink: 0,
    },
    memberInfo: {
        display: "flex",
        flexDirection: "column",
        lineHeight: 1,
    },
    name: {
        fontWeight: 700,
        fontSize: 14,
    },
    role: {
        fontSize: 12,
        color: "rgba(255,255,255,0.78)",
    },
    cta: {
        marginTop: 18,
        display: "inline-block",
        background: "#fff",
        color: "#0a0a0a",
        padding: "10px 14px",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 700,
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    },
    footerNote: {
        marginTop: 12,
        color: "rgba(255,255,255,0.7)",
        fontSize: 13,
    },
};

export default function About() {
    return (
        <main style={styles.page}>
            <section style={styles.card} aria-labelledby="about-heading">
                <header style={styles.header}>
                    <div>
                        <h1 id="about-heading" style={styles.title}>
                            About Us
                        </h1>
                        <p style={styles.subtitle}><strong>Change In Lives</strong></p>
                    </div>
                </header>

                <div style={styles.body}>
                    <div style={styles.left}>
                        <h2 style={styles.sectionTitle}>Who we are</h2>
                        <p style={styles.paragraph}>
            Changing Lives, we believe that a simple act of kindness can spark a lifetime of hope. Every child deserves a warm meal, every family deserves dignity, and every struggling soul deserves to feel seen, cared for, and valued.

That’s why we dedicate our hearts and hands to feeding hungry children, supporting poor families, and bringing light to those living through dark times. What began as a small effort to help a few has grown into a family of volunteers and supporters who share one dream—to change lives, one meal and one moment at a time.

Every plate of food we serve carries more than nourishment; it carries love, compassion, and the message that someone cares.
Every donation we receive becomes a lifeline for a child or family with nowhere else to turn.

                        </p>

                        <h3 style={styles.sectionTitle}></h3>
                        <p style={styles.paragraph}>
                          
But we cannot do this alone.
We need you.

Your generosity keeps a child from going to sleep hungry.
Your support gives a mother hope.
Your kindness creates real change.

Together, we can brighten futures, restore dignity, and touch hearts.
Join Change In Lives—and become the hope someone is praying for.  
                        </p>

                        <div style={styles.statsRow}>
                            <div style={styles.stat}>10k+ users</div>
                            <div style={styles.stat}>99.9% uptime</div>
                            <div style={styles.stat}>Open source friendly</div>
                        </div>

                        <a href="/c" style={styles.cta}>
                            Contact us
                        </a>

                        <p style={styles.footerNote}>
                            Being the change you wish to see in the world!.
                            </p>
                    </div>

                    <aside style={styles.right}>
                        <h2 style={styles.sectionTitle}>Our Team </h2>
                        <div style={styles.teamList}>
                            <div style={styles.member}>
                                <div style={styles.avatar}>A</div>
                                <div style={styles.memberInfo}>
                                    <span style={styles.name}>Adithya</span>
                                    <span style={styles.role}></span>
                                </div>
                            </div>

                            <div style={styles.member}>
                                <div style={styles.avatar}>A</div>
                                <div style={styles.memberInfo}>
                                    <span style={styles.name}>Anagha</span>
                                    <span style={styles.role}></span>
                                </div>
                            </div>

                            <div style={styles.member}>
                                <div style={styles.avatar}>M</div>
                                <div style={styles.memberInfo}>
                                    <span style={styles.name}>Manasa</span>
                                    <span style={styles.role}></span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}