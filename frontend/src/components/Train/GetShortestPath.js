import React, { useState, useEffect } from 'react';
import {
	Box, Button, Spinner, Accordion, AccordionItem, AccordionButton, AccordionPanel,
	AccordionIcon, Input, InputGroup, InputLeftAddon, VStack, UnorderedList, ListItem, Text, useToast,
	Badge
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableTrainsBtwn, getShortestPath } from '../../redux/actions/trainActions';
import { MdOutlineSwapVerticalCircle } from 'react-icons/md';
import StationStepper from './StationStepper';
import { Loader } from '../../utils/Loader';
import {useNavigate} from "react-router-dom";
import { addFavouriteRoute } from '../../redux/actions/userActions';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError';
import ListComponent from '../../utils/ListComponent';
import InputComponent from '../../utils/InputComponent';

const lineColorMap = {
	0: 'black',
	1: 'green',
	2: 'blue',
	3: 'pink',
	4: 'orange',
	5: 'purple',
};

export default function GetShortestPath() {
	const { loading: loading2, error: err2, data: data1 = [] } = useSelector(state => state.GetAllStation);
	const { loading: loading1, error: err1, distanceArray, stationArray, lineColorArray } = useSelector((state) => state.GetShortestPath);
	const dispatch = useDispatch();
	const notifyError = useNotifyError();
	const notifySuccess = useNotifySuccess();
	const navigate = useNavigate();
	const [source, setSource] = useState('');
	const [destination, setDestination] = useState('');
	const [sections, setSections] = useState('');
	const [openSourceStations, setOpenSourceStations] = useState(false);
	const [openDestinationStations, setOpenDestinationStations] = useState(false);
	const [filteredSource, setFilteredSource] = useState([]);
	const [filteredDestination, setFilteredDestination] = useState([]);

	const filterStations = (stationInput) => {
		return data1.filter(station => station.station_name && station.station_name.toLowerCase().startsWith(stationInput.toLowerCase()));
	}

	const handleSourceSelection = (stationName) => {
		setSource(stationName);
		setOpenSourceStations(false);
	}
	const handleStationSwap = () => {
		const temp = source;
		setSource(destination);
		setDestination(temp);
	}
	const handleDestinationSelection = (stationName) => {
		setDestination(stationName);
		setOpenDestinationStations(false);
	}
	useEffect(() => {

		if (stationArray?.length) {
			setSource(data1.at(stationArray[0])?.station_name || '');
			setDestination(data1.at(stationArray.at(-1))?.station_name || '');
			getSectionsByColor();

		}
		notifyError(err1);
	}, [stationArray, err1]);

	const handleSearch = () => {
		if (!source || !destination) {
			notifyError("Enter both source and destination");
			return;
		}
		dispatch(getShortestPath(source, destination));
	};

	const getSectionsByColor = () => {
		let sections = [];
		let currentSection = { stations: [], distances: [], color: lineColorArray[0][0] };

		lineColorArray.forEach((colors, index) => {
			if (colors.length >= 2) {
				currentSection.stations.push(stationArray[index]);
				currentSection.distances.push(distanceArray[index]);
				sections.push(currentSection);
				const temp = lineColorArray[index].filter(color => color !== currentSection.color);
				currentSection = { stations: [stationArray[index]], distances: [distanceArray[index]], color: temp[0] };

			} else {
				currentSection.stations.push(stationArray[index]);
				currentSection.distances.push(distanceArray[index]);
			}
		});
		sections.push(currentSection);
		setSections(sections);
	};
	const handleGetAvailableTrains = (color,src_stn_code,dstn_stn_code) => {
		if (color !== 0) {
			notifyError("We are working on it, soon it will open");
			return;
		}
		
		navigate(`/get-list-available-trains/${src_stn_code}/${dstn_stn_code}`)
	}
	const handleAddRoute = () => {
		if (source && destination) {
			const startId = data1.filter((station) => station.station_name === source);
			const endId = data1.filter((station) => station.station_name === destination);
			dispatch(addFavouriteRoute({ source: startId[0]._id, destination: endId[0]._id }));
			notifySuccess("Route added to favourite");
		}
	};

	return (
		<>
			<VStack m={4} display={'flex'} justifyContent={'center'} alignItems="center">

				<InputComponent 
					title={'Source'} 
					placeholder={'From'} 
					source={source} 
					handleOnchange={(e) => {
						setSource(e.target.value);
						setFilteredSource(filterStations(e.target.value).slice(0, 10));
						setOpenSourceStations(e.target.value.length !== 0);
						setOpenDestinationStations(false);
					}} 
				/>

				{openSourceStations && 
					<ListComponent 
						filteredItem={filteredSource} 
						handleItemSelection={handleSourceSelection} 
					/>
				}

				<MdOutlineSwapVerticalCircle size={35} cursor={'pointer'} onClick={() => {
					setSource(destination);
					setDestination(source);
				}} />

				<InputComponent 
					title={'Destination'} 
					placeholder={'To'} 
					source={destination} 
					handleOnchange={(e) => {
						setDestination(e.target.value);
						setFilteredDestination(filterStations(e.target.value).slice(0, 10));
						setOpenDestinationStations(e.target.value.length !== 0);
						setOpenSourceStations(false);
					}} 
				/>

				{openDestinationStations && 
					<ListComponent 
						filteredItem={filteredDestination} 
						handleItemSelection={handleDestinationSelection} 
					/>
				}

				<Button colorScheme="teal" onClick={handleSearch}>Search</Button>
				<Button onClick={handleAddRoute} isDisabled={!(source.length > 0 && destination.length > 0)}>Add to Favourite Route</Button>

			</VStack>

			{loading1 ? <Loader /> : (
				<Box ml={{ base: '10%', md: '15%', xl: '25%' }} mr={{ base: '10%', md: '15%', xl: '25%' }} mt={4}>
					<Accordion allowMultiple>
						{data1 && sections && sections.map((section, idx) => (
							<AccordionItem key={idx}>
								<h1>
									<AccordionButton
										p={4}
										bg={lineColorMap[section.color]}
										_hover={{ opacity: 0.9 }}
										borderRadius="md"
										color="white"
										style={{
											textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
										}}
										display={'flex'}
										flexDirection={'column'}
									>
										<Box display="flex" flex="1" gap={'10px'} justifyContent="space-around">
											<Box textAlign="center">
												{`${data1.at(section.stations[0]).station_name} to ${data1.at(section.stations[section.stations.length - 1]).station_name}`}
											</Box>
											<Box textAlign="center">
												{`${parseFloat(section.distances[section.distances.length - 1]).toFixed(2)} km`}
											</Box>
										</Box>
										<Box
											textAlign="center"
											mt={2}
											color="white"
											fontWeight="bold"
										>
											{section.color === 0 ? 'Railway' : `Metro - ${lineColorMap[section.color]} Line`}
											<AccordionIcon />
										</Box>
									</AccordionButton>
									<Box display="flex" justifyContent="center" mb={4}>
										<Button
											colorScheme="cyan"
											color="black"
											bg="cyan.400"
											_hover={{ bg: "cyan.300" }}
											_active={{ bg: "cyan.500" }}
											size={{ base: "md", md: "lg", xl: "xl" }}
											onClick={() => {
												handleGetAvailableTrains(section.color,data1.at(section.stations[0]).station_code.toUpperCase(),data1.at(section.stations[section.stations.length - 1]).station_code.toUpperCase());
											}}
										>
											{`Get available ${section.color === 0 ? "trains" : "metros"}`}
										</Button>
									</Box>
								</h1>
								<AccordionPanel pb={4}>
									<StationStepper
										stations={section.stations.map(stationId => data1.at(stationId).station_name)}
										distances={section.distances}
										lineColor={lineColorMap[section.color]}
										StepSeparatorValue={80}
									/>
								</AccordionPanel>
							</AccordionItem>
						))}
					</Accordion>
				</Box>

			)}
		</>
	);
}
