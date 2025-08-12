import {
    Box, Button, Text, Heading,
    Collapse, Avatar, Stack, Divider,
    FormControl, useDisclosure,
    FormLabel,
    Switch,
    useToast
} from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { UserDetailsTable } from './UserDetailsTable.js';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getProfileAction, logoutUserAction } from '../../../redux/actions/userActions.js';


export default function UserProfile() {

    const dispatch = useDispatch();
    const { loading, isAuthenticated,user } = useSelector(state => state.GetUser);
    const isAdmin = user && user.role === 'admin' ? true : false;
    const navigate = useNavigate();
    const {
        isOpen: isOpenPersonalInformation,
        onToggle: onTogglePersonalInformation,
    } = useDisclosure();

    const {
        isOpen: isOpenAccountActions,
        onToggle: onToggleAccountActions,
    } = useDisclosure();

    const {
        isOpen: isOpenAdminActions,
        onToggle: onToggleAdminActions,
    } = useDisclosure();
    useEffect(() => {
        dispatch(getProfileAction());
    }, [dispatch])
    const handleSubmitLogout = () => {
        dispatch(logoutUserAction());
        navigate('/');
    }
    return (
        loading || !user ? 
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
         : <Box p={4} maxW="lg" mx="auto">
            <Stack spacing={6}>
                {/* User Information */}
                <Box textAlign="center">
                    {isAuthenticated && user.imageUrl ?
                        <Avatar
                            size={'xl'}
                            src={user.imageUrl}
                            cursor={'pointer'}
                        /> : <Avatar size={'xl'} />}
                    <Heading as="h2" mt={4}>{user.username}</Heading>
                    <Text fontSize="lg" color="gray.600">{user.email}</Text>
                    <Text fontSize="sm" color="gray.500">{user.role}</Text>
                </Box>

                {/* Email Alerts Switch */}
                <FormControl justifyContent='center' display='flex' alignItems='center'>
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Enable email alerts?
                    </FormLabel>
                    <Switch id='email-alerts' />
                </FormControl>

                {/* Personal Information Section */}
                <Box>
                    <Heading textAlign="center" as="h3" size="md" mb={4}>
                        <Button onClick={onTogglePersonalInformation} width="full" colorScheme="teal" variant="outline" cursor="pointer">
                            Personal Information
                        </Button>
                    </Heading>
                    <Collapse in={isOpenPersonalInformation} animateOpacity>
                        <UserDetailsTable user={user} />
                    </Collapse>
                </Box>

                {/* Account Actions Section */}
                <Box>
                    <Heading textAlign="center" as="h3" size="md" mb={4}>
                        <Button onClick={onToggleAccountActions} width="full" colorScheme="teal" variant="outline" cursor="pointer">
                            Account Actions
                        </Button>
                    </Heading>
                    <Collapse in={isOpenAccountActions} animateOpacity>
                        <Stack spacing={2} mt={2}>
                            <Button
                                as='a'
                                onClick={() => navigate('/change-password')}
                                colorScheme="teal"
                                width="full"
                                cursor="pointer"
                            >
                                Change Password
                            </Button>
                            <Button
                                as='a'
                                onClick={() => navigate('/saved-routes')}
                                colorScheme="teal"
                                width="full"
                                cursor="pointer"
                            >
                                View Saved Routes
                            </Button>
                            <Button
                                as='a'
                                onClick={handleSubmitLogout}
                                colorScheme="red"
                                width="full"
                                cursor="pointer"
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Collapse>
                </Box>

                {/* Admin Actions Section */}
                {isAdmin && (
                    <Box>
                        <Heading textAlign="center" as="h3" size="md" mb={4}>
                            <Button onClick={onToggleAdminActions} width="full" colorScheme="teal" variant="outline" cursor="pointer">
                                Admin Actions
                            </Button>
                        </Heading>
                        <Collapse in={isOpenAdminActions} animateOpacity>
                            <Stack spacing={2} mt={2}>
                                <Button
                                    as='a'
                                    onClick={() => {
                                        navigate('/admin/manage-user');
                                    }}
                                    colorScheme="teal"
                                    width="full"
                                    cursor="pointer"
                                >
                                    Manage Users
                                </Button>
                                <Button
                                    as='a'
                                    onClick={() => navigate('/admin/manage-station')}
                                    colorScheme="teal"
                                    width="full"
                                    cursor="pointer"
                                >
                                    Manage Stations
                                </Button>
                                <Button
                                    as='a'
                                    onClick={() => navigate('/admin/add-new-station')}
                                    colorScheme="teal"
                                    width="full"
                                    cursor="pointer"
                                >
                                    Add New Station
                                </Button>
                            </Stack>
                        </Collapse>
                    </Box>
                )}
            </Stack>
        </Box>
    );
}
