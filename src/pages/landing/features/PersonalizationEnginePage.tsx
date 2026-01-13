import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

const FeaturePageContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

const FeatureSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'left',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const PersonalizationEnginePage: React.FC = () => {
  return (
    <FeaturePageContainer maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Unlock Personalized Experiences with Our Engine
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Transform user interactions with tailored content and recommendations.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FeatureSection>
            <Typography variant="h5" gutterBottom>
              What is the Personalization Engine?
            </Typography>
            <Typography variant="body1">
              Our personalization engine is a powerful tool that analyzes user data to deliver customized experiences. By understanding user preferences, behaviors, and needs, we can provide relevant content, targeted recommendations, and personalized interactions.
            </Typography>
          </FeatureSection>
        </Grid>

        <Grid item xs={12}>
          <FeatureSection>
            <Typography variant="h5" gutterBottom>
              Key Features
            </Typography>
            <Typography variant="body1">
              <ul>
                <li><b>Data-Driven Insights:</b> Leverage user data to understand individual preferences and behaviors.</li>
                <li><b>Customized Content:</b> Deliver tailored content that resonates with each user.</li>
                <li><b>Targeted Recommendations:</b> Provide relevant product or service recommendations based on user interests.</li>
                <li><b>Personalized Interactions:</b> Create unique user experiences that foster engagement and loyalty.</li>
                <li><b>Real-Time Adaptation:</b> Continuously learn and adapt to changing user needs and preferences.</li>
              </ul>
            </Typography>
          </FeatureSection>
        </Grid>

        <Grid item xs={12}>
          <FeatureSection>
            <Typography variant="h5" gutterBottom>
              Benefits of Personalization
            </Typography>
            <Typography variant="body1">
              <ul>
                <li><b>Increased User Engagement:</b> Keep users coming back with personalized content and interactions.</li>
                <li><b>Improved Conversion Rates:</b> Drive sales and conversions with targeted recommendations.</li>
                <li><b>Enhanced Customer Loyalty:</b> Build lasting relationships with personalized experiences.</li>
                <li><b>Better User Satisfaction:</b> Meet user needs and expectations with tailored content.</li>
                <li><b>Competitive Advantage:</b> Stand out from the competition with unique and personalized experiences.</li>
              </ul>
            </Typography>
          </FeatureSection>
        </Grid>

        <Grid item xs={12}>
          <FeatureSection>
            <Typography variant="h5" gutterBottom>
              Use Cases
            </Typography>
            <Typography variant="body1">
              <ul>
                <li><b>E-commerce:</b> Recommend products based on browsing history and purchase behavior.</li>
                <li><b>Media & Entertainment:</b> Suggest movies, music, and articles based on user preferences.</li>
                <li><b>Education:</b> Provide personalized learning paths and resources.</li>
                <li><b>Healthcare:</b> Offer tailored health advice and recommendations.</li>
                <li><b>Finance:</b> Deliver personalized financial advice and investment recommendations.</li>
              </ul>
            </Typography>
          </FeatureSection>
        </Grid>

        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Ready to Transform Your User Experience?
          </Typography>
          <StyledButton variant="contained" size="large">
            Get Started Today
          </StyledButton>
        </Grid>
      </Grid>
    </FeaturePageContainer>
  );
};

export default PersonalizationEnginePage;