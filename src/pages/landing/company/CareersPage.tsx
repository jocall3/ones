import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const CareersPage = () => {
  const openPositions = [
    {
      title: 'Senior Software Engineer',
      location: 'Remote',
      description: 'We are looking for a Senior Software Engineer to join our growing team. You will be responsible for developing and maintaining our core platform.',
      link: '/careers/senior-software-engineer',
    },
    {
      title: 'Data Scientist',
      location: 'New York, NY',
      description: 'We are seeking a Data Scientist to help us analyze large datasets and build predictive models.',
      link: '/careers/data-scientist',
    },
    {
      title: 'Product Manager',
      location: 'San Francisco, CA',
      description: 'We need a Product Manager to lead the development of new features and products.',
      link: '/careers/product-manager',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Join Our Team
      </Typography>

      <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
        We are a dynamic and innovative company looking for talented individuals to join our mission.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Our Culture
      </Typography>

      <Typography paragraph>
        At [Your Company Name], we believe in fostering a collaborative and inclusive environment where everyone can thrive. We value innovation, creativity, and a passion for solving challenging problems. We offer competitive benefits, opportunities for professional growth, and a chance to make a real impact.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Open Positions
      </Typography>

      <Grid container spacing={3}>
        {openPositions.map((position, index) => (
          <Grid item xs={12} md={6} key={index}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {position.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Location: {position.location}
                </Typography>
                <Typography variant="body2" paragraph>
                  {position.description}
                </Typography>
                <Button variant="contained" color="primary" href={position.link}>
                  Learn More
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} textAlign="center">
        <Typography variant="body1">
          Don't see a position that fits your skills? We're always looking for talented individuals.
        </Typography>
        <Button variant="outlined" color="primary" href="/contact">
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default CareersPage;