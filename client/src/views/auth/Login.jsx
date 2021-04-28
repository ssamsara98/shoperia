import * as React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Box,
  Button,
  // Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { authLogin } from '~/redux/actions/auth-action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Login = (props) => {
  const { rsAuth } = props;
  const { register, handleSubmit } = useForm();

  const bg1 = useColorModeValue('gray.50', 'gray.800');
  const bg2 = useColorModeValue('white', 'gray.700');

  const onSubmit = async (data) => {
    props.raAuthLogin(data);
  };

  if (rsAuth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Flex minH="calc(100vh - 60px)" align="center" justify="center" bg={bg1}>
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading fontSize="4xl">Sign in to your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to enjoy all of our cool <Link color="blue.400">features</Link> ✌️
            </Text>
          </Stack>
          <Box rounded="lg" bg={bg2} boxShadow="lg" p={8}>
            <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="shoperia-user">
                <FormLabel>Email or Username</FormLabel>
                <Input {...register('user_session')} type="text" required />
              </FormControl>
              <FormControl id="shoperia-password">
                <FormLabel>Password</FormLabel>
                <Input
                  {...register('password', { minLength: 6, maxLength: 32 })}
                  type="password"
                  required
                  minLength={6}
                  maxLength={32}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  {/* <Checkbox>Remember me</Checkbox> */}
                  {/* <Link color="blue.400">Forgot password?</Link> */}
                </Stack>
                <Button
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  disabled={rsAuth.loading}
                >
                  {rsAuth.loading ? <FontAwesomeIcon icon={faSpinner} pulse /> : <>Login</>}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

const mapStateToProps = (state) => ({
  rsAuth: state.auth,
});

const mapDispatchToProps = {
  raAuthLogin: authLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
