import React from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Marketing Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Magic Finance
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container component="main" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
        {children}
      </Container>

      {/* Marketing Footer */}
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            Magic Finance {new Date().getFullYear()}
            {'.'}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            <Link color="inherit" to="/terms">
              Terms of Service
            </Link>{' '}
            |{' '}
            <Link color="inherit" to="/privacy">
              Privacy Policy
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingLayout;