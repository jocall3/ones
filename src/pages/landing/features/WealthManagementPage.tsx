import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { LegacyBuilder } from '../../../components/LegacyBuilder';
import { TaxOptimizationChamber } from '../../../components/TaxOptimizationChamber';
import { WealthTimeline } from '../../../components/WealthTimeline';
import { FinancialGoalsView } from '../../../components/FinancialGoalsView';
import { InvestmentsView } from '../../../components/InvestmentsView';
import { useNavigate } from 'react-router-dom';

const WealthManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreLegacyBuilder = () => {
    navigate('/legacy-builder');
  };

  const handleExploreTaxOptimization = () => {
    navigate('/tax-optimization');
  };

  const handleExploreWealthTimeline = () => {
    navigate('/wealth-timeline');
  };

  const handleExploreFinancialGoals = () => {
    navigate('/financial-goals');
  };

  const handleExploreInvestments = () => {
    navigate('/investments');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Unlock Your Financial Potential
        </Typography>
        <Typography variant="subtitle1">
          Explore our comprehensive suite of wealth management tools designed to help you build, protect, and grow your wealth.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Legacy Builder
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Plan your legacy and ensure your assets are distributed according to your wishes. Secure your family's future with our intuitive legacy planning tools.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleExploreLegacyBuilder}>
                Explore Legacy Builder
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Tax Optimization Chamber
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Minimize your tax liabilities and maximize your returns with our advanced tax optimization strategies. Stay compliant and save money.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleExploreTaxOptimization}>
                Explore Tax Optimization
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Wealth Timeline
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visualize your financial journey and track your progress towards your long-term goals. Understand your wealth trajectory and make informed decisions.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleExploreWealthTimeline}>
                Explore Wealth Timeline
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Financial Goals View
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Set and track your financial goals, from retirement planning to saving for a down payment. Stay motivated and achieve your dreams.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleExploreFinancialGoals}>
                Explore Financial Goals
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Investments View
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your investments with ease and access a wide range of investment opportunities. Diversify your portfolio and grow your wealth.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleExploreInvestments}>
                Explore Investments
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WealthManagementPage;