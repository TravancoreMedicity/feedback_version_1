import { Box, Typography } from '@mui/joy';
import React, { useState, useEffect, memo, useCallback } from 'react';



const successAnimation = require('../assets/successanimation.gif');
const successStatic = require('../assets/succespic.png');

const SuccessPage = ({ setIsSubmit, feedbackId, setOpen, getFeedbackData, PatientData, getDishcargePatientDetail }) => {

    const [showGif, setShowGif] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGif(false);
        }, 2200); // Adjust based on your GIF duration
        return () => clearTimeout(timer);
    }, []);




    // the funcition to return to website or go back when the user submit the Done after the feedback is Done
    const handleDone = useCallback(() => {
        // Open the new URL in a new tab
        if (feedbackId === "8" && PatientData !== undefined) {
            setOpen(false)
            getFeedbackData()
            getDishcargePatientDetail()
        } else {
            window.open("https://travancoremedicity.com/wellness-executive-health-care-center/", "_blank");
        }
        setIsSubmit(false);
        // Try closing the current tab 
        window.close();
    }, [setIsSubmit, setOpen, getFeedbackData, feedbackId, PatientData]);


    return (
        <Box sx={{
            width: feedbackId === "8" ? '100%' : '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: feedbackId === "8" ? "rgba(var(--bg-card))" : '#e9ecef',
            // bgcolor: '#e9ecef',
            // color: 'rgba(var(--font-primary-white))',
        }}>
            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(5px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
            {showGif ? (
                <img
                    src={successAnimation}
                    width={100}
                    height={100}
                    alt="Success"
                />
            ) : (
                <img
                    src={successStatic}
                    width={90}
                    height={90}
                    alt="Success"
                    style={{
                        opacity: showGif ? 0 : 1,
                        transform: `scale(${showGif ? 0.8 : 1})`,
                        transition: 'opacity 0.5s ease-in, transform 0.5s ease-in'
                    }}
                />
            )}

            {!showGif && (
                <Box sx={{ opacity: 1, animation: 'fadeIn 0.8s ease-in forwards', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography sx={{
                        fontSize: { xs: 14, sm: 14, md: 15, lg: 17 },
                        fontWeight: { xs: 500, sm: 500 },
                        // color: "rgba(11, 12, 12, 0.64)",
                        color: 'rgba(var(--font-primary-white))',
                        fontFamily: "Bahnschrift",
                        mt: 2,
                        mb: 0
                    }}>
                        Thanks for the Feedback
                    </Typography>
                    <Typography sx={{
                        fontSize: 11,
                        fontWeight: { xs: 500, sm: 500 },
                        // color: "rgba(8, 8, 8, 0.64)",
                        color: 'rgba(var(--font-primary-white))',
                        fontFamily: "Bahnschrift",
                    }}>
                        Travancore Medicity
                    </Typography>
                </Box>
            )}

            {
                !showGif && <Box
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        textAlign: 'center',
                        px: 2,
                        py: 0.4,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: '#E4166B',
                        fontSize: { xs: 12, sm: 14, md: 15, lg: 17 },
                        fontWeight: { xs: 500, sm: 500 },
                        // color: "rgba(8, 8, 8, 0.64)",
                        color: 'rgba(var(--font-primary-white))',
                        fontFamily: "Bahnschrift",
                        cursor: 'pointer'
                    }} onClick={handleDone}>
                    Done
                </Box>
            }

        </Box>
    );
}

export default memo(SuccessPage);
