import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUpdation, forgotPasswordAction, putUserUpdate, verifyOTPAction } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError';


export const VerifyEmail = () => {
    const { user } = useSelector(state => state.GetUser);
    const { loading,isUpdated, isForgotPassword, isotpVerified, error } = useSelector(state => state.IsUpdatedUser)
    const [email, setEmail] = useState(user?.email || '');
    const [otp,setOtp] =  useState('');
    const [gototp, setGotOtp] = useState(false);
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRequestOTP = () => {
        if (email === '') {
            notifyError("All fields are required.");
            return;
        }

        dispatch(forgotPasswordAction({
            email
        }))
    };
    const handleVerifyOtp = ()=>{
        if (otp.length !== 6) {
            notifyError("All fields are required.");
            return;
        }
        dispatch(verifyOTPAction({
            email,
            otp
        }))
    }
    useEffect(()=>{
        if(user) {
            setEmail(user.email);
        }
    },[user])
    useEffect(() => {
        if (isForgotPassword) {
            notifySuccess("otp sent successfully");
            setGotOtp(true);
        }
        if (isotpVerified) {
            notifySuccess("otp verified successfully");
            dispatch(putUserUpdate({
                isEmailVerified:true
            }))
        }
        if(isUpdated) {
            notifySuccess("Profile updated successfully");
            dispatch(clearUpdation());
            navigate('/profile')
        }
        if (error) {
            notifyError(error);
        }
    }, [error, isUpdated, isForgotPassword, isotpVerified])
    return (
        <Box
            p={6}
            maxW="lg"
            mx="auto"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
        >
            <Stack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">Verify your Email</Text>
                <Input
                    placeholder="Enter your email"
                    value={email}
                    disabled={true}
                    color={'black'}
                />
                <Button isLoading={loading && !isForgotPassword} colorScheme="teal" onClick={handleRequestOTP}>
                    Request OTP
                </Button>
                {gototp && <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
                    <Text>Enter the OTP sent to your email:</Text>
                    <Input onChange={(e)=> setOtp(e.target.value)} value={otp} placeholder="Enter OTP" mt={2} />
                    <Button isLoading ={loading && !isotpVerified} onClick={handleVerifyOtp} colorScheme="teal" mt={4}>Verify OTP</Button>
                </Box>}
            </Stack>
        </Box>
    );
};
