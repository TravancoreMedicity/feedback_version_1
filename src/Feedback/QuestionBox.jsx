import { Box, Typography } from '@mui/joy'
import React from 'react'

const QuestionBox = ({ english, malayalam }) => {
    return (
        <Box sx={{
            width: {xs:'100%',sm:'95%'},
            bgcolor:` rgba(166, 219, 229, 0.2)`,
            minHeight: 90,
            mt: 1,
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            px:{xs:1,sm:2},
            py:2,
            // bgcolor:'red'
        }}>
            <Typography sx={{
                fontSize: { xs: 15, sm: 18, md: 22, lg: 24 },
                textAlign: 'center',
                fontWeight: { xs: 500 ,sm:400},
                color: " rgba(65, 68, 68, 0.64)",
                 fontFamily: "Bahnschrift"
            }}>{english}</Typography>
            <Typography sx={{
                fontSize:{ xs: 12, sm: 14, md: 15, lg: 17 },
                textAlign: 'center',
                fontWeight: { xs: 500,sm:500 },
                color: " rgba(65, 68, 68, 0.64)",
                 fontFamily: "Bahnschrift"
            }}>{malayalam}</Typography>

        </Box>
    )
}

export default QuestionBox