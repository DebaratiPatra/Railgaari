import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

export default function Logout() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Logged Out Successfully
      </Heading>
      <Text color={'gray.500'}>
        <Button>Please Login</Button>
      </Text>
    </Box>
  )
}