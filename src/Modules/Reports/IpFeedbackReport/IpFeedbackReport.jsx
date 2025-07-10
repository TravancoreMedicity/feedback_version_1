import { Box, IconButton, Tooltip } from '@mui/joy';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import { Paper } from '@mui/material';
import { lazy } from 'react';
import { endOfDay, format, startOfDay } from 'date-fns';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { axiosApi } from '../../../Axios/Axios';
import { warningNofity } from '../../../Constant/Constant';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DownloadToExcelFile } from '../../../Function/CommonFunction';
import React, { memo, Suspense, useCallback, useEffect, useState } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import AgeGridIpTable from '../../../Components/AgeGridIpTable';


const ChecklistHeaders = lazy(() => import('../../../Components/ChecklistHeaders'));
const DatePickerComponent = lazy(() => import('../../../Components/DatePickerComponent'));

const IpFeedbackReport = () => {


    const [fromdate, setFromDate] = useState(startOfDay(new Date()));
    const [todate, setToDate] = useState(endOfDay(new Date()));
    const [feedbackdata, setFeedbackData] = useState([]);

    // Formatting Date suitable for the meliora
    const formattedFromDateMeliora = format(fromdate, 'yyyy-MM-dd HH:mm:ss');
    const formattedToDateMeliora = format(todate, 'yyyy-MM-dd HH:mm:ss');


    // getting Feeedbackdata
    const getCommonFeedbackDetail = useCallback(async () => {
        const insertData = {
            FROM_DATE: formattedFromDateMeliora,
            TO_DATE: formattedToDateMeliora
        }

        try {
            const result = await axiosApi.post("/feedback/ipfbreport", insertData);
            const { data, success } = result.data;
            if (success === 1) return warningNofity("Error in fetching Data");
            setFeedbackData(data ? data : [])
        } catch (error) {
            warningNofity("Error in fetching Data")
        }
    }, [formattedFromDateMeliora, formattedToDateMeliora]);

    // Automatically call the function on first render and on date change
    useEffect(() => {
        getCommonFeedbackDetail();
    }, [getCommonFeedbackDetail]);



    const finalGroupedList = feedbackdata && Object.values(
        feedbackdata?.reduce((acc, item) => {
            const id = item?.fb_transact_slno;


            if (!acc[id]) {
                acc[id] = {
                    id,
                    "Patient Name": item?.fb_patient_name || "-",
                    "Phone": item?.fb_patient_mob || "-",
                    "IP Number": item?.fb_ip_num || "-",
                    "Treatment Satisfaction": "-",
                    "Admission Desk": "-",
                    "Room Wait Time": "-",
                    "Room Amenities": "-",
                    "Cleanliness": "-",
                    "Doctor Behaviour": "-",
                    "Nurse Behaviour": "-",
                    "Nursing Care": "-",
                    "Billing and Discharge": "-",
                    "Cafeteria Service": "-",
                    "Overall Experience": "-",
                    "Recommend to Others": "-",
                    "Aware of Rules": "-",
                    "Cultural Support": "-",
                    "Create Employee": item?.em_name || "-",
                    "Create Date": item?.create_date || "-"
                };
            }

            const question = (item?.fd_qa_eng || "").toLowerCase();

            if (question.includes("treatment satisfaction")) {
                acc[id]["Treatment Satisfaction"] = item.rating_value;
            } else if (question.includes("admission desk")) {
                acc[id]["Admission Desk"] = item.rating_value;
            } else if (question.includes("time taken to occupy")) {
                acc[id]["Room Wait Time"] = item.rating_value;
            } else if (question.includes("amenlties provided")) {
                acc[id]["Room Amenities"] = item.rating_value;
            } else if (question.includes("cleanliness")) {
                acc[id]["Cleanliness"] = item.rating_value;
            } else if (question.includes("doctors behaviour")) {
                acc[id]["Doctor Behaviour"] = item.rating_value;
            } else if (question.includes("nurses behaviour")) {
                acc[id]["Nurse Behaviour"] = item.rating_value;
            } else if (question.includes("nursing care")) {
                acc[id]["Nursing Care"] = item.rating_value;
            } else if (question.includes("billing and discharge")) {
                acc[id]["Billing and Discharge"] = item.rating_value;
            } else if (question.includes("cafeteria and canteen")) {
                acc[id]["Cafeteria Service"] = item.rating_value;
            } else if (question.includes("overall experience")) {
                acc[id]["Overall Experience"] = item.rating_value;
            } else if (question.includes("refer travancore")) {
                acc[id]["Recommend to Others"] = item.rating_value;
            } else if (question.includes("rules and regulation")) {
                acc[id]["Aware of Rules"] = item.rating_value;
            } else if (question.includes("spiritual and cultural")) {
                acc[id]["Cultural Support"] = item.rating_value;
            }


            return acc;
        }, {})
    ).map((item, index) => ({
        "Sl No": index + 1,
        ...item,
    }));



    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* < DefaultPageLayout label="Common Feedback Report" > */}
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
                            name={'IP FEEDBACK REPORT '}
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
                                    />
                                </Suspense>

                                <IconButton sx={{ mt: 4 }}
                                    variant="soft"
                                    onClick={() => DownloadToExcelFile(finalGroupedList, "IpFeedbackData")}>
                                    <Tooltip title="Download to Excel">
                                        <DownloadForOfflineTwoToneIcon />
                                    </Tooltip>
                                </IconButton>
                                <IconButton sx={{ mt: 4 }}
                                    variant="soft"
                                    onClick={getCommonFeedbackDetail}>
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
                                feedbackdata && feedbackdata?.length > 0 ?
                                    <AgeGridIpTable groupedFeedbackData={finalGroupedList} /> :
                                    <Box className="flex items-center justify-center"
                                        sx={{ width: '100%', height: 650, color: 'rgba(var(--font-primary-white))', }}>
                                        No Data Found
                                    </Box>
                            }


                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* </DefaultPageLayout > */}
        </LocalizationProvider>
    )
}

export default memo(IpFeedbackReport);


