import React from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const QuantumWeaverPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('blue.600', 'blue.400');
  const buttonBg = useColorModeValue('blue.500', 'blue.700');
  const buttonColor = useColorModeValue('white', 'white');

  return (
    <Box bg={bgColor} color={textColor} py={12}>
      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Stack spacing={{ base: 8, md: 16 }}>
          {/* Hero Section */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            spacing={8}
          >
            <Box flex={1}>
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                color={headingColor}
                mb={4}
              >
                Unlock the Future of Finance with Quantum Weaver
              </Heading>
              <Text fontSize="xl" mb={8}>
                Harness the power of quantum computing for unparalleled financial
                modeling and simulation. Predict market trends, optimize
                portfolios, and mitigate risks with unprecedented accuracy.
              </Text>
              <Button
                bg={buttonBg}
                color={buttonColor}
                size="lg"
                _hover={{ bg: 'blue.600' }}
              >
                Explore Quantum Weaver
              </Button>
            </Box>
            <Box flex={1}>
              <Image
                src="https://via.placeholder.com/600x400/4A5568/FFFFFF/?text=Quantum+Weaver"
                alt="Quantum Weaver Illustration"
                borderRadius="md"
                boxShadow="lg"
              />
            </Box>
          </Flex>

          {/* Features Section */}
          <Stack spacing={8}>
            <Heading as="h2" size="xl" color={headingColor}>
              Key Features
            </Heading>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              wrap="wrap"
            >
              <Box
                flex={{ base: '1 1 100%', md: '1 1 45%' }}
                p={6}
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="md"
                boxShadow="md"
                mb={4}
              >
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  Quantum-Powered Simulations
                </Heading>
                <Text>
                  Run complex financial simulations with unparalleled speed and
                  accuracy, leveraging the power of quantum algorithms.
                </Text>
              </Box>
              <Box
                flex={{ base: '1 1 100%', md: '1 1 45%' }}
                p={6}
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="md"
                boxShadow="md"
                mb={4}
              >
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  Advanced Risk Management
                </Heading>
                <Text>
                  Identify and mitigate potential risks with advanced quantum
                  modeling techniques, ensuring portfolio stability.
                </Text>
              </Box>
              <Box
                flex={{ base: '1 1 100%', md: '1 1 45%' }}
                p={6}
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="md"
                boxShadow="md"
                mb={4}
              >
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  Portfolio Optimization
                </Heading>
                <Text>
                  Optimize your investment portfolio for maximum returns using
                  quantum-enhanced optimization algorithms.
                </Text>
              </Box>
              <Box
                flex={{ base: '1 1 100%', md: '1 1 45%' }}
                p={6}
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="md"
                boxShadow="md"
                mb={4}
              >
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  Predictive Market Analysis
                </Heading>
                <Text>
                  Gain insights into future market trends with quantum-powered
                  predictive analytics, giving you a competitive edge.
                </Text>
              </Box>
            </Flex>
          </Stack>

          {/* Call to Action Section */}
          <Box textAlign="center">
            <Heading as="h2" size="xl" color={headingColor} mb={4}>
              Ready to Transform Your Financial Strategy?
            </Heading>
            <Text fontSize="lg" mb={8}>
              Join the quantum revolution and unlock the full potential of your
              financial data.
            </Text>
            <Button
              bg={buttonBg}
              color={buttonColor}
              size="lg"
              _hover={{ bg: 'blue.600' }}
            >
              Get Started Today
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default QuantumWeaverPage;