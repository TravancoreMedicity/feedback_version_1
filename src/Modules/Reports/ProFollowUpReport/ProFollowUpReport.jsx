import React, { memo, Suspense, useCallback, useState, useMemo, lazy } from 'react';
import { Box, IconButton, Tooltip } from '@mui/joy';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import { Paper } from '@mui/material';
import { endOfDay, format, startOfDay } from 'date-fns';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';

import { axiosApi } from '../../../Axios/Axios';
import { warningNofity } from '../../../Constant/Constant';
import { DownloadToExcelFile } from '../../../Function/CommonFunction';

import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import FeedbackReportTable from '../../../Components/FeedbackReportTable';

const ChecklistHeaders = lazy(() => import('../../../Components/ChecklistHeaders'));
const DatePickerComponent = lazy(() => import('../../../Components/DatePickerComponent'));

const ProFollowUpReport = () => {

    const [fromdate, setFromDate] = useState(startOfDay(new Date()));
    const [todate, setToDate] = useState(endOfDay(new Date()));
    const [feedbackdata, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Date format for backend
    const formattedFromDateMeliora = format(fromdate, 'yyyy-MM-dd HH:mm:ss');
    const formattedToDateMeliora = format(todate, 'yyyy-MM-dd HH:mm:ss');

    // Fetch report data
    const getProFollowup = useCallback(async () => {
        if (!formattedFromDateMeliora || !formattedToDateMeliora) {
            warningNofity("Please select the date");
            return;
        }

        setLoading(true);

        try {
            const result = await axiosApi.post("/feedback/profollowupdtl", {
                FROM_DATE: formattedFromDateMeliora,
                TO_DATE: formattedToDateMeliora
            });

            const { data, success } = result.data;

            if (success === 1) {
                warningNofity("Error in fetching data");
                setFeedbackData([]);
                return;
            }

            setFeedbackData(Array.isArray(data) ? data : []);
        } catch (error) {
            warningNofity("Error in fetching data");
        } finally {
            setLoading(false);
        }
    }, [formattedFromDateMeliora, formattedToDateMeliora]);

    // Table row data
    const rowData = useMemo(() => {
        return feedbackdata?.map((item, index) => ({
            "Sl No": index + 1,
            "IP Number": item?.fb_ip_no || "-",
            "Patient No": item?.fb_pt_no || "-",
            "Scheduled Date":
                item?.fb_schedule_date && !isNaN(new Date(item.fb_schedule_date))
                    ? format(new Date(item.fb_schedule_date), "dd-MM-yyyy")
                    : "-",
            "Remarks": item?.fb_pro_remark || "-",
            "Create Employee": item?.em_name || "-",
            "Create Date":
                item?.create_date && !isNaN(new Date(item.create_date))
                    ? format(new Date(item.create_date), "dd-MM-yyyy hh:mm:ss a")
                    : "-"
        }));
    }, [feedbackdata]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            {loading && (
                <CustomBackDropWithOutState message="Fetching Data Please Wait..." />
            )}

            <Box sx={{ minHeight: '100vh', width: '100%' }}>
                <Box
                    className="flex flex-col rounded-xl p-1 w-full"
                    sx={{
                        backgroundColor: "rgba(var(--bg-card))",
                        height: "calc(100% - 50px)"
                    }}
                >
                    <Box
                        sx={{
                            mb: 2,
                            p: 1,
                            backgroundColor: "rgba(var(--bg-card))",
                            border: 0.03,
                            borderColor: "rgba(var(--border-primary))",
                            borderRadius: 5,
                            width: '100%'
                        }}
                    >
                        <ChecklistHeaders
                            icon={
                                <BookTwoToneIcon
                                    sx={{
                                        color: 'rgba(var(--font-primary-white))',
                                        fontSize: { xs: 22, sm: 28 },
                                        fontWeight: 700,
                                        mt: 2
                                    }}
                                />
                            }
                            isShowBackIcon
                            name="DISCHARGE FEEDBACK REPORT"
                        />

                        <Paper
                            sx={{
                                width: '100%',
                                mt: 1,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                p: 2,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: "rgba(var(--bg-card))"
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Suspense fallback={<CustomBackDropWithOutState message="Loading" />}>
                                    <DatePickerComponent
                                        label="From Date"
                                        value={fromdate}
                                        setValue={setFromDate}
                                        maxDate={new Date(todate)}
                                    />
                                </Suspense>

                                <Suspense fallback={<CustomBackDropWithOutState message="Loading" />}>
                                    <DatePickerComponent
                                        label="To Date"
                                        value={todate}
                                        setValue={setToDate}
                                        maxDate={new Date()}
                                    />
                                </Suspense>

                                <IconButton
                                    sx={{ mt: 4 }}
                                    variant="soft"
                                    onClick={() => {
                                        if (rowData.length === 0) {
                                            warningNofity("No data to download");
                                            return;
                                        }
                                        DownloadToExcelFile(rowData, "ProFollowUp Report");
                                    }}
                                >
                                    <Tooltip title="Download to Excel">
                                        <DownloadForOfflineTwoToneIcon />
                                    </Tooltip>
                                </IconButton>

                                <IconButton
                                    sx={{ mt: 4 }}
                                    variant="soft"
                                    onClick={getProFollowup}
                                >
                                    <SearchTwoToneIcon />
                                </IconButton>
                            </Box>
                        </Paper>

                        <Box sx={{ width: '100%', mt: 1 }}>
                            {rowData?.length > 0 ? (
                                <FeedbackReportTable rowData={rowData} />
                            ) : (
                                <Box
                                    className="flex items-center justify-center"
                                    sx={{
                                        width: '100%',
                                        height: 650,
                                        color: 'rgba(var(--font-primary-white))'
                                    }}
                                >
                                    No Data Found
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default memo(ProFollowUpReport);
