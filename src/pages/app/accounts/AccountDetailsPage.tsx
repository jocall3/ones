import React from 'react';
import { useParams } from 'react-router-dom';
import AccountDetails from '../../../components/AccountDetails';
import { Container, Typography, Box } from '@mui/material';

const AccountDetailsPage: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();

  if (!accountId) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error: Account ID not provided.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h4" gutterBottom>
          Account Details
        </Typography>
        <AccountDetails accountId={accountId} />
      </Box>
    </Container>
  );
};

export default AccountDetailsPage;