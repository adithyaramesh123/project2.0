import React from "react";
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
} from "@mui/material";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" elevation={0} sx={{ background: "#0a2a4d" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              Changing Lives
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button color="inherit">Our Mission</Button>
              <Button color="inherit">Impact</Button>
              <Button color="inherit">Solutions</Button>
              <Button color="inherit">Get Involved</Button>
             
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0a2a4d 0%, #1e3a8a 100%)",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Empowering Lives, Creating Change
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            A dedicated charity initiative by <b>Changing lives</b>, committed
            to delivering [clean water | education | food | healthcare |
            shelter] and essential support to people.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              component={Link}
              to="/s"
              variant="contained"
              sx={{ bgcolor: "#22c55e", "&:hover": { bgcolor: "#16a34a" } }}
            >
              Donate
            </Button>
            <Button 
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
            >
              Get Involved
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 5 }}>
          We strive to improve the lives of people by providing access to vital
          resources and services — creating sustainable impact and a brighter
          future for all.
        </Typography>
        <Grid container spacing={3}>
          {[
            { number: "12,000+", text: "Individuals reached" },
            { number: "95", text: "Communities served worldwide" },
            { number: "250+", text: "Volunteers powering change" },
            { number: "98%", text: "Of donations spent directly on programs" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {item.number}
                </Typography>
                <Typography>{item.text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stories of Impact */}
      <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" gutterBottom>
            Stories of Impact
          </Typography>
          <Box 
            sx={{
              bgcolor: "#22c55e",
              color: "white",
              p: 3,
              borderRadius: 2,
              textAlign: "center",
              mb: 5,
            }}
          >
            <Typography variant="body1" fontStyle="italic">
              "Because of [Organization], my children now have clean water to
              drink every day. We are healthier and more hopeful than ever
              before."
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              — [Beneficiary Name], [Community / Location]
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                title: "Clean Water Access",
                text: "Building sustainable wells and water systems for villages facing water scarcity.",
              },
              {
                title: "Healthcare Initiatives",
                text: "Delivering essential medical care, nutrition, and health education to families in need.",
              },
              {
                title: "Educational Support",
                text: "Providing learning resources and safe spaces to empower children and youth.",
              },
              {
                title: "Shelter & Relief",
                text: "Restoring dignity and security with safe housing and rapid response aid.",
              },
            ].map((card, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ height: "100%", borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2">{card.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Get Involved Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Get Involved
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Join us as a volunteer, donate to support life-changing projects, or
          partner with us to scale our mission. Together, we build brighter
          futures.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button component={Link}
          to="/about" 
            variant="contained"
            sx={{ bgcolor: "#22c58fff", "&:hover": { bgcolor: "#16a34a" } }}
          >
            ABOUT US
          </Button>
          <Button component={Link}
          to="/c" 
           variant="outlined">Contact Us
            <Link to={'/c'} style={{textDecoration:'none', color:'white'}}>
                         Contacts 
                         </Link> 
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#0a2a4d", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Changing lives
              </Typography>
              <Typography>
                Transforming lives by giving hope, dignity, and opportunity.
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Explore
              </Typography>
              <Typography>Our Mission</Typography>
              <Typography>Impact</Typography>
              <Typography>Solutions</Typography>
              <Typography>Get Involved</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Typography>Instagram</Typography>
              <Typography>Facebook</Typography>
              <Typography>Twitter</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography>Email: contact@changinglives.org</Typography>
              <Typography>Phone: (000) 123-4567</Typography>
              <Typography>123 Hope Lane, City, Country</Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" textAlign="center" sx={{ mt: 5 }}>
            © 2025 Changing lives. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
