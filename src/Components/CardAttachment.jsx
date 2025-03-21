// import { Box } from '@mui/joy'

import { Box } from '@mui/material'
import React, { memo } from 'react'

const CardAttachment = () => {
    return (
        <>
            <Box sx={{
                position: 'absolute',
                width: 10,
                height: 25,
                bgcolor: '#c1121f',
                right: -10,
                top: 0,
                borderTopLeftRadius: 2
            }}></Box>

            <Box sx={{
                position: 'absolute',
                width: 100,
                height: 25,
                bgcolor: 'red',
                right: -10,
                top: 5
            }}>
                <Box sx={{
                    width: 30,
                    height: '50%',
                    bgcolor: 'red',
                    position: 'relative',
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top right, rgba(var(--bg-common)) 50%, transparent 50%)',
                    }} />
                </Box>


                <Box sx={{
                    width: 30,
                    height: '50%',
                    bgcolor: 'red',
                    position: 'relative'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to bottom right, rgba(var(--bg-common)) 50%, transparent 50%)',
                    }} />
                </Box>

            </Box>

        </>
    )
}

export default memo(CardAttachment)


