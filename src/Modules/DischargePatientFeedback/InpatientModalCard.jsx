import React, { memo } from 'react'
import ReviewsTwoToneIcon from '@mui/icons-material/ReviewsTwoTone';
import { Box, Typography } from '@mui/joy';




const InpatientModalCard = ({ name, ipno }) => {
    return (
        <Box
            className="border-b-[0.2rem] border-iconprimary p-0   "
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
                <ReviewsTwoToneIcon sx={{
                    fontSize: 24, fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                }} />
                <Typography sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                }} fontWeight={600} fontSize={{ xs: 14, sm: 17 }}>{name}</Typography>
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
                    fontSize: 9,
                    lineHeight: 1,
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    bgcolor: 'rgba(213, 82, 154, 0.8)',
                    px: 0.5,
                    fontFamily: 'var(--font-varient)',
                    color: 'White',
                    fontWeight: 700,
                    py: 0.1
                }}>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>I</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>P</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>N</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>0</Box>
                </Box>
                <Box sx={{ borderColor: 'rgba(var(--border-primary))' }}>
                    <Typography sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(213, 82, 154, 0.8)',
                        border: 0.03,
                        p: 1.2
                    }} fontWeight={800} fontSize={12}>{ipno}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(InpatientModalCard)