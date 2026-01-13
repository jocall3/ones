import React from 'react';
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { ComplianceOracleView } from '../../../components/ComplianceOracleView';

const SecurityAndCompliancePage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'gray.100');

  return (
    <Box bg={bgColor} color={textColor} py={12}>
      <Container maxW="container.xl">
        <Heading
          as="h1"
          size="2xl"
          fontWeight="extrabold"
          textAlign="center"
          mb={8}
          color={headingColor}
        >
          Security and Compliance
        </Heading>

        <Box mb={10}>
          <Heading as="h2" size="xl" fontWeight="semibold" mb={4} color={headingColor}>
            Our Commitment to Security
          </Heading>
          <Text fontSize="lg" mb={4}>
            We understand the importance of keeping your data safe and secure. We employ industry-leading security measures to protect your information from unauthorized access, use, or disclosure.
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              End-to-end encryption to protect your data in transit and at rest.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Regular security audits and penetration testing to identify and address potential vulnerabilities.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Multi-factor authentication to prevent unauthorized access to your account.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Strict access controls to limit who can access your data.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Incident response plan to quickly address any security breaches.
            </ListItem>
          </List>
        </Box>

        <Box mb={10}>
          <Heading as="h2" size="xl" fontWeight="semibold" mb={4} color={headingColor}>
            Compliance Adherence
          </Heading>
          <Text fontSize="lg" mb={4}>
            We are committed to complying with all applicable laws and regulations. We work closely with regulatory bodies to ensure that our platform meets the highest standards of compliance.
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              SOC 2 Type II certified.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              GDPR compliant.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              CCPA compliant.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              PCI DSS compliant.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Regularly updated to comply with evolving regulations.
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="xl" fontWeight="semibold" mb={4} color={headingColor}>
            Compliance Oracle
          </Heading>
          <Text fontSize="lg" mb={4}>
            Our Compliance Oracle provides real-time insights into your compliance posture. It helps you identify and address potential compliance risks before they become problems.
          </Text>
          <ComplianceOracleView />
        </Box>
      </Container>
    </Box>
  );
};

export default SecurityAndCompliancePage;