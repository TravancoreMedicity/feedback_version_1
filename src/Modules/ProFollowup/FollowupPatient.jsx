import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import { Box, IconButton } from '@mui/joy';
import { Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { endOfDay, format, startOfDay } from 'date-fns';
import { axiosApi, axiosellider } from '../../Axios/Axios';
import { CleanHtmlString, employeeID, errorNofity, infoNofity, normalizeDate, succesNofity, warningNofity } from '../../Constant/Constant';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import SelectMelioraNursingStation from '../../Components/SelectMelioraNursingStation';



const ChecklistHeaders = lazy(() => import('../../Components/ChecklistHeaders'));
const CallcenterTable = lazy(() => import('../../Components/CallcenterTable'));
const DatePickerComponent = lazy(() => import('../../Components/DatePickerComponent'));

const FollowupPatient = () => {

    const [openreviewmodal, setOpenReviewModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [followuploading, setFollowupLoading] = useState(false);
    const [dischargepatients, setDischargePatients] = useState([]);
    const [ipfollowupreview, setIpFollowUpReviewe] = useState('');
    const [ipdetail, setIpDetail] = useState({});
    const [ipscheduledate, setIpScheduleDate] = useState([]);
    const [dischargepatientforms, setDischargePatientForm] = useState([]);
    const [proremarks, setProRemarks] = useState("");
    const [postloading, setPostLoading] = useState(false); // setting loader when scheduling Date 

    const [reviewdate, setReviewDate] = useState(startOfDay(new Date()));
    const [fromdate, setFromDate] = useState(startOfDay(new Date()));
    const [todate, setToDate] = useState(endOfDay(new Date()));

    const formattedreviewdate = format(reviewdate, 'yyyy-MM-dd');
    const formattedFromDateMeliora = format(fromdate, 'yyyy-MM-dd HH:mm:ss');
    const formattedToDateMeliora = format(todate, 'yyyy-MM-dd HH:mm:ss');


    const [nursingstation, setNursingStation] = useState({
        NS_CODE: 0
    });

    const { NS_CODE } = nursingstation;

    // change state
    const handleChange = (e) => {
        setNursingStation({ ...nursingstation, [e.target.name]: e.target.value })
    };

    //Get DischargeForms
    const getDischagreFeedbackFrom = useCallback(async () => {
        const insertData = {
            feedbackId: 26,
            FROM_DATE: formattedFromDateMeliora,
            TO_DATE: formattedToDateMeliora
        }
        try {
            const result = await axiosApi.post("/feedback/getalldischargeform", insertData);
            const { data, success } = result.data;
            if (success === 1) return warningNofity("Error in fetching Data");
            setDischargePatientForm(data ? data : [])
        } catch (error) {
            warningNofity("Error in fetching Data")
        }
    }, [formattedFromDateMeliora, formattedToDateMeliora]);


    // getting Pro schedule date for displaying
    const getInpatientScheduleDate = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axiosApi.post('/feedback/getallipfollowup', {
                FROM_DATE: formattedFromDateMeliora,
                TO_DATE: formattedToDateMeliora
            })
            const { success, data } = response?.data;
            if (success === 0) {
                errorNofity("Error in fetching Data");
            } else if (success === 1) {
                infoNofity("No Discharge patients");
            } else {
                setIpScheduleDate(data || []);
            }
        } catch (error) {
            warningNofity("Error in Fetching Data...?");
        }
        finally {
            setLoading(false)
        }
    }, [formattedFromDateMeliora, formattedToDateMeliora]);



    // GET DISHCARGE PATIENT FROM fb_ipadmiss
    const getDishcargePatientDetail = useCallback(async () => {
        setLoading(true)
        if (fromdate > todate) {
            warningNofity("Please Select Valid From Date")
            setLoading(false)
            return
        }
        try {
            const response = await axiosApi.post('/feedback/getdischargepatient', {
                FROM_DATE: formattedFromDateMeliora,
                TO_DATE: formattedToDateMeliora,
                NS_CODE: NS_CODE
            })
            const { success, data } = response?.data;

            if (success === 0) {
                errorNofity("Error in fetching Data");
            } else if (success === 1) {
                infoNofity("No Discharge patients");
                setDischargePatients([]);
            } else {
                setDischargePatients(data || []);
                await getInpatientScheduleDate();
                await getDischagreFeedbackFrom();
            }
        } catch (error) {
            warningNofity("Error in Fetching Data...?");
        }
        finally {
            setLoading(false)
        }
    }, [fromdate, todate, formattedFromDateMeliora, formattedToDateMeliora, getInpatientScheduleDate, getDischagreFeedbackFrom, NS_CODE])


    // fetching apporiapte patient follow up for Ellider
    const handleFollowUpReview = useCallback(async (data, ipdetail) => {
        setFollowupLoading(true)
        setOpenReviewModal(true)
        setIpDetail(ipdetail)
        const insertdata = {
            IP_NO: data
        }
        try {
            const result = await axiosellider.post("/melioraEllider/getipfollowup", insertdata);
            const { data, success } = result.data;
            if (success === 0) return warningNofity("Error in fetching Data");
            // if (success === 1) return infoNofity("No Follow Up date Present")
            const cleanData = await CleanHtmlString(data?.[0]?.DSC_DESCRIPTION)
            setIpFollowUpReviewe(data?.length > 0 ? cleanData : 'NO PREVIOUS PRVIEW FOR THIS PARTICULAR PATIENT')
        } catch (error) {
            warningNofity("Error in fetching Data")
        }
        finally {
            setFollowupLoading(false)
        }
    }, [setOpenReviewModal, setIpFollowUpReviewe])



    // scheduling date for patients
    const handleDateScheduling = useCallback(async (data) => {
        setPostLoading(true)
        //checking if there is any changes
        const isSameDate = normalizeDate(data?.ScheduleDate) === formattedreviewdate;
        const isSameRemarks = data?.proremark === proremarks;

        //prevent submission if there is no change in the date and remarks
        if (isSameDate && isSameRemarks) {
            infoNofity("No changes to Commit.");
            return
        }

        // data for insertion
        const insertData = {
            ipdata: data,
            Schedule_date: formattedreviewdate,
            fb_pro_remark: proremarks,
            create_user: employeeID()
        }

        // data for updation
        const updateData = {
            slno: data?.ScheduleSlno,
            Schedule_date: formattedreviewdate,
            fb_pro_remark: proremarks,
            edit_user: employeeID()
        }

        const IsPresent = data?.isFormSubmitted; //  checking if form already submitted 
        const endpoint = IsPresent ? '/feedback/updateipfollowup' : '/feedback/insertipfollowup';
        const Payload = IsPresent ? updateData : insertData;
        try {
            const response = await axiosApi.post(endpoint, Payload)
            const { success } = response?.data;
            if (success === 0) return errorNofity("Error in Inserting data Data");
            succesNofity(`Schedule Date ${IsPresent ? 'Updated' : 'Inserted'} Successfully!`);
            getInpatientScheduleDate()
        } catch (error) {
            warningNofity("Error in Fetching Data...?");
        } finally {
            setOpenReviewModal(false)
            setProRemarks('')
            setPostLoading(false)
        }
    }, [formattedreviewdate, getInpatientScheduleDate, proremarks, setPostLoading]);



    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ minHeight: '100vh', width: '100%' }}>
                <Box
                    className="flex flex-col rounded-xl p-1 w-full"
                    sx={{
                        backgroundColor: "rgba(var(--bg-card))",
                        height: "calc(100% - 50px)",
                        cursor: 'pointer'
                    }}>
                    <Box sx={{
                        mb: 2,
                        p: 1,
                        backgroundColor: "rgba(var(--bg-card))",
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        borderRadius: 5,
                        width: '100%',
                    }}>
                        <ChecklistHeaders
                            icon={
                                <BookTwoToneIcon sx={{
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 22, sm: 28 },
                                    fontWeight: 700,
                                    mt: 2
                                }} />
                            }
                            name={'FOLLOWUP IP LIST'}
                        />
                        <Paper
                            sx={{
                                width: '100%',
                                mt: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 2,
                                p: 2,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: "rgba(var(--bg-card))"
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    alignItems: 'center',
                                    justifyContent: { xs: 'flex-start' },
                                    mt: { xs: 2, sm: 0 }
                                }}>
                                <Suspense
                                    fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                    <DatePickerComponent
                                        maxDate={new Date(todate)}
                                        label={'From Date'}
                                        setValue={setFromDate}
                                        value={fromdate}
                                    />
                                </Suspense>
                                <Suspense
                                    fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                    <DatePickerComponent
                                        label={'To Date'}
                                        setValue={setToDate}
                                        value={todate}
                                        maxDate={new Date()}
                                    />  </Suspense>

                                <Box sx={{ width: 300, pt: 1 }}>
                                    <SelectMelioraNursingStation
                                        label={'Select Nursing Station'}
                                        value={NS_CODE}
                                        handleChange={(e, val) => handleChange({ target: { name: 'NS_CODE', value: val } })} />
                                </Box>
                                <IconButton sx={{ mt: 4 }} variant="soft" onClick={getDishcargePatientDetail}>
                                    <SearchTwoToneIcon />
                                </IconButton>
                            </Box>

                        </Paper>
                        <Box
                            sx={{
                                width: '100%',
                                mt: 1,
                                backgroundColor: "rgba(var(--bg-card))"
                            }}>
                            {
                                loading ? <CustomBackDropWithOutState message={"Fetching Data...!"} /> :
                                    <Suspense
                                        fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                        <CallcenterTable
                                            ReviewDetail={ipfollowupreview}
                                            dischargepatients={dischargepatients}
                                            handleFollowUpReview={handleFollowUpReview}
                                            open={openreviewmodal}
                                            setOpen={setOpenReviewModal}
                                            InPatientDetail={ipdetail}
                                            setValue={setReviewDate}
                                            value={reviewdate}
                                            handleDateScheduling={handleDateScheduling}
                                            SheduledPatient={ipscheduledate}
                                            getInpatientScheduleDate={getInpatientScheduleDate}
                                            DischargeForm={dischargepatientforms}
                                            Loading={followuploading}
                                            proremarks={proremarks}
                                            setProRemarks={setProRemarks}
                                            SumbittingData={postloading}
                                        />
                                    </Suspense>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    )
}

export default memo(FollowupPatient)
