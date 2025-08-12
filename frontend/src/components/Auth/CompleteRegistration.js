import {
    Flex, Box, FormControl, FormLabel, Input, Button, Stack, Heading, useToast, Select, UnorderedList, ListItem
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUpdation, getProfileAction, putUserUpdate } from '../../redux/actions/userActions';
import { getSingleUser } from '../../redux/actions/adminActions';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError';

export default function CompleteRegistration() {
    const [city, setCity] = useState('');
    const [nearestRailStation, setNearestRailStation] = useState('');
    const [nearestMetroStation, setNearestMetroStation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [filteredRailStations, setFilteredRailStations] = useState([]);
    const [filteredMetroStations, setFilteredMetroStations] = useState([]);
    const [openRailStations, setOpenRailStations] = useState(false);
    const [openMetroStations, setOpenMetroStations] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const navigate = useNavigate();
    const { loading, isUpdated, error } = useSelector(state => state.IsUpdatedUser);
    const { user } = useSelector(state => state.GetUser);
    const { loading: loading2, error: err2, data: stations } = useSelector(state => state.GetAllStation);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!city || !nearestRailStation || !nearestMetroStation) {
            notifyError("All fields are required");
            return;
        }
        dispatch(putUserUpdate({
            ...formData,
            city:city,
            phoneNumber:phoneNumber
        }));
    };

    useEffect(() => {
        if (isUpdated) {
            notifySuccess("Registered successfully");
            dispatch(clearUpdation());
            dispatch(getProfileAction());
            navigate("/");
        }

        if (error) {
            notifyError(error);
        }
    }, [isUpdated, error]);

    const filterStations = (stationInput, type) => {
        return stations
            .filter(station => station.station_type === type && station.station_name.toLowerCase().includes(stationInput.toLowerCase()));
    };

    return (
        <Flex align={'center'} justify={'center'} bg={'gray.50'} minH={'100vh'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Complete Your Registration</Heading>
                </Stack>
                <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
                    <Stack spacing={4}>
                        <FormControl id="city" isRequired>
                            <FormLabel>City</FormLabel>
                            <Select onChange={(e) => {
                                setCity(e.target.value)
                               
                            }} placeholder='Select city'>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Pune">Pune</option>
                                <option value="Ahmedabad">Ahmedabad</option>
                                <option value="Lucknow">Lucknow</option>
                                <option value="Kanpur">Kanpur</option>
                                <option value="Nagpur">Nagpur</option>
                                <option value="Patna">Patna</option>
                                <option value="Guwahati">Guwahati</option>
                                {/* Add more city options as needed */}
                            </Select>
                        </FormControl>

                        <FormControl id="nearestRailStation" isRequired>
                            <FormLabel>Nearest Railway Station</FormLabel>
                            <Input
                                type="text"
                                value={nearestRailStation}
                                onChange={(e) => {
                                    setNearestRailStation(e.target.value);
                                    const filtered = filterStations(e.target.value, 'Railway');
                                    setFilteredRailStations(filtered);
                                    setOpenRailStations(e.target.value.length > 0);
                                }}
                            />
                            {openRailStations && (
                                <Box
                                    bg='white'
                                    boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'}
                                    border='1px solid gray'
                                    w='100%'
                                    p={2}
                                    mt={1}
                                    borderRadius="md"
                                    maxH="150px"
                                    overflowY="auto"
                                >
                                    <UnorderedList id="nearestRailStation" styleType="none">
                                        {filteredRailStations.map((station, index) => (
                                            <ListItem
                                                key={index}
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        nearestRailStation: station._id,
                                                    });
                                                    setOpenRailStations(false);
                                                    setNearestRailStation(station.station_name);
                                                }}
                                                cursor="pointer"
                                                p={2}
                                                borderRadius="md"
                                                _hover={{ backgroundColor: "teal.100" }}
                                                _active={{ backgroundColor: "teal.200" }}
                                            >
                                                {`${station.station_name} - ${station.station_type}`}
                                            </ListItem>
                                        ))}

                                    </UnorderedList>
                                </Box>
                            )}
                        </FormControl>

                        <FormControl id="nearestMetroStation" isRequired>
                            <FormLabel>Nearest Metro Station</FormLabel>
                            <Input
                                type="text"
                                value={nearestMetroStation}
                                onChange={(e) => {
                                    setNearestMetroStation(e.target.value);
                                    const filtered = filterStations(e.target.value, 'Metro');
                                    setFilteredMetroStations(filtered);
                                    setOpenMetroStations(e.target.value.length > 0);
                                }}
                            />
                            {openMetroStations && (
                                <Box
                                    bg='white'
                                    boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'}
                                    border='1px solid gray'
                                    w='100%'
                                    p={2}
                                    mt={1}
                                    borderRadius="md"
                                    maxH="150px"
                                    overflowY="auto"
                                >
                                    <UnorderedList id="nearestMetroStation" styleType="none">
                                        {filteredMetroStations.map((station, index) => (
                                            <ListItem
                                                key={index}
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        nearestMetroStation: station._id,
                                                    });
                                                    setOpenMetroStations(false);
                                                    setNearestMetroStation(station.station_name);
                                                }}
                                                cursor="pointer"
                                                p={2}
                                                borderRadius="md"
                                                _hover={{ backgroundColor: "teal.100" }}
                                                _active={{ backgroundColor: "teal.200" }}
                                            >
                                                {`${station.station_name} - ${station.station_type}`}
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                </Box>
                            )}
                        </FormControl>

                        <FormControl id="phoneNumber">
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <Input type="text" value={phoneNumber} onChange={(e) => {
                                setPhoneNumber(e.target.value)
                                
                            }} />
                        </FormControl>

                        <Stack spacing={10}>
                            <Button
                                isLoading={loading}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}
                                onClick={handleSubmit}
                            >
                                Complete Registration
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
