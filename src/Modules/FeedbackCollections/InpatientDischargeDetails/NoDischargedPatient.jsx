import React, { memo } from 'react';
import { Box, Typography } from '@mui/joy';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';

const NoDischargedPatient = ({ message = "No discharged patient found" }) => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.2,
                backgroundColor: 'rgba(var(--bg-card))',
                borderRadius: 12,
                // boxShadow: 'sm',
                px: 2
            }}
        >
            <LocalHospitalOutlinedIcon
                sx={{
                    fontSize: {xs:27,sm:42},
                    color: 'rgba(var(--font-primary-white))',
                    opacity: 0.6
                }}
            />

            <Typography
                level="body-md"
                sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    opacity: 0.85,
                    textAlign: 'center',
                    fontSize: { xs: 11, sm: 15 },
                    fontWeight: 400,
                }}
            >
                {message}
            </Typography>
        </Box>
    );
};

export default memo(NoDischargedPatient);
