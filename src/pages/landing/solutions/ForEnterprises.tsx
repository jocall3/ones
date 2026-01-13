import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const ForEnterprises = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Solutions for Enterprises
      </Typography>

      <Typography variant="subtitle1" align="center" paragraph>
        Empowering large enterprises with advanced financial solutions for treasury management, corporate command, and robust security.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Treasury Management
            </Typography>
            <Typography variant="body1">
              Optimize your cash flow, manage liquidity, and gain real-time visibility into your global financial position. Our treasury management solutions provide the tools you need to make informed decisions and drive efficiency.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Corporate Command
            </Typography>
            <Typography variant="body1">
              Take control of your corporate finances with our comprehensive command center. Streamline approvals, automate workflows, and ensure compliance across your organization.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Security
            </Typography>
            <Typography variant="body1">
              Protect your financial assets with our enterprise-grade security solutions. Benefit from advanced fraud detection, multi-factor authentication, and continuous monitoring to safeguard your business.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h2" gutterBottom align="center">
        Key Benefits
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={1}>
            <Typography variant="body2">
              Enhanced Visibility
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={1}>
            <Typography variant="body2">
              Improved Efficiency
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={1}>
            <Typography variant="body2">
              Reduced Risk
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={1}>
            <Typography variant="body2">
              Better Compliance
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" style={{ marginTop: '2rem' }}>
        Ready to transform your enterprise finances? <a href="/contact">Contact us</a> to learn more.
      </Typography>
    </Container>
  );
};

export default ForEnterprises;