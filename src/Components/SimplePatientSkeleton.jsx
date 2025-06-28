import React, { memo } from 'react';
import { Box, Skeleton } from '@mui/material';

const SimplePatientSkeleton = () => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                borderRadius: 5,
                bgcolor: 'rgba(var(--qustion-box))',
                p: 1,
                mt: 1
            }}>
            <Box
                sx={{
                    width: '100%',
                    minHeight: 160,
                    display: 'flex',
                    flexDirection: 'column',
                    px: 2
                }}>
                {/* Circular image placeholder */}
                <Box
                    sx={{
                        width: '40%',
                        height: 95,
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: '#ebebeb'
                    }}>
                    <Skeleton variant="circular" width={90} height={90} />
                </Box>

                {/* Placeholder text lines for patient info */}
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />

                {/* Review section */}
                <Box sx={{ width: '100%', minHeight: 80, my: 1 }}>
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="90%" height={15} />
                </Box>
            </Box>
        </Box>
    );
};

export default memo(SimplePatientSkeleton);
