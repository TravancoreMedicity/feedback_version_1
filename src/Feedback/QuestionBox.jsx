import { Box, Typography } from '@mui/joy'
import React from 'react'

const QuestionBox = ({ english, malayalam, CurrentCompany }) => {
    return (
        <Box sx={{
            width: { xs: '100%', sm: '95%' },
            bgcolor: CurrentCompany === 1 ? 'rgba(var(--qustion-box))' : 'rgba(var(---kmc-qustion-box))', // kmc or tmc background
            minHeight: 90,
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            px: { xs: 1, sm: 2 },
            py: 2,
        }}>
            <Typography sx={{
                fontSize: { xs: 15, sm: 18, md: 22, lg: 24 },
                textAlign: 'center',
                fontWeight: { xs: 500, sm: 400 },
                color: 'rgba(var(--font-primary-white))',
                fontFamily: "Bahnschrift"
            }}>{english}</Typography>
            <Typography sx={{
                fontSize: { xs: 12, sm: 14, md: 15, lg: 17 },
                textAlign: 'center',
                fontWeight: { xs: 500, sm: 500 },
                color: 'rgba(var(--font-primary-white))',
                fontFamily: "Bahnschrift"
            }}>{malayalam}</Typography>

        </Box>
    )
}

export default QuestionBox