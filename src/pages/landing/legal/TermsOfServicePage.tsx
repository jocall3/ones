import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const TermsOfServicePage = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms of Service
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to our platform! These Terms of Service ("Terms") govern your use of our website, applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms constitute a legally binding agreement between you and [Your Company Name] ("we," "us," or "our"). We may modify these Terms at any time, and such modifications will be effective immediately upon posting. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Description of Services
        </Typography>
        <Typography variant="body1" paragraph>
          Our Services provide [brief description of what your platform does]. We reserve the right to modify or discontinue any aspect of the Services at any time without notice.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. User Accounts
        </Typography>
        <Typography variant="body1" paragraph>
          To access certain features of the Services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to or use of your account.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. User Content
        </Typography>
        <Typography variant="body1" paragraph>
          You are solely responsible for any content you submit, post, or display on or through the Services ("User Content"). You represent and warrant that you have all necessary rights to grant us a license to use your User Content in connection with the Services. We have the right to remove any User Content that violates these Terms or that we deem objectionable.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Prohibited Conduct
        </Typography>
        <Typography variant="body1" paragraph>
          You agree not to engage in any of the following prohibited activities:
          <ul>
            <li>Violating any applicable law or regulation</li>
            <li>Infringing the rights of others</li>
            <li>Transmitting viruses or other harmful code</li>
            <li>Interfering with the operation of the Services</li>
            <li>Collecting or harvesting information about other users</li>
            <li>Using the Services for any commercial purpose without our express consent</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          The Services and all content included therein, including but not limited to text, graphics, logos, and software, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use our intellectual property without our express written consent.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Disclaimer of Warranties
        </Typography>
        <Typography variant="body1" paragraph>
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms shall be governed by and construed in accordance with the laws of [Your State/Jurisdiction], without regard to its conflict of law principles.
        </Typography>

        <Typography variant="h6" gutterBottom>
          10. Dispute Resolution
        </Typography>
        <Typography variant="body1" paragraph>
          Any dispute arising out of or relating to these Terms shall be resolved through binding arbitration in accordance with the rules of the [Arbitration Organization].
        </Typography>

        <Typography variant="h6" gutterBottom>
          11. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We may terminate your access to the Services at any time, with or without cause. You may terminate your account at any time by contacting us.
        </Typography>

        <Typography variant="h6" gutterBottom>
          12. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms, please contact us at <Link href="mailto:[Your Email Address]">[Your Email Address]</Link>.
        </Typography>

        <Typography variant="body2" align="center" mt={4}>
          Last updated: [Date]
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfServicePage;