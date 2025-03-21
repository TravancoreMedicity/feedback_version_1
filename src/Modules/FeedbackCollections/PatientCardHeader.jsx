import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import PersonIcon from '@mui/icons-material/Person';

const PatientCardHeader = ({ roomnumber }) => {
    return (
        <Box
            className="border-b-[0.2rem] border-iconprimary p-0  mb-2 "
            sx={{
                width: '92%',
                minHeight: 40,
                mx: 2,
                backgroundColor: "rgba(var(--bg-card))",
                display: 'flex',
                justifyContent: 'space-between',
            }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <PersonIcon sx={{
                    fontSize: 24, fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                }} />
                <Typography sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                }} fontWeight={600} fontSize={17}>Patient Detail</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: "column",
                    fontSize: 10,
                    lineHeight: 1,  // Ensures text is tightly packed
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    bgcolor: 'rgba(213, 82, 154, 0.8)',
                    px: 0.5,
                    fontFamily: 'var(--font-varient)',
                    color: 'White',
                    fontWeight: 700,
                    py: 0.1
                }}>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>B</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>E</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>D</Box>
                </Box>
                <Box sx={{ borderColor: 'rgba(var(--border-primary))' }}>
                    <Typography sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(213, 82, 154, 0.8)',
                        border: 0.03,
                        p: 0.4
                    }} fontWeight={600} fontSize={16}>{roomnumber}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(PatientCardHeader)