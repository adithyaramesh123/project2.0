import React from 'react';

const About = () => {
  const styles = {
    container: {
      padding: '40px 20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      color: 'hsla(24, 83%, 5%, 0.98)',
      textAlign: 'center',
      backgroundImage: 'url("https://tse4.mm.bing.net/th/id/OIP.duDmZi5ipMlH-Zssy7DJYQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3")', // Example image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '8px',
      boxShadow: '0 2px 10px hsla(140, 35%, 65%, 0.90)',
      backgroundColor: 'rgba(22, 26, 15, 0.18)', // fallback for overlayy
      backdropFilter: 'blur(3px)',
    },
    overlay: {
      backgroundColor: 'hsla(120, 14%, 90%, 1.00)',
      padding: '40px 20px',
      borderRadius: '8px',
    },
    heading: {
      fontSize: '2.5rem',
      color: '#a7752aff',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      marginBottom: '16px',
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Hello! Welcome to Our Story.</h1>
        <p style={styles.paragraph}>
          At <strong> <i> Changing Lives One Step at a Time</i></strong>, <i>we believe that no one should suffer in silence for the lack of life’s most basic needs—food, clothing, sanitation, and dignity.
        </i></p>
        <p style={styles.paragraph}>
          <i>We are a community-driven NGO on a mission to bring hope, relief, and lasting change to those who need it most. Whether it's a warm meal, clean clothes, or essential sanitary products, we strive to fill the gaps that poverty and crisis leave behind.
       </i></p>
        <p style={styles.paragraph}>
         <i> Every donation, no matter how small, helps us take one more step toward restoring humanity, rebuilding lives, and rewriting stories. With compassion as our guide and action as our promise, we are here to remind the world that kindness still exists—and that even the smallest gesture can change everything.
        </i></p>
        <p style={styles.paragraph}>
          <i>Join us as we move forward, one step, one life, and one act of love at a time.
        </i></p>
        <p style={styles.paragraph}>
          <i>Thank you for being a part of our story. We're excited to see what we can achieve together!
         </i></p>
      </div>
    </section>
  );
};

export default About;