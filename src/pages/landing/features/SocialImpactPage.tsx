import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { PhilanthropyHub } from '../../../components/PhilanthropyHub';
import { FinancialDemocracyView } from '../../../components/FinancialDemocracyView';
import { useNavigate } from 'react-router-dom';

const SocialImpactPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Empowering Communities and Driving Social Change
      </Typography>

      <Typography variant="body1" paragraph align="center">
        Explore our initiatives focused on creating a positive social impact through philanthropy and financial empowerment.
      </Typography>

      <Grid container spacing={3}>
        {/* Philanthropy Hub Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Philanthropy Hub
              </Typography>
              <Typography variant="body2" paragraph>
                Connect with impactful charitable organizations and contribute to causes you care about. Our Philanthropy Hub provides a platform to discover, donate, and track your philanthropic efforts.
              </Typography>
              <PhilanthropyHub />
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => navigate('/philanthropy')}>
                  Explore Philanthropy Hub
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Financial Democracy Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Financial Democracy
              </Typography>
              <Typography variant="body2" paragraph>
                Promoting financial inclusion and empowering individuals through accessible financial tools and resources. Learn about our initiatives to democratize finance and create a more equitable economic landscape.
              </Typography>
              <FinancialDemocracyView />
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => navigate('/financial-democracy')}>
                  Learn More About Financial Democracy
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="body1" paragraph align="center" sx={{ mt: 3 }}>
        Join us in our mission to create a better world through social impact initiatives.
      </Typography>
    </Container>
  );
};

export default SocialImpactPage;