import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { AlgoTradingLab } from '../../../components/AlgoTradingLab.tsx';

const AlgorithmicTradingPage = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Algorithmic Trading Lab
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to the Algorithmic Trading Lab, a powerful platform designed to
          empower traders and investors with automated trading strategies.
          Whether you're a seasoned quant or just starting out, our lab provides
          the tools and resources you need to develop, test, and deploy
          algorithmic trading strategies with confidence.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Key Features
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  <b>Strategy Development:</b> Build custom trading strategies using
                  our intuitive interface and comprehensive set of technical
                  indicators.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <b>Backtesting:</b> Rigorously test your strategies against historical
                  data to evaluate their performance and identify potential risks.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <b>Paper Trading:</b> Simulate live trading in a risk-free environment
                  to fine-tune your strategies before deploying them to real
                  markets.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <b>Automated Execution:</b> Automatically execute trades based on your
                  strategy's signals, 24/7, without manual intervention.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <b>Risk Management:</b> Implement robust risk management controls to
                  protect your capital and minimize potential losses.
                </Typography>
              <li>
                <Typography variant="body1">
                  <b>Real-time Monitoring:</b> Monitor your strategy's performance in
                  real-time with detailed analytics and reporting.
                </Typography>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Supported Strategies
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  <b>Trend Following:</b> Capitalize on market trends by identifying
                  and trading in the direction of the prevailing trend.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <b>Mean Reversion:</b> Profit from temporary deviations from the mean
                  by identifying overbought and oversold conditions.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <b>Arbitrage:</b> Exploit price discrepancies between different markets
                  or exchanges to generate risk-free profits.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <b>Statistical Arbitrage:</b> Use statistical models to identify
                  mispriced assets and profit from their eventual convergence.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <b>Custom Strategies:</b> Develop and deploy your own unique trading
                  strategies using our flexible platform.
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Interactive Algo Trading Lab
          </Typography>
          {/* Embedding the AlgoTradingLab component */}
          <AlgoTradingLab />
        </Box>

        <Typography variant="body1" paragraph mt={3}>
          Ready to take your trading to the next level? Explore the Algorithmic
          Trading Lab today and unlock the power of automated trading.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AlgorithmicTradingPage;