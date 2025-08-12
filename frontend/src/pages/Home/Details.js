import { Box, Heading, SimpleGrid, Text, Icon } from '@chakra-ui/react';
import { FaNetworkWired } from 'react-icons/fa';
import { MdTrackChanges } from 'react-icons/md';
import { GiAbacus } from 'react-icons/gi';
import { AiOutlineUser } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { bounceVariants } from './HomePage.js';

export default function WhySmartTransportationComponent() {
    return (
        <AnimatePresence>

            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={'4%'} px={{ base: 4, md: 8 }}>
                <Heading m={'4%'} fontSize={{ base: '2xl', md: '2xl', lg: '3xl' }} mb={4}>
                    Why Choose Our Smart Transportation System?
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} px={{ base: 4, md: 8 }} textAlign={'center'}>
                    <motion.div
                        variants={bounceVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Icon as={FaNetworkWired} boxSize={12} color="pink.500" mb={4} />

                            <Box>
                                <Heading fontSize="lg">Real-Time Tracking</Heading>
                                <Text mt={2}>
                                    Effortlessly connects metro and railway systems, ensuring a smooth and hassle-free commute with unified ticketing and scheduling.
                                </Text>
                            </Box>
                        </Box>
                    </motion.div>
                    <motion.div
                        variants={bounceVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Icon as={MdTrackChanges} boxSize={12} color="pink.500" mb={4} />
                            <Box>
                                <Heading fontSize="lg">Seamless Connectivity</Heading>
                                <Text mt={2}>
                                    Stay informed with real-time updates on metro and train schedules and delays.
                                </Text>
                            </Box>
                        </Box>
                    </motion.div>
                    <motion.div
                        variants={bounceVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Icon as={GiAbacus} boxSize={12} color="pink.500" mb={4} />
                            <Box>
                                <Heading fontSize="lg">Efficient Route Planning</Heading>
                                <Text mt={2}>
                                    We simplify your commute by seamlessly connecting railways with metro systems, helping you travel faster and more efficiently.
                                </Text>
                            </Box>
                        </Box>
                    </motion.div>
                    <motion.div
                        variants={bounceVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Icon as={AiOutlineUser} boxSize={12} color="pink.500" mb={4} />
                            <Box>
                                <Heading fontSize="lg">User-Friendly Interface</Heading>
                                <Text mt={2}>
                                    Enjoy a modern and intuitive interface designed to provide the best user experience.
                                </Text>
                            </Box>
                        </Box>
                    </motion.div>
                </SimpleGrid>
            </Box>

        </AnimatePresence>
    )
}