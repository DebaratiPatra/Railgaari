import { Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepSeparator, StepTitle, StepDescription, Box, Heading, Container, useSteps } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { bounceVariants } from './HomePage.js';


export default function StepperForUser() {
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

    const { activeStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    return (
        <AnimatePresence>
            <motion.div
                variants={bounceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Box display={'flex'} justifyContent={'center'} m={'4%'} px={{ base: 4, md: 8 }}>
                    <Stepper index={activeStep} orientation='vertical' height='auto' gap='6'>
                        {steps.map((step, index) => (
                            <Step m={'4%'} key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink='0' textAlign={'center'}>
                                    <StepTitle fontSize={{ base: 'md', md: 'lg' }}>
                                        <Heading fontSize={'lg'}> {step.title} </Heading>
                                    </StepTitle>
                                    <StepDescription fontSize={{ base: 'sm', md: 'md' }}>
                                        <Container>
                                            {step.description}
                                        </Container>
                                    </StepDescription>
                                </Box>
                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
}
