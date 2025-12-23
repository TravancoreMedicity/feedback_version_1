import React, { memo, useState, Suspense, useEffect, useMemo, useCallback } from 'react';
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    Typography,
} from '@mui/joy';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import DatePickerComponent from '../../../Components/DatePickerComponent';
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import ChecklistHeaders from '../../../Components/ChecklistHeaders';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormControlLabel, FormGroup, Paper, FormControl, useMediaQuery } from '@mui/material';
import { errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant';
import { TextField, InputAdornment } from "@mui/material";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import { axiosApi, axiosellider } from '../../../Axios/Axios';
import PatientInsertCard from '../../../Components/PatientInsertCard';
import PatientInsertTable from '../../../Components/PatientInsertTable';
import FilterListIcon from '@mui/icons-material/FilterList';
import { format, isSameDay } from 'date-fns';
import { formatEndOfDay, handleApi } from '../../../Function/CommonFunction';
import { Box as MuiBox } from '@mui/material'; // for small layout tweaks

const Ipadmissiondischarge = () => {

    // Detect Mobile Screen
    const isMobile = useMediaQuery("(max-width: 600px)");

    // Checkbox States
    const [isAdmission, setIsAdmission] = useState(false);
    const [isDischarge, setIsDischarge] = useState(false);
    const [isSearchbyIp, setIsSearchByIp] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [ipnumber, setIpNumber] = useState('');
    const [patientdetail, setPatientDetail] = useState([]); // used when searching by IP
    const [mysqlpatientdetail, setMysqlPatientDetail] = useState([]) // rows from your MYSQL API
    const [elliderpatientdetail, setElliderPatientDetail] = useState([]) // rows from Ellider (oracle)
    const [selectedPatient, setSelectedPatients] = useState([]); // selected rows from grid

    // View mode: 'all' | 'missing' | 'existing'
    const [viewMode, setViewMode] = useState('missing');

    // Date States
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    // Auto-enable Search By IP in mobile mode
    useEffect(() => {
        if (isMobile) {
            setIsSearchByIp(true);
            setIsAdmission(false);
            setIsDischarge(false);
        }
    }, [isMobile]);


    useEffect(() => {
        if (fromDate && toDate && fromDate > toDate) {
            setToDate(fromDate);
        }
    }, [fromDate, toDate]);


    // Insert selected patients into MySQL (existing function kept)
    const handleMysqlPatientInsert = async () => {
        if (!selectedPatient || selectedPatient.length === 0) return warningNofity("No Data Found");
        try {
            setLoading(true);
            const res = await axiosApi.post('/feedback/insertpatientdetail', selectedPatient);
            const { message, success } = res.data;

            if (success === 2) {
                succesNofity(message || `MySQL Patient Insert Success`);
                // After insert, re-fetch MySQL patient list to update missing/existing
                await refreshMysqlData();
            }
            else {
                warningNofity(message || `MySQL Patient Insert Error`);
            }

        } catch (err) {
            console.error(`MySQL Patient Insert Error:`, err);
            errorNofity(`MySQL Patient Insert Error Occurred`);
        } finally {
            setLoading(false);
        }
    };


    // Inserting selected Ip Patient Details
    const handlePaientInsert = useCallback(async () => {
        if (patientdetail && patientdetail?.length === 0) return warningNofity("patinet Detail Not Present")
        try {
            setLoading(true);
            const res = await axiosApi.post('/feedback/insertpatientdetail', patientdetail);
            const { message, success } = res.data;
            if (success === 2) {
                succesNofity(message || `MySQL Patient Insert Success`);
            }
            else {
                warningNofity(message || `MySQL Patient Insert Error`);
            }
        } catch (err) {
            errorNofity(`MySQL Patient Insert Error Occurred`);
        } finally {
            setLoading(false);
            setPatientDetail([])
            setIpNumber('')
        }
    }, [patientdetail])


    // Helper to re-fetch only MYSQL data (keeps payload consistent with last admission/discharge choice)
    const refreshMysqlData = async () => {
        try {
            const sameDay = isSameDay(fromDate ?? new Date(), toDate ?? new Date());
            const payloadmysql = {
                type: isAdmission ? 1 : isDischarge ? 2 : null,
                fromDate: fromDate ? format(fromDate, "yyyy-MM-dd HH:mm:ss") : null,
                toDate: toDate ? (sameDay ? formatEndOfDay(toDate) : format(toDate, "yyyy-MM-dd HH:mm:ss")) : null,
            };
            await handleApi(
                axiosApi.post('/feedback/getpatientdetail', payloadmysql),
                setMysqlPatientDetail,
                "MYSQL Patient Details"
            );
        } catch (err) {
            console.error("refreshMysqlData error", err);
        }
    };

    // Extract all fb_ip_no values into a Set for fast lookup
    const mysqlIPSet = useMemo(() => new Set(mysqlpatientdetail.map(row => row?.fb_ip_no)), [mysqlpatientdetail]);

    // missingPatients: Ellider rows not in MySQL
    const missingPatients = useMemo(() => {
        if (!elliderpatientdetail || elliderpatientdetail.length === 0) return [];
        return elliderpatientdetail.filter(row => !mysqlIPSet.has(row.IP_NO));
    }, [elliderpatientdetail, mysqlIPSet]);

    // existingPatients: Ellider rows which are present in MySQL (useful for update)
    const existingPatients = useMemo(() => {
        if (!elliderpatientdetail || elliderpatientdetail.length === 0) return [];
        return elliderpatientdetail.filter(row => mysqlIPSet.has(row.IP_NO));
    }, [elliderpatientdetail, mysqlIPSet]);

    // FETCH DATA FORM BOTH  ELLIDER AND MYSQL
    const getPatientDetail = async () => {
        // VALIDATION
        if ((!isAdmission && !isDischarge) && !isSearchbyIp)
            return warningNofity("Please select Admission or Discharge");

        if ((!fromDate || !toDate) && !isSearchbyIp)
            return warningNofity("Please select From Date and To Date");

        const sameDay = fromDate && toDate ? isSameDay(fromDate, toDate) : false;

        //  PAYLOAD FOR ELLIDER API
        const payload = {
            type: isAdmission ? 1 : 2,
            fromDate: fromDate ? format(fromDate, "yyyy-MM-dd HH:mm:ss") : null,
            toDate: toDate ? (sameDay ? formatEndOfDay(toDate) : format(toDate, "yyyy-MM-dd HH:mm:ss")) : null,
            ipnumber: isSearchbyIp ? ipnumber : null
        };

        //  PAYLOAD FOR MYSQL API
        const payloadmysql = {
            type: isAdmission ? 1 : 2,
            fromDate: fromDate ? format(fromDate, "yyyy-MM-dd HH:mm:ss") : null,
            toDate: toDate ? (sameDay ? formatEndOfDay(toDate) : format(toDate, "yyyy-MM-dd HH:mm:ss")) : null,
        };

        setLoading(true);

        //  FIRST API CALL (ELLIDER)
        await handleApi(
            axiosellider.post('/melioraEllider/getpatientdetail', payload),
            setElliderPatientDetail,
            "Ellider Patient Details"
        );

        //  SECOND API CALL (MYSQL)
        await handleApi(
            axiosApi.post('/feedback/getpatientdetail', payloadmysql),
            setMysqlPatientDetail,
            "MYSQL Patient Details"
        );

        // Default viewMode: show missing after fetch
        setViewMode('missing');
        // clear selected rows
        setSelectedPatients([]);
        setLoading(false);
    };

    // get Patient detail using IP number (search by IP)
    const getPatientDetailUsingIpNumber = async () => {

        if (isSearchbyIp) {
            const ip = ipnumber?.trim();
            if (!ip) return warningNofity("Please Enter the IP Number");
            if (!/^\d+$/.test(ip)) return warningNofity("IP Number should contain only numbers");
            if (ip.length !== 10) return warningNofity("IP Number must be exactly 10 digits");
        }
        //  PAYLOAD FOR ELLIDER API
        const payload = {
            ipnumber: isSearchbyIp ? ipnumber : null
        };

        setLoading(true);
        //  FIRST API CALL (ELLIDER)
        await handleApi(
            axiosellider.post('/melioraEllider/getpatientbyip', payload),
            setPatientDetail,
            "Fetched "
        );
        setLoading(false);
    };

    // Determine which rowData to show in the table area
    const tableRowData = useMemo(() => {
        if (isSearchbyIp) {
            // when search by IP we show patientdetail (single or array)
            return patientdetail ?? [];
        }

        if (viewMode === 'missing') return missingPatients;
        if (viewMode === 'existing') return existingPatients;
        // 'all' -> show all ellider rows
        return elliderpatientdetail ?? [];
    }, [isSearchbyIp, patientdetail, viewMode, missingPatients, existingPatients, elliderpatientdetail]);


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
                        borderRadius: 2,
                        width: '100%',
                    }}>

                        <ChecklistHeaders
                            icon={<BookTwoToneIcon sx={{ color: 'rgba(var(--font-primary-white))' }} />}
                            isShowBackIcon={true}
                            name={`FETCH PATIENTS ${(isAdmission || isDischarge) ? (isAdmission ? "ADMISSION" : "DISCHARGE") : ''} DETAILS`}
                        />

                        {/* MAIN FILTER CARD */}
                        <Paper
                            sx={{
                                width: '100%',
                                mt: 1,
                                display: 'flex',
                                gap: 2,
                                p: 1,
                                backgroundColor: "rgba(var(--bg-card))",
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}>

                            {/* CHECKBOXES */}
                            {
                                !isMobile &&
                                <FormControl component="fieldset" sx={{ mb: 2, mx: 2 }}>
                                    <FormGroup row sx={{ gap: 2 }}>
                                        {/* Hide Admission & Discharge on mobile */}
                                        <>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={isAdmission}
                                                        onChange={(e) => {
                                                            setIsAdmission(e.target.checked);
                                                            setIsDischarge(false);
                                                            setIsSearchByIp(false);
                                                            setPatientDetail([]);
                                                            setElliderPatientDetail([]);
                                                            setMysqlPatientDetail([]);
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={{
                                                        mx: 1,
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        color: 'rgba(var(--font-primary-white))',
                                                        fontFamily: 'Bahnschrift',
                                                        whiteSpace: 'nowrap'
                                                    }}>Admission</Typography>
                                                }
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={isDischarge}
                                                        onChange={(e) => {
                                                            setIsDischarge(e.target.checked);
                                                            setIsAdmission(false);
                                                            setIsSearchByIp(false);
                                                            setPatientDetail([]);
                                                            setElliderPatientDetail([]);
                                                            setMysqlPatientDetail([]);
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={{
                                                        mx: 1,
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        color: 'rgba(var(--font-primary-white))',
                                                        fontFamily: 'Bahnschrift',
                                                        whiteSpace: 'nowrap'
                                                    }}>Discharge</Typography>
                                                }
                                            />

                                            {/* Always show Search By IP */}
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={isSearchbyIp}
                                                        onChange={(e) => {
                                                            setIsSearchByIp(e.target.checked);
                                                            setIsAdmission(false);
                                                            setIsDischarge(false);
                                                            setElliderPatientDetail([]);
                                                            setMysqlPatientDetail([]);
                                                            setSelectedPatients([]);
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={{
                                                        mx: 1,
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        color: 'rgba(var(--font-primary-white))',
                                                        fontFamily: 'Bahnschrift',
                                                        whiteSpace: 'nowrap'
                                                    }}>Search by IP</Typography>
                                                }
                                            />
                                        </>

                                    </FormGroup>
                                </FormControl>
                            }
                            {/* DATE PICKERS OR IP INPUT */}
                            {(isAdmission || isDischarge || isSearchbyIp) &&
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                                    {(isAdmission || isDischarge) && !isMobile && (
                                        <>
                                            {/* Actions row: View Mode buttons + Insert/Update */}
                                            <MuiBox sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Button
                                                    color="neutral"
                                                    variant={viewMode === 'missing' ? "solid" : "outlined"}
                                                    size="sm"
                                                    sx={{ mt: 3 }}
                                                    onClick={() => {
                                                        setViewMode('missing');
                                                        setSelectedPatients([]);
                                                    }}
                                                >
                                                    Show Missing
                                                </Button>

                                                <Button
                                                    color="neutral"
                                                    variant={viewMode === 'existing' ? "soft" : "outlined"}
                                                    size="sm"
                                                    sx={{ mt: 3 }}
                                                    onClick={() => {
                                                        setViewMode('existing');
                                                        setSelectedPatients([]);
                                                    }}
                                                >
                                                    Show Existing
                                                </Button>

                                                <Button
                                                    color="neutral"
                                                    variant={viewMode === 'all' ? "solid" : "outlined"}
                                                    size="sm"
                                                    sx={{ mt: 3 }}
                                                    onClick={() => {
                                                        setViewMode('all');
                                                        setSelectedPatients([]);
                                                    }}>
                                                    Show All
                                                </Button>

                                                {/* Insert and Update buttons operate on selected rows */}
                                                <Button
                                                    variant="outlined"
                                                    color="neutral"
                                                    startDecorator={<FilterListIcon sx={{ fontSize: 18, color: 'rgba(var(--font-primary-white))' }} />}
                                                    sx={{ mt: 3, color: 'rgba(var(--font-primary-white))' }}
                                                    onClick={handleMysqlPatientInsert} >
                                                    process Data
                                                </Button>

                                            </MuiBox>

                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                                <DatePickerComponent
                                                    label={'From Date'}
                                                    setValue={setFromDate}
                                                    value={fromDate}
                                                    // maxDate={new Date()}
                                                    maxDate={toDate || new Date()}
                                                />
                                            </Suspense>

                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                                <DatePickerComponent
                                                    label={'To Date'}
                                                    setValue={setToDate}
                                                    value={toDate}
                                                    // maxDate={new Date()}
                                                    minDate={fromDate}
                                                    maxDate={new Date()}
                                                />
                                            </Suspense>
                                        </>
                                    )}

                                    {/* IP NUMBER FIELD */}
                                    {isSearchbyIp &&
                                        <TextField
                                            label="IP Number"
                                            variant="outlined"
                                            size="small"
                                            type="number"               // shows number keypad
                                            inputMode="numeric"
                                            sx={{
                                                width: 250,
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: "rgba(var(--font-primary-white))",   // Default border
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: "rgba(var(--font-primary-white))", // Hover border
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "rgba(var(--font-primary-white))", // Focus border
                                                    },
                                                    "& .MuiOutlinedInput-input": {
                                                        color: "rgba(var(--font-primary-white))",   //  input text color
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    color: "rgba(var(--font-primary-white))",
                                                },
                                                "& .MuiInputLabel-root.Mui-focused": {
                                                    color: "rgba(var(--font-primary-white))",
                                                }
                                            }}
                                            value={ipnumber}
                                            onChange={(e) => setIpNumber(e.target.value)}
                                            InputProps={{
                                                inputMode: "numeric",     // <--- important
                                                pattern: "[0-9]*",        // <--- strictly numbers
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonTwoToneIcon sx={{ opacity: 0.7, color: "rgba(var(--font-primary-white))" }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    }

                                    {/* SEARCH BUTTON */}
                                    <IconButton

                                        variant="soft"
                                        sx={{
                                            width: 35, height: 35,
                                            mt: !isSearchbyIp ? 2.5 : 0
                                        }}
                                        onClick={isSearchbyIp ? getPatientDetailUsingIpNumber : getPatientDetail}
                                    >
                                        <SearchTwoToneIcon />
                                    </IconButton>
                                </Box>
                            }
                        </Paper>

                        {/* TABLE/MESSAGE AREA */}
                        <Box sx={{ width: '100%', mt: 1, minHeight: 650 }}>
                            {Loading ?
                                <CustomBackDropWithOutState message={"Fetching Data...!"} />
                                :
                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>

                                    {
                                        (isSearchbyIp || (patientdetail && patientdetail.length > 0)) ?
                                            <PatientInsertCard
                                                onInsert={handlePaientInsert}
                                                patientData={patientdetail} /> :
                                            <PatientInsertTable
                                                rowData={tableRowData}
                                                setSelectedPatients={setSelectedPatients}
                                            />
                                    }

                                </Suspense>
                            }
                        </Box>

                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default memo(Ipadmissiondischarge);

