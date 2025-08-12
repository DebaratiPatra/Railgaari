'use client'

import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	Link as ChakraLink,
	useDisclosure,
	useColorModeValue,
	Stack,
	Text,
	Menu, Button,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { logoutUserAction } from '../../redux/actions/userActions'
import { useEffect } from 'react'


const Links = ['Home', 'Routes', 'About us']

const NavLink = ({ children, to, fontSize }) => (
	<ChakraLink
		px={2}
		py={1}
		fontSize={fontSize}
		rounded={'md'}
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('gray.200', 'gray.700'),
			color: useColorModeValue('teal.500', 'teal.200'),
		}}
		_activeLink={{
			fontWeight: 'bold',
			color: useColorModeValue('teal.600', 'teal.300'),
		}}
		href={to}
	>
		{children}
	</ChakraLink>
)

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const navigate = useNavigate()
	const { isAuthenticated, isLoggedOut,user } = useSelector(state => state.GetUser);
	const dispatch = useDispatch();
	useEffect(() => {
		if (isLoggedOut) {
			window.location.reload();
		}
	}, [isLoggedOut])
	const handleLogout = () => {
		dispatch(logoutUserAction());
	}

	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={'center'}>
						<Box>
							<Avatar
								size={'lg'}
								src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3W283tfdXjTlkQe_8K_Lp-oFXwpBCMknGgw&s"}
								cursor={'pointer'}
							/>
						</Box>
						<HStack as={'nav'} spacing={5} display={{ base: 'none', md: 'flex' }}>
							{Links.map((link) => (
								<NavLink key={link} >
									<Text onClick={() => navigate(link)}>{link}</Text>
								</NavLink>
							))}
						</HStack>
					</HStack>
					{!isAuthenticated ?
						<Flex alignItems={'center'}>
							<ChakraLink
								px={2}
								py={1}
								rounded={'md'}
								_hover={{
									textDecoration: 'none',
									bg: useColorModeValue('gray.200', 'gray.700'),
									color: useColorModeValue('teal.500', 'teal.200'),
								}}
							>
								<Text onClick={() => navigate('/login')}>Login</Text>
							</ChakraLink>
						</Flex>
						: <Flex alignItems={'center'}>
							<Menu>
								<MenuButton
									as={Button}
									rounded={'full'}
									variant={'link'}
									cursor={'pointer'}
									minW={0}>
									{user.imageUrl ?
										<Avatar
											size={'md'}
											src={user.imageUrl}
											cursor={'pointer'}
										/> : <Avatar size="md"/>}
								</MenuButton>
								<MenuList>
									<MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
									<MenuDivider />
									<MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
								</MenuList>
							</Menu>
						</Flex>

					}
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link} >
									<Text onClick={() => navigate(link)}>{link}</Text>
								</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	)
}
