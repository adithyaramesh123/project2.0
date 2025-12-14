import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Zap } from "lucide-react";

export default function Home() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Hero Section with Blurred Background */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px) brightness(0.4)",
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", color: "white", zIndex: 1 }}>
            <Chip
              label="✨ Making a Global Impact"
              sx={{
                bgcolor: "rgba(34, 197, 94, 0.2)",
                color: "#22c55e",
                mb: 2,
                fontSize: "0.9rem",
                backdropFilter: "blur(10px)",
              }}
            />
            <Typography
              variant="h2"
              fontWeight="900"
              sx={{ mb: 2, lineHeight: 1.2, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
            >
              Empowering Lives, Creating Lasting Change
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                fontWeight: 300,
                fontSize: "1.1rem",
                opacity: 0.9,
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Clean water, education, healthcare, and hope for communities in need worldwide
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
              <Button
                component={Link}
                to="/L"
                variant="contained"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  bgcolor: "#22c55e",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 8px 32px rgba(34,197,94,0.3)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#16a34a",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(34,197,94,0.4)",
                  },
                }}
              >
                Donate Now
              </Button>
              <Button
                onClick={() => scrollToSection("get-involved")}
                variant="outlined"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  backdropFilter: "blur(10px)",
                  border: "2px solid white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mission Section with Stats */}
      <Container id="mission" maxWidth="lg" sx={{ py: 12, mt: -20, pt: 0 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                    borderRadius: "20px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                  }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography variant="overline" sx={{ color: "#22c55e", fontWeight: 700, mb: 1 }}>
                  OUR MISSION
                </Typography>
                <Typography variant="h3" fontWeight="900" sx={{ mb: 2 }}>
                  Transforming Communities Globally
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: "#666", lineHeight: 1.8 }}>
                  We believe every person deserves access to clean water, quality education, healthcare, and dignity. Through strategic initiatives and community partnerships, we're creating sustainable impact in over 95 communities worldwide.
                </Typography>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <Grid container spacing={2}>
                  {[
                    { icon: Users, label: "12,000+", text: "Lives Reached" },
                    { icon: Zap, label: "95", text: "Communities" },
                    { icon: Heart, label: "250+", text: "Volunteers" },
                  ].map((item, i) => (
                    <Grid item xs={6} key={i}>
                      <motion.div variants={itemVariants}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            borderRadius: "12px",
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
                          }}
                        >
                          <item.icon size={28} color="#22c55e" style={{ margin: "0 auto 8px" }} />
                          <Typography fontWeight="900" sx={{ color: "#0a2a4d", mb: 0.5 }}>
                            {item.label}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            {item.text}
                          </Typography>
                        </Paper>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Impact Stories */}
      <Box id="impact" sx={{ bgcolor: "#f9fafb", py: 12 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Typography variant="overline" sx={{ color: "#22c55e", fontWeight: 700, mb: 1, display: "block", textAlign: "center" }}>
              REAL STORIES
            </Typography>
            <Typography variant="h3" textAlign="center" fontWeight="900" sx={{ mb: 6 }}>
              Stories of Transformation
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Grid container spacing={4}>
              {[
                {
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfeiCJ22rTCfkQlUs0E4xgPsaf11rz-ja6NA&s",
                  title: "Clean Water Access",
                  text: "500+ families now have access to clean, safe drinking water through our well-building initiatives.",
                },
                {
                  image: "data:image/jpeg;base64,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",
                  title: "Educational Support",
                  text: "2,000+ children receive quality education with safe learning environments and resources.",
                },
                {
                  image: "https://img.freepik.com/premium-photo/wellness-concept_672855-1586.jpg?semt=ais_hybrid&w=740&q=80",
                  title: "Healthcare Initiatives",
                  text: "Free medical camps and health education reaching underserved rural and urban communities.",
                },
                {
                  image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
                  title: "Shelter & Relief",
                  text: "Emergency aid and sustainable housing solutions for families in crisis situations.",
                },
              ].map((card, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-12px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundImage: `url('${card.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          height: "200px",
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(34,197,94,0.2))",
                          },
                        }}
                      />
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography variant="h6" fontWeight="900" sx={{ mb: 1, color: "#0a2a4d" }}>
                          {card.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                          {card.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container id="get-involved" maxWidth="lg" sx={{ py: 12, textAlign: "center" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Typography variant="overline" sx={{ color: "#22c55e", fontWeight: 700, mb: 1 }}>
            GET INVOLVED
          </Typography>
          <Typography variant="h3" fontWeight="900" sx={{ mb: 2 }}>
            Be Part of the Change
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, color: "#666", maxWidth: "600px", mx: "auto" }}>
            Whether you donate, volunteer, or partner with us, your contribution creates lasting impact on communities in need.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/L"
              variant="contained"
              sx={{
                bgcolor: "#22c55e",
                borderRadius: "50px",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { bgcolor: "#16a34a" },
              }}
            >
              Donate
            </Button>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              sx={{
                borderColor: "#0a2a4d",
                color: "#0a2a4d",
                borderRadius: "50px",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { bgcolor: "#f9fafb" },
              }}
            >
              About Us
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#0a2a4d", color: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" fontWeight="900" sx={{ mb: 1.5 }}>
                Changing Lives
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                Transforming communities through sustainable development and compassionate action.
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 1.5 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {["Our Mission", "Impact", "Get Involved", "Contact"].map((link) => (
                  <Typography key={link} variant="body2" sx={{ opacity: 0.8, cursor: "pointer", "&:hover": { opacity: 1 } }}>
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 1.5 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {["Instagram", "Facebook", "Twitter"].map((social) => (
                  <Typography key={social} variant="body2" sx={{ opacity: 0.8, cursor: "pointer", "&:hover": { opacity: 1 } }}>
                    {social}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 1.5 }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                contact@changinglives.org
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                +1 (800) 123-4567
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", pt: 3, textAlign: "center" }}>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              © 2025 Changing Lives. All rights reserved. | Privacy Policy | Terms
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}