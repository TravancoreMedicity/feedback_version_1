import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'

const QuestionText = ({ name, questid }) => {
    return (
        <Box sx={{
            width: '100%',
            height: 80,
            bgcolor: `rgba(var(--qustion-box))`,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            px: 3
        }}>

            <Typography sx={{
                fontFamily: "Bahnschrift",
                color: 'rgba(var(--font-primary-white))',
                fontSize: { xs: 12, sm: 18 },
                fontWeight: 600,
                // textAlign: 'center',
                mt: 1
            }}>{name}</Typography>
        </Box>
    )
}

export default memo(QuestionText)