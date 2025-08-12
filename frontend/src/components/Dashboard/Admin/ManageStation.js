import {
    Box, Flex, Text, IconButton, Collapse, Heading, Spinner, useToast,
    Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    ModalFooter, Button, ModalOverlay, InputGroup, InputRightAddon, Input,
    RadioGroup, Stack, useDisclosure, Radio,
} from '@chakra-ui/react';
import { DeleteIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getStation } from '../../../redux/actions/trainActions';
import { StationCardInfo } from './StationCardInfo';
import { useNotifyError, useNotifySuccess } from '../../../customHooks/useNotifyError';

export default function ManageStation() {
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [value, setValue] = useState('0');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const { loading, data, error } = useSelector(state => state.GetAllStation);
    const { loading: loading1, data: station, error: error1 } = useSelector(state => state.GetStation);
    const [AllStations, setAllStations] = useState(data ? data : []);

    const totalPages = Math.ceil(AllStations?.length / 5);
    const [currentStation, setCurrentStation] = useState(station);
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.200'
            borderRadius={'15px'}
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = useState(<OverlayOne />);

    const handleExpand = (index) => {
        if (expandedIndex !== index) {
            dispatch(getStation(AllStations[(page - 1) * 5 + index]));
            setExpandedIndex(index);
        } else {
            setExpandedIndex(null);
        }
    };
    useEffect(() => {
        if (value == 1) {
            const filteredStation = data.filter(station => station.station_type && station.station_type == 'Railway');
            setAllStations(filteredStation);
            setPage(1);
        } else if (value == 2) {
            const filteredStation = data.filter(station => station.station_type && station.station_type == 'Metro');
            setAllStations(filteredStation);
            setPage(1);
        } else if (value == 3) {
            const filteredStation = data.filter(station => station.station_type && station.station_type == 'Railway&Metro');
            setAllStations(filteredStation);
            setPage(1);
        } else {
            setAllStations(data ? data : []);
            setPage(1);
        }
    }, [value])

    const handleDelete = (user, index) => {
        // Logic for deleting a station
    };

    const handleSearchInput = (e) => {
        const filteredStation = data.filter(station => station.station_name && station.station_name.toLowerCase().startsWith(e.target.value.toLowerCase()));
        setAllStations(filteredStation);
        setPage(1);
    };

    const handlePageClick = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }

    };

    useEffect(() => {
        setAllStations(data);
    }, [data]);

    useEffect(() => {
        setCurrentStation(station);
    }, [station]);

    useEffect(() => {
        notifyError(error);
        notifyError(error1);
    }, [error,error1]);

    return (
        <>
            <Heading m={7} textAlign={'center'}>
                All Stations
            </Heading>

            <InputGroup m={5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Input placeholder='type...' border={'1px solid black'} onChange={handleSearchInput} htmlSize={15} width='auto' />
                <InputRightAddon>Search</InputRightAddon>
            </InputGroup>

            <RadioGroup m={5} display={'flex'} justifyContent={'center'} alignItems={'center'} onChange={setValue} value={value}>
                <Stack direction='row'>
                    <Radio value='0'>All</Radio>
                    <Radio value='1'>Railway</Radio>
                    <Radio value='2'>Metro</Radio>
                    <Radio value='3'>Railway&Metro</Radio>
                </Stack>
            </RadioGroup>

            <Box p={4} mt={15} mx={'auto'} maxW={'xl'}>
                {loading ? (
                    <Spinner display={'flex'} alignItems={'center'} justifyContent={'center'} size={'xl'} />
                ) : AllStations && AllStations.length > 0 ? (
                    AllStations.slice(5 * (page - 1), page * 5).map((station, index) => (
                        <Box key={index} mb={3} p={3} border='1px solid gray' borderRadius="md" backgroundColor='white'>
                            <Flex justify="space-between" align="center">
                                <Flex flexDirection="column">
                                    <Text>{station.station_name}</Text>
                                    <Text>{station.station_type}</Text>
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
                                            <ModalHeader>{station.station_name}</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Text>Confirm delete station?</Text>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button onClick={() => {
                                                    //handleDelete();
                                                    onClose();
                                                }}>Delete</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Flex>
                            </Flex>

                            <Collapse in={expandedIndex === index} animateOpacity>
                                {loading1 ? <Spinner display={'flex'} alignItems={'center'} justifyContent={'center'} size={'xl'} /> :

                                    station && <StationCardInfo station={currentStation} />}
                            </Collapse>
                        </Box>
                    ))
                ) : (
                    <Text textAlign={'center'}>No station available.</Text>
                )}
            </Box>

            <Box mt={10} display="flex" justifyContent="center" alignItems="center">
                <Flex gap={2}>
                    <IconButton
                        icon={<ArrowLeftIcon />}
                        aria-label="Previous page"
                        isDisabled={page === 1}
                        onClick={() => handlePageClick(page - 1)}
                        colorScheme="teal"
                        variant="outline"
                    />
                    <Button
                        colorScheme={'teal'}
                        variant={'solid'}
                    >
                        {page}
                    </Button>
                    <IconButton
                        icon={<ArrowRightIcon />}
                        aria-label="Next page"
                        isDisabled={page === totalPages}
                        onClick={() => handlePageClick(page + 1)}
                        colorScheme="teal"
                        variant="outline"
                    />
                </Flex>
            </Box>
        </>
    );
}
