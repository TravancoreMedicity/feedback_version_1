import { Popover } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { EmpauthId } from '../Constant/Constant';
import { Box, Grid, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { getUserModules } from '../Function/CommonFunction';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import BiotechTwoToneIcon from '@mui/icons-material/BiotechTwoTone';
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import LaptopMacTwoToneIcon from '@mui/icons-material/LaptopMacTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import CollectionsBookmarkTwoToneIcon from '@mui/icons-material/CollectionsBookmarkTwoTone';
import HeadsetMicTwoToneIcon from '@mui/icons-material/HeadsetMicTwoTone';
import KeyboardHideTwoToneIcon from '@mui/icons-material/KeyboardHideTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';

const FloatingDrawer = ({ anchorEl, handlepopoveClose }) => {

    const navigation = useNavigate();
    const [arr, setarr] = useState([])
    const handleListItemClick = useCallback((event, index, route) => {
        navigation(route);
        handlepopoveClose()
    }, [navigation, handlepopoveClose]);

    const id = EmpauthId();

    // Fetching all modules which has right against that....!
    const { data: allmoduleitem = [] } = useQuery({
        queryKey: ['getallmoduleitem', id],
        queryFn: () => getUserModules(id),
        enabled: !!id,
        staleTime: Infinity
    });

    const drawerMenu = useMemo(() => {
        return [
            { modslno: 1, menu: "Dashboard", text: "/Home/Dashboard", icon: <DashboardTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#fb8500" }} /> },
            { modslno: 2, menu: "FeedBack Link", text: "/Home/Feedbackdetail", icon: <ChatTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#d90429" }} /> },
            { modslno: 3, menu: "FeedBackCollection", text: "/Home/collectiondetail", icon: <CollectionsBookmarkTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "blue" }} /> },
            { modslno: 4, menu: "Settings", text: "/Home/Settings", icon: <SettingsSuggestTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#ffbe0b" }} /> },
            { modslno: 5, menu: "PRO CheckList", text: "/Home/prochecklist", icon: <HowToRegTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#548c2f" }} /> },
            { modslno: 6, menu: "InformationTechnology", text: "/Home/it", icon: <LaptopMacTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#4ad66d" }} /> },
            { modslno: 7, menu: "BioMedical", text: "/Home/biomedical", icon: <BiotechTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#4cc9f0" }} /> },
            { modslno: 8, menu: "HouseKeeping", text: "/Home/housekeeping", icon: <CleaningServicesTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#8a5a44" }} /> },
            { modslno: 9, menu: "CheckList", text: "/Home/Maintenace", icon: <EngineeringTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#fb6f92" }} /> },
            { modslno: 10, menu: "Call Center", text: "/Home/dischargepatient", icon: <HeadsetMicTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#ff006e" }} /> },
            { modslno: 11, menu: "PRO Followup", text: "/Home/followupratient", icon: <KeyboardHideTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#00a8e8" }} /> },
            { modslno: 12, menu: "Reports", text: "/Home/AllReports", icon: <SummarizeTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#7b2cbf" }} /> },
            { modslno: 13, menu: "PREM", text: "/Home/Prem", icon: <QuestionAnswerTwoToneIcon className='hoverClass' sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 }, color: "#01ea6aff" }} /> },
        ]
    }, []);

    useEffect(() => {
        if (allmoduleitem?.length) {
            const filteredItems = drawerMenu?.filter((menuItem) =>
                allmoduleitem?.some((module) => menuItem?.modslno === module?.fb_module_slno)
            );
            setarr(filteredItems);
        }
    }, [allmoduleitem, drawerMenu]);


    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlepopoveClose}
            sx={{
                mt: 5,
                ml: { xs: 0, sm: 5 },

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
                pr: 2,
                width: { xs: 350, sm: 500 },
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "rgba(var(--bg-card))",
                border: 0.03,
                borderColor: "rgba(var(--border-primary))",
                minHeight: { xs: 200, sm: 300 }
            }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            px: 1,
                            mt: 2,
                            height: '100%'
                        }}>
                        <Box sx={{ width: '100%' }}>
                            <Grid container spacing={2} >
                                {arr?.map((val, idx) => (
                                    <Grid xs={3} key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box
                                            onClick={(e) => handleListItemClick(e, idx, val.text)}
                                            sx={{
                                                width: { xs: 60, sm: 80 },
                                                height: { xs: 60, sm: 80 },
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
                                            {val?.icon}
                                        </Box>
                                        <Typography
                                            fontWeight={600}
                                            fontSize={{ xs: 6, sm: 10 }}
                                            sx={{
                                                fontFamily: 'var(--font-varient)',
                                                color: 'rgba(var(--font-primary-white))',
                                                mt: 1
                                            }}>
                                            {val?.menu}
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


