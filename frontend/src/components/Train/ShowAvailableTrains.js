import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";
import { Loader } from "../../utils/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { getAvailableTrainsBtwn } from "../../redux/actions/trainActions";
import { useNotifyError, useNotifySuccess } from "../../customHooks/useNotifyError";

const ShowAvailableTrains = () => {
    const { loading, error, data } = useSelector(state => state.GetAllAvailableTrains);
    const { source, destination } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifyError = useNotifyError();
	const notifySuccess = useNotifySuccess();
    const trainRefs = useRef([]); 

    useEffect(() => {
        dispatch(getAvailableTrainsBtwn({ source, destination }));
    }, [source, destination]);

    useEffect(() => {
        notifyError(error);
    }, [error]);

    useEffect(() => {
        if (!loading && data) {
            // Get current time in HH:mm format
            const currentTime = new Date();
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const currentTimeString = `${hours}.${minutes}`;

            // Find the index of the first train after the current time
            const closestTrainIndex = data.findIndex(train => train.from_time >= currentTimeString);

            // Scroll to the train element if it exists
            if (closestTrainIndex !== -1 && trainRefs.current[closestTrainIndex]) {
                trainRefs.current[closestTrainIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [loading, data]);

    return (
        loading ? <Loader />
            : !data && error ?
                <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                    <Text>{error}</Text>
                </Box>
                : <Box maxW="600px" mx="auto" px={4} py={6}>
                    {data && data.map((train, index) => (
                        <Box
                            key={index}
                            ref={(el) => trainRefs.current[index] = el}
                            border="1px solid #ddd"
                            borderRadius="8px"
                            p={4}
                            mb={4}
                            bg="white"
                            boxShadow="sm"
                            onClick={() => {
                                navigate(`/trains/${train.train_no}`);
                            }}
                        >
                            <Flex justify="space-between" align="center">
                                <Text fontWeight="bold">{train.train_no}</Text>
                                <Flex align="center">
                                    <Text>{convertTo12HourFormat(train.from_time)}</Text>
                                    <Text mx={2} fontWeight="bold">→</Text>
                                    <Text>{convertTo12HourFormat(train.to_time)}</Text>
                                </Flex>
                            </Flex>

                            {/* Second Row: Train Name and Running Days */}
                            <Flex justify="space-between" mt={2} fontSize="sm">
                                <Text fontStyle="italic">{train.train_name}</Text>
                                <Text>
                                    {train.running_days === "1111111"
                                        ? "RUNS DAILY"
                                        : train.running_days.split("").map((day, idx) => {
                                            const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
                                            return day === "1" ? weekdays[idx] : null;
                                        }).filter(Boolean).join(" ")}
                                </Text>
                            </Flex>
                        </Box>
                    ))}
                </Box>
    );
};

export default ShowAvailableTrains;
