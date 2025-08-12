'use client'

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Test() {
  const navigate = useNavigate();

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
          <Stack align={'center'}>
            <Text>Company</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>About Us</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Blog</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Careers</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Contact Us</Text>
          </Stack>

          <Stack align={'center'}>
            <Text>Support</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Help Center</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Safety Center</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Community Guidelines</Text>
          </Stack>

          <Stack align={'center'}>
            <Text>Legal</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Cookies Policy</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Privacy Policy</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Terms of Service</Text>
            <Text cursor="pointer" onClick={() => navigate('#')}>Law Enforcement</Text>
          </Stack>

          <Stack align={'center'}>
            <Text>Features</Text>
            <Text cursor="pointer" onClick={() => navigate('/')}>Home</Text>
            <Text cursor="pointer" onClick={() => navigate('/trains')}>Trains</Text>
            <Text cursor="pointer" onClick={() => navigate('/stations')}>Stations</Text>
            <Text cursor="pointer" onClick={() => navigate('/routes')}>Routes</Text>
          </Stack>

        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text>© {new Date().getFullYear()} Smart Transportation. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <FaTwitter />
            <FaYoutube />
            <FaInstagram />
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
