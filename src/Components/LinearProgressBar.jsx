// LinearProgressBar.jsx
import React, { memo } from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import { Box, Typography } from '@mui/joy';


const LinearProgressBar = ({ value }) => {
    return (
        <Box className="flex items-center w-[85%] gap-2">
            <LinearProgress
                determinate
                variant="outlined"
                color="neutral"
                size="sm"
                thickness={2}
                value={value}
                sx={{
                    '--LinearProgress-radius': '12px',
                    '--LinearProgress-thickness': '8px',
                    bgcolor: 'white',
                    color: '#D84B9A',
                    height: 8
                }}
            >
            </LinearProgress>
            <Typography
                fontSize={13}
                sx={{
                    mixBlendMode: 'difference',
                    fontSize: 13,
                    fontWeight: 400,
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))'
                }}>   {`${Math.round(Number(value))}%`}
            </Typography>
        </Box>

    );
};

export default memo(LinearProgressBar);
