import React, { useCallback, memo, useState, useMemo, lazy, Suspense, useEffect } from 'react';
import Modal from '@mui/joy/Modal';
import { axiosApi } from '../../Axios/Axios';
import { useQuery } from '@tanstack/react-query';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Box, Button, ModalClose, ModalDialog, Typography } from '@mui/joy';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { EmpauthId, employeeID, succesNofity, warningNofity } from '../../Constant/Constant';
import { getComplaintDetail, getDepartmentEmployee, getLoggedEmpDetail } from '../../Function/CommonFunction';



const BedListOtherDep = lazy(() => import('./BedListOtherDep'));
const RectifyCard = lazy(() => import('./RectifyCard'));
const AssetComplaint = lazy(() => import('./AssetComplaint'));
const MaintenanceRemarkButton = lazy(() => import('./MaintenanceRemarkButton'));
const MultipleSelect = lazy(() => import('../../Components/MultipleSelect'));


const BedListModal = ({ open,
    setOpen,
    icon,
    data,
    getallremarkrefetch,
    getallBlokedbedRefetch,
    combinedata,
    assetData,
    condition,
    setCondtion,
    totaldetail,
    setTotalDetail,
    beddetails,
    isinitalchecked,
    setIsInitialChecked,
    getbedremarkRefetch
}) => {



    const id = EmpauthId()
    const [empid, setEmpid] = useState([]);
    const { ovarallconditon, activeButton, remarks, overallremarks } = totaldetail;

    const { data: checkcomplaint, refetch: fetchBedComplaints } = useQuery({
        queryKey: ["checkcomplaint", data?.fb_bed_slno],
        queryFn: () => getComplaintDetail(data?.fb_bed_slno),
        enabled: !!open,
        staleTime: Infinity
    });


    const getIconColor = useCallback((buttonName) => {
        return ovarallconditon === buttonName ? 'rgb(216, 75, 154, 1)' : 'rgba(var(--font-primary-white))';
    }, [ovarallconditon]);

    //fetching emp detail
    const { data: getlogempdetail } = useQuery({
        queryKey: ["loggedempdetail", id],
        queryFn: () => getLoggedEmpDetail(id),
        enabled: !!open,
        staleTime: Infinity
    });

    const departmentSection = useMemo(() => getlogempdetail?.[0]?.em_dept_section, [getlogempdetail]);
    const department = useMemo(() => getlogempdetail?.[0]?.em_department, [getlogempdetail]);

    //fetching departemployee
    const { data: departmentemp } = useQuery({
        queryKey: ['fetchalldepemployee', departmentSection],
        queryFn: () => getDepartmentEmployee(departmentSection),
        enabled: !!departmentSection,
    });

    //multiple employeee selection
    const hanldmultiplechange = useCallback((e, val) => {
        setEmpid(val);
    }, [setEmpid]);

    //Complaint Item
    const itemforComplaint = useMemo(() => Object.keys(condition)?.filter(key => condition?.[key] === 2), [condition]);

    //item which is poor in condition
    const filteredAssets = useMemo(() => {
        return combinedata?.flatMap(department =>
            department?.assets
                ?.filter(item => itemforComplaint?.includes(item?.fb_asset_name))
                ?.map(item => ({
                    ...item,
                    complaint_dept_slno: department.complaint_dept_slno
                })) || []
        );
    }, [combinedata, itemforComplaint]);


    //overall condition checking
    const handleButtonClick = useCallback((buttonName) => {
        setTotalDetail((prev) => ({
            ...prev,
            ovarallconditon: prev?.ovarallconditon === buttonName ? null : buttonName
        }));
    }, [setTotalDetail]);

    //optional part
    useEffect(() => {
        if (filteredAssets && filteredAssets.length > 0) {
            setTotalDetail((prev) => {
                if (prev.ovarallconditon === "3") {
                    return {
                        ...prev,
                        ovarallconditon: "2"
                    };
                }
                return prev;
            });
        }
    }, [filteredAssets, setTotalDetail]);


    const assetsArray = Object.entries(condition)?.map(([asset, status]) => ({
        asset,
        status
    }));


    const filteredData = assetData
        ?.filter(a => assetsArray?.some(b => b.asset === a?.fb_asset_name))
        ?.map(a => {
            return ({
                ...a,
                status: assetsArray?.find(b => b.asset === a?.fb_asset_name)?.status,
            });
        });


    const postAssetData = filteredData?.filter(
        item => beddetails && !beddetails?.find(val => val?.fb_asset_name === item?.fb_asset_name
        ));

    //MODAL CLOSE 
    const HanldeModalClose = useCallback(() => {
        if (checkcomplaint?.length > 0 && !isinitalchecked) return warningNofity("Please Complete the Intial CheckList")
        getallremarkrefetch()
        getallBlokedbedRefetch()
        setOpen(false)
        setTotalDetail({})
        setEmpid([])
    }, [setOpen, setEmpid, getallBlokedbedRefetch, getallremarkrefetch, setTotalDetail, isinitalchecked, checkcomplaint]);

    const handleInitialCheckList = useCallback(async () => {

        if (postAssetData?.length === 0) return warningNofity("Please Select the Assets")
        if (empid.length === 0) return warningNofity("Please select the Employee");
        const postdata = {
            fb_bed_slno: data?.fb_bed_slno,
            fb_bd_code: data?.fb_bd_code,
            fb_bdc_no: data?.fb_bdc_no,
            fb_ns_code: data?.fb_ns_code,
            fb_bed_status: 0,
            fb_initail_checked: 'Y',
            fb_initial_emp_assign: empid,
            data: postAssetData,
            create_user: employeeID()
        };

        try {
            const response = await axiosApi.post('/feedback/insertbedremarks', postdata);
            const { success } = response.data;
            if (success !== 2) return warningNofity("Error in Inserting Data")
            succesNofity("Initial Verifiction completed")
            setIsInitialChecked(true)
            getbedremarkRefetch()
        } catch (error) {
            warningNofity("Error in Inserting Data")
        }

    }, [empid, getbedremarkRefetch, data, postAssetData, setIsInitialChecked])


    //CHECKLIST INSERTION
    const HandleBedDetailRequest = useCallback(async () => {

        const postdata = {
            fb_bed_slno: data?.fb_bed_slno,
            fb_bd_code: data?.fb_bd_code,
            fb_bdc_no: data?.fb_bdc_no,
            fb_ns_code: data?.fb_ns_code,
            fb_bed_status: 0,
            fb_bed_service_status: activeButton === "Renovation" ? 2 : activeButton === "OnHold" ? 1 : 0,
            fb_bed_remark: remarks,
            fb_overall_remarks: overallremarks,
            fb_overall_condition: ovarallconditon,
            fb_emp_assign: empid,
            data: postAssetData,
            create_user: employeeID()
        };
        if (activeButton === null) return warningNofity("Please select the Bed Status");
        if (ovarallconditon === null) return warningNofity("Please select the Overall Condition");
        if (ovarallconditon !== null && overallremarks === "") return warningNofity("Please Enter the Overall Remarks");
        if (activeButton !== null && remarks === "") return warningNofity("Please Enter the Remarks");
        if (assetData?.length !== Object.entries(condition)?.length) return warningNofity("Please Check all Assets");
        if (empid.length === 0) return warningNofity("Please select the Employee");
        if (checkcomplaint?.length > 0 && !isinitalchecked) return warningNofity("Please Complete the Intial CheckList")
        try {
            const response = await axiosApi.post('/feedback/insertbedremarks', postdata);
            const { success } = response.data;
            if (success !== 2) return warningNofity("Error in Inserting Data")
            succesNofity("Successfully Inserted Data")
            getallremarkrefetch()
            getallBlokedbedRefetch()
            setOpen(false)
            getbedremarkRefetch()
        } catch (error) {
            warningNofity("Error in Inserting Data")
        }
    }, [activeButton, empid, remarks, ovarallconditon, getallremarkrefetch, getallBlokedbedRefetch, isinitalchecked, checkcomplaint, assetData, condition, overallremarks, data, postAssetData, setOpen, getbedremarkRefetch]);




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
                    {
                        combinedata && combinedata?.length > 0 ? <Box sx={{
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
                            {
                                combinedata?.map((item, index) => (
                                    <Suspense key={index} fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                        <BedListOtherDep
                                            name={item?.complaint_dept_name}
                                            assets={item?.assets}
                                            condition={condition}
                                            setCondtion={setCondtion}
                                            checkcomplaint={checkcomplaint}
                                            exists={beddetails}
                                        />
                                    </Suspense>
                                ))
                            }
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
                                filteredAssets && filteredAssets?.length > 0 &&
                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                    <AssetComplaint
                                        name={"DAMAGED ASSETS"}
                                        data={filteredAssets}
                                        bedslno={data?.fb_bed_slno}
                                        checkcomplaint={checkcomplaint}
                                        fetchBedComplaints={fetchBedComplaints}
                                        selectemp={empid}
                                        department={department}
                                        AssetInsert={postAssetData}
                                        isinitalchecked={isinitalchecked}
                                        Beddata={data}
                                    />
                                </Suspense>
                            }
                            <Box sx={{
                                px: 1,
                                width: '100%',
                                height: 65,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: 2
                            }}>
                                <Button
                                    disabled={beddetails?.[0]?.fb_initail_checked === 'Y'}
                                    onClick={handleInitialCheckList}
                                    variant="outlined"
                                    sx={{
                                        fontWeight: 900,
                                        height: 60,
                                        width: 250,
                                        border: '1px solid rgb(216, 75, 154, 1)',
                                        color: 'rgb(216, 75, 154, 1)',
                                        bgcolor: '#fff0f3',
                                        borderRadius: 10,
                                        fontSize: 15,
                                        '&:hover': {
                                            boxShadow: 'none',
                                            color: 'rgb(216, 75, 154, 1)',
                                        },
                                    }}>
                                    {
                                        beddetails && beddetails?.length > 0 && beddetails?.[0]?.fb_initail_checked === 'Y' ? "Initial CheckList Completed" : " Complete Initial CheckList "
                                    }


                                </Button>
                            </Box>

                            {
                                checkcomplaint && checkcomplaint?.length > 0 &&
                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                    <RectifyCard
                                        name={"FINAL CHECKLIST"}
                                        data={filteredAssets}
                                        bedslno={data?.fb_bed_slno}
                                        checkcomplaint={checkcomplaint}
                                        fetchBedComplaints={fetchBedComplaints}
                                        selectemp={empid}
                                    />
                                </Suspense>
                            }
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
                                        }}>
                                        OVERALL CONDITIONS
                                    </Typography>
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
                                            color: getIconColor("1"),
                                            bgcolor: ovarallconditon === '1' ? '#fae0e4' : ''
                                        }}
                                        onClick={() => handleButtonClick("1")}>POOR</Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            width: '48%',
                                            border: '1px solid rgba(var(--border-primary))',
                                            color: getIconColor("2"),
                                            bgcolor: ovarallconditon === '2' ? '#fae0e4' : ''
                                        }}
                                        onClick={() => handleButtonClick("2")}>GOOD</Button>
                                    <Button
                                        disabled={filteredAssets && filteredAssets?.length > 0}
                                        variant="outlined"
                                        sx={{
                                            width: '48%',
                                            border: '1px solid rgba(var(--border-primary))',
                                            color: getIconColor("3"),
                                            bgcolor: ovarallconditon === '3' ? '#fae0e4' : '',
                                        }}
                                        onClick={() => handleButtonClick("3")}>EXCELLENT</Button>
                                </Box>

                                {
                                    ovarallconditon !== null &&
                                    <Box sx={{
                                        px: 1,
                                        mt: 1
                                    }}>
                                        <textarea
                                            onChange={(e) =>
                                                setTotalDetail((prev) => ({
                                                    ...prev,
                                                    overallremarks: e.target.value
                                                }))
                                            }
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
                                        setTotalDetail={setTotalDetail}
                                        remarks={remarks}
                                        activeButton={activeButton}
                                    />
                                </Suspense>
                            </>
                            <Box sx={{
                                px: 1,
                                width: '100%',
                                height: 80,
                                my: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Button
                                    disabled={!isinitalchecked}
                                    onClick={HandleBedDetailRequest}
                                    variant="outlined"
                                    sx={{
                                        fontSize: 16,
                                        height: 60,
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
                        </Box> :
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 250,
                                flexDirection: 'column'
                            }}>
                                <ReceiptLongIcon sx={{
                                    color: 'rgba(var(--icon-primary))',
                                    fontSize: 30,
                                    fontWeight: 700
                                }} />
                                <Typography sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 18,
                                    fontWeight: 700
                                }}>CheckList is Empty</Typography>
                            </Box>
                    }

                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(BedListModal)
