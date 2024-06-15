// Update this page (the content is just a fallback if you fail and example)
// Use chakra-ui
import { Container, Text, VStack } from "@chakra-ui/react";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        <Text fontSize="lg" textAlign="center">
          Our service helps you create a lasting memory of your loved one by allowing you to share pictures, videos, and stories. Invite friends and family to contribute and create a beautiful, lasting tribute.
        </Text>
      </VStack>
    </Container>
  );
};

export default Index;
