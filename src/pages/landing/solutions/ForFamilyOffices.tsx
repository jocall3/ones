import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ForFamilyOffices = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Solutions for Family Offices
      </Typography>

      <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
        Empowering family offices with comprehensive tools for wealth management, legacy building, and alternative asset management.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Wealth Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Optimize your investment strategies with our advanced analytics and reporting tools. Gain insights into portfolio performance, risk exposure, and asset allocation.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Legacy Building
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ensure the continuity of your family's wealth and values across generations. Our platform supports estate planning, philanthropic initiatives, and family governance.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Alternative Assets
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Explore new investment opportunities in alternative asset classes such as private equity, real estate, and hedge funds. Access due diligence tools and performance tracking.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Key Features
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Consolidated Reporting
              </Typography>
              <Typography variant="body2" color="textSecondary">
                View all your assets in one place with our consolidated reporting dashboard. Customize reports to meet your specific needs.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Secure Collaboration
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Collaborate with your advisors and family members in a secure and compliant environment. Control access and permissions with our role-based security model.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" align="center" color="textSecondary">
            Ready to transform your family office's financial future? Contact us today to learn more.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForFamilyOffices;