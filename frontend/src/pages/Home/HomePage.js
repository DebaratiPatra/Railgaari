import React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import SliderWithImage from './SliderWithImage.js';
import StepperForUser from './StepperContent.js';
import ContactUsForm from './ContactUs.js';
import MobilePresentation from './MobileView.js';
import WhySmartTransportationComponent from './Details.js';

export const bounceVariants = {
    hidden: {
        opacity: 0,
        y: 140,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 50,
            duration: 0.6,
        },
    },
};


export default function HomePage() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box>
            <SliderWithImage />
            <WhySmartTransportationComponent />
            {isMobile ? <MobilePresentation /> : <StepperForUser />}
            <ContactUsForm />
        </Box>
    );
}

