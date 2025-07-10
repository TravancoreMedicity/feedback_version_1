import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'

const NoAssignedBed = ({ img, name }) => {
    return (
        <Box sx={{ width: '100%', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <img src={img} alt="No bed" style={{ objectFit: 'contain', width: 100, height: 100 }} />
            <Typography sx={{
                fontSize: { xs: 14, sm: 14, md: 15, lg: 17 },
                fontWeight: { xs: 500, sm: 500 },
                color: 'rgba(var(--font-primary-white))',
                fontFamily: "Bahnschrift",
                mt: 2,
                mb: 0
            }}>
                 {name}
            </Typography>
        </Box>
    )
}

export default memo(NoAssignedBed);