import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';

const PressPageContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const PressReleaseCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const PressReleaseTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const PressReleaseDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const PressReleaseExcerpt = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const MediaKitSection = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

const MediaKitTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
}));

const NewsArticleCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const NewsArticleTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const NewsArticleSource = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const NewsArticleExcerpt = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PressPage: React.FC = () => {
  const pressReleases = [
    {
      title: 'Company Announces New Partnership with Tech Giant',
      date: 'October 26, 2023',
      excerpt: 'We are excited to announce our new partnership with a leading technology company to expand our reach and offer innovative solutions to our customers.',
      link: '#',
    },
    {
      title: 'Company Achieves Record Growth in Q3 2023',
      date: 'September 15, 2023',
      excerpt: 'Our company has achieved record growth in the third quarter of 2023, driven by strong demand for our products and services.',
      link: '#',
    },
    {
      title: 'Company Launches New AI-Powered Platform',
      date: 'August 1, 2023',
      excerpt: 'We are proud to launch our new AI-powered platform that will revolutionize the way businesses operate and make decisions.',
      link: '#',
    },
  ];

  const newsArticles = [
    {
      title: 'Company Disrupting the Financial Industry with Innovative Solutions',
      source: 'TechCrunch',
      excerpt: 'A new company is making waves in the financial industry with its innovative solutions and customer-centric approach.',
      link: '#',
    },
    {
      title: 'Company Named One of the Fastest-Growing Companies in the Region',
      source: 'Forbes',
      excerpt: 'Our company has been recognized as one of the fastest-growing companies in the region, thanks to our dedicated team and innovative products.',
      link: '#',
    },
    {
      title: 'Company Secures $10 Million in Series A Funding',
      source: 'VentureBeat',
      excerpt: 'We have secured $10 million in Series A funding to accelerate our growth and expand our product offerings.',
      link: '#',
    },
  ];

  return (
    <PressPageContainer maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Press Room
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to our press room. Here you'll find the latest press releases, media kits, and news articles about our company.
      </Typography>

      <section>
        <Typography variant="h5" component="h2" gutterBottom>
          Press Releases
        </Typography>
        <Grid container spacing={3}>
          {pressReleases.map((release, index) => (
            <Grid item xs={12} md={6} key={index}>
              <PressReleaseCard>
                <CardContent>
                  <PressReleaseTitle variant="h6" component="h3">
                    {release.title}
                  </PressReleaseTitle>
                  <PressReleaseDate variant="subtitle2">
                    {release.date}
                  </PressReleaseDate>
                  <PressReleaseExcerpt variant="body2">
                    {release.excerpt}
                  </PressReleaseExcerpt>
                  <Button variant="contained" color="primary" href={release.link}>
                    Read More
                  </Button>
                </CardContent>
              </PressReleaseCard>
            </Grid>
          ))}
        </Grid>
      </section>

      <MediaKitSection>
        <MediaKitTitle variant="h5" component="h2" gutterBottom>
          Media Kit
        </MediaKitTitle>
        <Typography variant="body1" paragraph>
          Download our media kit for high-resolution logos, company information, and executive bios.
        </Typography>
        <Button variant="outlined" color="primary" href="#">
          Download Media Kit
        </Button>
      </MediaKitSection>

      <section>
        <Typography variant="h5" component="h2" gutterBottom>
          In the News
        </Typography>
        <Grid container spacing={3}>
          {newsArticles.map((article, index) => (
            <Grid item xs={12} md={6} key={index}>
              <NewsArticleCard>
                <CardContent>
                  <NewsArticleTitle variant="h6" component="h3">
                    {article.title}
                  </NewsArticleTitle>
                  <NewsArticleSource variant="subtitle2">
                    {article.source}
                  </NewsArticleSource>
                  <NewsArticleExcerpt variant="body2">
                    {article.excerpt}
                  </NewsArticleExcerpt>
                  <Button variant="contained" color="primary" href={article.link}>
                    Read More
                  </Button>
                </CardContent>
              </NewsArticleCard>
            </Grid>
          ))}
        </Grid>
      </section>
    </PressPageContainer>
  );
};

export default PressPage;