import { ChevronDownIcon, Icon } from '@chakra-ui/icons';
import {
    Heading, Input, Box, Text, UnorderedList, ListItem, Button,
    FormControl, FormLabel,
    useToast,
    Badge
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSwapVerticalCircle } from "react-icons/md";
import { clearGetshortestPath, getShortestPath } from '../../redux/actions/trainActions';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError';
import ListComponent from '../../utils/ListComponent';
import InputComponent from '../../utils/InputComponent';

export default function StationSearch() {
    const [openSourceStations, setOpenSourceStations] = useState(false);
    const [openDestinationStations, setOpenDestinationStations] = useState(false);
    const [filteredSource, setFilteredSource] = useState([]);
    const [filteredDestination, setFilteredDestination] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifyError = useNotifyError();
    const { loading: loading1, error: err1, data = [] } = useSelector(state => state.GetAllStation);

    const filterStations = (stationInput) => {
        return data
            .filter(station => station.station_name && station.station_name.toLowerCase().startsWith(stationInput.toLowerCase()));
    }



    const handleSourceSelection = (stationName) => {
        setSource(stationName);
        setOpenSourceStations(false);
    }

    const handleDestinationSelection = (stationName) => {
        setDestination(stationName);
        setOpenDestinationStations(false);
    }

    const handleSearch = () => {
        if (source === '' || destination === '') {
            notifyError("Enter source or destination");
            return;
        }
        dispatch(getShortestPath(source, destination));
        navigate('/get-shortest-path');
    }
    const handleStationSwap = () => {
        const temp = source;
        setSource(destination);
        setDestination(temp);
    }

    return (
        <Box>
            <Heading as="h2" textAlign="center" mb={4}>
                Find Your Route
            </Heading>

            <Box mb={4}>
                <FormControl id="source" mb={4}>
                    <InputComponent 
                        title="Source"
                        source={source}
                        placeholder="From"
                        handleOnchange={(e) => {
                            setSource(e.target.value);
                            setFilteredSource(filterStations(e.target.value).slice(0, 10));
                            if (e.target.value.length != 0) setOpenSourceStations(true);
                            else setOpenSourceStations(false);
                            setOpenDestinationStations(false);
                        }} 
                    />
                    {openSourceStations && <ListComponent 
                        filteredItem={filteredSource}
                        handleItemSelection={handleSourceSelection}
                    />}
                </FormControl>

                <MdOutlineSwapVerticalCircle size={35} cursor={'pointer'} onClick={handleStationSwap} />

                <FormControl id="destination" mb={4}>
                    <InputComponent 
                        title="Destination"
                        source={destination}
                        placeholder="To"
                        handleOnchange={(e) => {
                            setDestination(e.target.value);
                            setFilteredDestination(filterStations(e.target.value).slice(0, 10));
                            if (e.target.value.length != 0) setOpenDestinationStations(true);
                            else setOpenDestinationStations(false);
                            setOpenSourceStations(false);
                        }}  
                    />
                    {openDestinationStations && 
                        <ListComponent 
                            filteredItem={filteredDestination}
                            handleItemSelection={handleDestinationSelection}
                        />}
                </FormControl>

                <Button w='100%' colorScheme="teal" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
        </Box>
    );
}