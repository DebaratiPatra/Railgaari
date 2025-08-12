'use client'

import {
    Button, FormControl, Flex,
    Heading, Input, Stack,
    Text,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,Link,
    MenuItem,
    Select,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { forgotPasswordAction } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { MdErrorOutline } from 'react-icons/md';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError';


export default function ForgotPasswordForm() {
    const [inputField,setinputField] = useState("Email");
    const [inputFieldValue,setinputFieldValue] = useState("");
    const toast = useToast();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const {loading,isForgotPassword, error} = useSelector(state=>state.IsUpdatedUser)
    const handleSubmit = () => {
        if(inputFieldValue === '') {
            notifyError("All fields are required");
            return;
        }
        if(inputField==='email'){
            dispatch(forgotPasswordAction({
                email:inputFieldValue,
            }))
            
        }else if(inputField==='phoneNo') {
            dispatch(forgotPasswordAction({
                phoneNo:inputFieldValue,
            }))
        }else {
            dispatch(forgotPasswordAction({
                username:inputFieldValue,
            }))
        }
        
    }
    useEffect(()=>{
        if(isForgotPassword) {
            notifySuccess("OTP sent successfully");
            navigate("/verify-otp")
        }
        if(error) {
            notifyError(error);
        }
    },[isForgotPassword,error])
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
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forgot your password?
                </Heading>
                <Select onChange={(e)=>setinputField(e.target.value)} placeholder='Select method'>
                    <option value='username'>Username</option>
                    <option value='email'>Email</option>
                    <option value='phoneNo'>Phone No.</option>
                </Select>
                <FormControl id={inputField}>
                    <Input
                        placeholder= {`enter your ${inputField}`}
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        onChange={(e)=>setinputFieldValue(e.target.value)}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        isLoading={loading}
                        bg={'blue.400'}
                        color={'white'}
                        onClick={handleSubmit}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Request Reset
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}