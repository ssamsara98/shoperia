import * as React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
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

const Login = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    props.raAuthLogin(data);
  };

  return (
    <>
      <Flex
        minH="calc(100vh - 68px)"
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading fontSize="4xl">Sign in to your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to enjoy all of our cool <Link color="blue.400">features</Link> ✌️
            </Text>
          </Stack>
          <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
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
                  align={'start'}
                  justify={'space-between'}
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
                >
                  Login
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
  rsIsAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  raAuthLogin: authLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
