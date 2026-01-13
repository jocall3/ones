import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.background.default,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const ForPersonalBanking = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Solutions for Personal Banking
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
        Take control of your financial future with our powerful tools and insights.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/budgets" className={classes.link}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Budgeting
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Create and manage budgets to track your spending and achieve your financial goals.
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Link to="/financial-goals" className={classes.link}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Financial Goals
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Set and track your financial goals, such as saving for a down payment or retirement.
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Link to="/credit-health" className={classes.link}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Credit Health
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Monitor your credit score and get personalized tips to improve your credit health.
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" align="center" color="textSecondary">
            Explore our other personal banking solutions to discover how we can help you achieve your financial aspirations.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForPersonalBanking;