import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import StationSearch from './RouteSearch.js';
import TrainSearch from '../Train/TrainSearch.js';
import SearchHistory from './SearchHistory.js';

export default function RoutePage() {
  return (
    <Box p={4} mt={10} maxW="xl" mx="auto">
      <Tabs size='md' align='center' variant='enclosed'>
        <TabList>
          <Tab>Route Search</Tab>
          <Tab>Train Search</Tab>
          <Tab>Search History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StationSearch />
          </TabPanel>
          <TabPanel>
            <TrainSearch />
          </TabPanel>
          <TabPanel>
            <SearchHistory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
