import { Box, Heading, Text, Button, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="center"
      h="80vh"
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Box textAlign="center" py={7} px={5}>
        
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The page you're looking for does not seem to exist.
        </Text>

        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Flex>
  );
}
