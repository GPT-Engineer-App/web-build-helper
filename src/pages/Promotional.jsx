import { Box, Button, Container, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Promotional = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Create Lasting Memories</Heading>
          <Text fontSize="xl">Our memorial page service helps you create beautiful, lasting memories of your loved ones.</Text>
        </Box>
        <Flex justify="center">
          <Image src="/images/memorial.jpg" alt="Memorial" borderRadius="md" />
        </Flex>
        <Box textAlign="center">
          <Heading as="h2" size="xl" mb={4}>Features</Heading>
          <Text fontSize="lg">Share pictures, videos, and stories. Invite friends and family to contribute. Create a lasting tribute.</Text>
        </Box>
        <Box textAlign="center">
          <Heading as="h2" size="xl" mb={4}>Testimonials</Heading>
          <Text fontSize="lg" fontStyle="italic">"This service helped us keep the memory of our loved one alive. It's a beautiful way to remember and share."</Text>
          <Text fontSize="lg" fontStyle="italic">"Easy to use and a wonderful way to bring family and friends together."</Text>
        </Box>
        <Box textAlign="center">
          <Button as={RouterLink} to="/register" colorScheme="teal" size="lg">Sign Up Now</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Promotional;