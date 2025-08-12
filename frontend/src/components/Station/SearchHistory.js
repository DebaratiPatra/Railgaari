import { Box, Text, Flex, IconButton, useDisclosure, Collapse, Badge } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { getTrainStatus } from '../../redux/actions/trainActions';
import TrainInfoCard from '../Train/TrainInfoCard';
import { useState } from 'react';

export default function SearchHistory() {
  const { data: trains, error: err1 } = useSelector(state => state.GetSearchHistory);
  const { loading, data: train, error: err2 } = useSelector(state => state.GetTrainStatus);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const dispatch = useDispatch();

  const handleSearch = (trainNo, index) => {
    if (expandedIndex !== index) {
      dispatch(getTrainStatus(trainNo));
      setExpandedIndex(index);
    } else {
      setExpandedIndex(null); 
    }
  };

  return (
    <Box>
      {trains && trains.length > 0 ? (
        trains.map((entry, index) => {
          const temp = entry.split("-");
          return <Box key={index} mb={3} p={3} border='1px solid gray' borderRadius="md" backgroundColor='white'>
            <Flex justify="space-between" align="center">
              <Flex flexDirection="column">
                <Text><Badge colorScheme='blue'>{temp[0]}</Badge>{` ${temp[1]}`}</Text>
              </Flex>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                variant="outline"
                colorScheme="teal"
                size="sm"
                onClick={() => handleSearch(temp[0], index)}
              />
            </Flex>
            <Collapse in={expandedIndex === index} animateOpacity>
              {train && train.data && (
                <TrainInfoCard data={train.data} />
              )}
            </Collapse>
          </Box>
})
      ) : (
        <Text>No search history available.</Text>
      )}
    </Box>
  );
}
