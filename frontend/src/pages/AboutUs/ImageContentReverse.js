import { motion, AnimatePresence } from 'framer-motion';
import { bounceVariants } from './AboutUs.js';

import { Box, Image, Heading, Text } from '@chakra-ui/react';

export default function ImageContentReverse({ imageUrl, textHeading, textContent, reverse = false }) {
    return (
        <AnimatePresence>
            <motion.div
                variants={bounceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexWrap={'wrap'}
            p={6}
            borderRadius={'md'}
            flexDirection={reverse ? 'row-reverse' : 'row'} 
        >
            <Box p={4}>
                <Image
                    borderRadius='20px'
                    boxSize='250px'
                    src={imageUrl}
                    alt={textHeading}
                />
            </Box>
            <Box p={4} maxW="500px">
                <Heading as='h2' size='xl' mb={6}>
                    {textHeading}
                </Heading>
                <Text fontSize="lg">
                    {textContent}
                </Text>
            </Box>
        </Box>
        </motion.div>
        </AnimatePresence>
    );
}
