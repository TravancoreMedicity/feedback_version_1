import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';

const InitialCheckComplited = ({ color }) => {
    return (
        <Box
            sx={{
                width: 180,
                height: 20,
                backgroundColor: 'rgba(var(--bg-common))',
                position: 'absolute',
                right: 10,
                top: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.7,
                borderRadius: 2,
                borderColor: color,
                gap: 0.2
            }}
        >
            {/* Arrowhead */}
            {/* <Box
                sx={{
                    position: 'absolute',
                    right: -9,
                    top: 0,
                    width: 0,
                    height: 0,
                    borderTop: '10.5px solid transparent',
                    borderBottom: '10.5px solid transparent',
                    borderLeft: '10px solid  rgba(var(--arrow-bg-color))',
                }}
            /> */}

            {/* </Box> */}
            {/* <Box sx={{ width: '25%', height: '100%', position: 'absolute', left: 0 }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '50%',
                        bgcolor: 'transparent',
                        background: 'linear-gradient(15deg, rgba(var(--bg-common)) 50%, rgba(var(--arrow-bg-color)) 50%)',
                    }}
                />

                <Box
                    sx={{
                        width: '100%',
                        height: '50%',
                        bgcolor: 'transparent',
                        background: 'linear-gradient(165deg, rgba(var(--bg-common)) 50%, rgba(var(--arrow-bg-color)) 50%)',
                    }}
                />
            </Box> */}
            <SecurityTwoToneIcon sx={{
                color: 'rgba(var(--icon-primary))',
                fontSize: 13,
                fontWeight: 700
            }} />
            <Typography sx={{
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
                fontWeight: 700,
                fontSize: 10
            }}>Intitial Checklist completed</Typography>
        </Box>
    )
}

export default memo(InitialCheckComplited)