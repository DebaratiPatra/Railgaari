import { Box, Text, VStack, HStack, Badge, Stack, Icon } from '@chakra-ui/react';
import { FaTrain, FaSubway } from 'react-icons/fa'; // Import icons for metro and railway

export const StationCardInfo = ({ station }) => {
    if (!station) {
        return <Text>Nothing to show</Text>;
    }

    return (
        <Box mt={4} p={6} borderWidth={1} borderRadius="md" bg="white" boxShadow="lg">
            <VStack align="start" spacing={6}>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Station Name:
                    </Text>
                    <Text>{station.station_name}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Station Code:
                    </Text>
                    <Text>{station.station_code}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Station Type:
                    </Text>
                    <Badge colorScheme={station.station_type === 'metro' ? 'blue' : 'green'} p={1}>
                        {station.station_type}
                    </Badge>
                </HStack>
                <HStack align="start">
                    <Text fontWeight="bold" color="teal.500">
                        Line Color Code:
                    </Text>
                    <Stack direction="row" spacing={2}>
                        {station.line_color_code && station.line_color_code.length > 0 ? (
                            station.line_color_code.map((color, index) => (
                                <Badge key={index} colorScheme="purple" p={1}>
                                    {color}
                                </Badge>
                            ))
                        ) : (
                            <Text>No line color code available</Text>
                        )}
                    </Stack>
                </HStack>
                <HStack align="start" w="full">
                    <Text fontWeight="bold" color="teal.500">
                        Connected Metro Stations:
                    </Text>
                    <VStack align="start" w="full">
                        {station.connected_metro_stations && station.connected_metro_stations.length > 0 ? (
                            station.connected_metro_stations.map((metro, index) => (
                                <HStack key={index} w="full">
                                    <Icon as={FaSubway} color="blue.400" />
                                    <Text>{metro.join(' - ')}</Text>
                                </HStack>
                            ))
                        ) : (
                            <Text>No connected metro stations</Text>
                        )}
                    </VStack>
                </HStack>
                <HStack align="start" w="full">
                    <Text fontWeight="bold" color="teal.500">
                        Connected Railway Stations:
                    </Text>
                    <VStack align="start" w="full">
                        {station.connected_railway_stations && station.connected_railway_stations.length > 0 ? (
                            station.connected_railway_stations.map((rail, index) => (
                                <HStack key={index} w="full">
                                    <Icon as={FaTrain} color="green.400" />
                                    <Text>{rail.join(' - ')}</Text>
                                </HStack>
                            ))
                        ) : (
                            <Text>No connected railway stations</Text>
                        )}
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};
