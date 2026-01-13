import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  useBreakpointValue,
  Container,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Icon,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { FaMoneyBillWave, FaChartLine, FaShieldAlt, FaHandshake } from 'react-icons/fa'; // Example icons
import ModernTreasuryLogo from '../../../assets/modern-treasury-logo.png'; // Assuming an assets folder

const TreasuryManagementPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box as="section" py={{ base: 12, md: 24 }}>
      <Container maxW="7xl">
        <Stack spacing={{ base: 8, md: 16 }} textAlign="center">
          <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }}>
            Streamline Your Treasury with Modern Treasury Integration
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.600">
            Automate payments, manage cash flow, and gain real-time visibility with our seamless Modern Treasury integration.
          </Text>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={8}
          mt={12}
          alignItems="center"
        >
          <Box flex={1}>
            <Image
              src={ModernTreasuryLogo}
              alt="Modern Treasury Logo"
              borderRadius="md"
              boxShadow="md"
              mx="auto"
              maxW="300px"
            />
          </Box>
          <Box flex={1}>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Why Choose Our Modern Treasury Integration?
            </Heading>
            <List spacing={3} styleType="none">
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Automated Payment Workflows
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Real-time Cash Flow Visibility
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Secure and Compliant Transactions
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Simplified Reconciliation
              </ListItem>
            </List>
          </Box>
        </Stack>

        <Box mt={16}>
          <Heading as="h2" fontSize="2xl" mb={8} textAlign="center">
            Key Features
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              <Icon as={FaMoneyBillWave} boxSize={8} color="blue.500" mb={2} />
              <Heading as="h3" fontSize="xl" mb={2}>
                Automated Payments
              </Heading>
              <Text color="gray.600">
                Schedule and automate payments with ease, reducing manual effort and errors.
              </Text>
            </Box>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              <Icon as={FaChartLine} boxSize={8} color="teal.500" mb={2} />
              <Heading as="h3" fontSize="xl" mb={2}>
                Cash Flow Forecasting
              </Heading>
              <Text color="gray.600">
                Gain insights into your cash position with real-time data and forecasting tools.
              </Text>
            </Box>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              <Icon as={FaShieldAlt} boxSize={8} color="purple.500" mb={2} />
              <Heading as="h3" fontSize="xl" mb={2}>
                Enhanced Security
              </Heading>
              <Text color="gray.600">
                Ensure secure transactions with robust security features and compliance measures.
              </Text>
            </Box>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              <Icon as={FaHandshake} boxSize={8} color="orange.500" mb={2} />
              <Heading as="h3" fontSize="xl" mb={2}>
                Seamless Reconciliation
              </Heading>
              <Text color="gray.600">
                Automate reconciliation processes, saving time and improving accuracy.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box mt={16} textAlign="center">
          <Heading as="h2" fontSize="2xl" mb={4}>
            Get Started Today
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={8}>
            Contact us to learn more about our Modern Treasury integration and how it can benefit your business.
          </Text>
          {/* Replace with actual contact/call-to-action component */}
          <Button colorScheme="blue" size="lg">
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TreasuryManagementPage;