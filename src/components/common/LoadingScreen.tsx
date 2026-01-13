import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1400, // Ensure it's above most other elements
      }}
    >
      <CircularProgress size={60} />
      {message && (
        <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingScreen;