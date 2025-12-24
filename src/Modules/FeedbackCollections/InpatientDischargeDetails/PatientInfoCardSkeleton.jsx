import React, { memo } from 'react';
import { Box, Skeleton } from '@mui/material';

const PatientInfoCardSkeleton = () => {
    return (
        <Box
            sx={{
                width: '100%',
                px: 1,
                py: 2,
                height: 160,
                backgroundColor: 'rgba(var(--bg-card))',
                border: '0.03px solid rgba(var(--border-primary))',
                borderRadius: 2,
                display: 'flex',
                mt: 1
            }}
        >
            {/* LEFT SECTION */}
            <Box
                sx={{
                    width: { xs: '60%', md: '80%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    ml: 1,
                    gap: 0.8
                }}
            >
                <Skeleton level="body-sm" sx={{ width: { xs: '90%', sm: "40%" }, border: '0.03px solid rgba(var(--border-primary))', }} />

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton level="body-xs" width={20} sx={{ border: '0.03px solid rgba(var(--border-primary))', }}
                        height={20} variant='circular' />
                    <Skeleton level="body-xs" sx={{ width: { xs: '30%', sm: "10%" }, border: '0.03px solid rgba(var(--border-primary))', }} />
                    <Skeleton level="body-xs" width={20} sx={{ border: '0.03px solid rgba(var(--border-primary))', }}
                        height={20} variant='circular' />
                    <Skeleton level="body-xs" sx={{ width: { xs: '30%', sm: "10%" }, border: '0.03px solid rgba(var(--border-primary))', }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton level="body-xs" sx={{ width: { xs: '40%', sm: "15%" }, border: '0.03px solid rgba(var(--border-primary))', }} />
                    <Skeleton level="body-xs" sx={{ width: { xs: '40%', sm: "15%" }, border: '0.03px solid rgba(var(--border-primary))', }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton level="body-xs" width={20}
                        height={20} variant='circular' sx={{ border: '0.03px solid rgba(var(--border-primary))', }} />
                    <Skeleton level="body-xs" sx={{ width: { xs: '30%', sm: "10%" }, border: '0.03px solid rgba(var(--border-primary))', }} />
                    <Skeleton level="body-xs" width={20}
                        height={20} variant='circular' sx={{ border: '0.03px solid rgba(var(--border-primary))', }} />
                    <Skeleton level="body-xs" sx={{ width: { xs: '30%', sm: "10%" }, border: '0.03px solid rgba(var(--border-primary))', }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Skeleton level="body-xs" sx={{ width: { xs: '40%', sm: "15%" }, border: '0.03px solid rgba(var(--border-primary))', }} />
                    <Skeleton
                        variant="rectangular"
                        width={50}
                        height={15}
                        sx={{ borderRadius: 10, border: '0.03px solid rgba(var(--border-primary))', }}
                    />
                </Box>
            </Box>

            {/* RIGHT SECTION */}
            <Box sx={{ width: { xs: '40%', md: '20%' }, height: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        px: 0.2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mx: { xs: 2, lg: 1 },
                            height: '50%',
                        }}
                    >
                        {[1, 2].map(i => (
                            <Skeleton

                                key={i}
                                variant="rectangular"
                                width={40}
                                height={40}
                                sx={{ borderRadius: 6, border: '0.03px solid rgba(var(--border-primary))', }}
                            />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '50%' }}>
                        {[1, 2].map(i => (
                            <Skeleton
                                key={i}
                                variant="rectangular"
                                width="35%"
                                height='90%'
                                sx={{ borderRadius: 2, border: '0.03px solid rgba(var(--border-primary))', }}
                            />
                        ))}
                    </Box>


                </Box>
            </Box>
        </Box>
    );
};

export default memo(PatientInfoCardSkeleton);
