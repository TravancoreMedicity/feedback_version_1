import { Box, Tooltip, Typography } from '@mui/joy';
import React, { memo } from 'react'

const InfoRow = ({ icon, label, value }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            gap: 1
        }}>
            <Box sx={{ width: '10%' }}>
                <Tooltip title={label}>{icon}</Tooltip>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '90%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Typography
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontWeight: { xs: 800, sm: 600 },
                        fontSize: { xs: 11, sm: 13 },
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    )
}

export default memo(InfoRow);



