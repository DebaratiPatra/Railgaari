import {
    Box, Flex, Text, IconButton, Collapse, useDisclosure,
    Heading,
    Spinner,
    useToast,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    ModalOverlay,
} from '@chakra-ui/react';
import { DeleteIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUsers, getSingleUser } from '../../../redux/actions/adminActions';
import { UserCardInfo } from './UserCardInfo';
import { useNotifyError, useNotifySuccess } from '../../../customHooks/useNotifyError';

export default function ManageUser() {
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const { loading, allUsers, singleUser, error } = useSelector(state => state.GetAllUser);

    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )
    
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = useState(<OverlayOne />)
    const handleExpand = (index) => {
        if (expandedIndex !== index) {
            dispatch(getSingleUser(allUsers[index]._id));
            setExpandedIndex(index);
        } else {
            setExpandedIndex(null);
        }
    };

    const handleDelete = (user, index) => {
        dispatch(deleteUser(user._id));
        dispatch(getAllUsers());
    };
    useEffect(() => {
        notifyError(error);
    }, [error])
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])
    return (
        <>
            <Heading textAlign={'center'}>
                All Users
            </Heading>
            <Box p={4} mt={15} mx={'auto'} maxW={'xl'}>
                {loading ?
                    <Spinner display={'flex'} alignItems={'center'} justifyContent={'center'} size={'xl'} />
                    : allUsers && allUsers.length > 0 ? (
                        allUsers.map((user, index) => (
                            <Box key={index} mb={3} p={3} border='1px solid gray' borderRadius="md" backgroundColor='white'>
                                <Flex justify="space-between" align="center">
                                    <Flex flexDirection="column">
                                        <Text>{user.username}</Text>
                                        <Text>{user.email}</Text>
                                    </Flex>
                                    <Flex>
                                        <IconButton
                                            aria-label="Expand"
                                            icon={expandedIndex === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                            variant="outline"
                                            colorScheme="teal"
                                            size="sm"
                                            onClick={() => handleExpand(index)}
                                            mr={2}
                                        />
                                        <IconButton
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                            variant="outline"
                                            colorScheme="red"
                                            size="sm"
                                            onClick={() => {
                                                setOverlay(<OverlayOne />);
                                                onOpen();
                                            }}
                                        />
                                        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                                            {overlay}
                                            <ModalContent>
                                                <ModalHeader>{user.username}</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Text>Confirm delete user?</Text>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={()=>{
                                                        handleDelete();
                                                        onClose();
                                                    }}>Delete</Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Flex>
                                </Flex>
                                <Collapse in={expandedIndex === index} animateOpacity>
                                    {singleUser && <UserCardInfo user={singleUser} />}
                                </Collapse>
                            </Box>
                        ))
                    ) : (
                        <Text textAlign={'center'}>No users available.</Text>
                    )}
            </Box>
        </>
    );
}
