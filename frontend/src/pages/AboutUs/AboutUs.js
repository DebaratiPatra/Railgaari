import React from "react";
import ImageContentReverse  from "./ImageContentReverse.js";
import SlidingAnimation from "./SlidingAnimation.js";
import FAQDropdown from "./FAQDropdown.js";

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


export default function AboutUs() {
    return (
        <>
            <ImageContentReverse
                textHeading={"Our Mission"}
                imageUrl={"https://www.thedigitalspeaker.com/content/images/2023/10/Futureo-of-Mobility-Keynote-Speaker.jpg"}
                textContent={"At Smart Transportation System, our mission is to streamline and enhance urban transportation by creating a seamless connection between railway and metro networks. Our solution empowers users with real-time data, easy route management, and personalized transit experiences to help them navigate the complexities of urban travel with ease."}
            />

            <ImageContentReverse
                reverse // Alternate the layout
                textHeading={"Our Vision"}
                imageUrl={"https://media.licdn.com/dms/image/D4D12AQFcZWsLKCZHTA/article-cover_image-shrink_720_1280/0/1675233967837?e=2147483647&v=beta&t=7y3zMjxXxKMHJ5lz0dSAZwewvvUIj6KfHXyi4Cyp5PY"}
                textContent={"We envision a future where urban transit is seamless, reducing travel time and making commutes stress-free. By integrating railway and metro systems, we aim to create a transportation experience that’s efficient, eco-friendly, and easy to use for everyone."}
            />

            <ImageContentReverse
                textHeading={"Our Values"}
                imageUrl={"https://media.licdn.com/dms/image/D5612AQEUUZqUIs1PZA/article-cover_image-shrink_720_1280/0/1705559284860?e=2147483647&v=beta&t=slVttKjQhdnCz-BN7LKpX5STWnEtwCVMmgD5HVyhKy0"}
                textContent={"We believe in innovation, efficiency, and user-centric solutions. Our commitment to continuous improvement and sustainability drives us to create smarter transportation options for cities of the future."}
            />

            <SlidingAnimation />
            <FAQDropdown />

        </>
    );
}
