import * as React from 'react';
import { Divider, Flex, Icon, Link, List, ListItem, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { Link as RLink } from 'react-router-dom';
import { faChevronLeft, faHome } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <Flex top="0" left="0" w="xs" h="100vh" flexDir="column">
      <Flex justifyContent="center" alignItems="center" color="linkedin.400" fontSize={32}>
        <Icon as={FontAwesomeIcon} icon={faReact} mr={2} />
        <Text>Shopedia</Text>
      </Flex>
      <Divider m="16px 0" />
      {/* List */}
      <List overflow="auto">
        <ListItem>
          <Link
            p="12px 18px"
            as={RLink}
            to="/dasboard"
            display="block"
            _hover={{ backgroundColor: 'gray.50', color: 'linkedin.400' }}
          >
            <Icon as={FontAwesomeIcon} icon={faHome} fontSize={21} mr={2} />
            Dashboard
          </Link>
        </ListItem>
        <ListItem>
          <Link
            p="12px 18px"
            as={RLink}
            to="/dasboard"
            display="block"
            _hover={{ backgroundColor: 'gray.50', color: 'linkedin.400' }}
          >
            <Icon as={FontAwesomeIcon} icon={faHome} fontSize={21} mr={2} />
            Product List
          </Link>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Link
            p="12px 18px"
            as={RLink}
            to="/"
            display="block"
            _hover={{ backgroundColor: 'gray.50', color: 'linkedin.400' }}
          >
            <Icon as={FontAwesomeIcon} icon={faChevronLeft} fontSize={21} mr={2} />
            Back to Home
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
};

export default Sidebar;
