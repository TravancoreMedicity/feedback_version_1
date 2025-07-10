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
import AgeGridCommonTable from '../../../Components/AgeGridCommonTable';
import React, { memo, Suspense, useCallback, useEffect, useState } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';


const ChecklistHeaders = lazy(() => import('../../../Components/ChecklistHeaders'));
const DatePickerComponent = lazy(() => import('../../../Components/DatePickerComponent'));

const CommonFeedbackReport = () => {


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
            const result = await axiosApi.post("/feedback/commonfbreport", insertData);
            const { data, success } = result.data;
            if (success === 1) return warningNofity("Error in fetching Data");
            setFeedbackData(data ? data : [])
        } catch (error) {
            warningNofity("Error in fetching Data")
        }
    }, [formattedFromDateMeliora, formattedToDateMeliora])

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
                    "Q1: Satisfaction": "-",
                    "Q2: Response": "-",
                    "Q3: Cleanliness": "-",
                    "Q4: Wait Time": "-",
                    "Q5: Recommend": "-",
                    "Q6: Contact": "-",
                    "Q7: Suggestion": "-",
                    "Create Date": item?.create_date || "-",
                    "Create Employee": item?.em_name || "-"
                };
            }

            const question = (item?.fd_qa_eng || "").toLowerCase();

            if (question.includes("treatment")) {
                acc[id]["Q1: Satisfaction"] = item.rating_value;
            } else if (question.includes("concerns")) {
                acc[id]["Q2: Response"] = item.rating_value;
            } else if (question.includes("cleanliness")) {
                acc[id]["Q3: Cleanliness"] = item.rating_value;
            } else if (question.includes("waiting")) {
                acc[id]["Q4: Wait Time"] = item.rating_value;
            } else if (question.includes("recommend")) {
                acc[id]["Q5: Recommend"] = item.rating_value;
            } else if (question.includes("contact")) {
                acc[id]["Q6: Contact"] = item.rating_value;
            } else if (question.includes("improve")) {
                acc[id]["Q7: Suggestion"] = item.fb_suggestion || "-";
            }
            return acc;
        }, {})
    ).map((item, index) => ({
        "Sl No": index + 1,
        ...item,
    }));;

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
                            name={'COMMON FEEDBACK REPORT'}
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
                                    onClick={() => DownloadToExcelFile(finalGroupedList, "CommonFeedbackData")}>
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
                                    <AgeGridCommonTable groupedFeedbackData={finalGroupedList} /> :
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

export default memo(CommonFeedbackReport);


