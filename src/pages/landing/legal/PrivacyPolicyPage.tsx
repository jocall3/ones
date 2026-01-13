import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our application.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>

        <Typography variant="body1" paragraph>
          We may collect the following types of information:
          <ul>
            <li>
              <strong>Personal Information:</strong> This includes your name, email address, contact information, and any other information you provide when you register or use our services.
            </li>
            <li>
              <strong>Financial Information:</strong> If you use our financial services, we may collect bank account details, transaction history, and other financial data necessary to provide those services.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about how you use our application, including your IP address, browser type, device information, and the pages you visit.
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>

        <Typography variant="body1" paragraph>
          We use your information for the following purposes:
          <ul>
            <li>
              To provide and improve our services.
            </li>
            <li>
              To personalize your experience.
            </li>
            <li>
              To communicate with you about updates, promotions, and other relevant information.
            </li>
            <li>
              To process transactions and provide financial services.
            </li>
            <li>
              To detect and prevent fraud and other illegal activities.
            </li>
            <li>
              To comply with legal obligations.
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Data Security
        </Typography>

        <Typography variant="body1" paragraph>
          We take reasonable measures to protect your information from unauthorized access, use, or disclosure. These measures include encryption, firewalls, and regular security audits. However, no method of transmission over the internet or method of electronic storage is completely secure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Data Sharing
        </Typography>

        <Typography variant="body1" paragraph>
          We may share your information with the following types of third parties:
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share information with third-party service providers who help us operate our application, process payments, or provide other services.
            </li>
            <li>
              <strong>Legal Authorities:</strong> We may disclose information to legal authorities if required by law or legal process.
            </li>
            <li>
              <strong>Business Partners:</strong> We may share information with business partners who offer products or services that may be of interest to you.
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Cookies and Tracking Technologies
        </Typography>

        <Typography variant="body1" paragraph>
          We use cookies and other tracking technologies to collect information about your browsing behavior. You can control cookies through your browser settings.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Your Rights
        </Typography>

        <Typography variant="body1" paragraph>
          You have the following rights regarding your information:
          <ul>
            <li>
              The right to access your information.
            </li>
            <li>
              The right to correct inaccuracies in your information.
            </li>
            <li>
              The right to delete your information.
            </li>
            <li>
              The right to object to the processing of your information.
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Changes to This Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our application.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Contact Us
        </Typography>

        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at:
          <Link href="mailto:privacy@example.com">privacy@example.com</Link>
        </Typography>

        <Typography variant="body2" color="textSecondary" align="center" mt={4}>
          Last updated: October 26, 2023
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;