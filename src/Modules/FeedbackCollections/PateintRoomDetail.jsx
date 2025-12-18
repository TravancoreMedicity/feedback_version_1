import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import { Box, Grid, Typography } from '@mui/joy'
import DefaultPageLayout from '../../Components/DefaultPageLayout'
import { axiosApi, axiosellider } from '../../Axios/Axios';
import { infoNofity, warningNofity, errorNofity, succesNofity } from '../../Constant/Constant';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { getBedRemarkStatus } from '../../Function/CommonFunction';
import { useQuery } from '@tanstack/react-query';

// import FloatingRefreshButton from '../../Components/FloatingRefreshButton';


const RoomComponent = lazy(() => import('./RoomComponent'));

const PateintRoomDetail = ({ beddetail, nsname, view, setView, nscode }) => {

    const [inpatientDetailfrommeliora, setInpatientDetailFromMeliora] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [patientfeedbackdata, setPatientFeedBackData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    // const [loadingrefresh, setLoadingRefresh] = useState(false)
    // const [isCoolingDown, setIsCoolingDown] = useState(false);

    //GROUP BED DETAIL BASED ON THE ROOM CATEGORIES
    const groupedBeds = beddetail?.reduce((acc, bed) => {
        const key = bed.fb_rtc_desc; // Grouping based only on RTC_DESC
        acc[key] = acc[key] ? [...acc[key], bed] : [bed];
        return acc;
    }, {});

    //QUERY FOR GETTING ALL BED REMARKS
    const { data: getallremarkstatus } = useQuery({
        queryKey: ["getbedremarkstatus"],
        queryFn: async () => await getBedRemarkStatus()
    });


    //FETCHING INFORMATION THAT HAVE ALREADY SUBMITTED FEEDBACK
    const FetchPatientFeedback = useCallback(async (inpatientDetail) => {
        if (!inpatientDetail) return infoNofity("Patient Detail Not Found!")

        const searchdata = {
            fb_patient_num: inpatientDetail[0]?.fb_pt_no,
            fb_ip_num: inpatientDetail[0]?.fb_ip_no,
        }

        try {
            const response = await axiosApi.post('/feedback/getpatientfeedback', searchdata);
            const { success, data } = response?.data;
            if (success === 1) return warningNofity("Error in Fetching data");
            setPatientFeedBackData(data ? data : [])
        } catch (error) {
            warningNofity("Error in Fetching Data");
        }
    }, []);

    //Fetching Patient Detail From the Melior
    const GetPatientDetailFromMeliora = useCallback(async (bdcode) => {
        if (!bdcode) return warningNofity("Bed Code is Missing!");

        setLoading(true)

        const insertData = {
            fb_ns_code: nscode,
            fb_bd_code: parseInt(bdcode)
        }

        try {
            setInpatientDetailFromMeliora({});
            const response = await axiosApi.post('/feedback/inpatientdetil', insertData)
            const { success, data } = response?.data;

            if (success === 1) {
                setOpen(true)
                setInpatientDetailFromMeliora({})
                setLoading(false)
                return;
            }
            if (success !== 2) {
                warningNofity("Error in fetching In Patient Detail  :)");
                setInpatientDetailFromMeliora({})
                setLoading(false)
                return;
            }
            setInpatientDetailFromMeliora(prev => ({
                ...prev,
                [bdcode]: data || {}  // Store null if no data
            }));

            await FetchPatientFeedback(data)

        } catch (error) {
            warningNofity("Error in Api")
            setAnchorEl(null)
        } finally {
            setLoading(false)
        }
    }, [nscode, setInpatientDetailFromMeliora, setAnchorEl, FetchPatientFeedback, setLoading])



    /**
     * 
     * 
     * 
     * 
    // REFRESH THE NS STATION FOR PATIENT FETCHING
    const handleRefresh = useCallback(async () => {
        const now = Date.now(); //
        // Get the timestamp of the last refresh from localStorage (or 0 if not set)
        const lastRefresh = parseInt(localStorage.getItem('lastRefreshTime'), 10) || 0;
        // Calculate the remaining cooldown time in milliseconds (10 minutes = 10 * 60 * 1000 ms)
        const remaining = 10 * 60 * 1000 - (now - lastRefresh);
        // If remaining time is positive, it means the cooldown is still active
        if (remaining > 0) {
            // Convert remaining time to minutes and seconds for display
            const minutes = Math.floor(remaining / 60000);
            // const seconds = Math.floor((remaining % 60000) / 1000);

            // Show a warning notification to the user
            warningNofity(`Please wait ${minutes}m  before refreshing again.`);
            return;
        }
        try {
            setLoadingRefresh(true);       // show loading in UI
            const res = await axiosellider.post('/melioraEllider/updatepatientdetail', {
                NS_CODE: nscode
            });
            const { message, success } = res.data;
            if (success === 2) {
                succesNofity(message || `Updated Successfully`);
            } else {
                warningNofity(message || `Updation Failed`);
            }
            // Save the current timestamp in localStorage
            localStorage.setItem('lastRefreshTime', now.toString());
        } catch (err) {
            errorNofity(`Error in Refreshing Data`);
        } finally {
            setLoadingRefresh(false);
        }
    }, [nscode]);
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */


    return (

        <Box className="py-1" sx={{ backgroundColor: 'rgba(var(--bg-common))' }}  >
            <DefaultPageLayout label={nsname} view={view} setView={setView}>
                <Box
                    className="flex flex-col rounded-xl py-1 w-full"
                    sx={{
                        backgroundColor: "rgba(var(--bg-card))",
                        height: "calc(100% - 50px)",
                        cursor: 'pointer',

                    }}>

                    {/* <FloatingRefreshButton
                        loading={loadingrefresh}
                        onRefresh={handleRefresh}
                        tooltip="Reload patients" /> */}

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: "100%",
                        }}>
                        <Box
                            className="flex flex-col rounded-xl  w-full"
                            sx={{
                                backgroundColor: "rgba(var(--bg-card))",
                                height: "calc(100% - 50px)",
                                cursor: 'pointer',
                            }}>
                            {Object.entries(groupedBeds)?.map(([floorName, beddetail]) => (
                                <Box
                                    key={floorName}
                                    className="flex flex-col rounded-xl p-1 w-full"
                                    sx={{
                                        backgroundColor: "rgba(var(--bg-card))",
                                        height: "calc(100% - 50px)",
                                        cursor: 'pointer',
                                        mt: 2
                                    }}>
                                    <Box className="flex flex-col m-0 rounded-xl p-1 pb-2 overflow-scroll w-full"
                                        sx={{
                                            backgroundColor: 'rgba(var(--bg-card))',
                                        }}>
                                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%', px: 2.5 }}>
                                            <Box sx={{ border: 0, borderBottom: 1.5, borderColor: "rgba(var(--tab-border-color))", borderBottomColor: 'divider', borderWidth: 2, display: 'flex', alignItems: 'center', width: '100%' }} >
                                                <MeetingRoomTwoToneIcon sx={{
                                                    color: 'rgba(var(--font-primary-white))',
                                                    fontSize: 20,
                                                    fontWeight: 900,
                                                }} />
                                                <Typography

                                                    level='body-sm'
                                                    fontWeight={'md'}
                                                    sx={{
                                                        fontFamily: 'var(--font-varient)',
                                                        color: 'rgba(var(--font-primary-white))',
                                                        fontSize: { xs: 14, sm: 17 },
                                                        fontWeight: 600,
                                                        my: 1
                                                    }}>
                                                    {`${floorName}`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ width: "100%", mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Box sx={{ width: '98%' }}>
                                                <Grid container spacing={1}>
                                                    {beddetail?.map((item, index) => {
                                                        const result = getallremarkstatus?.find((val) => val?.fb_bd_code === Number(item?.fb_bd_code))
                                                        return (
                                                            <Grid xs={6} sm={3} lg={2} xl={1.5} key={index} >
                                                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                                                                    <RoomComponent
                                                                        remarkstatus={result}
                                                                        inpatientDetail={inpatientDetailfrommeliora[item.fb_bd_code] || []} // Only pass relevant data
                                                                        bdcode={item.fb_bd_code}
                                                                        roomnumber={item.fb_bdc_no}
                                                                        ispresent={item.fb_bdc_occup}
                                                                        getdetail={GetPatientDetailFromMeliora}
                                                                        setAnchorEl={setAnchorEl}
                                                                        anchorEl={anchorEl}
                                                                        feedbackedexit={patientfeedbackdata}
                                                                        isvip={item?.fb_bdc_vipbed}
                                                                        multiple={item?.OCCU}
                                                                        loading={loading}
                                                                        open={open}
                                                                        setOpen={setOpen}
                                                                    />
                                                                </Suspense>
                                                            </Grid>
                                                        )
                                                    })}
                                                </Grid>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </DefaultPageLayout>
        </Box>
    )
}

export default memo(PateintRoomDetail)