import React from 'react';
import { Card, CardContent, Typography, Grid, Container, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      title: 'Revolutionizing Payments for Fintech Startup',
      client: 'Acme Fintech',
      industry: 'Fintech',
      summary: 'Implemented a streamlined payment processing system, resulting in a 40% reduction in transaction fees and improved customer satisfaction.',
      image: 'https://source.unsplash.com/random?fintech',
    },
    {
      title: 'Enhancing Security Compliance for Global Bank',
      client: 'Global Bank Corp',
      industry: 'Banking',
      summary: 'Developed a comprehensive security compliance solution, ensuring adherence to regulatory standards and minimizing risk of data breaches.',
      image: 'https://source.unsplash.com/random?banking',
    },
    {
      title: 'Optimizing Virtual Account Management for E-commerce Platform',
      client: 'E-commerce Solutions Ltd',
      industry: 'E-commerce',
      summary: 'Designed and deployed a virtual account management system, enabling efficient fund allocation and reconciliation for online transactions.',
      image: 'https://source.unsplash.com/random?ecommerce',
    },
    {
      title: 'AI-Powered Financial Forecasting for Investment Firm',
      client: 'Alpha Investments',
      industry: 'Investment',
      summary: 'Leveraged AI algorithms to improve financial forecasting accuracy, leading to better investment decisions and increased returns.',
      image: 'https://source.unsplash.com/random?investment',
    },
  ];

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Client Success Stories
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Explore how we've helped businesses across various industries achieve their financial goals.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {caseStudies.map((study, index) => (
          <Grid item xs={12} md={6} key={index}>
            <StyledCard>
              <CardContent>
                <img
                  src={study.image}
                  alt={study.title}
                  style={{ width: '100%', marginBottom: '1rem', borderRadius: '8px' }}
                />
                <Typography variant="h6" component="h2" gutterBottom>
                  {study.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Client: {study.client}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Industry: {study.industry}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {study.summary}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CaseStudiesPage;