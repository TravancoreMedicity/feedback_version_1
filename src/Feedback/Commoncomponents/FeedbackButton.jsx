import React, { memo, useCallback } from "react";
import { Box, Typography } from "@mui/joy";

import { iconMap } from "./Commondetal";


const FeedbackButton = ({ average, handlesubmit }) => {

    const findMostFrequent = useCallback((data) => {
        const feedbackValues = Object.values(data);
        if (feedbackValues?.length === 0) return null;
        const frequent = feedbackValues?.reduce((acc, feedback) => {
            acc[feedback] = (acc[feedback] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(frequent)?.reduce((a, b) => frequent[a] > frequent[b] ? a : b);
    }, []);

    const mostFrequentFeedback = findMostFrequent(average);

    const getIcon = (feedback) => {
        return iconMap[feedback] || iconMap["Very Satisfied"];
    };

    return (
        <Box

            sx={{
                color: "#333",
                bgcolor: 'white',
                fontSize: 14,
                fontWeight: "bold",
                width: { xs: 160, sm: 240 },
                height: { xs: 40, sm: 60 },
                borderRadius: "25px",
                boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
                mt: 2,
                position: 'relative',
                display: 'flex',
                alignItems: "center",
                justifyContent: "flex-end",
                pr: { xs: 3, sm: 5 },
                cursor: 'pointer'
            }}
            onClick={handlesubmit}
        >
            <Box
                sx={{
                    color: "#333",
                    fontSize: 14,
                    fontWeight: "bold",
                    width: { xs: 50, sm: 70 },
                    height: { xs: 50, sm: 70 },
                    borderRadius: "50%",
                    bgcolor: 'white',
                    position: 'absolute',
                    left: -10,
                    top: -5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'white',
                    cursor: "pointer"

                }}>
                {getIcon(mostFrequentFeedback)}
            </Box>
            <Typography sx={{
                fontSize: { xs: 13, sm: 16, md: 17, lg: 18 },
                color: '#1955AC',
            }}>Sent FeedBack</Typography>


        </Box>
    );
};

export default memo(FeedbackButton);
