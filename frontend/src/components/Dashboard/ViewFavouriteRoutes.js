import { Box, Button, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getShortestPath } from "../../redux/actions/trainActions";
import { useNotifyError, useNotifySuccess } from "../../customHooks/useNotifyError";


export default function ViewFavouriteRoutes() {
    const { user } = useSelector(state => state.GetUser);
    const favouriteRoutes = user?.favouriteRoutes || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const handleSearch = (source,destination) => {
        if (source === '' || destination === '') {
            notifyError("Enter source or destination");
            return;
        }
        dispatch(getShortestPath(source,destination));
        navigate('/get-shortest-path');
    }
    return (
        <Box
            p={4}
            border={'1px solid'}
            borderColor={'gray.200'}
            rounded={'md'}
            boxShadow={'sm'}
            maxW={{ base: '100%', md: '80%', lg: '60%' }}
            mx={'auto'}
            overflowX={'auto'}
            sx={{
                scrollbarWidth: 'auto', 
                scrollbarColor: '#3182ce #f1f1f1',
                '&::-webkit-scrollbar': {
                    height: '16px', 
                    background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#3182ce',
                    borderRadius: '10px',
                    border: '3px solid #f1f1f1',
                },
            }}
        >
            <Heading textAlign={'center'} fontSize={{ base: 'xl', md: "2xl", lg: "3xl" }} mb={4}>
                View Favourite Routes
            </Heading>

            <TableContainer>
                <Table variant='striped' colorScheme='white' width={'100%'}>
                    <Thead>
                        <Tr>
                            <Th>Go</Th>
                            <Th>Source</Th>
                            <Th>Destination</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {favouriteRoutes.map((route, index) => {
                            return <Tr key={index}>
                                <Td onClick={()=>{
                                        if(route && route.source && route.destination) {
                                            handleSearch(route.source.station_name,route.destination.station_name);
                                        }
                                    }}><ExternalLinkIcon /></Td>
                                {route&& route.source && <Td>{route.source.station_name}</Td>}
                                {route&& route.destination && <Td>{route.destination.station_name}</Td>}
                                <Td>
                                    <Button colorScheme="teal" size="sm">
                                        Remove
                                    </Button>
                                </Td>
                            </Tr>
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
