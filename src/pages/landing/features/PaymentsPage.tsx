import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

const FeatureCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PaymentsPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          color="text.primary"
        >
          Unlock Seamless Payments with Our Platform
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          paragraph
        >
          Empower your business with our comprehensive suite of payment solutions.
          From secure Stripe integration to efficient money movement and streamlined
          bill pay, we have you covered.
        </Typography>

        <Grid container spacing={4} mt={5}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Stripe Integration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accept payments globally with our seamless Stripe integration.
                  Enjoy secure transactions, fraud protection, and easy setup.
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" component={Link} to="/stripe">
                Learn More
              </Button>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Effortless Money Movement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Move money quickly and securely with our robust money movement
                  capabilities. Send and receive payments with ease.
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" component={Link} to="/money-movement">
                Explore Features
              </Button>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Streamlined Bill Pay
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Simplify your bill payments with our intuitive bill pay system.
                  Automate payments, track expenses, and stay organized.
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" component={Link} to="/bill-pay">
                Get Started
              </Button>
            </FeatureCard>
          </Grid>
        </Grid>

        <Box mt={6} textAlign="center">
          <Typography variant="h4" gutterBottom color="text.primary">
            Ready to Transform Your Payment Processes?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Join our platform today and experience the future of payments.
          </Typography>
          <Button variant="contained" color="secondary" size="large" component={Link} to="/signup">
            Sign Up Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentsPage;