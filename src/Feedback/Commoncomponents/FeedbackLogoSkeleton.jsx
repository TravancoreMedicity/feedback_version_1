import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const LogoSkeleton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                gap: 1
            }}
        >
            <Skeleton
                variant="circular"
                width={60}
                height={60}
                sx={{
                    background: 'linear-gradient(45deg,rgba(123, 31, 162, 0.59),rgba(194, 24, 92, 0.6),rgba(25, 118, 210, 0.62))'
                }}
            />
            <Box>
            <Skeleton
                variant="text"
                width={150}
                height={40}
                sx={{
                    fontSize: '2rem'
                }}
            />
            <Skeleton
                variant="text"
                width={120}
                height={30}
                sx={{
                    fontSize: '1.5rem'
                }}
            />
            </Box>
        </Box>
    );
};

export default LogoSkeleton;
