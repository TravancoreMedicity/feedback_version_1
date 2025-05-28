import { Box, Grid, Typography } from '@mui/joy'
import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import DefaultPageLayout from '../../Components/DefaultPageLayout'
import { axiosApi } from '../../Axios/Axios';
import { infoNofity, warningNofity } from '../../Constant/Constant';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { getBedRemarkStatus } from '../../Function/CommonFunction';
import { useQuery } from '@tanstack/react-query';



const RoomComponent = lazy(() => import('./RoomComponent'));

const PateintRoomDetail = ({ beddetail, nsname, view, setView, nscode }) => {

    const [inpatientDetailfrommeliora, setInpatientDetailFromMeliora] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [patientfeedbackdata, setPatientFeedBackData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)


    //GROUP BED DETAIL BASED ON THE ROOM CATEGORIES
    const groupedBeds = beddetail?.reduce((acc, bed) => {
        const key = bed.fb_rtc_desc; // Grouping based only on RTC_DESC
        acc[key] = acc[key] ? [...acc[key], bed] : [bed];
        return acc;
    }, {});

    //QUERY FOR GETTING ALL BED REMARKS
    const { data: getallremarkstatus } = useQuery({
        queryKey: ["getbedremarkstatus"],
        queryFn: () => getBedRemarkStatus()
    });


    //FETCHING INFORMATION THAT HAVE ALREADY SUBMITTED FEEDBACK
    const FetchPatientFeedback = useCallback(async (inpatientDetail) => {
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
    }, [])

    //Fetching Patient Detail From the Melior
    const GetPatientDetailFromMeliora = useCallback(async (bdcode) => {
        const insertData = {
            fb_ns_code: nscode,
            fb_bd_code: parseInt(bdcode)
        }

        try {
            setLoading(true)
            setInpatientDetailFromMeliora({});
            const response = await axiosApi.post('/feedback/inpatientdetil', insertData)
            const { success, data } = response?.data;

            if (success === 1) {
                setOpen(true)
                // infoNofity("No patient Detail")
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
            setLoading(false)
        } catch (error) {
            warningNofity("Error in Api")
            setAnchorEl(null)
            setLoading(false)
        }
    }, [nscode, setInpatientDetailFromMeliora, setAnchorEl, FetchPatientFeedback, setLoading])


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
                                                    {floorName}
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