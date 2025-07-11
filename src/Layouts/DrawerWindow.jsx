// @ts-nocheck
import React, { memo, useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ListSubheader } from "@mui/material";
import { NavArrowRight } from 'iconoir-react'
import { useCallback } from "react";
import { useMemo } from "react";
import {
    HomeAltSlimHoriz,
    Settings,
    MessageText,
    Computer,
    TaskList,
    Microscope,
    HospitalCircle,
    BookStack,
    UserBadgeCheck,
    MicrophoneSpeaking,
    PcFirewall,
    StatsReport
} from 'iconoir-react'
import { EmpauthId } from "../Constant/Constant";
import { getUserModules } from "../Function/CommonFunction";
import { useQuery } from "@tanstack/react-query";

const DrawerWindow = memo(({ drawerWidth, handleDrawerClose }) => {

    const navigation = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [arr, setarr] = useState([])
    const handleListItemClick = useCallback((event, index, route) => {
        setSelectedIndex(index);
        navigation(route);
    }, [navigation]);


    const id = EmpauthId();
    const { data: allmoduleitem = [] } = useQuery({
        queryKey: ['getallmoduleitem', id],
        queryFn: () => getUserModules(id),
        enabled: !!id,
        staleTime: Infinity
    });

    const drawerMenu = useMemo(() => {
        return [
            { modslno: 1, menu: "Dashboard", text: "/Home/Dashboard", icon: <HomeAltSlimHoriz height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 2, menu: "FeedBack Links", text: "/Home/Feedbackdetail", icon: <MessageText height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 3, menu: "FeedBackCollection", text: "/Home/collectiondetail", icon: <BookStack height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 4, menu: "Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 9, menu: "CheckList", text: "/Home/Maintenace", icon: <TaskList height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 6, menu: "InformationTech", text: "/Home/it", icon: <Computer height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 7, menu: "BioMedical", text: "/Home/biomedical", icon: <Microscope height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 8, menu: "HouseKeeping", text: "/Home/housekeeping", icon: <HospitalCircle height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 5, menu: "PRO CheckList", text: "/Home/prochecklist", icon: <UserBadgeCheck height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 10, menu: "Call Center", text: "/Home/dischargepatient", icon: <MicrophoneSpeaking height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 11, menu: "PRO Followup", text: "/Home/followupratient", icon: <PcFirewall height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { modslno: 11, menu: "Reports", text: "/Home/AllReports", icon: <StatsReport height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
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



    const drawer = useMemo(() => (
        <div>
            <Toolbar variant="dense" />
            <Divider />
            <List
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                            fontFamily: "var(--font-varient)",
                            fontWeight: 600,
                            bgcolor: "rgba(var(--drawer-bg-color))",
                            color: "rgba(var(--drawer-font-color))",
                        }}
                    >
                        Menu Selections
                    </ListSubheader>
                }>
                {arr?.map((val, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "flex" }}
                        secondaryAction={
                            <NavArrowRight height={20} width={20} color="rgba(var(--drawer-font-color))"
                                className={selectedIndex === index ? "bouncing-element" : ''} />
                        }
                    >
                        <ListItemButton
                            selected={selectedIndex === index ? true : false}
                            onClick={(e) => handleListItemClick(e, index, val.text)}
                            sx={{
                                display: "flex",
                                mx: 0,
                                px: 0,
                                borderRadius: 0,
                                my: 0.1,
                                height: 35,
                                alignItems: "center",
                                transition: "transform 0.3s ease, color 0.3s ease",
                                transform: "translateX(0)",
                                '&.Mui-selected': {
                                    bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    ':hover': {
                                        bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    }
                                },
                                ":hover": {
                                    bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    "& .hoverClass": {
                                        transform: "translateX(2px)",
                                        color: "rgba(var(--drawer-font-color))",
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                className="hoverClass"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    color: "rgba(var(--font-secondary-white))",
                                    transition: "transform 0.3s ease",
                                    transform: "translateX(0)",
                                }}
                            >
                                {val.icon}
                            </ListItemIcon>
                            <Typography
                                noWrap
                                className="hoverClass text-fontsecondarywhite "
                                sx={{
                                    display: "flex",
                                    fontFamily: "var(--font-varient)",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    transition: "transform 0.3s ease",
                                    transform: "translateX(0)",
                                }}
                            >
                                {val?.menu}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    ), [selectedIndex, handleListItemClick, arr])

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                transition: "width 0.2s",
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        transition: "width 0.5s",
                        backgroundColor: "rgba(var(--bg-drawer))",
                    },
                }}
                onClose={handleDrawerClose}>
                {drawer}
            </Drawer>
        </Box>
    )
})

export default memo(DrawerWindow)