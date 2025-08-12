import {
  Box,
  Step,
  StepIndicator,
  StepSeparator,
  Stepper,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
} from '@chakra-ui/react';
import { convertTo12HourFormat } from '../../utils/convertTo12HourFormat';

const StationStepper = ({ stations, distances, arriveTimes, departTimes, lineColor, date, dayOfWeek }) => {
  
  return (
    <>
    { dayOfWeek && 
      <Heading as="h2" fontSize={{ base: 'lg', md: 'xl' }} color="black" textAlign="center" mb={{ base: 3, md: 5 }}>
        Date: {dayOfWeek}
      </Heading>
      }
      <Table variant="simple" width="100%">
        <Tbody>
          {stations.map((station, index) => {
            const arriveTime = arriveTimes && arriveTimes[index] ? convertTo12HourFormat(arriveTimes[index]) : null;
            const departTime = departTimes && departTimes[index] ? convertTo12HourFormat(departTimes[index]) : null;

            return (
              <Tr key={index}>
                <Td width="10px" p={{ base: 2, md: 4 }}>
                  <Stepper orientation="vertical" colorScheme={lineColor}>
                    <Step>
                      <StepIndicator
                        bgColor={lineColor}
                        borderColor="white"
                        color="white"
                        borderRadius="50%"
                        fontSize="lg"
                      >
                        {index + 1}
                      </StepIndicator>
                    </Step>
                  </Stepper>
                </Td>

                <Td textAlign="left" p={{ base: 2, md: 4 }} fontSize={'lg'}>
                  <Text fontWeight="bold" isTruncated maxWidth={{ base: '120px', md: '140px' }}>
                    {station}
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    {`${parseFloat(distances[index]).toFixed(2)} km`}
                  </Text>
                </Td>

                <Td textAlign="right" p={{ base: 2, md: 4 }} fontSize={'lg'}>
                  {arriveTime && (
                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      {`arr: ${arriveTime}`}
                    </Text>
                  )}
                  {departTime && (
                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      {`dep: ${departTime}`}
                    </Text>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default StationStepper;
