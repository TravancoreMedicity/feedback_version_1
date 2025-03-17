import { Box, Typography } from '@mui/joy';
import React, { useState, useEffect } from 'react';

// const logo = require("../../src/assets/medicitylogo.png");
const logo = require("../../src/assets/medilogo.png");

const FeedBackLog = () => {

    const [scrolled, setScrolled] = useState(false);

    // Effect to handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll',    handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <Box
            sx={{
                width: '100%',
                height:{ xs:scrolled ? 80 : 90,sm:scrolled ? 100 : 120},
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                py: 1,
                bgcolor: 'white',
                padding: scrolled ? '10px 0' : '20px 0' ,
                transition: 'all 0.3s ease', 
            }}
        >
            <Box
                sx={{
                    width: { xs: scrolled ? 170 : 200, sm: scrolled ? 230 : 250 },
                    height:{ xs:scrolled ?80 : 90,sm:scrolled ?90 : 120},
                    transition: 'all 0.3s ease',
                    // bgcolor:'red'
                }}
            >
                <img
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'all 0.3s ease' // Smooth transition for image size
                    }}
                    src={logo}
                    alt="A beautiful landscape."
                />
            </Box>
        </Box>
    );
};

export default FeedBackLog;
