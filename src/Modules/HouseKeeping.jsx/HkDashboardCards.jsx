import { Box, Typography } from '@mui/joy'
import React from 'react'

const HkDashboardCards = ({ data, name, icon, count }) => {

    return (
        <Box
            sx={{
                width: { xs: '50%', sm: '50%', lg: '25%' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1
            }}>
            <Box
                sx={{
                    width: '100%',
                    height: 100,
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    display: 'flex',
                    borderRadius: 8,
                    flexDirection: 'column'
                }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50%',
                    bgcolor: 'rgba(213, 82, 154, 0.8)',
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4
                }}>
                    <Typography level='body-sm' fontWeight={'md'}
                        sx={{
                            fontFamily: 'var(--font-varient)',
                            fontSize: 16,
                            fontWeight: 900,
                            textAlign: 'center',
                            color: 'white'
                        }} >
                        {name}</Typography>
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column'
                }}>
                    {/* {icon} */}
                    <Typography level='body-sm' fontWeight={'md'}
                        sx={{
                            fontFamily: 'var(--font-varient)',
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: 23,
                            fontWeight: 900,
                            textAlign: 'center',
                            mt: 1
                        }} >
                        {count}</Typography>
                </Box>
            </Box>
        </Box >
    )
}

export default HkDashboardCards