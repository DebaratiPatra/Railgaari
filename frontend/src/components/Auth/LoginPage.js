'use client'
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { ArrowDownIcon, ArrowUpIcon, Icon } from '@chakra-ui/icons';
import { Flex, Box, FormControl, FormLabel, Link, Input, Checkbox, Stack, Button, Heading,
	Text, Menu, MenuButton, MenuItem, MenuList, useColorModeValue, useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { clearUsers, loginUserAction, googleLoginAction } from '../../redux/actions/userActions';
import { getLRUtrains } from '../../redux/actions/trainActions';
import { FcGoogle } from "react-icons/fc";
import {useNotifyError, useNotifySuccess} from '../../customHooks/useNotifyError';

export default function LoginPage() {

	const [inputField, setInputField] = useState("username");
	const [inputFieldValue, setinputFieldValue] = useState("");
	const [password, setPassword] = useState("");
	const toast = useToast();
	const navigate = useNavigate();
	const notifyError = useNotifyError();
	const notifySuccess = useNotifySuccess();
	const dispatch = useDispatch();
	const { loading, isAuthenticated, user, error } = useSelector(state => state.GetUser);


	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getLRUtrains());
			if(user && user.city) {
				navigate('/');
			}else {
				navigate('/complete-profile')
			}
			notifySuccess("Login successful");	
		}
		if (error) {
			notifyError(error);
			dispatch(clearUsers());
		}
	}, [dispatch, isAuthenticated, error]);
	const handleinputsubmit = (e) => {
		e.preventDefault();
		if (inputFieldValue != "" && password != "") {
			if (inputField === 'email') {
				dispatch(loginUserAction({
					email: inputFieldValue,
					password: password
				}))

			} else if (inputField === 'phoneNo') {
				if(inputField.length != 10) {
					notifyError("Enter valid phone Number");
					return;
				}
				dispatch(loginUserAction({
					phoneNo: inputFieldValue,
					password: password
				}))
			} else {
				dispatch(loginUserAction({
					username: inputFieldValue,
					password: password
				}))
			}
		} else {
			notifyError("Enter valid credentials");
		}

	}
	const googleLoginSuccess = async (response) => {

		try {
			if (response['code']) {
				dispatch(googleLoginAction(response['code']));
			}
		} catch (error) {
			notifyError("Something went wrong");
		}
	};


	const googleLoginFailure = () => {
		notifyError("Something went wrong");
	};

	const googleLogin = useGoogleLogin({
		onSuccess: googleLoginSuccess,
		onError: googleLoginFailure,
		flow: 'auth-code'
	})
	return (
		<Flex
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						enjoy all our cool features
					</Text>
				</Stack>
				<Button
					leftIcon={<Icon as={FcGoogle} boxSize="25px" />}
					colorScheme="white"
					variant="solid"
					color={'black'}
					border={'2px solid black'}
					onClick={googleLogin}
				>
					Contine With Google
				</Button>

				<Menu>
					<MenuButton as={Button} colorScheme="blue">
						Login using <ArrowDownIcon />
					</MenuButton>
					<MenuList>
						<MenuItem onClick={() => setInputField("username")}>Username</MenuItem>
						<MenuItem onClick={() => setInputField("email")}>Email</MenuItem>
						<MenuItem onClick={() => setInputField("phoneNo")}>Phone No.</MenuItem>
					</MenuList>
				</Menu>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>{inputField}</FormLabel>
							<Input onChange={(e) => setinputFieldValue(e.target.value)} type="email" />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input onChange={(e) => setPassword(e.target.value)} type="password" />
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}>
								<Text color={'blue.400'}><Link href='/forgot-password'>Forgot password?</Link></Text>
							</Stack>
							<Text>
								New User?{' '}
								<Link color='teal.500' onClick={() => navigate('/register')}>
									Register
								</Link>
							</Text>
							<Button
								isLoading={loading ? true : false}
								bg={'blue.400'}
								onClick={handleinputsubmit}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								spinnerPlacement='start'
							>Sign in</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}