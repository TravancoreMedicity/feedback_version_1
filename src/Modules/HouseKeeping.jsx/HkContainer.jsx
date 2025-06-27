import React, { useState, memo, Suspense, useCallback, lazy } from 'react';
import { Box, Typography } from "@mui/joy";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { PageStar } from 'iconoir-react';
import { getAllBlockedBed, getAllhkAssignedBed } from '../../Function/CommonFunction';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import { useQuery } from '@tanstack/react-query';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { EmpauthId, employeeID, errorNofity, succesNofity, warningNofity } from '../../Constant/Constant';
import { axiosApi } from '../../Axios/Axios';

const HkDashboard = lazy(() => import('./HkDashboard'));
const Housekeepinglist = lazy(() => import('./Housekeepinglist'));
const nobedDetail = require('../../assets/NoBed.png');

const HkContainer = () => {

    const [value, setValue] = useState("1");
    const id = EmpauthId()

    const { data: getllBlockedBed } = useQuery({
        queryKey: ["getallblockedbed"],
        queryFn: () => getAllBlockedBed()
    });

    const { data: getallhkassignedbed = [], refetch: getallAssignedBed } = useQuery({
        queryKey: ["getallassignedbed", id],
        queryFn: () => getAllhkAssignedBed(id),
        enabled: !!id
    });


    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    }, []);


    // const filterAssignedBed = useMemo(() => {
    //     if (!getllBlockedBed || !getallhkassignedbed) return [];
    //     const assignedBedIds = getallhkassignedbed?.map(item => item?.fb_hk_bed_slno);
    //     return getllBlockedBed?.filter(item =>
    //         assignedBedIds?.includes(item.fb_bed_slno)
    //     );
    // }, [getllBlockedBed, getallhkassignedbed]);




    // console.log(filterAssignedBed, "filterAssignedBed");


    const HandleBedAssign = useCallback(async (data) => {
        const insertdata = {
            fb_hk_sv_assign: id,
            fb_hk_bed_slno: data?.fb_bed_slno,
            fb_hk_status: 1,
            create_user: employeeID()
        }
        try {
            const response = await axiosApi.post('/feedback/inserthkbedassign', insertdata)
            const { success } = response?.data;
            if (success === 1) return errorNofity("Error in Assigning Bed Detail")
            succesNofity("SucessFully Assigned Bed")
        } catch (error) {
            warningNofity(error)
        }
    }, [id])


    return (
        <Box className="h-dvh p-2">
            <Box
                className="flex flex-col rounded-xl  w-full"
                sx={{
                    backgroundColor: "rgba(var(--bg-card))",
                    height: "calc(100% - 50px)",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                }}>
                <TabContext value={value}>
                    <Box sx={{
                        borderBottom: 1.5,
                        borderColor: "rgba(var(--tab-border-color))",
                        borderBottomColor: 'divider',
                        borderWidth: 2,
                        pb: 0.5,
                        // bgcolor:'red',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12
                    }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="Housekeeping tabs"
                            sx={{
                                minHeight: 0,
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'rgba(var(--logo-pink))',
                                },
                            }}
                            className="flex justify-end items-center"
                        >
                            <Tab
                                icon={<PageStar color='rgba(var(--color-white))' />}
                                label="House Keeping"
                                value="1"
                                iconPosition="start"
                                sx={{
                                    display: "flex",
                                    minHeight: 0,
                                    textTransform: "none",
                                    color: 'rgba(var(--color-white),0.9)',
                                    bgcolor: "rgba(var(--tab-color),0.8)",
                                    borderRadius: 1,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                    mr: 1,
                                    fontSize: { xs: 10, sm: 14 },
                                    minWidth: '15%',
                                    '&.Mui-selected': {
                                        color: 'rgba(var(--color-white))',
                                        bgcolor: 'rgba(var(--tab-color))',
                                    },
                                }}
                            />
                            <Tab
                                icon={<PageStar color='rgba(var(--color-white))' />}
                                label="House Keeping Checklist"
                                value="2"
                                iconPosition="start"
                                sx={{
                                    display: "flex",
                                    minHeight: 0,
                                    textTransform: "none",
                                    color: 'rgba(var(--color-white),0.9)',
                                    bgcolor: "rgba(var(--tab-color),0.8)",
                                    borderRadius: 1,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                    minWidth: '15%',
                                    fontSize: { xs: 10, sm: 14 },
                                    '&.Mui-selected': {
                                        color: 'rgba(var(--color-white))',
                                        bgcolor: 'rgba(var(--tab-color))',
                                    },
                                }}
                            />
                        </TabList>
                    </Box>

                    <TabPanel value="1" className="overflow-scroll" sx={{ p: 1 }} >
                        {
                            getllBlockedBed &&
                            <HkDashboard
                                getllBlockedBed={getllBlockedBed}
                                assingedbed={getallhkassignedbed}
                                HandleBedAssign={HandleBedAssign}
                                refetch={getallAssignedBed}
                            />
                        }

                    </TabPanel>
                    <TabPanel value="2" className="overflow-scroll" sx={{ p: 1 }} >
                        <Box sx={{
                            mb: 2,
                            p: 1,
                            backgroundColor: "rgba(var(--bg-card))",
                            border: getallhkassignedbed?.length > 0 ? 0.03 : 0,
                            borderColor: getallhkassignedbed?.length > 0 ? "rgba(var(--border-primary))" : "none",
                            borderRadius: 5
                        }}>
                            <Box
                                sx={{
                                    gap: 3,
                                    px: 1,
                                    width: "100%",
                                    mt: 1,
                                }}>
                                {
                                    getallhkassignedbed?.length === 0 &&
                                    <Box sx={{
                                        width: '100%',
                                        height: '60vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <img src={nobedDetail} alt={'No bed'} style={{
                                            objectFit: 'contain', width: 100, height: 100
                                        }} />
                                        <Typography sx={{
                                            fontSize: { xs: 14, sm: 14, md: 15, lg: 17 },
                                            fontWeight: { xs: 500, sm: 500 },
                                            color: 'rgba(var(--font-primary-white))',
                                            fontFamily: "Bahnschrift",
                                            mt: 2,
                                            mb: 0
                                        }}>
                                            No Assigned Bed Found
                                        </Typography>
                                    </Box>
                                }
                                {
                                    getallhkassignedbed?.length > 0 && getallhkassignedbed?.map((item, index) => {
                                        return <Box key={index}>
                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                                <Housekeepinglist
                                                    refetch={getallAssignedBed}
                                                    data={item}
                                                    assingedbed={getallhkassignedbed}
                                                    name={"INFROMATION TECHNOLOGY"}
                                                    icon={<CleaningServicesTwoToneIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} />} />
                                            </Suspense>
                                        </Box>
                                    })}
                            </Box>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
};

export default memo(HkContainer);




