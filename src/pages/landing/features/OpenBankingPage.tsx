import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import OpenBankingImage from './open-banking.jpg'; // Replace with your actual image
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const OpenBankingPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Unlock the Power of Open Banking
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Seamlessly connect your accounts and gain a holistic view of your finances.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={OpenBankingImage}
            alt="Open Banking Illustration"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            What is Open Banking?
          </Typography>
          <Typography variant="body1" paragraph>
            Open Banking is a secure way to give providers access to your financial information. It allows you to connect your bank accounts to our platform, enabling us to provide you with personalized insights, streamlined payments, and enhanced financial management tools.
          </Typography>
          <Typography variant="body1" paragraph>
            With your consent, we can access your transaction history, account balances, and other relevant data to help you make smarter financial decisions.
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Key Benefits of Open Banking
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Consolidated View
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  See all your accounts in one place, regardless of the bank.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personalized Insights
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Get tailored recommendations based on your spending habits.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Streamlined Payments
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Make payments directly from our platform with ease.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Button variant="contained" color="primary">
          Connect Your Accounts
        </Button>
      </Box>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" align="center" color="textSecondary">
          Your data is secure. We use industry-leading security measures to protect your information.
        </Typography>
      </Box>
    </Container>
  );
};

export default OpenBankingPage;