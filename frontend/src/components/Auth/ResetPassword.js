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
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction, resetPasswordAction } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError';

export default function ResetPassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const { loading, isUpdated, email:reduxEmail, error } = useSelector(state => state.IsUpdatedUser)
    const [email,setEmail] = useState(reduxEmail);
    useEffect(()=>{
        setEmail(reduxEmail);
    },[reduxEmail])
    const handleSubmit = () => {
        if (!newPassword || !confirmPassword) {
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

        dispatch(resetPasswordAction({
            email: email,
            newPassword: newPassword
        }));

    };
    useEffect(() => {
        if (isUpdated) {
            notifySuccess("Password reset successfully.");
            dispatch(getProfileAction());
            navigate("/");
        }
        if (error) {
            toast({
                title: 'invalid',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }, [isUpdated, error])

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
                    Reset Password
                </Heading>
                <Heading textAlign={'center'} lineHeight={1.1} fontSize={{ base: '0.5xl', md: 'xl' }}>
                    Email: {email}
                </Heading>

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
