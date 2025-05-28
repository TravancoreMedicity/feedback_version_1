import React, { memo } from 'react';
import { Box, Skeleton, Paper } from '@mui/material';

const CustomeFollowupSkeleton = () => {
    return (
        <Box sx={{
            width: '100%',
            minHeight: 260,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2
        }}>
            {/* Left Section */}
            <Box sx={{
                minWidth: '30%',
                maxWidth: '40%',
                minHeight: 240,
                py: 1
            }}>
                <Skeleton variant="rectangular" width="60%" height={125} sx={{ mb: 1 }} />

                {[...Array(4)].map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 0.2, mb: 1 }}>
                        <Box sx={{ width: '90%' }}>
                            <Skeleton variant="text" width="100%" height={20} />
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Right Section */}
            <Box sx={{
                minWidth: '70%',
                maxWidth: '60%',
                minHeight: 240,
                position: 'relative',
                mb: 1
            }}>
                <Box sx={{ width: '100%', minHeight: 120, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" width="40%" height={20} />
                    </Box>
                    <Paper variant='outlined' sx={{
                        minHeight: 90,
                        p: 1,
                        backgroundColor: "rgba(var(--bg-card))",
                    }}>
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                        <Skeleton variant="text" width="80%" height={20} />
                    </Paper>
                </Box>

                <Box sx={{ width: '100%', minHeight: 60 }}>
                    <Box sx={{ width: '100%', display: 'flex', gap: 1 }}>
                        <Skeleton variant="text" width="45%" height={20} />
                        <Skeleton variant="text" width="45%" height={20} />
                    </Box>
                    <Skeleton variant="rectangular" width={290} height={40} sx={{ mt: 2 }} />
                    <Skeleton variant="rectangular" width="95%" height={36} sx={{ mt: 2 }} />
                </Box>
            </Box>
        </Box>
    );
};

export default memo(CustomeFollowupSkeleton);
