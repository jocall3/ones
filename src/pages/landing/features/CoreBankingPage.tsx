import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const CoreBankingPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Core Banking Features
      </Typography>

      <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
        Explore the robust core banking functionalities designed to empower your financial operations.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Accounts Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Effortlessly manage all your accounts in one place. Open new accounts, view balances, and track account activity with ease.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Transactions
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Seamlessly execute transactions, including payments, transfers, and deposits. Our secure platform ensures your financial data is protected.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Statements
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Access detailed account statements anytime, anywhere. Download statements in various formats for your records and analysis.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" component="h3" mt={4} gutterBottom>
        Key Benefits
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Centralized Management:</span> Manage all your core banking functions from a single, intuitive platform.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Enhanced Security:</span> Benefit from advanced security measures to protect your financial data and transactions.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Real-Time Insights:</span> Gain real-time visibility into your account balances, transactions, and statements.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Improved Efficiency:</span> Streamline your financial operations and reduce manual effort with our automated tools.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoreBankingPage;