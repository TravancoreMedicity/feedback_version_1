import { Box } from '@mui/material'
import React, { memo } from 'react'
import FormLabel from '@mui/joy/FormLabel';
import { LinearProgress, Typography } from '@mui/joy';

const FeedbackCategoryProgress = ({ count, mark }) => {
    // caculating the percenteage with the count and mark 
    const percentage = count > 0 ? Math?.min((mark / (count * 5)) * 100, 100) : 0;


    return (
        <Box>
            <FormLabel sx={{ fontSize: 12, flex: 9 }}>
                <LinearProgress
                    determinate
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    thickness={6}
                    value={Math.min(percentage, 100)}
                    sx={{
                        '--LinearProgress-radius': '12px',
                        '--LinearProgress-thickness': '12px',
                        bgcolor: 'white',
                        color: 'rgba(213,82,155,0.5)',
                        height: 12
                    }}
                >
                    <Typography
                        fontSize={12}
                        sx={{
                            mixBlendMode: 'difference',
                            color: 'white'
                        }}
                    >
                        {/* Progress &nbsp; */}
                        {`${Math?.round(Number(percentage))}%`}
                    </Typography>
                </LinearProgress>
            </FormLabel>
        </Box>
    )
}

export default memo(FeedbackCategoryProgress)