import React from 'react';
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';

const ContactPage = () => {
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Simulate form submission (replace with actual API call)
    try {
      // Here you would typically send the form data to your backend
      // For example:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     name: event.target.name.value,
      //     email: event.target.email.value,
      //     message: event.target.message.value,
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to submit form');
      // }

      toast({
        title: 'Message sent!',
        description: 'We will get back to you soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset the form (optional)
      (event.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: 'Error submitting form',
        description: error.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="container.xl" mx="auto">
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        Contact Us
      </Heading>

      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        <Box flex="1">
          <Heading as="h2" size="lg" mb={4}>
            Get in Touch
          </Heading>
          <Text mb={4}>
            We'd love to hear from you! Please use the form below to send us a
            message, or contact us using the information provided.
          </Text>

          <form onSubmit={handleSubmit}>
            <FormControl mb={4} isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" id="name" name="name" />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" id="email" name="email" />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea id="message" name="message" rows={5} />
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Send Message
            </Button>
          </form>
        </Box>

        <Box flex="1">
          <Heading as="h2" size="lg" mb={4}>
            Our Information
          </Heading>

          <Text fontWeight="bold" mb={2}>
            Address:
          </Text>
          <Text mb={4}>
            123 Main Street
            <br />
            Anytown, CA 12345
            <br />
            United States
          </Text>

          <Text fontWeight="bold" mb={2}>
            Email:
          </Text>
          <Text mb={4}>support@example.com</Text>

          <Text fontWeight="bold" mb={2}>
            Phone:
          </Text>
          <Text mb={4}>+1 (555) 123-4567</Text>

          <Heading as="h3" size="md" mt={6} mb={2}>
            Support
          </Heading>
          <Text>
            For technical support, please visit our{' '}
            <a href="/help" style={{ color: 'blue' }}>
              Help Center
            </a>
            .
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactPage;