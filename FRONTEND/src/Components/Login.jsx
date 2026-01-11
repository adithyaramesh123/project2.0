import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "./Uploads/image.jpg";

const Login = () => {
  const [input, setInput] = useState({});
  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate(); // ✅ correct usage

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const addHandler = () => {
    axios
      .post(`${baseurl}/api/login`, input)
      .then((res) => {
        console.log(res.data);

        // save role
        if (res.data?.user?.role) {
          sessionStorage.setItem("role", res.data.user.role);
          window.dispatchEvent(new Event('roleChanged'));
        }

        if (res.status === 200) {
          alert(res.data.message); // ✅ only once

          if (res.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/donate1");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please check your credentials.");
      });

    console.log("Clicked");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
       
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Box
        sx={{
          width: { xs: 350, sm: 400 },
          padding: "40px 32px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            borderRadius: "20px",
            zIndex: -1,
          },
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            bgcolor: "rgba(255,255,255,0.2)",
            fontSize: "2rem",
          }}
        >
          👤
        </Avatar>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.5px",
            marginBottom: "8px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "rgba(255,255,255,0.8)",
            marginBottom: 4,
            fontSize: "16px",
          }}
        >
          Login to your account
        </Typography>

        <TextField
          fullWidth
          label="Email address"
          variant="outlined"
          margin="normal"
          name="ename"
          onChange={inputHandler}
          sx={{
            marginBottom: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
            "& .MuiInputBase-input": { color: "#fff" },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          name="password"
          type="password"
          onChange={inputHandler}
          sx={{
            marginBottom: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
            "& .MuiInputBase-input": { color: "#fff" },
          }}
        />

        <div
          style={{
            textAlign: "right",
            marginBottom: "24px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              textDecoration: "none",
              fontWeight: 500,
              "&:hover": { color: "#fff" },
            }}
          >
            Forgot password?
          </Link>
        </div>

        <Button
          onClick={addHandler}
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            marginTop: 1,
            fontWeight: "600",
            padding: "12px",
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
            },
          }}
        >
          Continue
        </Button>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            marginTop: 3,
            fontSize: "14px",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/s"
            style={{
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Signup
          </Link>
        </Typography>

        <div style={{ marginTop: 16 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Organization? <Link to="/org/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Login here</Link>
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default Login;
