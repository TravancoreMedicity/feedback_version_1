import { Box, Tooltip } from '@mui/joy'
import React, { memo } from 'react'
import admitone from '../assets/admitone.gif';

const BookAppoinment = ({ onclick }) => {
    return (
        <Box
            onClick={onclick}
            sx={{
                position: 'absolute',
                width: 60,
                height: 60,
                bottom: 20,
                right: '-6%',
                zIndex: 9999,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#ff85a1',
                cursor: 'pointer',
                overflow: 'hidden',

                animation: 'slideIn 0.6s ease-out forwards, vibrateSmooth 1.2s ease-in-out infinite',
                animationDelay: '0s, 0.6s',

                '@keyframes slideIn': {
                    '0%': { transform: 'translateX(250%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                '@keyframes vibrateSmooth': {
                    '0%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(0.5px, -0.5px)' },
                    '50%': { transform: 'translate(-0.5px, 0.5px)' },
                    '75%': { transform: 'translate(0.5px, 0.5px)' },
                    '100%': { transform: 'translate(0, 0)' }
                }
            }}
        >
            <Tooltip title="Book appointment" placement="top">
                <img
                    src={admitone}
                    alt="Male"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Tooltip>
        </Box>
    )
}

export default memo(BookAppoinment)