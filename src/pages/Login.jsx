import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to protected page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        {error && <Text color="red.500">{error}</Text>}
        <Button onClick={handleLogin}>Login</Button>
      </VStack>
    </Box>
  );
};

export default Login;