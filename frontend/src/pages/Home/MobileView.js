
import { Box, Heading, Container } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { bounceVariants } from './HomePage.js';


export default function MobilePresentation() {
    const steps = [
        {
            title: 'Input Your Journey Details',
            description: 'Enter your starting station and destination. Our system will gather real-time data from metro and railway networks to suggest the fastest and most convenient routes for you.'
        },
        {
            title: 'Receive Optimal Routes & Real-Time Updates',
            description: 'Get instant recommendations for your route based on the latest schedules. You will receive real-time updates on train and metro timings, platform numbers, and potential delays to ensure a hassle-free journey.'
        },
        {
            title: 'Enjoy a Seamless Journey',
            description: 'After booking, sit back and enjoy your journey. Whether you’re on the metro or a train, our system keeps you updated on any changes in real-time. Arrive at your destination efficiently and stress-free.'
        }
    ];
    return (
        <AnimatePresence>
            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    variants={bounceVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Box padding={'5%'} textAlign={'center'}>
                        <Heading fontSize={'lg'}> {step.title} </Heading>
                        <Container>
                            {step.description}
                        </Container>
                    </Box>
                </motion.div>
            ))}
        </AnimatePresence>
    );
}