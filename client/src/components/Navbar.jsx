import { Box, Flex, Image } from '@chakra-ui/react';
import { Link as RLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box as="nav" colorScheme="linkedin" w="96%" maxWidth="1280px" m="10px auto">
      <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <RLink to="/">
          <Image src="/logo192.png" alt="Logo" w="64px" />
        </RLink>
      </Flex>
    </Box>
  );
};

export default Navbar;
