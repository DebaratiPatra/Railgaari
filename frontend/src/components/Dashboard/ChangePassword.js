import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux";
import { putUserUpdatePassword } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError';

export default function ChangePassword() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const {loading,isUpdated,error} = useSelector(state=> state.IsUpdatedUser)
    const handleSubmit = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            notifyError("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            notifyError("Passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            notifyError("Password must be at least 6 characters long.");
            return;
        }

        dispatch(putUserUpdatePassword({
            oldPassword:oldPassword,
            newPassword:newPassword
        }));

    };
    useEffect(()=>{
        if(isUpdated) {
            notifySuccess("Password changed successfully.");
            navigate("/");
        }
        if(error) {
            notifyError(error);
        }
    },[isUpdated,error])

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading textAlign={'center'} lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Change Password
                </Heading>
                <Heading textAlign={'center'} lineHeight={1.1} fontSize={{ base: '0.5xl', md: 'xl' }}>
                    Email: {/* Add email here */}
                </Heading>

                {error && <Text color="red.500" fontSize="sm">{error}</Text>}

                {/* Old Password Field */}
                <FormControl>
                    <FormLabel>Enter Old Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showOldPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <InputRightElement>
                            <IconButton
                                icon={showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                variant="ghost"
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Link fontSize={'small'} color={'blue'} href='/forgot-password'>Forgot password?</Link>
                </FormControl>

                {/* New Password Field */}
                <FormControl>
                    <FormLabel>Enter New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <InputRightElement>
                            <IconButton
                                icon={showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                variant="ghost"
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                {/* Confirm New Password Field */}
                <FormControl>
                    <FormLabel>Confirm New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputRightElement>
                            <IconButton
                                icon={showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                variant="ghost"
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                {/* Submit Button */}
                <Stack spacing={6}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        onClick={handleSubmit}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}
