import React from 'react';
import { DeveloperHubView } from '../../../components/DeveloperHubView';
import { ApiPlaygroundView } from '../../../components/ApiPlaygroundView';
import { SchemaExplorer } from '../../../components/SchemaExplorer';
import { Container, Typography, Grid, Paper } from '@mui/material';

const DeveloperPlatformPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Developer Platform
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Developer Hub
            </Typography>
            <DeveloperHubView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              API Playground
            </Typography>
            <ApiPlaygroundView />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Schema Explorer
            </Typography>
            <SchemaExplorer />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DeveloperPlatformPage;