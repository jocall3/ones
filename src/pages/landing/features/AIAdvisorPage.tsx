import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

const FeatureCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const AIAdvisorPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Unlock Financial Clarity with Our AI Advisor
      </Typography>

      <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
        Get personalized financial insights and recommendations powered by cutting-edge AI technology.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <FeatureCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Personalized Insights
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Our AI analyzes your financial data to provide tailored insights into your spending habits, investment opportunities, and potential risks.
              </Typography>
            </CardContent>
          </FeatureCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <FeatureCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Smart Recommendations
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Receive data-driven recommendations on how to optimize your portfolio, reduce debt, and achieve your financial goals faster.
              </Typography>
            </CardContent>
          </FeatureCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <FeatureCard>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Proactive Alerts
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Stay ahead of the curve with proactive alerts about market changes, potential fraud, and opportunities to save money.
              </Typography>
            </CardContent>
          </FeatureCard>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h2" align="center" sx={{ mt: 5, mb: 3 }}>
        Key Benefits
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" color="textSecondary">
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Gain a deeper understanding of your financial health.</li>
              <li>Make informed decisions with confidence.</li>
              <li>Save time and effort on financial planning.</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" color="textSecondary">
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Identify opportunities to grow your wealth.</li>
              <li>Reduce financial stress and anxiety.</li>
              <li>Achieve your financial goals more efficiently.</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" color="textSecondary" sx={{ mt: 5 }}>
        Ready to take control of your financial future? Contact us today to learn more about our AI Advisor.
      </Typography>
    </Container>
  );
};

export default AIAdvisorPage;