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
    alert("Message Sent ✅"); // For now just alert
    console.log(formData);
  };

  return (
    <div style={styles.container}>
      {/* Left side - Text & Social */}
      <div style={styles.left}>
        <h1 style={{ marginBottom: "10px" }}>Get in Touch</h1>
        <p>I’d like to hear from you!</p>
        <p>
          If you have any inquiries or just want to say hi, please use the
          contact form.
        </p>

        <p style={{ marginTop: "20px" }}>
          📧 <a href="mailto:youremail@example.com">youremail@example.com</a>
        </p>

        <div style={styles.social}>
          <a href="#">🌐</a>
          <a href="#">📘</a>
          <a href="#">📸</a>
          <a href="#">🔗</a>
        </div>
      </div>

      {/* Right side - Form */}
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
            style={styles.input}
          />

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    background: "#6dce6aff",
  },
  left: {
    flex: 1,
    marginRight: "50px",
  },
  right: {
    flex: 1,
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
    marginBottom: "10px",
    border: "1px solid #cf1f1fff",
    borderRadius: "4px",
  },
  textarea: {
    padding: "10px",
    height: "100px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    background: "#b45309",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  social: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
    fontSize: "20px",
  },
};

export default Contactt