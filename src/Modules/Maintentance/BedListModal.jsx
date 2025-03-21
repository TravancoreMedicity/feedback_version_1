import React, { useCallback, memo, useState, useMemo, useEffect, lazy, Suspense } from 'react';
import Modal from '@mui/joy/Modal';
import { Box, Button, ModalClose, ModalDialog, Typography } from '@mui/joy';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import { useQuery } from '@tanstack/react-query';
import { getBedRemarkDetails, getDepartmentEmployee, getLoggedEmpDetail } from '../../Function/CommonFunction';
import { EmpauthId, employeeID, succesNofity, warningNofity } from '../../Constant/Constant';
import { axiosApi } from '../../Axios/Axios';
import { BmdepId, ItdepId, MtdepId } from '../../Constant/Data';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';


const BedListOtherDep = lazy(() => import('./BedListOtherDep'));
const MaintenanceRemarkButton = lazy(() => import('./MaintenanceRemarkButton'));
const MultipleSelect = lazy(() => import('../../Components/MultipleSelect'));


const BedListModal = ({ open,
    setOpen,
    name,
    icon,
    bedslno,
    bedcode,
    bedno,
    nscode,
    selectmaintentance,
    setSelectMaintenance,
    setinformationtech,
    setInformationTech,
    setbiomedical,
    setBioMedical,
    getallremarkrefetch,
    getallBlokedbedRefetch
}) => {

    const id = EmpauthId()
    const [empid, setEmpid] = useState([]);
    const [ovarallconditon, setOverallCondition] = useState(null)
    const [activeButton, setActiveButton] = useState(null);
    const [remarks, setRemarks] = useState("")
    const [overallremarks, setOverallRemarks] = useState("")
    const [selectstatus, setSelecStatus] = useState(false)

    //OVERALL CONDITION CHEKING
    const handleButtonClick = useCallback((buttonName) => {
        setOverallCondition((prevState) => (prevState === buttonName ? null : buttonName));
    }, [setOverallCondition]);

    // FUNCTION TO GET ICON COLOR BASED ON THE ACTIVE BUTTON
    const getIconColor = (buttonName) => {
        return ovarallconditon === buttonName ? 'rgb(216, 75, 154, 1)' : 'rgba(var(--font-primary-white))';
    };

    //FETCHING EMP DETAIL FOR DEPARTMENT SELECTION FOR DEPARTMENT EMPLOYEE SELECTION
    const { data: getlogempdetail } = useQuery({
        queryKey: ["loggedempdetail", id],
        queryFn: () => getLoggedEmpDetail(id)
    });

    const departmentSection = useMemo(() => getlogempdetail?.[0]?.em_dept_section, [getlogempdetail]);
    const department = useMemo(() => getlogempdetail?.[0]?.em_department, [getlogempdetail]);

    //FETCHING DEPARTMENT EMPLOYEE FOR THE MULTISELECT BASED ON CURRENT LOGIN
    const { data: departmentemp } = useQuery({
        queryKey: ['fetchalldepemployee', departmentSection],
        queryFn: () => getDepartmentEmployee(departmentSection),
        enabled: !!departmentSection,
    })

    //MULTIPLE EMPLOYYE SELECTION
    const hanldmultiplechange = useCallback((e, val) => {
        setEmpid(val);
    }, [setEmpid]);

    //CHECKING THE DATA WHOSE CONDITION IS OKE
    const data = useMemo(() => {
        const stateMappings = [
            { depid: "17", state: selectmaintentance },
            { depid: "1", state: setinformationtech },
            { depid: "36", state: setbiomedical }
        ];

        return stateMappings.map(({ depid, state }) => ({
            name: depid,
            values: Object.keys(state).map(key => ({
                [key]: state[key] ? 1 : 0
            }))
        }));
    }, [selectmaintentance, setinformationtech, setbiomedical]);


    //FOR CALCULATION OF THE ASSET CONDITIONS 
    const selectmaintenance = selectmaintentance ? Object.values(selectmaintentance).filter(value => value === true).length : 0;
    const selectinformation = setinformationtech ? Object.values(setinformationtech).filter(value => value === true).length : 0;
    const selectbio = setbiomedical ? Object.values(setbiomedical).filter(value => value === true).length : 0;
    const TotalCountMT = selectmaintentance ? Object.values(selectmaintentance).length : 0;
    const TotalCountIT = setinformationtech ? Object.values(setinformationtech).length : 0;
    const TotalCountBM = setbiomedical ? Object.values(setbiomedical).length : 0;


    //FOR DYNAMICALLY CHECKING STATUS FOR SENDING TO OTHER DEPARMENTS
    useEffect(() => {
        if ((selectbio + selectinformation + selectmaintenance) === (TotalCountBM + TotalCountIT + TotalCountMT)) {
            setSelecStatus(true)
        } else {
            setSelecStatus(false)
        }
    }, [selectbio, selectinformation, selectmaintenance, TotalCountBM, TotalCountIT, TotalCountMT, setSelecStatus]);


    //FETCHING BEDREMARKS TO DYNAMICALLY UPDATEIJNG CHECKLIST
    const { data: bedremarks, refetch: getbedremarkRefetch } = useQuery({
        queryKey: ['fetchbedremarkdetail', bedcode],
        queryFn: () => getBedRemarkDetails(bedcode),
        enabled: !!open,
    });


    //MODAL CLOSE 
    const HanldeModalClose = useCallback(() => {
        getbedremarkRefetch()
        getallremarkrefetch()
        getallBlokedbedRefetch()
        setOpen(false)
        setEmpid([])
        setActiveButton(null)
        setRemarks("")
        setOverallCondition(null)
        setSelectMaintenance({})
        setInformationTech({})
        setBioMedical({})
    }, [setOpen, setEmpid, setActiveButton, setRemarks, setSelectMaintenance, setInformationTech, setBioMedical, setOverallCondition, getbedremarkRefetch, getallBlokedbedRefetch, getallremarkrefetch]);


    //POST DATA FOR THE API AFTER CALCULATING THE VALUES DYNAMICALLY
    const postdata = useMemo(() => ({
        fb_bed_slno: bedslno,
        fb_bd_code: Number(bedcode),
        fb_bdc_no: bedno,
        fb_ns_code: nscode,
        data: data,
        fb_overall_condition: ovarallconditon,
        fb_overall_remarks: overallremarks,
        fb_it_status: selectstatus ? 1 : selectinformation === TotalCountIT ? 1 : department === ItdepId ? 1 : 0,
        fb_maintenance_status: selectstatus ? 1 : selectmaintenance === TotalCountMT ? 1 : department === MtdepId ? 1 : 0,
        fb_biomedical_status: selectstatus ? 1 : selectbio === TotalCountBM ? 1 : department === BmdepId ? 1 : 0,
        fb_maintenace_emp_assign: department === MtdepId && empid ? empid : bedremarks?.length > 0 && bedremarks?.[0]?.fb_maintenace_emp_assign ? JSON.parse(bedremarks?.[0]?.fb_maintenace_emp_assign) : null,
        fb_it_emp_assign: department === ItdepId && empid ? empid : bedremarks?.length > 0 && bedremarks?.[0]?.fb_it_emp_assign ? JSON.parse(bedremarks?.[0]?.fb_it_emp_assign) : null,
        fb_biomedical_emp_assign: department === BmdepId && empid ? empid : bedremarks?.length > 0 && bedremarks?.[0]?.fb_it_remark ? JSON.parse(bedremarks?.[0]?.fb_biomedical_emp_assign) : null,
        fb_bed_reason: !selectstatus && activeButton ? (activeButton === "Renovation" ? 1 : 2) : null,
        fb_it_remark: selectstatus ? "Verification Completed" : department === ItdepId && remarks ? remarks : bedremarks?.length > 0 && bedremarks?.[0]?.fb_it_remark ? bedremarks?.[0]?.fb_it_remark : null,
        fb_biomedical_remarks: selectstatus ? "Verification Completed" : department === BmdepId && remarks ? remarks : bedremarks?.length > 0 && bedremarks?.[0]?.fb_biomedical_remarks ? bedremarks?.[0]?.fb_biomedical_remarks : null,
        fb_maintenace_remark: selectstatus ? "Verification Completed" : department === MtdepId && remarks ? remarks : bedremarks?.length > 0 && bedremarks?.[0]?.fb_maintenace_remark ? bedremarks?.[0]?.fb_maintenace_remark : null,
        fb_bed_status: selectstatus ? 0 : 1,
        create_user: employeeID()
    }), [overallremarks,TotalCountIT, TotalCountMT, nscode, TotalCountBM, bedslno, bedcode, bedno, data, ovarallconditon, department, empid, activeButton, remarks, BmdepId, MtdepId, ItdepId, selectstatus, bedremarks])


    //CHECKLIST INSERTION
    const HandleBedDetailRequest = useCallback(async () => {
        if (!selectstatus && activeButton === null) return warningNofity("Please select the Bed Status");
        if (ovarallconditon === null) return warningNofity("Please select the Overall Condition");
        if (ovarallconditon !== null && overallremarks === "") return warningNofity("Please Enter the Overall Remarks");
        if (activeButton !== null && remarks === "") return warningNofity("Please Enter the Remarks");
        if (empid.length === 0) return warningNofity("Please select the Employee");
        try {
            const response = await axiosApi.post('/feedback/insertbedremarks', postdata);
            const { success } = response.data;
            if (success !== 2) return warningNofity("Error in Inserting Data")
            succesNofity("Successfully Inserted Data")
            HanldeModalClose()
        } catch (error) {
            warningNofity("Error in Inserting Data")
        }
    }, [postdata, selectstatus, activeButton, empid, remarks, HanldeModalClose, ovarallconditon]);


    //GROUPING THE DATA BASED ON THE DEPARTMENT ID
    const groupedData = useMemo(() => {
        return bedremarks?.reduce((acc, item) => {
            const depName = item.fb_dep_name;
            const assetName = item.fb_asset_name;
            const assetStatus = item.fb_asset_status;
            if (!acc[depName]) {
                acc[depName] = {};
            }
            acc[depName] = {
                ...acc[depName],
                [assetName]: assetStatus,
            };
            return acc;
        }, {});
    }, [bedremarks]);


    // CUSTOME HOOK TO HANDLE THE DEPARTMENT DETAIL EXTRACTION
    const useDepartmentData = (depid) => {
        return useMemo(() => {
            return Object.keys(groupedData?.[depid] || {}).reduce((acc, key) => {
                acc[key] = groupedData[depid][key] === 1;
                return acc;
            }, {});
        }, [groupedData?.[depid]]);
    };

    // DATAT FOR EACH DEPARTMENT
    const selectMaintenanceData = useDepartmentData("17");
    const infoTechData = useDepartmentData("1");
    const biomedicalData = useDepartmentData("36");


    //THE USEEFFECT ONLY WORK WHEN THE CHECKLIST IS OPEN  FOR THE UPDATION OF THE CHECKLIST
    useEffect(() => {

        setSelectMaintenance(prevState => ({
            ...prevState,
            ...selectMaintenanceData,
        }));

        setInformationTech(prevState => ({
            ...prevState,
            ...infoTechData,
        }));

        setBioMedical(prevState => ({
            ...prevState,
            ...biomedicalData,
        }));
        setActiveButton(
            bedremarks && bedremarks.length > 0
                ? department === MtdepId && bedremarks?.[0]?.fb_maintenance_status === 1
                    ? bedremarks?.[0]?.fb_bed_reason === 1 ? "Renovation" : "OnHold"
                    : department === ItdepId && bedremarks?.[0]?.fb_it_status === 1
                        ? bedremarks?.[0]?.fb_bed_reason === 1 ? "Renovation" : "OnHold"
                        : department === BmdepId
                            ? bedremarks?.[0]?.fb_bed_reason === 1 ? "Renovation" : "OnHold"
                            : null
                : null
        );

        setOverallRemarks(
            bedremarks && bedremarks.length > 0 && bedremarks?.[0]?.fb_overall_remarks ? bedremarks?.[0]?.fb_overall_remarks : ""
        );

        setRemarks(
            bedremarks && bedremarks.length > 0
                ? department === MtdepId
                    ? bedremarks?.[0]?.fb_maintenace_remark ?? ""
                    : department === ItdepId
                        ? bedremarks?.[0]?.fb_it_remark ?? ""
                        : department === BmdepId && bedremarks?.[0]?.fb_biomedical_status === 1
                            ? bedremarks?.[0]?.fb_biomedical_remarks
                            : ""
                : "it not maintenance"
        );
        setOverallCondition(bedremarks && bedremarks.length > 0 ? department === MtdepId && bedremarks?.[0]?.fb_maintenance_status === 1
            ? bedremarks?.[0]?.fb_overall_condition ?? null
            : department === ItdepId && bedremarks?.[0]?.fb_it_status === 1
                ? bedremarks?.[0]?.fb_overall_condition ?? null
                : department === BmdepId && bedremarks?.[0]?.fb_biomedical_status === 1
                    ? bedremarks?.[0]?.fb_overall_condition
                    : null
            : null)
    }, [selectMaintenanceData, infoTechData, biomedicalData, open]);




    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ModalDialog sx={{
                    width: '90%',
                    borderRadius: 'md',
                    px: 1,
                    py: 1,
                    minHeight: 250,
                    maxHeight: "95%",
                    boxShadow: "none",
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}>
                    <ModalClose onClick={HanldeModalClose} />
                    <Box sx={{
                        p: 1,
                        backgroundColor: "rgba(var(--bg-card))",
                        borderRadius: 5,
                        minHeight: 200,
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}
                            className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
                            {icon}
                            <Typography
                                level='body-sm'
                                fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    mt: 1
                                }}>
                                CHECK LIST
                            </Typography>
                        </Box>

                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                            <BedListOtherDep
                                current={MtdepId}
                                dep={department}
                                status={bedremarks && bedremarks.length > 0 ? bedremarks[0].fb_maintenance_status : null}
                                name={"MAINTENANCE"}
                                selectedItems={selectmaintentance}
                                setSelectedItems={setSelectMaintenance} />
                        </Suspense>

                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                            <BedListOtherDep
                                current={ItdepId}
                                dep={department}
                                status={bedremarks && bedremarks.length > 0 ? bedremarks[0].fb_it_status : null}
                                name={"INFORMATION TECHNOLOGY"}
                                selectedItems={setinformationtech}
                                setSelectedItems={setInformationTech} />
                        </Suspense>

                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                            <BedListOtherDep
                                current={BmdepId}
                                dep={department}
                                status={bedremarks && bedremarks.length > 0 ? bedremarks[0].fb_biomedical_status : null}
                                name={"BIOMEDICAL"}
                                selectedItems={setbiomedical}
                                setSelectedItems={setBioMedical} />
                        </Suspense>
                        <Box sx={{
                            p: 1,
                            backgroundColor: "rgba(var(--bg-card))",
                            borderRadius: 5,
                            mt: 1
                        }}>
                            <Box sx={{
                                border: 0,
                                borderBottom: 1.5,
                                borderColor: "rgba(var(--tab-border-color))",
                                borderBottomColor: 'divider',
                                borderWidth: 2,
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                pb: 0.4
                            }}>
                                <VerifiedUserTwoToneIcon sx={{
                                    color: 'rgba(var(--icon-primary))',
                                    fontSize: 26,
                                    fontWeight: 700
                                }} />
                                <Typography
                                    level='body-sm'
                                    fontWeight={'md'}
                                    sx={{
                                        fontFamily: 'var(--font-varient)',
                                        color: 'rgba(var(--font-primary-white))',
                                        fontSize: 18,
                                        fontWeight: 700
                                    }}>OVERALL CONDITIONS</Typography>
                            </Box>
                            <Box
                                sx={{
                                    px: 1,
                                    width: "100%",
                                    mt: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 2
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '48%',
                                        border: '1px solid rgba(var(--border-primary))',
                                        color: getIconColor("POOR"),
                                        bgcolor: ovarallconditon === 'POOR' ? '#fae0e4' : ''
                                    }}
                                    onClick={() => handleButtonClick("POOR")}>POOR</Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '48%',
                                        border: '1px solid rgba(var(--border-primary))',
                                        color: getIconColor("GOOD"),
                                        bgcolor: ovarallconditon === 'GOOD' ? '#fae0e4' : ''
                                    }}
                                    onClick={() => handleButtonClick("GOOD")}>GOOD</Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '48%',
                                        border: '1px solid rgba(var(--border-primary))',
                                        color: getIconColor("EXCELLENT"),
                                        bgcolor: ovarallconditon === 'EXCELLENT' ? '#fae0e4' : '',
                                    }}
                                    onClick={() => handleButtonClick("EXCELLENT")}>EXCELLENT</Button>
                            </Box>

                            {
                                ovarallconditon !== null &&
                                <Box sx={{
                                    px: 1,
                                    mt: 1
                                }}>
                                    <textarea
                                        onChange={(e) => setOverallRemarks(e.target.value)}
                                        value={overallremarks}
                                        placeholder={`Overall Remarks`}
                                        style={{
                                            backgroundColor: "rgba(var(--bg-card))",
                                            width: '100%',
                                            minHeight: '70px',
                                            fontFamily: "var(--font-varient)",
                                            color: 'rgba(var(--font-primary-white))',
                                            fontSize: "14px",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: 'rgba(var(--border-primary))',
                                            padding: '4px',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(var(--border-primary))';
                                            e.target.style.outline = 'none';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(var(--border-primary))';
                                        }}
                                    />
                                </Box>
                            }
                        </Box>
                        <Box sx={{ px: 1, mt: 0.2 }}>
                            <Typography level='body-sm'
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: "var(--font-varient)",
                                    opacity: 0.8,
                                    paddingLeft: "0.26rem",
                                    lineHeight: "1.0rem",
                                    fontSize: "0.81rem",
                                    color: 'rgba(var(--font-primary-white))',
                                    paddingY: "0.26rem",
                                }}>Select Employee</Typography>
                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                                <MultipleSelect
                                    data={departmentemp ? departmentemp : []}
                                    onchange={hanldmultiplechange}
                                    value={empid}
                                />
                            </Suspense>
                        </Box>
                        {
                            (selectbio + selectinformation + selectmaintenance) !== (TotalCountBM + TotalCountIT + TotalCountMT) &&
                            <>
                                <Typography level='body-sm'
                                    sx={{
                                        fontWeight: 600,
                                        fontFamily: "var(--font-varient)",
                                        opacity: 0.8,
                                        paddingLeft: "0.26rem",
                                        lineHeight: "1.0rem",
                                        fontSize: "0.81rem",
                                        color: 'rgba(var(--font-primary-white))',
                                        paddingY: "0.26rem",
                                        mt: 0.2,
                                        ml: 1
                                    }}>Select Status</Typography>
                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                                    <MaintenanceRemarkButton
                                        setRemarks={setRemarks}
                                        remarks={remarks}
                                        activeButton={activeButton}
                                        setActiveButton={setActiveButton}
                                    />
                                </Suspense>
                            </>
                        }
                        <Box sx={{
                            px: 1,
                            width: '100%',
                            height: 60,
                            my: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button
                                onClick={HandleBedDetailRequest}
                                // disabled={!remarks}
                                variant="outlined"
                                sx={{
                                    fontSize: 16,
                                    height: '100%',
                                    border: '1px solid rgb(216, 75, 154, 1)',
                                    color: 'rgb(216, 75, 154, 1)',
                                    bgcolor: '#fff0f3',
                                    borderRadius: 20,
                                    '&:hover': {
                                        boxShadow: 'none',
                                        color: 'rgb(216, 75, 154, 1)',
                                    },
                                }}>
                                Checklist Verification Completed
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(BedListModal)
