import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'

const TextComponent = ({ english, malayalam }) => {
    return (
        <Box sx={{
            mt: 1,
        }}>
            <Typography
                sx={{
                    fontSize: { xs: 15, sm: 18, md: 22, lg: 24 },
                    fontWeight: { xs: 500, sm: 400 },
                    // color: " rgba(65, 68, 68, 0.64)",
                    color: 'rgba(var(--font-primary-white))',
                    fontFamily: "Bahnschrift"
                }}

            >{english}</Typography>
            <Typography sx={{
                fontSize: { xs: 12, sm: 14, md: 15, lg: 17 },
                fontWeight: { xs: 500, sm: 500 },
                // color: " rgba(65, 68, 68, 0.64)",
                color: 'rgba(var(--font-primary-white))',
                fontFamily: "Bahnschrift"
            }}>   ({malayalam})
            </Typography>
        </Box>
    )
}

export default memo(TextComponent)