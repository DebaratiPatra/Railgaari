import React, { useState } from 'react'
import { Box, UnorderedList, ListItem, Badge } from '@chakra-ui/react'


const ListComponent = ({filteredItem=[],handleItemSelection}) => {
    return   (
            <Box
                bg='white'
                boxShadow='md'
                border='1px solid gray'
                w='100%'
                p={2}
                mt={1}
                borderRadius="md"
                maxH="150px"
                overflowY="auto"
            >
                <UnorderedList styleType="none">
                    {filteredItem.length>0 && filteredItem.map((station, index) => (
                        <ListItem
                            key={index}
                            onClick={() => handleItemSelection(station.station_name)}
                            cursor="pointer"
                            pt={2}
                            pb={2}
                            textAlign={'left'}
                            borderRadius="md"
                            _hover={{ backgroundColor: "teal.100" }}
                            _active={{ backgroundColor: "teal.200" }}
                        >
                            <Badge colorScheme='blue'>{station.station_code}</Badge>{`${station.station_name}-${station.station_type}`}
                        </ListItem>
                    ))}

                </UnorderedList>
            </Box>
        )
  
}

export default ListComponent