'use client'

import {
    Flex, Box, FormControl, FormLabel, Link,
    Input, Stack, Button, Heading,
    Text, Menu, MenuButton, MenuItem, MenuList,
    Progress, Select,
    useColorModeValue,
    useToast,
    InputGroup,
    InputRightElement,
    IconButton,
    InputLeftAddon,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { clearUsers, registerUserAction } from '../../redux/actions/userActions.js';
import { useSelector, useDispatch } from "react-redux";
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError.js';
import ListComponent from '../../utils/ListComponent.js';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const [formStep, setFormStep] = useState(1);
    const [showPassword, setShowpassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const totalSteps = 3;
    const { loading, isAuthenticated, user, error } = useSelector(state => state.GetUser);
    const { loading: loading2, error: err2, data } = useSelector(state => state.GetAllStation);
    const [filteredRailStations, setFilteredRailStations] = useState();
    const [openRailStations, setOpenRailStations] = useState(false);
    const [nearestRailStation, setNearestRailStation] = useState('');
    const [nearestMetroStation, setNearestMetroStation] = useState('');
    const [filteredMetroStations, setFilteredMetroStations] = useState([]);
    const [openMetroStations, setOpenMetroStations] = useState(false);

    const filterStations = (stationInput, type) => {
        return data
            .filter(station => station.station_type !== type && station.station_name.toLowerCase().startsWith(stationInput.toLowerCase()));
    }
    const handleNearestRailStation = (stationName) => {
        setNearestRailStation(stationName);
        const station_id = data.find((station) => station.station_name === stationName)._id;
        setFormData({ ...formData, nearestRailStation: station_id });
        setOpenRailStations(false);
    }
    const handleNearestMetroStation = (stationName) => {
        setNearestMetroStation(stationName);
        const station_id = data.find((station) => station.station_name === stationName)._id;
        setFormData({ ...formData, nearestMetroStation: station_id });
        setOpenMetroStations(false);
    }
    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        city: '',
        nearestRailStation: '',
        nearestMetroStation: '',
        password: '',
        confirmPassword: ''
    });

    const nextStep = () => {
        setFormStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setFormStep((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };
    const navigate = useNavigate();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();

    const handleSubmit = () => {
        if(formData.phoneNumber.length != 10) {
            notifyError("Enter valid phone Number");
            return;
        }

        for (const key in formData) {
            if (formData[key] === '') {
                notifyError("Enter valid credentials");
                return;
            }
        }
        if (formData.confirmPassword !== formData.password) {
            notifyError("Passwords don't match");
            return;
        }
        
        dispatch(registerUserAction(formData));

    };
    useEffect(() => {
        if (isAuthenticated) {
            notifySuccess("Registration successful");
            navigate('/');
        }
        if (error) {
            notifyError(error);
            dispatch(clearUsers());
        }
    }, [dispatch, isAuthenticated, error])
    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Register new account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Enjoy all our cool features
                    </Text>
                    <Text>already account? <Link onClick={() => navigate('/login')}>Login</Link></Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>

                    {/* Progress bar */}
                    <Progress value={(formStep / totalSteps) * 100} size="sm" colorScheme="blue" mb={4} />

                    {formStep === 1 && (
                        <Stack spacing={4}>
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input type="text" value={formData.username} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="phoneNumber">
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="tel" value={formData.phoneNumber} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={formData.email} onChange={handleChange} />
                            </FormControl>
                            <Button
                                onClick={nextStep}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}>
                                Next
                            </Button>
                        </Stack>
                    )}
                    {formStep === 2 && (
                        <Stack spacing={4}>
                            <FormControl id="city">
                                <Select value={formData.city} id="city" onChange={handleChange} placeholder='Select city'>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Lucknow">Lucknow</option>
                                </Select>
                            </FormControl>
                            <FormControl >
                                <Text as={'b'} mb='8px'>Nearest Rail Station:</Text>
                                <InputGroup>
                                    <Input
                                        maxW={'100%'}
                                        value={nearestRailStation}
                                        onChange={(e) => {
                                            setNearestRailStation(e.target.value);
                                            setFilteredRailStations(filterStations(e.target.value, 'Metro'))
                                            if (e.target.value.length !== 0) setOpenRailStations(true);
                                            else setOpenRailStations(false)
                                        }}
                                        placeholder='Select'
                                    />
                                </InputGroup>

                                {openRailStations && (
                                    <ListComponent filteredItem={filteredRailStations} handleItemSelection={handleNearestRailStation} />
                                )}
                            </FormControl>
                            <FormControl>
                                <Text as={'b'} mb='8px'>Nearest Metro Station:</Text>
                                <InputGroup>
                                    <Input
                                        maxW={'100%'}
                                        value={nearestMetroStation}
                                        onChange={(e) => {
                                            setNearestMetroStation(e.target.value);
                                            setFilteredMetroStations(filterStations(e.target.value, 'Railway'));
                                            if (e.target.value.length !== 0) setOpenMetroStations(true);
                                            else setOpenMetroStations(false);
                                        }}
                                        placeholder='Select'
                                    />
                                </InputGroup>

                                {openMetroStations && (
                                    <ListComponent 
                                    filteredItem={filteredMetroStations} 
                                    handleItemSelection={handleNearestMetroStation} 
                                    />
                                )}
                            </FormControl>

                            <Button
                                onClick={nextStep}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}>
                                Next
                            </Button>
                            <Button
                                onClick={prevStep}
                                bg={'gray.400'}
                                color={'white'}
                                _hover={{ bg: 'gray.500' }}>
                                Back
                            </Button>
                        </Stack>
                    )}
                    {formStep === 3 && (
                        <Stack spacing={4}>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} />
                                    <InputRightElement>
                                        <IconButton
                                            icon={!showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            onClick={() => setShowpassword(!showPassword)}
                                            variant="ghost"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="confirmPassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} />
                                    <InputRightElement>
                                        <IconButton
                                            icon={!showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            variant="ghost"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                isLoading={loading ? true : false}
                                onClick={handleSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}>
                                Submit
                            </Button>
                            <Button
                                onClick={prevStep}
                                bg={'gray.400'}
                                color={'white'}
                                _hover={{ bg: 'gray.500' }}>
                                Back
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Stack>
        </Flex>
    )
}
