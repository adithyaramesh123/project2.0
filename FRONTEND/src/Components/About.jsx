import React, { useEffect, useState } from "react";

const About = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // small mount delay to trigger entrance animations
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`about-root ${mounted ? "entered" : ""}`} aria-labelledby="about-heading">
      <style>{`
        /* Basic reset for this component only */
        .about-root { font-family: "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif; }
        .about-wrap {
          max-width: 1000px;
          margin: 36px auto;
          padding: 28px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          color: #112;
          background: linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.42));
          box-shadow: 0 10px 30px rgba(17,24,39,0.12);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.5);
        }

        /* Playful header */
        .hero {
          display: flex;
          gap: 18px;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .hero-left { flex: 1; min-width: 0; }
        .title {
          font-size: 2rem;
          margin: 0 0 6px 0;
          color: #2b2e6a;
          letter-spacing: -0.5px;
        }
        .subtitle {
          margin: 0;
          color: #233;
          opacity: 0.95;
          font-size: 1rem;
          line-height: 1.45;
        }
        .wave {
          display: inline-block;
          transform-origin: 70% 70%;
          font-size: 1.8rem;
        }

        /* Cards row */
        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 18px;
        }
        .card {
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(245,250,255,0.85));
          padding: 14px;
          border-radius: 12px;
          text-align: center;
          transition: transform 240ms cubic-bezier(.2,.9,.3,1), box-shadow 240ms;
          box-shadow: 0 6px 16px rgba(37,47,89,0.06);
        }
        .card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 18px 36px rgba(30,40,90,0.12);
        }
        .card-img { width:64px; height:64px; border-radius:10px; object-fit:cover; margin: 0 auto 10px; display: block; }
        .card-title { font-weight: 700; color: #233; margin-bottom: 8px; }
        .card-text { font-size: 0.98rem; color: #344; line-height: 1.5; }

        /* Team row */
        .team {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        .avatar {
          width: 62px;
          height: 62px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #fff, #f7fbff);
          box-shadow: 0 8px 20px rgba(28,40,80,0.08);
          border: 1px solid rgba(0,0,0,0.04);
          transition: transform 280ms ease;
          overflow: hidden;
        }
        .avatar:hover { transform: translateY(-6px) rotate(-3deg); }
        .avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* CTA */
        .cta {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .btn {
          background: linear-gradient(90deg,#ff8a65,#ffb86b);
          padding: 10px 14px;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(255,136,101,0.18);
          transition: transform 200ms ease, box-shadow 200ms;
        }
        .btn:active { transform: translateY(2px); box-shadow: 0 6px 14px rgba(255,136,101,0.12); }

        /* Background bubbles */
        .bubble {
          position: absolute;
          border-radius: 50%;
          filter: blur(24px);
          opacity: 0.16;
          transform: translateZ(0);
        }
        .b1 { width: 220px; height: 220px; right: -60px; top: -40px; background: #ffd3b3; }
        .b2 { width: 160px; height: 160px; left: -40px; bottom: -40px; background: #d7f6ff; }
        .b3 { width: 120px; height: 120px; right: 40px; bottom: 20px; background: #d6ffd9; }

        /* entrance animations */
        .about-root .about-wrap { transform: translateY(18px) scale(.995); opacity: 0; transition: all 700ms cubic-bezier(.18,.9,.3,1); }
        .about-root.entered .about-wrap { transform: translateY(0) scale(1); opacity: 1; }

        .title, .subtitle, .cards .card, .team, .btn {
          opacity: 0;
          transform: translateY(8px);
        }
        .about-root.entered .title { animation: fadeUp .6s 140ms both; }
        .about-root.entered .subtitle { animation: fadeUp .6s 220ms both; }
        .about-root.entered .cards .card:nth-child(1) { animation: pop .6s 320ms both; }
        .about-root.entered .cards .card:nth-child(2) { animation: pop .6s 380ms both; }
        .about-root.entered .cards .card:nth-child(3) { animation: pop .6s 440ms both; }
        .about-root.entered .team { animation: fadeUp .6s 520ms both; }
        .about-root.entered .btn { animation: pop .5s 620ms both; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { opacity: 0; transform: translateY(12px) scale(.98); }
          60% { transform: translateY(-6px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); }
        }

        /* wave animation */
        .wave { display:inline-block; animation: wave 1.8s infinite; }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(14deg); }
          30% { transform: rotate(-8deg); }
          40% { transform: rotate(14deg); }
          50% { transform: rotate(-4deg); }
          100% { transform: rotate(0deg); }
        }

        /* floating bubbles subtle move */
        .b1, .b2, .b3 { animation: floaty 8s ease-in-out infinite; }
        .b2 { animation-duration: 10s; }
        .b3 { animation-duration: 12s; }
        @keyframes floaty {
          0% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-18px) translateX(6px) scale(1.03); }
          100% { transform: translateY(0) translateX(0) scale(1); }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .about-root .about-wrap,
          .about-root .title, .about-root .subtitle, .about-root .cards .card,
          .about-root .team, .about-root .btn, .b1, .b2, .b3, .wave {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Responsive */
        @media (max-width: 820px) {
          .cards { grid-template-columns: 1fr; }
          .hero { flex-direction: column; align-items: flex-start; gap: 12px; }
          .cta { margin-left: 0; width: 100%; justify-content: space-between; }
        }
      `}</style>

      <div className="about-wrap" role="region" aria-label="About us content">
        <div className="bubble b1" aria-hidden="true" />
        <div className="bubble b2" aria-hidden="true" />
        <div className="bubble b3" aria-hidden="true" />

        <header className="hero">
          <div className="hero-left">
            <h1 id="about-heading" className="title">
              Hello! Welcome to Our Story <span className="wave" aria-hidden="true">👋</span>
            </h1>
            <p className="subtitle">
              We are a student-driven community dedicated to creating measurable, positive change.
              Through coordinated small acts—like meal distributions, warmth and hygiene outreach,
              and peer mentoring—we build supportive networks that uplift students and families.
              Our efforts are practical, recurring, and guided by empathy and accountability.
            </p>
          </div>

          <div className="cta" role="group" aria-label="Call to action">
            <button
              className="btn"
              onClick={() => {
                // Navigate to join page or a sign-up route
                // lightweight client-only demo action
                window.location.href = "/join";
              }}
            >
              Join Us
            </button>
          </div>
        </header>

        <section className="cards" aria-label="Our focus areas">
          <article className="card" aria-labelledby="card-1-title">
            <img
              className="card-img"
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7c2b6a1f9c3b6d7b7f3a0d8b2a9f4c5a"
              alt="Warm meals being served at a community kitchen"
              loading="lazy"
            />
            <h3 id="card-1-title" className="card-title">Food & Care</h3>
            <p className="card-text">
              We organize regular meal programs, pop-up community kitchens, and coordinated food drives.
              Students lead meal planning, logistics, and respectful distribution so that neighbors receive nutritious,
              dignified support when they need it most.
            </p>
          </article>

          <article className="card" aria-labelledby="card-2-title">
            <img
              className="card-img"
              src="https://images.unsplash.com/photo-1581579185128-0b1b9ecb4f33?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=2f3a8d6b6b1c2e8d9a0b1c3d4e5f6a7b"
              alt="Hygiene kits with soap and essentials"
              loading="lazy"
            />
            <h3 id="card-2-title" className="card-title">Hygiene & Dignity</h3>
            <p className="card-text">
              Distribution of hygiene kits, access to showers and laundry information, and awareness campaigns
              preserve dignity and health. We partner with local clinics and student volunteers to provide
              practical, compassionate resources.
            </p>
          </article>

          <article className="card" aria-labelledby="card-3-title">
            <img
              className="card-img"
              src="https://images.unsplash.com/photo-1532074205216-d0e1f7c0b5b6?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=9e8b7a6c5d4c3b2a1f0e9d8c7b6a5f4a"
              alt="People joining hands in community support"
              loading="lazy"
            />
            <h3 id="card-3-title" className="card-title">Community & Support</h3>
            <p className="card-text">
              Mentoring, peer-support groups, and small emergency grants help students stay in school and thrive.
              We focus on building long-term relationships that connect people to services, mentors, and each other.
            </p>
          </article>
        </section>
      </div>
    </section>
  );
  
};

export default About;