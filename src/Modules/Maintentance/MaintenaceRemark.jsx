import React from 'react'
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import { Box, Button, Tooltip, Typography } from '@mui/joy';
import MaintenaceRemarkCard from './MaintenaceRemarkCard';
import MaintenanceRemarkButton from './MaintenanceRemarkButton';
const MaintenaceRemark = ({
    setRemarks,
    remarks,
    activeButton,
    setActiveButton
}) => {
    return (
        <Box sx={{
            p: 1,
            backgroundColor: "rgba(var(--bg-card))",
            borderRadius: 5,
            mt: 1
        }}>
            <Box sx={{ border: 0, borderBottom: 1.5, borderColor: "rgba(var(--tab-border-color))", borderBottomColor: 'divider', borderWidth: 2, display: 'flex', alignItems: 'center', width: '100%' }} >
                <PendingActionsTwoToneIcon sx={{
                    color: 'rgba(var(--icon-primary))',
                    fontSize: 26,
                    fontWeight: 700
                }} />
                <Typography
                    level='body-sm'
                    fontWeight={'md'}
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: 18,
                        fontWeight: 700
                    }}>
                    MARKED AS
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    mt: 1,
                }}>
                <MaintenanceRemarkButton
                    setRemarks={setRemarks}
                    remarks={remarks}
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                />
            </Box>
        </Box>
    )
}

export default MaintenaceRemark