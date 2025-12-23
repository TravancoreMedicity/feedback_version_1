
import React, { lazy, memo, Suspense, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { NumberFilterModule } from 'ag-grid-community';
import { ClientSideRowModelModule, TextFilterModule } from 'ag-grid-community';
import { CellStyleModule } from 'ag-grid-enterprise';
import { ValidationModule } from 'ag-grid-enterprise';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { Box, Button, CssVarsProvider, Tooltip } from '@mui/joy';
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import CustomBackDropWithOutState from './CustomBackDropWithOutState';
import { getAgeInYears } from '../Constant/Constant';



const DischargeFollowupModal = lazy(() => import('../Modules/DischargePatientFeedback/DischargeFollowupModal'))

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    TextFilterModule,
    ValidationModule,
    CellStyleModule,
    NumberFilterModule
]);

const CallcenterTable = ({
    dischargepatients,
    handleFollowUpReview,
    open,
    setOpen,
    InPatientDetail,
    ReviewDetail,
    setValue,
    value,
    handleDateScheduling,
    SheduledPatient,
    DischargeForm,
    Loading,
    setProRemarks,
    proremarks,
    SumbittingData
}) => {


    // filtering out day care patient form the discharged patients
    const FilterDaycarePatient = dischargepatients?.filter(item => item?.fb_dep_desc !== "ONCOLOGY DAY CARE") || [];

    // patient for scheduling  date by pros
    const updatedPatients = FilterDaycarePatient?.map(patient => {
        const matchingForm = SheduledPatient?.find(
            form => form?.fb_ip_no === patient?.fb_ip_no
        );
        return {
            ...patient,
            ScheduleDate: matchingForm?.fb_schedule_date || null,
            ScheduleSlno: matchingForm?.fb_date_schedule_slno || 0,
            isFormSubmitted: !!matchingForm,
            isFeedbackSumbitted: DischargeForm?.some(form => form?.fb_ip_num === patient?.fb_ip_no),
            proremark: matchingForm?.fb_pro_remark
        };
    });


    const columnDefs = useMemo(() => [
        {
            headerName: 'Slno',
            field: 'slno',
            filter: 'agNumberColumnFilter'
        },
        {
            headerName: 'FollowUp',
            field: 'fb_pt_name',
            width: 80,
            maxWidth: 100,
            minWidth: 40,
            suppressSizeToFit: true,
            cellRenderer: (params) => {
                const isSubmitted = params.data?.isFormSubmitted;
                const isFeedbackSubmitted = params.data?.isFeedbackSumbitted;
                return (
                    <Button
                        disabled={isFeedbackSubmitted}
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        onClick={() => handleFollowUpReview(params.data?.fb_ip_no, params?.data)}
                        sx={{
                            fontSize: 12,
                            color: 'rgba(var(--font-primary-white))',
                            fontWeight: 600,
                        }}>
                        {
                            isFeedbackSubmitted ?
                                <>
                                    <Tooltip title="Delete">
                                        <EventBusyTwoToneIcon
                                            sx={{
                                                fontSize: 18,
                                                mr: 0.2,
                                                color: isFeedbackSubmitted ? 'Green' : 'red',
                                            }}
                                        />
                                    </Tooltip>
                                </>
                                :
                                <CalendarMonthTwoToneIcon
                                    sx={{
                                        fontSize: 18,
                                        mr: 0.2,
                                        color: isSubmitted ? 'Green' : 'red',
                                    }}
                                />
                        }
                    </Button>
                );
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
        // {
        //     headerName: 'Age',
        //     field: 'fb_ptn_yearage',
        //     filter: 'agNumberColumnFilter'
        // },
        {
            headerName: 'Age',
            // field: 'fb_ptn_yearage',
            // filter: 'agNumberColumnFilter'
            field: 'fb_ptd_dob', // still reference the DOB field
            filter: 'agNumberColumnFilter',
            valueGetter: (params) => getAgeInYears(params.data.fb_ptd_dob)
        },
        {
            headerName: 'Gender',
            valueGetter: (params) => {
                const gender = params.data['fb_ptc_sex'];
                return gender && gender.toLowerCase() === 'm' ? 'Male' : 'Female';
            },
        },
        { headerName: 'Patient ID', field: 'fb_pt_no' },
        { headerName: 'Admission Number', field: 'fb_ip_no' },
        { headerName: 'Doctor', field: 'fb_doc_name' },
        { headerName: 'Contact', field: 'fb_ptc_mobile' },
        { headerName: 'Discharge Date', field: 'fb_ipd_disc' },
        // {
        //     headerName: 'Address',
        //     valueGetter: (params) => {
        //         const addr1 = params.data['fb_ptc_loadd1'] || '';
        //         // const addr2 = params.data['fb_ptc_loadd2'] || '';
        //         // const addr3 = params.data['fb_ptc_loadd3'] || '';
        //         // const addr4 = params.data['fb_ptc_loadd4'] || '';
        //         return [addr1
        //             // , addr2, addr3, addr4
        //         ].filter(Boolean).join(', ');
        //     },
        // },
        {
            headerName: 'Address',
            valueGetter: ({ data }) => data?.fb_ptc_loadd1 ?? '',
        },
        {
            headerName: 'Status',
            valueGetter: (params) => {
                const status = params.data['fb_ipc_status'];
                return status && status.toLowerCase() === 'r' ? 'Recovered' : status;
            },
        }
    ], [handleFollowUpReview]);

    return (
        <>
            {
                open &&
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..!"} />}>
                    <DischargeFollowupModal
                        ReviewDetail={ReviewDetail}
                        InPatientDetail={InPatientDetail}
                        open={open}
                        setOpen={setOpen}
                        setValue={setValue}
                        value={value}
                        handleDateScheduling={handleDateScheduling}
                        Loading={Loading}
                        proremarks={proremarks}
                        setProRemarks={setProRemarks}
                        SumbittingData={SumbittingData}
                    /></Suspense>
            }
            <CssVarsProvider>
                <Box className="ag-grid-container" sx={{ height: 700, width: '100%' }} >
                    <AgGridReact
                        className="custom-age-grid"
                        rowData={updatedPatients || []}
                        columnDefs={columnDefs || []}
                        defaultColDef={{
                            flex: 1,
                            sortable: true,
                            resizable: true,
                            filter: true,
                            cellStyle: (params) => {
                                const isSubmitted = params.data?.isFormSubmitted;
                                const isFeedbackSubmitted = params.data?.isFeedbackSumbitted;
                                return {
                                    fontSize: '13px',
                                    color: isFeedbackSubmitted || isSubmitted ? '#495057' : 'rgba(var(--font-primary-white))',
                                    fontWeight: 600,
                                    backgroundColor: isFeedbackSubmitted ? '#d8f3dc' : isSubmitted ? '#ffe0e9' : 'rgba(var(--bg-card))',
                                    // fontFamily: 'var(--font-varient)',
                                };
                            }
                        }}

                    />
                </Box>
            </CssVarsProvider>
        </>

    );
};


export default memo(CallcenterTable);
