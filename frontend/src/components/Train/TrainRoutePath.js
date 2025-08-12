import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, useToast, Flex, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader } from '../../utils/Loader';
import { getTrainRoute } from '../../redux/actions/trainActions';
import StationStepper from './StationStepper';
import { daysOfWeek, months } from '../../utils/assets';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError';

const TrainRoutePath = () => {
    const { trainNo: params } = useParams();
    const [trainNo, setTrainNo] = useState(params);
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const notifyError = useNotifyError();
	const notifySuccess = useNotifySuccess();

    const { loading, data: trainData, err } = useSelector((state) => state.GetTrainStatus);
    

    useEffect(() => {
        dispatch(getTrainRoute(trainNo));
    }, [dispatch, trainNo]);

    useEffect(() => {
        setData(trainData);
        notifyError(err)
    }, [err, trainData]);

    if (loading) return <Loader />;

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
            maxW="600px"
            mx="auto"
        >
            <Heading
                as="h2"
                size={{ base: "lg", md: "xl" }}
                mb={6}
                textAlign="center"
                color="teal.500"
            >
                Train Number: {trainNo}
            </Heading>
            <Text fontSize="lg" mb={1} textAlign="center">
                {data && Array.isArray(data) ? (
                    <>
                        <Text as="span" fontWeight="bold">
                            {data[0]?.source_stn_name}
                        </Text>
                        {" to "}
                        <Text as="span" fontWeight="bold">
                            {data[data.length - 1]?.source_stn_name}
                        </Text>
                    </>
                ) : (
                    "N/A"
                )}
            </Text>

            <Text fontSize="lg" mb={2} textAlign="center">
                Distance: {data && Array.isArray(data) && data[data.length - 1].distance} km
            </Text>
            <Flex
                width="100%"
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection='column'
                maxW="600px"
                mx="auto"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                boxShadow="lg"
                p={4}
            >
                {data && Array.isArray(data) ? (
                    <StationStepper
                        stations={data.map(station => station.source_stn_name)}
                        distances={data.map(station => station.distance)}
                        lineColor="black"
                        arriveTimes={data.map(station => station.arrive)}
                        departTimes={data.map(station => station.depart)}
                        dayOfWeek={`${new Date().getDate()}-${months[new Date().getMonth()]}-${new Date().getFullYear()}/${daysOfWeek[new Date().getDay()]}`}
                    />
                ) : (
                    <p>No data available for this train.</p>
                )}
            </Flex>
        </Box>
    );
};

export default TrainRoutePath;
