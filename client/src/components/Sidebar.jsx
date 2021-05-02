import * as React from 'react';
import { Divider, Flex, Icon, Link, List, ListItem, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { Link as RLink } from 'react-router-dom';
import { faBox, faBoxes, faChevronLeft, faHome } from '@fortawesome/free-solid-svg-icons';

const sidebar = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: faHome,
  },
  {
    name: 'Product List',
    link: '/dashboard/product',
    icon: faBoxes,
  },
  {
    name: 'Add Product',
    link: '/dashboard/product/new',
    icon: faBox,
  },
];

const Sidebar = () => {
  return (
    <Flex top="0" left="0" w="xs" h="100vh" flexDir="column">
      <Flex justifyContent="center" alignItems="center" color="linkedin.400" fontSize={32}>
        <Icon as={FontAwesomeIcon} icon={faReact} mr={2} />
        <Text>Shoperia</Text>
      </Flex>
      <Divider m="16px 0" />
      {/* List */}
      <List overflow="auto" flex={1}>
        {sidebar.map((item, idx) => (
          <ListItem>
            <Link
              p="12px 18px"
              as={RLink}
              to={item.link}
              display="block"
              _hover={{ backgroundColor: 'gray.50', color: 'linkedin.400' }}
            >
              <Icon as={FontAwesomeIcon} icon={item.icon} fontSize={21} mr={2} />
              {item.name}
            </Link>
          </ListItem>
        ))}
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
