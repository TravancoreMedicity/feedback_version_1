import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';

const OverallDetailCard = ({ name, employee, condition, remark }) => {
    return (
        <Box sx={{
            m: 1,
            backgroundColor: 'rgba(var(--arrow-bg-color))',
            borderRadius: 8
        }}>
            <Box className="border-b-[0.1rem] border-iconprimary p-0 cursor-pointer" sx={{
                display: 'flex',
                flex: 1,
                height: 30,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                alignItems: 'center',
                p: 0.3
            }}>
                <ReceiptLongTwoToneIcon sx={{
                    color: 'rgba(var(--icon-primary))',
                    fontSize: { xs: 20, sm: 26 },
                    fontWeight: 700
                }} />
                <Typography
                    level='body-sm'
                    fontWeight={'md'}
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: { xs: 13, sm: 17 },
                        fontWeight: 700,
                    }}>{name}</Typography>
            </Box>
            <Box sx={{
                p: 1
            }}>
                <Typography
                    level='body-sm'
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontWeight: 400,
                        fontSize: { xs: 12, sm: 15 }
                    }}><span style={{
                        display: 'inline-block',
                        width: '25%',
                        fontWeight: '600',
                        color: 'rgba(var(--font-primary-white))',
                    }}>Employee </span>: {employee}</Typography>
                <Typography
                    level='body-sm'
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontWeight: 400,
                        fontSize: { xs: 12, sm: 15 }
                    }}><span style={{
                        display: 'inline-block',
                        width: '25%',
                        // fontSize: '15px',
                        fontWeight: '600',
                        color: 'rgba(var(--font-primary-white))',
                    }}> Condition </span>: {condition === 3 ? "Excellent" : condition === 2 ? "Good" : "Poor"} Condition</Typography>
                <Box
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        display: 'flex',
                        fontSize: { xs: 12, sm: 15 }
                    }}><span style={{
                        display: 'inline-block',
                        width: '25%',
                        fontWeight: '600',
                        color: 'rgba(var(--font-primary-white))',
                    }}> Remark </span>:<span style={{
                        display: 'inline-block',
                        width: '75%',
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontWeight: '400'
                    }}>{remark}</span></Box>
            </Box>
        </Box>
    )
}

export default memo(OverallDetailCard)