import React from 'react';
import { Box, Stack, Container, Heading, Text, SimpleGrid, HStack, VStack, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { motion, AnimatePresence } from 'framer-motion';
import { bounceVariants } from './AboutUs.js';
export default function SlidingAnimation() {

    const cards = [
        {
            title: 'User-Centric Design',
            text: "Our system is designed for ease of use, allowing travelers to quickly search for routes and stations.",
            image: 'https://www.maptive.com/wp-content/uploads/2021/03/route-planner-multiple-stops-routes.jpg',
        },
        {
            title: 'Real-time Route Search',
            text: "Find the fastest routes between railway and metro stations.",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcT52-ejYxpF5UuyEJSFsN0pgPtIpUHTqyg&s',
        },
        {
            title: 'Saved Favorites',
            text: "Users can manage their favorite stations and routes.",
            image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202012/Screenshot_2020-12-07_at_1.44._1200x768.png?size=690:388',
        },
        {
            title: 'Shortest Path Algorithm',
            text: "We use an advanced algorithm to suggest the quickest routes between stations.",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsb-jrcE8Vr11MPoRuOtZGtvIwPyg6xXxqcQ&s',
        },
        {
            title: 'Personalized Experience',
            text: "Users can save their favorite routes, check previous searches, and receive tailored suggestions.",
            image: 'https://www.lifewire.com/thmb/9LILR_bPSZLFbsxlvr5gA-a3EsI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1047578412-692fa117cf86450287d8873eeb1a95c8.jpg',
        },
        {
            title: 'Secure Payments',
            text: "Our integration with Stripe allows for secure in-app payments.",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXa_IvYAo6UBJ5KPtIhHbh09SCSQda_sxv0w&s',
        }
    ];


    return (
        <AnimatePresence>
            <motion.div
                variants={bounceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Our Key Features</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
                    Discover the standout features of our service designed to enhance your experience. Each feature is tailored to provide you with seamless functionality and unparalleled ease of use, ensuring you get the most out of our platform.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                    {cards.map((feature, index) => (
                        <HStack key={index} align={'top'}>
                            <Box color={'green.400'} px={2}>
                                <Icon as={CheckIcon} />
                            </Box>
                            <VStack align={'start'}>
                                <Text fontWeight={600}>{feature.title}</Text>
                                <Text color={'gray.600'}>{feature.text}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
        </motion.div>
        </AnimatePresence>
    );
}

