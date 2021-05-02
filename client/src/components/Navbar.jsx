import * as React from 'react';
import { connect } from 'react-redux';
import { Link as RLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { authDestroy } from '~/redux/actions/auth-action';

const NavbarGuest = () => {
  return (
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
  );
};

const NavbarUser = (props) => {
  const {
    rsAuth: { user },
  } = props;
  return (
    <HStack spacing={6}>
      <Menu>
        <MenuButton
          as={Button}
          rounded="full"
          variant="link"
          cursor="pointer"
          rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
        >
          <Avatar
            size="sm"
            // src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            src={user ? `${process.env.REACT_APP_AWS_BUCKET}/${user.avatar}` : '/logo192.png'}
            alt="Avatar"
          />
        </MenuButton>
        <MenuList>
          <MenuItem>Account</MenuItem>
          <MenuItem as={RLink} to="/dashboard">
            Dashboard
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={props.raAuthDestroy}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

const Navbar = (props) => {
  return (
    <Flex as="header" bg="linkedin.500" height="60px">
      <Container as="nav" colorScheme="linkedin" maxW="1200px" m="auto">
        <Flex justifyContent="space-between">
          {/* Logo */}
          <Link as={RLink} to="/" display="flex" alignItems="center" _hover={false} _focus={false}>
            <Icon as={FontAwesomeIcon} icon={faReact} color="white" fontSize={32} mr="2" />
            <Text color="white" fontSize={32}>
              Shoperia
            </Text>
          </Link>

          {/* User */}
          {props.rsAuth.isAuthenticated && <NavbarUser {...props} />}
          {!props.rsAuth.isAuthenticated && <NavbarGuest />}
        </Flex>
      </Container>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  rsAuth: state.auth,
});

const mapDispatchToProps = {
  raAuthDestroy: authDestroy,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
