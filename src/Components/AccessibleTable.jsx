import React, { memo, Suspense, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { RowStyleModule } from 'ag-grid-community';
import { NumberFilterModule } from 'ag-grid-community';
import { ClientSideRowModelModule, TextFilterModule } from 'ag-grid-community';
import { CellStyleModule } from 'ag-grid-enterprise';
import { ValidationModule } from 'ag-grid-enterprise';
import PersonIcon from '@mui/icons-material/Person';
import SmsFailedTwoToneIcon from '@mui/icons-material/SmsFailedTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { Box, Button, CssVarsProvider, Tooltip } from '@mui/joy';
import DischargeFeedBackModal from '../Modules/DischargePatientFeedback/DischargeFeedBackModal';
import DischargeFollowupModal from '../Modules/DischargePatientFeedback/DischargeFollowupModal';
import { format, parseISO } from 'date-fns';
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone';
import LockClockTwoToneIcon from '@mui/icons-material/LockClockTwoTone';
import CustomBackDropWithOutState from './CustomBackDropWithOutState';

// import DischargeFollowupModal from '../Modules/DischargePatientFeedback/DischargeFollowupModal';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    TextFilterModule,
    ValidationModule,
    CellStyleModule,
    RowStyleModule,
    NumberFilterModule
]);


// DISCHARGED IN-PATIENT LIST IN CALL CENTER
const AccessibleTable = ({
    hanldeDischargeFeedback,
    dischargepatients,
    DischargeForms,
    handleFollowUpReview,
    openfeedback,
    setFeedback,
    feedbackData,
    getFeedbackData,
    open,
    setOpen,
    InPatientDetail,
    ReviewDetail,
    ProVerifiedPatient,
    Loading
}) => {



    const updatedPatients = dischargepatients?.map(patient => {
        const matchingPatient = ProVerifiedPatient?.find(
            form => form?.fb_ip_no === patient?.fb_ip_no
        );
        return {
            ...patient,
            ScheduleDate: matchingPatient?.fb_schedule_date || "Pro not Verifed",
            isFormSubmitted: DischargeForms?.some(form => form?.fb_ip_num === patient?.fb_ip_no)
        }
    });





    const columnDefs = useMemo(() => [
        {
            headerName: 'Actions',
            field: 'isFormSubmitted',
            width: 80,
            maxWidth: 100,
            minWidth: 40,
            suppressSizeToFit: true,
            cellRenderer: (params) => {
                const isSubmitted = params.data?.isFormSubmitted;
                const date = params.data?.ScheduleDate;
                return (
                    <Button
                        disabled={isSubmitted || (!date || date === "Pro not Verifed")}
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        onClick={() => hanldeDischargeFeedback(params?.data)}
                        sx={{
                            fontSize: 12,
                            color: 'rgba(var(--font-primary-white))',
                            fontWeight: 600,
                        }}
                    >
                        {
                            !date || date === "Pro not Verifed" ? <LockClockTwoToneIcon
                                sx={{
                                    fontSize: 18,
                                    mr: 0.2,
                                    color: 'red',
                                }}
                            /> : isSubmitted ?
                                <Tooltip title="feedback">
                                    <MarkChatReadTwoToneIcon
                                        sx={{
                                            fontSize: 18,
                                            mr: 0.2,
                                            color: isSubmitted ? 'Green' : 'red',
                                        }}
                                    />
                                </Tooltip>
                                :
                                <Tooltip title="feedback">
                                    <SmsFailedTwoToneIcon
                                        sx={{
                                            fontSize: 18,
                                            mr: 0.2,
                                            color: isSubmitted ? 'Green' : 'red',
                                        }}
                                    />
                                </Tooltip>
                        }

                    </Button>
                );
            }
        },
        {
            headerName: 'FollowUp',
            field: 'FollowUp',
            width: 80,
            maxWidth: 100,
            minWidth: 40,
            suppressSizeToFit: true,
            cellRenderer: (params) => {
                const date = params.data?.ScheduleDate;
                return (
                    <Button
                        disabled={(!date || date === "Pro not Verifed")}
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        onClick={() => handleFollowUpReview(params.data['Admn. Number'], params.data)}
                        sx={{
                            fontSize: 12,
                            color: 'rgba(var(--font-primary-white))',
                            fontWeight: 600,
                        }}
                    >
                        {
                            !date || date === "Pro not Verifed" ?
                                <Tooltip title="detail">
                                    <LockClockTwoToneIcon
                                        sx={{
                                            fontSize: 18,
                                            mr: 0.2,
                                            color: 'red',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Tooltip>
                                :
                                <Tooltip title="patient detail">
                                    <AccountTreeTwoToneIcon
                                        sx={{
                                            fontSize: 18,
                                            mr: 0.2,
                                            color: 'red',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Tooltip>
                        }

                    </Button>
                );
            }
        },
        {
            headerName: 'Schedule Date',
            valueGetter: (params) => {
                const date = params.data?.ScheduleDate;
                if (!date || date === "Pro not Verifed") return date;
                try {
                    return format(parseISO(date), 'dd-MM-yyyy');
                } catch (e) {
                    return date;
                }
            }
        },
        {
            headerName: 'Patient Name',
            field: 'fb_ptc_name',
            cellRenderer: (params) => {
                return (
                    <span style={{ fontWeight: 500, fontSize: 13 }}>
                        <PersonIcon style={{ fontSize: 14, marginRight: 4 }} />
                        {params.value}
                    </span>
                );
            },
        },

        { headerName: 'Age', field: 'fb_ptn_yearage', filter: 'agNumberColumnFilter' },
        {
            headerName: 'Gender',
            valueGetter: (params) => {
                const gender = params.data['fb_ptc_sex'];
                return gender && gender.toLowerCase() === 'm' ? 'Male' : 'Female';
            },
        },
        { headerName: 'Patient ID', field: 'fb_pt_no' },
        { headerName: 'Admission Number', field: 'fb_ip_no' },
        // {
        //     headerName: 'Admission Number',
        //     valueGetter: (params) => params.data['Admn. Number'],
        // },
        // {
        //     headerName: 'Admission Date',
        //     valueGetter: (params) => {
        //         const addr1 = params.data?.Admission_Date;
        //         return format(parseISO(addr1), 'dd-MM-yyyy HH:mm:ss')
        //     }
        // },
        // {
        //     headerName: 'Discharge Date',
        //     valueGetter: (params) => {
        //         const addr1 = params.data?.Discharge_Date;
        //         return format(parseISO(addr1), 'dd-MM-yyyy HH:mm:ss')
        //     }

        // },
        // { headerName: 'Department', field: 'Department' },

        { headerName: 'Doctor', field: 'fb_doc_name' },
        { headerName: 'Contact', field: 'fb_ptc_mobile' },
        {
            headerName: 'Address',
            valueGetter: (params) => {
                const addr1 = params.data['fb_ptc_loadd1'] || '';
                const addr2 = params.data['fb_ptc_loadd2'] || '';
                const addr3 = params.data['fb_ptc_loadd3'] || '';
                const addr4 = params.data['fb_ptc_loadd4'] || '';
                return [addr1, addr2, addr3, addr4].filter(Boolean).join(', ');
            },
        },
        {
            headerName: 'Status',
            valueGetter: (params) => {
                const status = params.data['fb_ipc_status'];
                return status && status.toLowerCase() === 'r' ? 'Recovered' : status;
            },
        },

    ], [hanldeDischargeFeedback, handleFollowUpReview]);


    return (
        <>
            {
                open &&
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..!"} />}>
                    <DischargeFollowupModal
                        ReviewDetail={ReviewDetail}
                        InPatientDetail={InPatientDetail}
                        setOpen={setOpen}
                        open={open}
                        Loading={Loading}
                    />
                </Suspense>
            }

            {
                openfeedback && feedbackData &&
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..!"} />}>
                    <DischargeFeedBackModal
                        open={openfeedback}
                        setOpen={setFeedback}
                        feedbackData={feedbackData}
                        getFeedbackData={getFeedbackData}
                    />
                </Suspense>
            }
            <CssVarsProvider>
                <Box sx={{ height: 700, width: '100%', overflow: 'auto' }} >
                    <AgGridReact
                        className="custom-age-grid ag-grid-container"
                        rowData={updatedPatients || []}
                        columnDefs={columnDefs || []}
                        defaultColDef={{
                            flex: 1,
                            sortable: true,
                            resizable: true,
                            filter: true,
                            cellStyle: (params) => {
                                const isSubmitted = params.data?.isFormSubmitted;
                                const date = params.data?.ScheduleDate;
                                return {
                                    fontSize: '13px',
                                    color: (!date || date !== "Pro not Verifed") && !isSubmitted ? '#6c757d' : isSubmitted ? '#6c757d' : 'rgba(var(--font-primary-white))',
                                    fontWeight: 600,
                                    backgroundColor: (!date || date !== "Pro not Verifed") && !isSubmitted ? '#ffe0e9' : isSubmitted ? '#d8f3dc' : 'rgba(var(--bg-card))',
                                };
                            },
                        }}

                    />
                </Box>
            </CssVarsProvider>
        </>

    );
};


export default memo(AccessibleTable);
