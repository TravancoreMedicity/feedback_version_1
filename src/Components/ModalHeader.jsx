import { Box, ModalClose, Typography } from '@mui/joy'
import React, { memo } from 'react'
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';

const ModalHeader = ({ HanldeModalClose, name, data }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 5,
            py: 1,
            position: 'sticky',
            top: 0,
            zIndex: 999,
            backgroundColor: "rgba(var(--bg-card))"
        }}
            className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 0.3, }}>
                <EngineeringTwoToneIcon
                    className='hoverClass'
                    sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: 'rgba(var(--icon-primary))', }}
                />
                <Typography
                    level='body-sm'
                    fontWeight={'md'}
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: { xs: 12, sm: 18 },
                        fontWeight: 700,
                        mt: 1
                    }}>
                    {/* CHECK LIST */}{name}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: "column",
                    fontSize: { xs: 8, sm: 10 },
                    lineHeight: 1,  // Ensures text is tightly packed
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    bgcolor: 'rgba(213, 82, 154, 0.8)',
                    fontFamily: 'var(--font-varient)',
                    color: 'White',
                    px: 0.5,
                    fontWeight: 800,
                    py: { xs: 0.5, sm: 0.17 }
                }}>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>B</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>E</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>D</Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: "row",
                    fontSize: { xs: 10, sm: 13 },
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    px: 0.5,
                    py: 2,
                    fontWeight: 800,
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(213, 82, 154, 0.8)',
                    height: 30
                }}>
                    {data?.fb_bdc_no && data?.fb_bdc_no.split('')
                        ?.filter(char => !['/', '(', ')', '\\']?.includes(char))
                        ?.map((char, index) => (
                            <Box key={index} sx={{ p: 0, m: 0, lineHeight: 1 }}>
                                {char}
                            </Box>
                        ))}
                </Box>
            </Box>
            <ModalClose onClick={HanldeModalClose} />
        </Box>
    )
}

export default memo(ModalHeader)