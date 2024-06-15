import { Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="gray.800" color="white" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>Logo</Box>
        <Flex alignItems="center">
          <Link as={RouterLink} to="/" px={2}>
            Home
          </Link>
          <Link as={RouterLink} to="/register" px={2}>
            Register
          </Link>
          <Link as={RouterLink} to="/login" px={2}>
            Login
          </Link>
          <Link as={RouterLink} to="/create-memorial" px={2}>
            Create Memorial
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;