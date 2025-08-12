import React from 'react';
import { Container, Box, Heading, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Text } from '@chakra-ui/react';

import { motion, AnimatePresence } from 'framer-motion';
import { bounceVariants } from './AboutUs.js';

export default () => {
    const faqs = [
        {
            question: 'What is the purpose of this platform?',
            answer: 'Our platform aims to streamline urban transportation by connecting railway and metro systems, providing users with real-time data and efficient route management.',
        },
        {
            question: 'How does the route search work?',
            answer: 'The route search utilizes an advanced algorithm to suggest the fastest routes between stations, taking into account real-time data and user preferences.',
        },
        {
            question: 'Can I save my favorite routes?',
            answer: 'Yes, users can save their favorite routes and stations for quick access and receive tailored suggestions based on their saved preferences.',
        },
        {
            question: 'Is my payment information secure?',
            answer: 'We use Stripe for secure payment processing, ensuring that all transactions are encrypted and secure.',
        },
        {
            question: 'How do I log in to the platform?',
            answer: 'You can log in using JWT or Google OAuth for a secure and convenient authentication process.',
        },
    ];

    return (
        <AnimatePresence>
            <motion.div
                variants={bounceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
        <Container maxW={'6xl'} py={8} centerContent>
            <Box maxW={'3xl'} width={'100%'} py={8} px={4} bg={'gray.50'} borderRadius={'md'} boxShadow={'md'}>
                <Heading mb={6} textAlign="center" color={'teal.600'}>
                    Frequently Asked Questions
                </Heading>
                <Accordion allowToggle>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} border='none' borderBottom='1px solid' borderColor='gray.200'>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'teal.100', color: 'teal.600' }} borderRadius='md'>
                                    <Box as='span' flex='1' textAlign='left'>
                                        {faq.question}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} bg={'white'} borderRadius={'md'} boxShadow={'sm'}>
                                <Text color={'gray.600'}>{faq.answer}</Text>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
        </Container>
        </motion.div>
        </AnimatePresence>
    );
};