import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Container, Box } from '@mui/material';
import { styled } from '@mui/system';

const PricingCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PricingPage = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5} mb={4} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Choose the Plan That's Right For You
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Unlock the full potential of our platform with our flexible pricing plans.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <PricingCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h4" color="primary">
                Free
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                For individuals and small teams getting started.
              </Typography>
              <Box mt={3}>
                <Typography variant="body1">
                  Limited features
                </Typography>
                <Typography variant="body1">
                  Up to 5 users
                </Typography>
                <Typography variant="body1">
                  Community support
                </Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Get Started
              </Button>
            </CardContent>
          </PricingCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <PricingCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h4" color="primary">
                $19 / month
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                For growing businesses that need more power.
              </Typography>
              <Box mt={3}>
                <Typography variant="body1">
                  All Basic features, plus:
                </Typography>
                <Typography variant="body1">
                  Unlimited users
                </Typography>
                <Typography variant="body1">
                  Priority support
                </Typography>
                <Typography variant="body1">
                  Advanced analytics
                </Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Start Pro Trial
              </Button>
            </CardContent>
          </PricingCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <PricingCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Enterprise
              </Typography>
              <Typography variant="h4" color="primary">
                Contact Us
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Custom solutions for large organizations.
              </Typography>
              <Box mt={3}>
                <Typography variant="body1">
                  Customizable features
                </Typography>
                <Typography variant="body1">
                  Dedicated support team
                </Typography>
                <Typography variant="body1">
                  Scalable infrastructure
                </Typography>
                <Typography variant="body1">
                  Security compliance
                </Typography>
              </Box>
              <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }}>
                Contact Sales
              </Button>
            </CardContent>
          </PricingCard>
        </Grid>
      </Grid>

      <Box mt={5} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Have questions? <a href="/contact">Contact us</a> for more information.
        </Typography>
      </Box>
    </Container>
  );
};

export default PricingPage;