import React, { memo } from 'react';
import { Box, Skeleton } from '@mui/joy';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';

const RoomSkeleton = () => {
    return (
        <Box
            sx={{
                width: 155,
                p: 1,
                position: 'relative'
            }}
        >
            {/* Card */}
            <Box
                sx={{
                    width: '100%',
                    height: 60,
                    borderRadius: 8,
                    backgroundColor: 'rgba(var(--bg-common))',
                    display: 'flex',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 0 10px rgba(0,0,0,0.15)'
                }}
            >
                {/* LEFT BED STRIP */}
                <Skeleton
                    variant="rectangular"
                    width={18}
                    height="100%"
                    animation="wave"
                    sx={{
                        borderRadius: 0,
                        backgroundColor: 'rgba(var(--bg-card))'
                    }}
                />

                {/* CONTENT */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        position: 'relative'
                    }}
                >
                    {/* Icon pulse */}
                    <HotelOutlinedIcon
                        sx={{
                            fontSize: 26,
                            color: 'rgba(249, 169, 9, 0.4)',
                            animation: 'pulse 1.6s infinite'
                        }}
                    />

                    {/* Room number skeleton */}
                    <Skeleton
                        variant="text"
                        width={60}
                        height={18}
                        animation="wave"
                        sx={{
                            borderRadius: 4
                        }}
                    />
                </Box>

                {/* SHIMMER OVERLAY */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background:
                            'linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent)',
                        animation: 'shimmer 1.6s infinite'
                    }}
                />
            </Box>

            {/* Animations */}
            <style>
                {`
                    @keyframes shimmer {
                        100% {
                            left: 100%;
                        }
                    }

                    @keyframes pulse {
                        0% { opacity: 0.4; }
                        50% { opacity: 0.9; }
                        100% { opacity: 0.4; }
                    }
                `}
            </style>
        </Box>
    );
};

export default memo(RoomSkeleton);
