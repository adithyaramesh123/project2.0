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
  IconButton,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Users,
  Zap,
  Globe,
  Droplet,
  BookOpen,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";
import { useRef, memo } from "react";

// --- Components ---

const GlowBlob = memo(({ color, size, top, left, blur = "100px", opacity = 0.4, delay = 0 }) =>
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [opacity, opacity * 0.8, opacity],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
    style={{
      position: "absolute",
      top: top,
      left: left,
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      filter: `blur(${blur})`,
      zIndex: 0,
    }}
  />
);

const FeatureCard = memo(({ icon: Icon, title, desc, delay }) =>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <Box
      sx={{
        p: 3,
        height: '100%',
        bgcolor: 'background.paper',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'background.paper',
          transform: 'translateY(-5px)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
        }
      }}
    >
      <Box sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        color: 'primary.contrastText'
      }}>
        <Icon size={24} />
      </Box>
      <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', mb: 1 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{desc}</Typography>
    </Box>
  </motion.div>
);

const StatItem = memo(({ label, value, icon: Icon }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h3" fontWeight="900" sx={{
      background: 'linear-gradient(to right, text.primary, text.secondary)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: 0.5
    }}>
      {value}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'primary.main' }}>
      <Icon size={16} />
      <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
        {label}
      </Typography>
    </Box>
  </Box>
));

export default function Home() {
  const containerRef = useRef(null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', overflow: 'hidden', position: 'relative' }} ref={containerRef}>

      {/* Background Ambience */}
      <GlowBlob color="#22c55e" size="600px" top="-200px" left="-100px" opacity={0.15} />
      <GlowBlob color="#3b82f6" size="500px" top="10%" left="60%" opacity={0.1} delay={2} />
      <GlowBlob color="#22c55e" size="400px" top="40%" left="-10%" opacity={0.1} delay={4} />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 20, pb: 12, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Chip
                label="✨ Making a Global Impact"
                sx={{
                  bgcolor: 'rgba(34, 197, 94, 0.15)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  mb: 3,
                  fontWeight: 600
                }}
              />
              <Typography variant="h1" sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                color: 'text.primary',
                fontSize: { xs: '3rem', md: '5rem' },
                lineHeight: 1.1,
                mb: 3,
                letterSpacing: '-2px'
              }}>
                Empowering Lives,<br />
                <span style={{
                  backgroundImage: 'linear-gradient(to right, #22c55e, #16a34a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Creating Future.</span>
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5, maxWidth: '600px', lineHeight: 1.6, fontWeight: 300 }}>
                We bridge the gap for communities in need. Join us in providing clean water, education, and healthcare to over <span style={{ color: 'text.primary', fontWeight: 600 }}>95 communities worldwide</span>.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/L"
                  variant="contained"
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    bgcolor: '#22c55e',
                    color: 'black',
                    borderRadius: '50px',
                    px: 4,
                    py: 2,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#16a34a',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
                    }
                  }}
                >
                  Start Donating
                </Button>
                <Button
                  onClick={() => scrollToSection("impact")}
                  sx={{
                    color: 'text.primary',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50px',
                    px: 4,
                    py: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'background.paper',
                      borderColor: 'text.primary'
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1740&auto=format&fit=crop"
                  sx={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover',
                    borderRadius: '30px',
                    boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
                    transform: 'rotate(2deg)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
              </motion.div>
              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  bottom: 40,
                  left: -40,
                }}
              >
                <Box sx={{
                  bgcolor: 'background.paper',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  p: 3,
                  borderRadius: '20px',
                  width: '260px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box sx={{ p: 1, bgcolor: 'primary.main', borderRadius: '12px', color: 'primary.contrastText' }}>
                      <Globe size={20} />
                    </Box>
                    <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>Global Reach</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Expanding our network to 5 new countries this year.
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.paper' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} md={3}><StatItem label="Lives Impacted" value="12k+" icon={Heart} /></Grid>
            <Grid item xs={6} md={3}><StatItem label="Volunteers" value="250+" icon={Users} /></Grid>
            <Grid item xs={6} md={3}><StatItem label="Communities" value="95" icon={Globe} /></Grid>
            <Grid item xs={6} md={3}><StatItem label="Projects" value="40+" icon={Zap} /></Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission / Features Grid */}
      <Container maxWidth="lg" sx={{ py: 15, position: 'relative', zIndex: 1 }} id="mission">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '2px' }}>OUR MISSION</Typography>
          <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 900, mt: 1 }}>Transforming the World</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={Droplet}
              title="Clean Water"
              desc="Providing sustainable clean water solutions to prevent disease and improve health in remote villages."
              delay={0}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={BookOpen}
              title="Education"
              desc="Building schools and providing learning materials to ensure every child has a chance to dream."
              delay={0.2}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={ShieldCheck}
              title="Healthcare"
              desc="Delivering medical supplies and mobile clinics to areas with limited access to modern healthcare."
              delay={0.4}
            />
          </Grid>
        </Grid>
      </Container>


      {/* Stories Carousel Section (Visual Representation) */}
      <Box sx={{ py: 15, position: 'relative', overflow: 'hidden' }} id="impact">
        <GlowBlob color="#3b82f6" size="800px" top="20%" right="-400px" opacity={0.08} />

        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 900, mb: 6, textAlign: 'center' }}>
            Stories of <span style={{ color: 'primary.main' }}>Hope</span>
          </Typography>

          <Grid container spacing={4}>
            {[
              { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1740&auto=format&fit=crop", title: "The Gift of Education", loc: "Kenya" },
              { img: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?q=80&w=1626&auto=format&fit=crop", title: "Clean Water Project", loc: "India" },
              { img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1740&auto=format&fit=crop", title: "Medical Relief", loc: "Syria" }
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{
                    position: 'relative',
                    height: '320px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    group: 'hover'
                  }}>
                    <Box component="img" src={item.img} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                      p: 4,
                      pt: 10
                    }}>
                      <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700 }}>{item.loc}</Typography>
                      <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 800 }}>{item.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', mt: 1, gap: 1, opacity: 0.8 }}>
                        <Typography variant="body2">Read Story</Typography>
                        <ArrowUpRight size={16} />
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }} id="get-involved">
        <Box sx={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
          borderRadius: '40px',
          p: { xs: 4, md: 10 },
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <GlowBlob color="#22c55e" size="300px" top="-50%" left="50%" opacity={0.2} />

          <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 900, mb: 3 }}>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5, maxWidth: '600px', mx: 'auto' }}>
            Your contribution goes directly to the field. Join thousands of donors worldwide.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/L"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'black',
                borderRadius: '50px',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { bgcolor: '#f0f0f0', transform: 'scale(1.05)' }
              }}
            >
              Donate Now
            </Button>
            <Button
              component={Link}
              to="/c"
              variant="outlined"
              size="large"
              sx={{
                color: 'text.primary',
                borderColor: 'rgba(255,255,255,0.3)',
                borderRadius: '50px',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { bgcolor: 'background.paper', borderColor: 'text.primary' }
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer (Simplified for modern look) */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Heart size={24} color="#22c55e" fill="#22c55e" />
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 800 }}>CHANGING LIVES</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                © 2025 Changing Lives Foundation.<br />All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 4, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Typography component={Link} to="/about" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>About</Typography>
              <Typography component={Link} to="/c" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>Contact</Typography>
              <Typography component={Link} to="/privacy" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>Privacy</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
}