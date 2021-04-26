import { Box, Button, Container, Flex, HStack, Icon, Link, Text } from '@chakra-ui/react';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as RLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box as="header" bg="linkedin.500">
      <Container as="nav" colorScheme="linkedin" maxW="1200px" p="10px 0">
        <Flex justifyContent="space-between">
          {/* Logo */}
          <Link as={RLink} to="/" display="flex" alignItems="center" _hover={false} _focus={false}>
            <Icon as={FontAwesomeIcon} icon={faReact} color="white" fontSize={32} mr="2" />
            <Text color="white" fontSize={32}>
              Shopedia
            </Text>
          </Link>

          {/* User */}
          <HStack spacing={6}>
            <Button
              as={RLink}
              to="/login"
              variant="outline"
              fontSize="sm"
              color="white"
              _hover={{ bg: 'gray.100', color: 'linkedin.500' }}
              _active={{ bg: 'gray.300', color: 'linkedin.500' }}
            >
              Login
            </Button>
            <Button
              as={RLink}
              to="/register"
              fontSize="sm"
              color="linkedin.400"
              _hover={{ bg: 'transparent', outline: 'white solid 1px', color: 'gray.100' }}
              _active={{ bg: 'transparent', outline: 'white solid 1px', color: 'gray.300' }}
            >
              Register
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
