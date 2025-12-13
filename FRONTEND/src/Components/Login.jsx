import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      }}
    >
      <Box
        sx={{
          width: 380,
          padding: "40px 32px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          textAlign: "center",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "italian",
            fontWeight: 600,
            color: "#2d3748",
            letterSpacing: "-0.5px",
            marginBottom: "24px",
          }}
        >
          Changing Lives, One Step at a Time
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#718096",
            marginBottom: 4,
            fontSize: "15px",
          }}
        >
          Login to your account
        </Typography>

        <TextField
          fullWidth
          label="Email address"
          variant="outlined"
          margin="normal"
          name="ename" // 🔍 make sure backend expects 'ename'
          onChange={inputHandler}
          sx={{
            marginBottom: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
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
            marginBottom: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
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
              color: "#4299e1",
              fontSize: "14px",
              textDecoration: "none",
              fontWeight: 500,
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
            backgroundColor: "#4299e1",
            marginTop: 1,
            fontWeight: "600",
            padding: "12px",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "15px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#3182ce",
              boxShadow: "none",
            },
          }}
        >
          Continue
        </Button>

        <Typography
          variant="body2"
          sx={{
            color: "#718096",
            marginTop: 4,
            fontSize: "14px",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#4299e1",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Signup
          </Link>
        </Typography>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            marginTop: "24px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              padding: "8px 16px",
              borderColor: "#e2e8f0",
              "&:hover": {
                borderColor: "#cbd5e0",
              },
            }}
          ></Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              padding: "8px 16px",
              borderColor: "#e2e8f0",
              "&:hover": {
                borderColor: "#cbd5e0",
              },
            }}
          ></Button>
        </div>
        <div style={{ marginTop: 12 }}>
          <Typography variant="body2" sx={{ color: '#718096' }}>
            Organization? <Link to="/org/login" style={{ color: '#4299e1', textDecoration: 'none' }}>Login here</Link>
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default Login;
