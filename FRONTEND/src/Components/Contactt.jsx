import React, { useState } from "react";

function Contactt() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent ✅");
    console.log(formData);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          {/* Left - Text and Info */}
          <div style={styles.left}>
            <h1 style={styles.title}>Get in Touch</h1>
            <p style={styles.paragraph}>I'd love to hear from you!</p>
            <p style={styles.paragraph}>
              Whether you have a question or just want to say hi, feel free to drop a message.
            </p>
            <p style={styles.email}>📧 <a href="mailto:youremail@example.com" style={styles.link}>youremail@example.com</a></p>

            <div style={styles.social}>
              <a href="#" style={styles.socialIcon}>🌐</a>
              <a href="#" style={styles.socialIcon}>📘</a>
              <a href="#" style={styles.socialIcon}>📸</a>
              <a href="#" style={styles.socialIcon}>🔗</a>
            </div>
          </div>

          {/* Right - Form */}
          <div style={styles.right}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.row}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                style={styles.inputFull}
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                style={styles.textarea}
              />

              <button type="submit" style={styles.button}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundImage: `url("https://media.newyorker.com/photos/6840685fa1c48a5b75175724/master/w_960,c_limit/MosabAbuToha_WhatGazaNeeds.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "60px 20px",
    minHeight: "100vh",
    color: "#fff",
  },
  container: {
    display: "flex",
    maxWidth: "1000px",
    margin: "0 auto",
    gap: "40px",
    flexWrap: "wrap",
  },
  left: {
    flex: 1,
    minWidth: "280px",
  },
  right: {
    flex: 1,
    minWidth: "280px",
    backgroundColor: "#ffffffcc",
    padding: "30px",
    borderRadius: "10px",
    color: "#000",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "2.5em",
    marginBottom: "10px",
  },
  paragraph: {
    marginBottom: "10px",
    lineHeight: "1.6",
  },
  email: {
    marginTop: "20px",
  },
  link: {
    color: "#ffd700",
    textDecoration: "none",
  },
  social: {
    display: "flex",
    gap: "15px",
    fontSize: "24px",
    marginTop: "15px",
  },
  socialIcon: {
    color: "#fff",
    textDecoration: "none",
    transition: "transform 0.2s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  inputFull: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  textarea: {
    padding: "10px",
    height: "100px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};
//hai

export default Contactt;
