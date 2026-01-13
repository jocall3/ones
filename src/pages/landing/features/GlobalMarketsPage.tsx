import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  Container,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const GlobalMarketsPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'white');

  return (
    <Box bg={bgColor} color={textColor} py={16}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          {/* Hero Section */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
          >
            <Box flex={1} mr={{ md: 8 }}>
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                color={headingColor}
                mb={4}
              >
                Unlock Global Market Opportunities
              </Heading>
              <Text fontSize="xl" lineHeight={1.7}>
                Access Forex, Commodities, and Derivatives markets worldwide.
                Empower your trading strategies with real-time data, advanced
                tools, and secure execution.
              </Text>
            </Box>
            <Box flex={1}>
              <Image
                src="https://via.placeholder.com/600x400/4A5568/FFFFFF/?text=Global+Markets"
                alt="Global Markets"
                borderRadius="md"
                boxShadow="md"
              />
            </Box>
          </Flex>

          {/* Forex Section */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={8}
          >
            <Box flex={1} mr={{ md: 8 }}>
              <Heading as="h2" size="xl" color={headingColor} mb={2}>
                Forex Trading
              </Heading>
              <Text fontSize="lg" lineHeight={1.6}>
                Trade major, minor, and exotic currency pairs with competitive
                spreads and leverage options. Stay ahead with our comprehensive
                market analysis and educational resources.
              </Text>
            </Box>
            <Box flex={1}>
              <Image
                src="https://via.placeholder.com/400x300/2D3748/FFFFFF/?text=Forex"
                alt="Forex Trading"
                borderRadius="md"
                boxShadow="sm"
              />
            </Box>
          </Flex>

          {/* Commodities Section */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={8}
          >
            <Box flex={1}>
              <Image
                src="https://via.placeholder.com/400x300/2D3748/FFFFFF/?text=Commodities"
                alt="Commodities Trading"
                borderRadius="md"
                boxShadow="sm"
                mr={{ md: 8 }}
              />
            </Box>
            <Box flex={1}>
              <Heading as="h2" size="xl" color={headingColor} mb={2}>
                Commodities Trading
              </Heading>
              <Text fontSize="lg" lineHeight={1.6}>
                Diversify your portfolio with precious metals, energy resources,
                and agricultural products. Access real-time pricing and expert
                insights to make informed trading decisions.
              </Text>
            </Box>
          </Flex>

          {/* Derivatives Section */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={8}
          >
            <Box flex={1} mr={{ md: 8 }}>
              <Heading as="h2" size="xl" color={headingColor} mb={2}>
                Derivatives Trading
              </Heading>
              <Text fontSize="lg" lineHeight={1.6}>
                Hedge your risks and capitalize on market movements with a wide
                range of derivatives, including futures, options, and swaps.
                Benefit from our advanced risk management tools and dedicated
                support.
              </Text>
            </Box>
            <Box flex={1}>
              <Image
                src="https://via.placeholder.com/400x300/2D3748/FFFFFF/?text=Derivatives"
                alt="Derivatives Trading"
                borderRadius="md"
                boxShadow="sm"
              />
            </Box>
          </Flex>

          {/* Features Section */}
          <Box>
            <Heading
              as="h2"
              size="xl"
              fontWeight="semibold"
              color={headingColor}
              mb={4}
              textAlign="center"
            >
              Key Features
            </Heading>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-around"
              align="stretch"
              wrap="wrap"
            >
              <Box
                w={{ base: '100%', md: '30%' }}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p={6}
                mb={4}
              >
                <Heading as="h3" size="lg" color={headingColor} mb={2}>
                  Real-Time Data
                </Heading>
                <Text fontSize="md" lineHeight={1.5}>
                  Access up-to-the-minute market data for informed decision-making.
                </Text>
              </Box>
              <Box
                w={{ base: '100%', md: '30%' }}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p={6}
                mb={4}
              >
                <Heading as="h3" size="lg" color={headingColor} mb={2}>
                  Advanced Trading Tools
                </Heading>
                <Text fontSize="md" lineHeight={1.5}>
                  Utilize powerful charting tools, technical indicators, and
                  order management features.
                </Text>
              </Box>
              <Box
                w={{ base: '100%', md: '30%' }}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p={6}
                mb={4}
              >
                <Heading as="h3" size="lg" color={headingColor} mb={2}>
                  Secure Execution
                </Heading>
                <Text fontSize="md" lineHeight={1.5}>
                  Trade with confidence on our secure and reliable platform.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Call to Action */}
          <Box textAlign="center">
            <Heading as="h2" size="xl" color={headingColor} mb={4}>
              Start Trading Today
            </Heading>
            <Text fontSize="lg" lineHeight={1.6} mb={6}>
              Open an account and explore the world of global markets.
            </Text>
            {/* Replace with your actual Button component */}
            <Box as="button" bg="blue.500" color="white" px={8} py={3} borderRadius="md">
              Get Started
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default GlobalMarketsPage;