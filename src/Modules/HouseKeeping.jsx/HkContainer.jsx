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
import NoAssignedBed from './NoAssignedBed ';
import ErrorFallback from '../../Components/ErrorFallback ';

const HkDashboard = lazy(() => import('./HkDashboard'));
const Housekeepinglist = lazy(() => import('./Housekeepinglist'));
const nobedDetail = require('../../assets/NoBed.png');

const HkContainer = () => {

    const [value, setValue] = useState("1");
    const id = EmpauthId()


    // Fetching all blockec  bed for housekeeping
    const {
        data: getllBlockedBed = [],
        isError: isBlockedBedError,
        isSuccess: isBlockedBedSuccess,
        error: BlockedBedError,
        isLoading: isBlockedBedLoading,
        refetch: fetchallBlockBed,
    } = useQuery({
        queryKey: ["getallblockedbed"],
        queryFn: () => getAllBlockedBed()
    });




    // Get all assinged bed done by the superviso
    const {
        data: getallhkassignedbed = [],
        isError: isAssignedBedError,
        isSuccess: isAssignedBedSuccess,
        error: assignedBedError,
        isLoading: isAssignedBedLoading,
        refetch: getallAssignedBed,
    } = useQuery({
        queryKey: ["getallassignedbed", id],
        queryFn: () => getAllhkAssignedBed(id),
        enabled: !!id,
    });


    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    }, []);



    // Function to assign beds for the supervisors
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
                            className="flex justify-end items-center">
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

                        {/* showing loading screen when loading Housekkeping Bed */}
                        {isBlockedBedLoading && <CustomBackDropWithOutState message={"Dashboard Loading..."} />}

                        {/* fall back to the Error component when their is error in fethcing the house keeping bed */}
                        {isBlockedBedError && (
                            <ErrorFallback
                                message="Failed to fetch Houspeeeking beds"
                                error={BlockedBedError}
                                onRetry={() => fetchallBlockBed()}
                            />
                        )}

                        {/* only show bed if their is bloked bed for the housekeeping */}
                        <Suspense fallback={<CustomBackDropWithOutState message={"Dashboard Loading..."} />}>
                            {
                                isBlockedBedSuccess && getllBlockedBed &&
                                <HkDashboard
                                    getllBlockedBed={getllBlockedBed}
                                    assingedbed={getallhkassignedbed}
                                    HandleBedAssign={HandleBedAssign}
                                    refetch={getallAssignedBed}
                                />
                            }
                        </Suspense>

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

                                {/* showing loading screen when loading Housekkeping Assigned Beds */}
                                {isAssignedBedLoading && <CustomBackDropWithOutState message={"Checklist Loading..."} />}

                                {/* this will trigger if in the case of Error in the Fetching Assinged Bed Usequery  */}
                                {isAssignedBedError && (
                                    <ErrorFallback
                                        message="Failed to fetch assigned beds"
                                        error={assignedBedError}
                                        onRetry={() => getallAssignedBed()}
                                    />
                                )}

                                {/* only show this if the usquery is success and there is no assigned bed  */}
                                {
                                    isAssignedBedSuccess && getallhkassignedbed?.length === 0 &&
                                    <NoAssignedBed img={nobedDetail} name={"No Assigned Bed Found"} />
                                }

                                {/* map The assigned bed if the Query return sucess and bed is present */}
                                <Suspense fallback={<CustomBackDropWithOutState message={"Checklist Loading..."} />}>
                                    {
                                        isAssignedBedSuccess && getallhkassignedbed?.length > 0 && getallhkassignedbed?.map((item, index) => {
                                            return <Box key={index}>
                                                <Housekeepinglist
                                                    refetch={getallAssignedBed}
                                                    data={item}
                                                    assingedbed={getallhkassignedbed}
                                                    name={"INFROMATION TECHNOLOGY"}
                                                    icon={<CleaningServicesTwoToneIcon
                                                        className='hoverClass'
                                                        sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))' }}
                                                    />} />
                                            </Box>
                                        })}
                                </Suspense>
                            </Box>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
};

export default memo(HkContainer);




