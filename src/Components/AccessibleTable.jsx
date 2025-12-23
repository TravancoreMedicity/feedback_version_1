import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react';
import { axiosApi } from '../Axios/Axios';
import { AgGridReact } from 'ag-grid-react';
import { format, parseISO } from 'date-fns';
import { RowStyleModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { CellStyleModule } from 'ag-grid-enterprise';
import { ValidationModule } from 'ag-grid-enterprise';
import { NumberFilterModule } from 'ag-grid-community';
import PersonIcon from '@mui/icons-material/Person';
import { getAgeInYears, warningNofity } from '../Constant/Constant';
import { Box, Button, CssVarsProvider, Tooltip } from '@mui/joy';
import CustomBackDropWithOutState from './CustomBackDropWithOutState';
import SmsFailedTwoToneIcon from '@mui/icons-material/SmsFailedTwoTone';
import LockClockTwoToneIcon from '@mui/icons-material/LockClockTwoTone';
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone';
import { ClientSideRowModelModule, TextFilterModule } from 'ag-grid-community';
import EscalatorWarningTwoToneIcon from '@mui/icons-material/EscalatorWarningTwoTone';


const DischargeFeedBackModal = lazy(() => import('../Modules/DischargePatientFeedback/DischargeFeedBackModal'));


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
    // DischargeForms,
    handleFollowUpReview,
    openfeedback,
    setFeedback,
    feedbackData,
    getFeedbackData,
    ReviewDetail,
    ProVerifiedPatient,
    Loading,
    getDishcargePatientDetail
}) => {


    const [isImpressionalreadyexist, setIsImpressionAlreadyExist] = useState(false);
    const [patientimpdetail, setPatientImpDetail] = useState([]);
    const [transactionid, setTransactionId] = useState(0);
    const [patientremarks, setPatientRemarks] = useState([]);
    const [patientrelative, setPatientRelative] = useState([]);
    const [childrendetail, setChildrenDetail] = useState([]);
    const [notrespondingdetail, setNotRespondingDetail] = useState([])

    // Filtering out day care patient form the discharged patients
    const FilterDaycarePatient = dischargepatients?.filter(item => item?.fb_dep_desc !== "ONCOLOGY DAY CARE") || [];

    // Table column Datas
    const updatedPatients = FilterDaycarePatient?.map(patient => {

        // Matching patient detail where the pro verified
        const matchingPatient = ProVerifiedPatient?.find(
            form => form?.fb_ip_no === patient?.fb_ip_no
        );
        // transaction_id

        //check in duplicate number exist
        const duplicatePatients = dischargepatients?.filter(
            p => p?.fb_ptc_mobile === patient?.fb_ptc_mobile && p?.fb_ip_no !== patient?.fb_ip_no
        ) || [];

        // duplicate exist in the Data
        const duplicatePeopleIpnumber = duplicatePatients?.map(p => p?.fb_ip_no);

        return {
            ...patient,
            ScheduleDate: matchingPatient?.fb_schedule_date || "Pro not Verifed",
            isFormSubmitted: patient.fb_call_staus === 1,
            transactionId: patient?.fb_transact_slno ? patient?.fb_transact_slno : null,
            hasDuplicateMobile: duplicatePatients?.length > 0,
            duplicatePeopleIpnumber,
            ProRemark: matchingPatient?.fb_pro_remark
        }
    });


    // fetching Patient Default Impession Detail if Present
    const handleFetchPatientImpression = useCallback(async (id) => {
        const insertdata = { FB_TCT_SLNO: id } // passing the transaction slno
        if (!id) return
        try {
            const result = await axiosApi.post("/feedback/getptimpression", insertdata);
            const { data, success } = result.data;
            if (success === 0) return warningNofity("Error in fetching Data");
            setPatientImpDetail(data ? data : [])
        } catch (error) {
            warningNofity("error in Fetching Data...!")
        }
    }, []);


    // fetching Patient Remark Detail if Present
    const fetchPatientRemarkCallcenter = useCallback(async (id) => {
        const insertdata = { FB_TCT_SLNO: id } // passing the transaction slno
        if (!id) return
        try {
            const result = await axiosApi.post("/feedback/fetchimpremark", insertdata);
            const { data, success } = result.data;
            if (success === 0) return warningNofity("Error in fetching Data");
            setPatientRemarks(data ? data : [])
        } catch (error) {
            warningNofity("error in Fetching Data...!")
        }
    }, []);


    // Fetching Relative Detail Also
    const handleRelativeDetail = useCallback(async (ipdata) => {
        setPatientRelative([]) //clearing befor inserting new data
        const Payload = {
            IP_NO: ipdata
        }
        try {
            const result = await axiosApi.post("/feedback/getrelative", Payload);
            const { data, success } = result.data;
            if (success === 0) return warningNofity("Error in fetching Data");
            setPatientRelative(data)
        } catch (error) {
            warningNofity("error in Fetching Data...!")
        }
    }, [])


    // fetching the Not repsonding Remark of the Patient If exist
    const handlefetchpatientNotRespondingDetail = useCallback(async (ipdata) => {
        setNotRespondingDetail([])
        const Payload = {
            IP_NO: ipdata
        }
        try {
            const result = await axiosApi.post("/feedback/getptnotresponding", Payload);
            const { data, success } = result.data;
            if (success === 0) return warningNofity("Error in fetching Data");
            setNotRespondingDetail(data ? data : [])
        } catch (error) {
            warningNofity("error in Fetching Data...!")
        }
    }, []);


    // Fetch Child Birth Detail
    const handleChildBirthDetail = useCallback(async (ipdata) => {
        setChildrenDetail([]) // clearing before inserting
        const Payload = {
            IP_NO: ipdata
        }
        try {
            const result = await axiosApi.post("/feedback/getbirthdetail", Payload);
            const { data, success } = result.data;
            if (success === 0) return warningNofity("Error in fetching Data");
            setChildrenDetail(data) // children Data storing in array
        } catch (error) {
            warningNofity("error in Fetching Data...!")
        }
    }, [])


    // handle all Function relative to a person where her submitted feedback , submitted Default impresion,remark and also the relative of the person
    const HandlePatinetDetailBothReviewandInpatient = useCallback(async (ip, data) => {

        const { transactionId, duplicatePeopleIpnumber } = data;

        setPatientRelative([]) // clearing befor inserting new

        await handleChildBirthDetail(ip) // fetching birth detail for correspoinding mother

        if (duplicatePeopleIpnumber?.length > 0) {
            await handleRelativeDetail(duplicatePeopleIpnumber) // fetch relative (mother and son , brother and sister)
        }
        // all this will perform if their exist a transaction id that can be get from when the patient sumbit a feedback
        if (transactionId !== null) {
            setTransactionId(transactionId)
            setIsImpressionAlreadyExist(true)
            await handleFetchPatientImpression(transactionId) //fetching default Impression of the person
            await fetchPatientRemarkCallcenter(transactionId) // fetching patient remarks
        } else {
            setIsImpressionAlreadyExist(false)
        }
        handlefetchpatientNotRespondingDetail(ip)
        hanldeDischargeFeedback(data)
        handleFollowUpReview(ip)
    }, [setIsImpressionAlreadyExist, setTransactionId, setPatientRelative, handleFetchPatientImpression, fetchPatientRemarkCallcenter, handleFollowUpReview, handleRelativeDetail, hanldeDischargeFeedback, handleChildBirthDetail, handlefetchpatientNotRespondingDetail]);




    const columnDefs = useMemo(() => [
        {
            headerName: 'Slno',
            field: 'slno',
            filter: 'agNumberColumnFilter'
        },
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
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        onClick={!date || date !== "Pro not Verifed" ? () => HandlePatinetDetailBothReviewandInpatient(params.data?.fb_ip_no, params.data) : () => { }}
                        sx={{
                            fontSize: 12,
                            color: 'rgba(var(--font-primary-white))',
                            fontWeight: 600,
                        }}>
                        {
                            !date || date === "Pro not Verifed" ?
                                <LockClockTwoToneIcon
                                    sx={{
                                        fontSize: 18,
                                        mr: 0.2,
                                        color: 'red',
                                    }} /> : isSubmitted ?
                                    <Tooltip title="feedback">
                                        <MarkChatReadTwoToneIcon
                                            sx={{
                                                fontSize: 18,
                                                mr: 0.2,
                                                color: 'Green',
                                            }}
                                        />
                                    </Tooltip>
                                    :
                                    <Tooltip title="feedback">
                                        <SmsFailedTwoToneIcon
                                            sx={{
                                                fontSize: 18,
                                                mr: 0.2,
                                                color: 'red',
                                            }}
                                        />
                                    </Tooltip>
                        }
                    </Button>
                );
            }
        },
        { headerName: 'Discharge Date', field: 'fb_ipd_disc' },
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
                const isrelative = params.data?.hasDuplicateMobile
                return (
                    <span style={{ fontWeight: 500, fontSize: 13 }}>
                        {
                            isrelative ? <EscalatorWarningTwoToneIcon style={{ fontSize: 16, marginRight: 4, color: '#dc2f02' }} /> : <PersonIcon style={{ fontSize: 14, marginRight: 4 }} />
                        }
                        {params.value}
                    </span>
                );
            },
        },
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

        {
            headerName: 'Department',
            field: 'fb_dep_desc',
            valueGetter: (params) => params.data?.fb_dep_desc ?? 'NOT AVAILABLE'
        },
        {
            headerName: 'Status',
            valueGetter: (params) => {
                const status = params.data['fb_ipc_status'];
                return status && status.toLowerCase() === 'r' ? 'Recovered' : status;
            },
        },

    ], [HandlePatinetDetailBothReviewandInpatient]);


    return (
        <>
            {
                openfeedback && feedbackData &&
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..!"} />}>
                    <DischargeFeedBackModal
                        open={openfeedback}
                        setOpen={setFeedback}
                        feedbackData={feedbackData}
                        getFeedbackData={getFeedbackData}
                        ReviewDetail={ReviewDetail}
                        Loading={Loading}
                        IsIMpressionDone={isImpressionalreadyexist}
                        setPatientImpDetail={setPatientImpDetail}
                        PatientImpDetail={patientimpdetail}
                        PatientRemark={patientremarks}
                        TransactionID={transactionid} // id stored in fb_transction mast for geting patient detail
                        Relatives={patientrelative}
                        Children={childrendetail}
                        patientnotResponding={notrespondingdetail}
                        PatientNotRespondingRemark={handlefetchpatientNotRespondingDetail}
                        getDishcargePatientDetail={getDishcargePatientDetail}
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
                                    color: (!date || date !== "Pro not Verifed") && !isSubmitted ? '#495057' : isSubmitted ? '#495057' : 'rgba(var(--font-primary-white))',
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
