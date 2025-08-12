import React, { useState } from 'react';
import { Box, Heading, Container, useBreakpointValue, IconButton, Stack, Button, Link, Text } from '@chakra-ui/react';
import Slider from 'react-slick'; // Make sure react-slick is installed
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


export default function SliderWithImage() {
    const [slider, setSlider] = useState(null);

    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '10px' });
    const navigate = useNavigate();

    // Dynamically set the height and width based on screen size
    const containerHeight = useBreakpointValue({ base: '50vh', md: '80vh', lg: '100vh' });
    const imageSize = useBreakpointValue({ base: '90%', md: '80%', lg: '100%' });

    const cards = [
        {
            url: 'https://etimg.etb2bimg.com/photo/103791968.cms',
            title: 'Seamless Metro Integration',
            text: 'Connecting metro systems with railways to streamline your daily commute.',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kolkata_Metro_CRRC_Dalian_rake_2.png',
            title: 'Advanced Technology',
            text: 'Leveraging cutting-edge technology for real-time updates and optimized routes.',
        },
        {
            url: 'https://assets-news.housing.com/news/wp-content/uploads/2021/05/28205417/DMRC-metro-rail-network-All-you-need-to-know-FB-1200x700-compressed.jpg',
            title: 'Smart Transportation',
            text: 'A smarter way to travel with integrated systems and user-friendly features.',
        },
    ];

    const settings = {
        dots: true,
        arrows: false,
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Box height={containerHeight} width="full" overflow="hidden" position="relative">
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />

            <IconButton
                aria-label="left-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                left={side}
                top={top}
                transform="translate(0%, -50%)"
                zIndex={2}
                onClick={() => slider?.slickPrev()}
            >
                <BiLeftArrowAlt />
            </IconButton>

            <IconButton
                aria-label="right-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                right={side}
                top={top}
                transform="translate(0%, -50%)"
                zIndex={2}
                onClick={() => slider?.slickNext()}
            >
                <BiRightArrowAlt />
            </IconButton>

            <Slider {...settings} ref={setSlider}>
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        height={containerHeight}
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        backgroundImage={`url(${card.url})`}
                        width={imageSize} // Set image width dynamically
                    >
                        <Container size="container.lg" height="100%" position="relative">
                            <Stack
                                spacing={6}
                                w={'full'}
                                maxW={'lg'}
                                position="absolute"
                                top="50%"
                                transform="translate(0, -50%)"
                            >
                                <Heading
                                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                                    color="white"
                                    textShadow="1px 1px 2px black"
                                >
                                    {card.title}
                                </Heading>
                                <Text fontSize={{ base: 'md', lg: 'lg' }} color="white" textShadow="1px 1px 2px black">
                                    {card.text}
                                </Text>
                                <Button colorScheme="pink" variant={'solid'} width={'90%'}>
                                    <Text onClick={()=> navigate("/routes")}>Search Routes</Text>
                                </Button>
                            </Stack>
                        </Container>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
