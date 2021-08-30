import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Heading
} from "@chakra-ui/react";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const handleEmailChange = (event) => setEmail(event.target.value);
  const [password, setPassword] = React.useState("");
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Container className="login" maxW={{ base: "100%", md: "600px", lg: "1000px" }}>
        <Heading as="h1" textAlign={{ base: "center", md: "left" }}>Login</Heading>
        <Stack spacing={3} mt={8}>
          <Input
            pr="4.5rem"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box className="separator" mt={8}><span>OR</span></Box>
          <GoogleLoginButton />
          <Box>
            <Text mt={6} textAlign="center">Don't have an account? <Link className="link" to="/signup">Sign Up</Link></Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
