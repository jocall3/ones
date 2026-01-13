import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const ForStartups = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Solutions for Startups
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
        Empowering startups with the financial tools and resources they need to scale and succeed.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Venture Capital Access
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Connect with our network of venture capitalists and angel investors to secure funding for your startup.
              </Typography>
            </CardContent>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary">
                Explore VC Opportunities
              </Button>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Scalable Banking Solutions
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Our banking platform is designed to grow with your business, offering flexible accounts and services.
              </Typography>
            </CardContent>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary">
                Learn About Banking
              </Button>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                AI-Powered Financial Tools
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Leverage our AI-driven tools for financial forecasting, risk management, and automated compliance.
              </Typography>
            </CardContent>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary">
                Discover AI Tools
              </Button>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="h6" gutterBottom>
          Ready to take your startup to the next level?
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Get Started Today
        </Button>
      </Box>
    </Container>
  );
};

export default ForStartups;