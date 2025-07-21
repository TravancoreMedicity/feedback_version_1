import React, { memo } from 'react';
import { Box, Skeleton } from '@mui/material';

const ChecklistCardSkeleton = ({ bgcolor }) => {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'rgba(var(--bg-card))',
                fontFamily: 'var(--font-varient)',
                my: 2,
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    height: { xs: 90, sm: 100 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(var(--bg-common))',
                    borderWidth: 1.5,
                    borderRadius: 5,
                    paddingRight: '10px',
                    borderColor: 'rgba(var(--border-primary))',
                    p: 1,
                }}
            >
                {/* Left: Vertical BDC No. */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: bgcolor,
                            px: 1.5,
                            py: 0.4,
                            height: { xs: 90, sm: 100 },
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            mr: 1,
                        }}
                    >
                        {[...Array(5)].map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="text"
                                width={12}
                                height={14}
                                sx={{ bgcolor: '#ffffff33', my: 0.3 }}
                            />
                        ))}
                    </Box>

                    {/* Center: Text Details */}
                    <Box sx={{ width: { xs: 80, sm: 150 } }}>
                        <Skeleton variant="text" height={16} sx={{ mb: 0.5 }} />
                        <Skeleton variant="text" height={16} sx={{ mb: 0.5 }} />
                        <Skeleton variant="text" height={16} />
                    </Box>
                </Box>

                {/* Middle: Status */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Skeleton variant="text" width={60} height={16} sx={{ mb: 1 }} />
                    <Skeleton variant="circular" width={20} height={20} />
                </Box>

                {/* Right: Button Skeleton */}
                <Skeleton
                    variant="rectangular"
                    width={90}
                    height={30}
                    sx={{
                        borderRadius: 2,
                        display: { xs: 'block', sm: 'none' },
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    width={130}
                    height={40}
                    sx={{
                        borderRadius: 2,
                        display: { xs: 'none', sm: 'block' },
                    }}
                />
            </Box>
        </Box>
    );
};

export default memo(ChecklistCardSkeleton);
