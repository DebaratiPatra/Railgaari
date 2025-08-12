import { Box, Text, VStack, HStack, Badge } from '@chakra-ui/react';

export const UserCardInfo = ({ user }) => {
    return (
        <Box mt={4} p={6} borderWidth={1} borderRadius="md" bg="white" boxShadow="lg">
            <VStack align="start" spacing={4}>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Username:
                    </Text>
                    <Text>{user.username}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Phone Number:
                    </Text>
                    <Text>{user.phoneNumber}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Email:
                    </Text>
                    <Text>{user.email}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        City:
                    </Text>
                    <Text>{user.city}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Nearest Rail Station:
                    </Text>
                    <Text>{user.nearestRailStation?.name}</Text> {/* Assuming the referenced station document has a 'name' field */}
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Nearest Metro Station:
                    </Text>
                    <Text>{user.nearestMetroStation?.name}</Text> {/* Assuming the referenced station document has a 'name' field */}
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Role:
                    </Text>
                    <Badge colorScheme={user.role === 'admin' ? 'red' : 'blue'} p={1}>
                        {user.role}
                    </Badge>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Favourite Routes:
                    </Text>
                    <VStack align="start">
                        {user.favouriteRoutes.length > 0 ? (
                            user.favouriteRoutes.map((route, index) => (
                                <Text key={index}>
                                    {route[0]?.name} to {route[1]?.name}
                                </Text> // Assuming each route contains two stations and each has a 'name' field
                            ))
                        ) : (
                            <Text>No favourite routes added</Text>
                        )}
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};

