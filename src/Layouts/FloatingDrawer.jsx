import { Box, Grid, Typography } from '@mui/joy'
import { Popover } from '@mui/material'
import React, { memo, useCallback, useMemo } from 'react'
import CollectionsBookmarkTwoToneIcon from '@mui/icons-material/CollectionsBookmarkTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import LaptopTwoToneIcon from '@mui/icons-material/LaptopTwoTone';
import BiotechTwoToneIcon from '@mui/icons-material/BiotechTwoTone';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import { useNavigate } from 'react-router-dom';

const FloatingDrawer = ({ anchorEl, handlepopoveClose }) => {

    const navigation = useNavigate();
    const handleListItemClick = useCallback((event, index, route) => {
        navigation(route);
        handlepopoveClose()
    }, [navigation,handlepopoveClose]);

    const drawerMenu = useMemo(() => {
        return [
            { modslno: 1, menu: "Dashboard", text: "/Home/Dashboard", icon: <DashboardTwoToneIcon color="rgba(var(--drawer-font-color))" className='hoverClass' sx={{ width: 30, height: 30, color: "#fb8500" }} /> },
            { modslno: 2, menu: "FeedBack Links", text: "/Home/Feedbackdetail", icon: <ChatTwoToneIcon color="rgba(var(--drawer-font-color))" className='hoverClass' sx={{ width: 30, height: 30, color: "#d90429" }} /> },
            { modslno: 3, menu: "FeedBackCollection", text: "/Home/collectiondetail", icon: <CollectionsBookmarkTwoToneIcon className='hoverClass' sx={{ width: 30, height: 30, color: "blue" }} /> },
            { modslno: 4, menu: "Settings", text: "/Home/Settings", icon: <SettingsSuggestTwoToneIcon color="rgba(var(--drawer-font-color))" className='hoverClass' sx={{ width: 30, height: 30, color: "#ffbe0b" }} /> },
            { modslno: 5, menu: "CheckList", text: "/Home/Maintenace", icon: <EngineeringTwoToneIcon color="rgba(var(--drawer-font-color))" className='hoverClass' sx={{ width: 30, height: 30, color: "#fb6f92" }} /> },
            { modslno: 6, menu: "InformationTechnology", text: "/Home/it", icon: <LaptopTwoToneIcon color="rgba(var(--drawer-font-color))" className='hoverClass' sx={{ width: 30, height: 30, color: "#4ad66d" }} /> },
            { modslno: 7, menu: "BioMedical", text: "/Home/biomedical", icon: <BiotechTwoToneIcon color="rgba(var(--drawer-font-color))" className='hoverClass' sx={{ width: 30, height: 30, color: "#4cc9f0" }} /> },
            { modslno: 8, menu: "HouseKeeping", text: "/Home/housekeeping", icon: <CleaningServicesTwoToneIcon color="rgba(var(--drawer-font-color))" className='hoverClass' sx={{ width: 30, height: 30, color: "#8a5a44" }} /> },
        ]
    }, []);

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlepopoveClose}
            sx={{
                mt: 4,
                ml: 5
            }}
            disableEnforceFocus={true}
            anchorOrigin={{
                vertical: 'center',   // Centering vertically
                horizontal: 'center'  // Centering horizontally
            }}
            transformOrigin={{
                vertical: 'center',   // Aligning with the vertical center
                horizontal: 'center'  // Aligning with the horizontal center
            }}
        >
            <Box sx={{
                p: 2,
                width: 500,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "rgba(var(--bg-card))",
                border: 0.03,
                borderColor: "rgba(var(--border-primary))",
                minHeight: 300

            }}>
                {/* <Box
                    sx={{ mx: 2 }}
                    className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer " >
                    <Typography level='body-sm' fontWeight={600} fontSize={12} sx={{ fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))' }} >
                        MENU SELECTION
                    </Typography>
                </Box> */}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            px: 1,
                            mt: 2
                        }}>
                        <Box sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {drawerMenu.map((val, idx) => (
                                    <Grid xs={3} key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box
                                            onClick={(e) => handleListItemClick(e, idx, val.text)}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: 3,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'red',
                                                backgroundColor: 'rgba(var(--bg-common))',
                                                fontFamily: 'var(--font-varient)',
                                                borderWidth: 1,
                                                borderColor: 'rgba(var(--border-primary))',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {val.icon}
                                        </Box>
                                        <Typography
                                            fontWeight={600}
                                            fontSize={10}
                                            sx={{
                                                fontFamily: 'var(--font-varient)',
                                                color: 'rgba(var(--font-primary-white))',
                                                mt: 1
                                            }}
                                        >
                                            {val.menu}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Popover>
    )
}

export default memo(FloatingDrawer)


