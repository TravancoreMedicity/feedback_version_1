import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import { LogOut } from 'iconoir-react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

const ChecklistHeaders = ({ name, icon, value }) => {

    const isMdUp = useMediaQuery('(min-width: 960px)');
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }} className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
            {icon}
            <Typography
                level='body-sm'
                fontWeight={'md'}
                sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    fontSize: { xs: 17, sm: 22 },
                    fontWeight: 700,
                    mt: 2
                }}>
                {name}
            </Typography>
            {
                value !== 1 && !isMdUp && <Box sx={{ mt: 2, position: "absolute", right: 0 }} onClick={() => navigate(-1)} >
                    <LogOut className='text-iconprimary cursor-pointer mr-3' /></Box>
            }

        </Box>
    )
}

export default memo(ChecklistHeaders)