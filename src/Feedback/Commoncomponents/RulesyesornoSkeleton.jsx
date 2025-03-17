import { Box, Skeleton } from '@mui/joy';
import React from 'react';

export const RulesyesornoSkeleton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                mb: 3,
                pt: 1,
                mt: 3,
            }}
        >

            <Box
                sx={{
                    width: { xs: 40, sm: 60 },
                    height: { xs: 40, sm: 60 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Skeleton
                    variant="circular"
                    sx={{
                        width: '90%',
                        height: '90%',
                        bgcolor: 'grey.300',
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: { xs: 40, sm: 60 },
                    height: { xs: 40, sm: 60 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Skeleton
                    variant="circular"
                    sx={{
                        width: '90%',
                        height: '90%',
                        bgcolor: 'grey.300',
                    }}
                />
            </Box>
        </Box>
    );
};
