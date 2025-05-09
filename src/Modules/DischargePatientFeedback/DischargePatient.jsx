import React, { memo, useCallback, useEffect, useState } from 'react'
import ChecklistHeaders from '../../Components/ChecklistHeaders'
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import { Box, IconButton } from '@mui/joy';
import { Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DatePickerComponent from '../../Components/DatePickerComponent';
import AccessibleTable from '../../Components/AccessibleTable';
import { OUTLINK_FEEDBACK } from '../../Constant/Static';
import { endOfDay, format, startOfDay } from 'date-fns';
import { axiosApi, axiosellider } from '../../Axios/Axios';
import { errorNofity, infoNofity, warningNofity } from '../../Constant/Constant';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';



const DischargePatient = () => {

    const [dischargepatients, setDischargePatients] = useState([]);
    const [dischargepatientforms, setDischargePatientForm] = useState([]);
    const [fromdate, setFromDate] = useState(startOfDay(new Date()));
    const [todate, setToDate] = useState(endOfDay(new Date()));
    const formattedFromDate = format(fromdate, 'dd/MM/yyyy HH:mm:ss');
    const formattedToDate = format(todate, 'dd/MM/yyyy HH:mm:ss');
    const dischargefromdate = format(fromdate, 'yyyy/MM/dd HH:mm:ss');
    const dischargetodate = format(todate, 'yyyy/MM/dd HH:mm:ss');


    //Get DischargeForms
    const getDischagreFeedbackFrom = useCallback(async () => {
        const insertData = {
            feedbackId: 17,
            FROM_DATE: dischargefromdate,
            TO_DATE: dischargetodate
        }
        try {
            const result = await axiosApi.post("/feedback/getalldischargeform", insertData);
            const { data, success } = result.data;
            if (success === 1) return warningNofity("Error in fetching Data");
            setDischargePatientForm(data ? data : [])
        } catch (error) {
            warningNofity("Error in fetching Data")
        }
    }, [dischargefromdate, dischargetodate]);


    const getDischargedPatientDetails = useCallback(async () => {
        try {
            const response = await axiosellider.post('/melioraEllider/getdischargepatient', {
                FROM_DATE: formattedFromDate,
                TO_DATE: formattedToDate
            })
            const { success, data } = response?.data;
            if (success === 0) return errorNofity("Error in fetching Data");
            setDischargePatients(data ? data : [])
            await getDischagreFeedbackFrom()
            if (data?.length === 0) return infoNofity("No Discharge patients")
        } catch (error) {
            warningNofity("Error in Fetching Data...?")
        }
    }, [formattedFromDate, formattedToDate, getDischagreFeedbackFrom]);

    //Automatically checking that the form has sumbitted
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'TRIGGER_DISCHARGE_FETCH') {
                getDischargedPatientDetails();
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [getDischargedPatientDetails]);


    const openFeedbackForm = useCallback((data) => {
        const encodedId = btoa(17);
        const encodedName = btoa(data?.Patient_Name || "");
        const encodepatientid = btoa(data?.["Patient_No#"] || "");
        const encodemobile = btoa(data?.["Mobile No"] || "");
        const encodeipnum = btoa(data?.["Admn. Number"] || "");
        const externalUrl = `${OUTLINK_FEEDBACK}/${encodedId}?name=${encodedName}&pid=${encodepatientid}&mbno=${encodemobile}&ipnum=${encodeipnum}`;
        window.open(externalUrl, '_blank');
    }, []);

    const hanldeDischargeFeedback = useCallback((data) => {
        openFeedbackForm(data)
    }, [openFeedbackForm]);


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
                            name={'DISCHARGED IN-PATIENT LIST'}
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
                                    justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                    mt: { xs: 2, sm: 0 }
                                }}>
                                <DatePickerComponent label={'From Date'} setValue={setFromDate} value={fromdate} />
                                <DatePickerComponent label={'To Date'} setValue={setToDate} value={todate} />
                                <IconButton variant="soft" onClick={getDischargedPatientDetails}>
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
                            <AccessibleTable
                                DischargeForms={dischargepatientforms}
                                dischargepatients={dischargepatients}
                                hanldeDischargeFeedback={hanldeDischargeFeedback} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    )
}

export default memo(DischargePatient)
