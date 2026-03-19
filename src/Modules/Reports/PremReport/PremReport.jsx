import React, { memo, Suspense, useCallback, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/joy';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import { Paper } from '@mui/material';
import { lazy } from 'react';
import { endOfDay, format, startOfDay } from 'date-fns';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { axiosApi } from '../../../Axios/Axios';
import { infoNofity, warningNofity } from '../../../Constant/Constant';
import { DownloadToExcelFile } from '../../../Function/CommonFunction';
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import useGroupedFeedback from './useGroupedFeedback';


const ChecklistHeaders = lazy(() => import('../../../Components/ChecklistHeaders'));
const DatePickerComponent = lazy(() => import('../../../Components/DatePickerComponent'));
const FeedbackReportTable = lazy(() => import('../../../Components/FeedbackReportTable'));
const SelectPremFeedbacks = lazy(() => import('../../../Components/SelectPremFeedbacks'));

const PremReport = () => {


    const [fromdate, setFromDate] = useState(startOfDay(new Date()));
    const [todate, setToDate] = useState(endOfDay(new Date()));
    const [feedbackdata, setFeedbackData] = useState([]);
    const [feedbackid, setFeedbackId] = useState(null);
    const [loading, setLoading] = useState(false)

    // Formatting Date suitable for the meliora
    const formattedFromDateMeliora = format(fromdate, 'yyyy-MM-dd HH:mm:ss');
    const formattedToDateMeliora = format(todate, 'yyyy-MM-dd HH:mm:ss');

    // getting Feeedbackdata
    const getPremDetail = useCallback(async () => {

        if (!formattedFromDateMeliora || !formattedToDateMeliora) {
            warningNofity("Please select the date");
            return;
        }

        if (!feedbackid) {
            warningNofity("Please select the Prem Type");
            return;
        }

        setLoading(true);

        try {
            const result = await axiosApi.post("/feedback/premreport", {
                FROM_DATE: formattedFromDateMeliora,
                TO_DATE: formattedToDateMeliora,
                FEEDBACKID: feedbackid
            });

            const { data, success } = result.data;

            if (success === 1) {
                infoNofity("No Feedback Found");
                setFeedbackData([]);
                return;
            }
            if (success === 0) {
                warningNofity("Error in fetching Data");
                setFeedbackData([]);
                return;
            }

            setFeedbackData(data || []);
        } catch (error) {
            warningNofity("Error in fetching Data");
        } finally {
            setLoading(false);
        }
    }, [formattedFromDateMeliora, formattedToDateMeliora, feedbackid]);


    const rowData = useGroupedFeedback(feedbackdata || []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* < DefaultPageLayout label="Common Feedback Report" > */}
            {loading && <CustomBackDropWithOutState message={"Fetching Data Please Wait..."} />}
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
                            isShowBackIcon={true}
                            name={'PREM FEEDBACK REPORT '}
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


                                <Suspense fallback={<CustomBackDropWithOutState message="Loading..." />}>
                                    <SelectPremFeedbacks
                                        label="Select the Feedback"
                                        value={feedbackid}
                                        handleChange={(event, newValue) => {
                                            setFeedbackId(newValue);
                                            setFeedbackData([])
                                        }}
                                    />
                                </Suspense>

                                <IconButton
                                    sx={{ mt: 4 }}
                                    variant="soft"
                                    onClick={() => {
                                        if (!rowData || rowData?.length === 0) {
                                            warningNofity("No data to download");
                                            return;
                                        }
                                        DownloadToExcelFile(rowData, "Report");
                                    }}>
                                    <Tooltip title="Download to Excel">
                                        <DownloadForOfflineTwoToneIcon />
                                    </Tooltip>
                                </IconButton>

                                <IconButton sx={{ mt: 4 }}
                                    variant="soft"
                                    onClick={getPremDetail}>
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
                                rowData && rowData?.length > 0 ?
                                    <FeedbackReportTable rowData={rowData} /> :
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

export default memo(PremReport);




