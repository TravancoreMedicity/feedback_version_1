import { Box, Skeleton } from '@mui/joy';
import React from 'react';

const QuestionBoxSkeleton = () => {
    return (
        <Box
            sx={{
                width: { xs: "90%", sm: '85%' },
                bgcolor: `rgba(166, 219, 229, 0.2)`,
                minHeight: 120,
                mt: 1,
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                px: 2,
            }}
        >
            
            <Skeleton
                variant="text"
                sx={{
                    width: { xs: "70%", sm: "60%" }, 
                    height: { xs: 25, sm: 30 }, 
                    mb: 1,
                    borderRadius: 2, 
                    animation: 'waveAnimation 1.5s ease-in-out infinite',
                }}
            />
            <Skeleton
                variant="text"
                sx={{
                    width: { xs: "60%", sm: "50%" }, 
                    height: { xs: 20, sm: 25 }, 
                    borderRadius: 2, 
                    animation: 'waveAnimation 1.5s ease-in-out infinite',
                }}
            />
        </Box>
    );
};

export default QuestionBoxSkeleton;
