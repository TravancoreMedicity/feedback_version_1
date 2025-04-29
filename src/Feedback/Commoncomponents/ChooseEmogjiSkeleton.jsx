import React from 'react';
import { Box, Skeleton } from '@mui/joy';

const EmojiSkeleton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: { xs: 3, sm: 5, md: 4 },
                px: 3,
                alignItems: 'center',
                mt: 3,
                mb: 2,
            }}
        >
            {/* Render circular skeletons for each placeholder */}
            {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="circular"
                    sx={{
                        width: { xs: 40, sm: 60 }, // Responsive width
                        height: { xs: 40, sm: 60 }, // Responsive height
                        borderRadius: '50%',
                        animation: 'waveAnimation 1.5s ease-in-out infinite',
                    }}
                />
            ))}
        </Box>
    );
};

export default EmojiSkeleton;
