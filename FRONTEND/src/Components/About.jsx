import React from 'react';

const About = () => {
  return (
    <div className="about-us-container">
      <h1>Hello! Welcome to Our Story.</h1>
      <p>
        At Changing Lives One Step at a Time, we believe that no one should suffer in silence for the lack of life’s most basic needs—food, clothing, sanitation, and dignity.

        We are a community-driven NGO on a mission to bring hope, relief, and lasting change to those who need it most. Whether it's a warm meal, clean clothes, or essential sanitary products, we strive to fill the gaps that poverty and crisis leave behind.

        Every donation, no matter how small, helps us take one more step toward restoring humanity, rebuilding lives, and rewriting stories. With compassion as our guide and action as our promise, we are here to remind the world that kindness still exists—and that even the smallest gesture can change everything.

         Join us as we move forward, one step, one life, and one act of love at a time
      </p>
      
      <p>
        Thank you for being a part of our story. We're excited to see what we can achieve together!
      </p>
    </div>
    
  );
};

export default About

// src/components/Aboutus.jsfff



// Define the styles as a JavaScript object
const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
    textAlign: 'center'
  },
  heading: {
    fontSize: '2.5em',
    color: '#0056b3'
  },
  paragraph: {
    fontSize: '1.1em',
    marginBottom: '20px'
  }
};
