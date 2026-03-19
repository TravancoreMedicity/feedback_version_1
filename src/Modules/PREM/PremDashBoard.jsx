import React, { memo, useEffect, useState, Suspense, lazy } from "react";
import { Box, Typography, Card, Tooltip } from "@mui/joy";
import CustomBackDropWithOutState from "../../Components/CustomBackDropWithOutState";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { axiosApi } from "../../Axios/Axios";
import { infoNofity, warningNofity } from "../../Constant/Constant";
import { format, startOfDay, endOfDay } from "date-fns";

const DatePickerComponent = lazy(() => import('../../Components/DatePickerComponent'));

const PremDashBoard = () => {

    //  initialize correctly
    const [fromdate, setFromDate] = useState(startOfDay(new Date()));
    const [todate, setToDate] = useState(endOfDay(new Date()));

    const [dashBoardDetail, setDashBoardDetail] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!fromdate || !todate) return;

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const formattedFromDateMeliora = format(fromdate, "yyyy-MM-dd HH:mm:ss");
                const formattedToDateMeliora = format(todate, "yyyy-MM-dd HH:mm:ss");
                const result = await axiosApi.post(
                    "/feedback/premdashdetial",
                    {
                        fromdate: formattedFromDateMeliora,
                        todate: formattedToDateMeliora,
                    }
                );
                const { data, success } = result.data;
                if (success === 0) {
                    infoNofity("No Data Found");
                    setDashBoardDetail([]);
                    return;
                }
                if (success !== 2) {
                    warningNofity("Error in fetching Data");
                    setDashBoardDetail([]);
                    return;
                }
                setDashBoardDetail(data || []);
            } catch (error) {
                console.error("Error fetching Prem Detail:", error);
                warningNofity("Server error while fetching prem dashboard detail");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [fromdate, todate]);

    //  handle date changes properly
    const handleFromDateChange = (date) => {
        setFromDate(startOfDay(date));
    };

    const handleToDateChange = (date) => {
        setToDate(endOfDay(date));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3 }}>
                {/*Header */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        level="h3"
                        sx={{
                            fontFamily: "var(--font-varient)",
                            color: "rgba(var(--font-primary-white))", mb: 0.5
                        }}>
                        Feedback Dashboard
                    </Typography>
                    <Typography
                        level="body-sm"
                        sx={{
                            fontFamily: "var(--font-varient)",
                            color: "rgba(var(--font-primary-white))"
                        }}>
                        Overview of Prem feedback counts by category
                    </Typography>
                </Box>

                {/*  Date Filters */}
                <Box
                    sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        backgroundColor: "rgba(var(--bg-common))",
                        p: 2,
                        borderRadius: "lg",
                    }}>
                    <Suspense fallback={<CustomBackDropWithOutState message="Loading" />}>
                        <DatePickerComponent
                            label="From Date"
                            value={fromdate}
                            setValue={handleFromDateChange}
                            maxDate={todate}
                        />
                    </Suspense>

                    <Suspense fallback={<CustomBackDropWithOutState message="Loading" />}>
                        <DatePickerComponent
                            label="To Date"
                            value={todate}
                            setValue={handleToDateChange}
                            maxDate={new Date()}
                        />
                    </Suspense>
                </Box>

                {/*  Dashboard Cards */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {dashBoardDetail?.map((item) => (
                        <Card
                            key={item?.fdmast_slno}
                            sx={{
                                p: 3,
                                borderRadius: "xl",
                                backgroundColor: "rgba(var(--bg-common))",
                                fontFamily: "var(--font-varient)",
                                color: "rgba(var(--font-primary-white))",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                minHeight: 120,
                                position: "relative"
                            }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                <Typography
                                    level="title-lg"
                                    sx={{
                                        fontFamily: "var(--font-varient)",
                                        color: "rgba(var(--font-primary-white))",
                                    }}
                                >
                                    {item?.feedback_name}
                                </Typography>
                                <Tooltip size="sm" title="Target" placement="top" followCursor>
                                    <Box
                                        sx={{
                                            display: "inline-block",
                                            cursor: "pointer",
                                        }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: "rgba(var(--font-primary-white),0.75)",
                                            }}
                                        >
                                            {item?.prem_target ?? "N/A"}
                                        </Typography>
                                    </Box>
                                </Tooltip>

                            </Box>

                            <Typography
                                level="h1"
                                sx={{
                                    mt: 1,
                                    fontWeight: 800,
                                    fontFamily: "var(--font-varient)",
                                    color: "rgba(var(--font-primary-white))",
                                    alignSelf: "flex-end",
                                }}
                            >
                                {item?.feedback_count}
                            </Typography>

                        </Card>
                    ))}
                </Box>

                {loading && (
                    <CustomBackDropWithOutState message="Fetching Data" />
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default memo(PremDashBoard);
