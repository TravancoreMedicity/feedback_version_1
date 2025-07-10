import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Suspense } from 'react';
import Modal from '@mui/joy/Modal';
import { useQuery } from '@tanstack/react-query';
import { EmpauthId, succesNofity, warningNofity } from '../../Constant/Constant';
import { Box, Button, ModalDialog, Typography } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { getDepartmentEmployee, gethkcomplaintdetail, getllhkroomChecklist, getLoggedEmpDetail } from '../../Function/CommonFunction';
import { axiosApi } from '../../Axios/Axios';
import HkComplaintRectificationCard from './HkComplaintRectificationCard';


const HkChecklistCard = lazy(() => import('./HkChecklistCard'));
const HkCurrentBedStatusButton = lazy(() => import('./HkCurrentBedStatusButton'));
const HkComplaintHead = lazy(() => import('./HkComplaintHead'));
const MultipleSelect = lazy(() => import('../../Components/MultipleSelect'));
const ModalHeader = lazy(() => import('../../Components/ModalHeader'));
const OverallDetailCard = lazy(() => import('../ProchecheckList/OverallDetailCard'));

const HouseKeepingBedlistModal = ({ open, data, setOpen, CheckedItems, refetch, Complaints, BedDetails }) => {

    const id = EmpauthId()
    const [checklistItems, setChecklistItems] = useState([]);
    const [empid, setEmpid] = useState([]);
    const [loading, setLoading] = useState(false);

    const [totaldetail, setTotalDetail] = useState({
        activeButton: null,
        remarks: ""
    });

    const { activeButton, remarks } = totaldetail;
    // This Ticket Id is for getting the Complaint Registerd Through Housekeeping
    const HkTicketId = 2;

    // Modal closing
    const HanldeModalClose = useCallback(() => {
        setOpen(false)
        refetch()
    }, [setOpen, refetch]);

    const { data: allhkchecklistitems } = useQuery({
        queryKey: ['roomchecklistitem'],
        queryFn: () => getllhkroomChecklist(),
    });

    // handle assign employeee selection
    const hanldmultiplechange = useCallback((e, val) => {
        setEmpid(val);
    }, [setEmpid]);

    // fetching loged employee detail
    const { data: getlogempdetail } = useQuery({
        queryKey: ["loggedempdetail", id],
        queryFn: () => getLoggedEmpDetail(id),
        enabled: !!open,
        staleTime: Infinity
    });


    // selecting the current employee deparment
    const departmentSection = useMemo(() => getlogempdetail?.[0]?.complaint_dept_slno, [getlogempdetail]);

    //fetching departemployee
    const { data: departmentemp } = useQuery({
        queryKey: ['fetchalldepemployee', departmentSection],
        queryFn: () => getDepartmentEmployee(departmentSection),
        enabled: !!departmentSection,
    });


    // Fetching Housekeeping Complaints
    const { data: getBedComplaints = [], refetch: FetchBedComplaints } = useQuery({
        queryKey: ["gethkcomplaints", data?.fb_bdc_no, departmentSection, HkTicketId],
        queryFn: () => gethkcomplaintdetail(data?.fb_bdc_no, departmentSection, HkTicketId),
        enabled: !!open && !!getlogempdetail && !!HkTicketId,
        staleTime: Infinity
    });


    // handle the Good Bad selectors (switch)
    const handleChange = useCallback((id, value, field) => {
        setChecklistItems(prev =>
            prev?.map(item =>
                item?.fb_hk_rm_cklist_slno === id && item[field] !== value
                    ? { ...item, [field]: value }
                    : item
            )
        );
    }, []);


    // tracking if the item is present in  the room or not
    const items = useMemo(() => {
        if (!allhkchecklistitems) return [];
        return allhkchecklistitems?.map(item => {
            const isItemCheckCompleted = CheckedItems?.find(val => val?.fb_hk_rm_cklist_slno === item?.fb_hk_rm_cklist_slno); // finding the matching slno
            return {
                ...item,
                ispresent: isItemCheckCompleted?.fb_hk_rm_item_condition ?
                    isItemCheckCompleted?.fb_hk_rm_item_condition : item?.ispresent ?? 0, // check the item check status to perfrom next selection
                isStatus: data?.fb_hk_check_status ?? 0, // checking the check status
                isAlreadyChecked: isItemCheckCompleted?.fb_hk_rm_item_condition ?? 0// checking item already checked
            };
        });
    }, [allhkchecklistitems, CheckedItems, data?.fb_hk_check_status]);


    // This help to set the use memo item into the state when the component Mounts
    useEffect(() => {
        if (items?.length > 0) {
            setChecklistItems(items);
        }
    }, [items, open]);


    //The item for complaints
    const isDamagedItemsArray = useMemo(() => checklistItems?.filter(item => item?.ispresent === 1), [checklistItems]);

    // filtering the items that not selected for checking if the user not selected anything
    const CheckAtleastOneSelected = useMemo(() => checklistItems?.filter(item => item?.ispresent === 0), [checklistItems]);

    // To track atleast one item selected before submitting the  Form (Optional)
    const isNotSelected = CheckAtleastOneSelected?.length === checklistItems?.length;

    // Filtering the item that already submit for reducing reduntency
    const DataforInsertion = checklistItems?.filter(item => item?.isAlreadyChecked === 0 && item?.ispresent !== 0);

    // Complaints ready for Rectifications
    const CmRectificationRequired = getBedComplaints?.filter(item => item?.compalint_status === 1);


    //Checking where DamagedItem has already rectified if recitified simple exclude that form the DamageItem array
    const IsDamgedItemAlreadyRecitified = useMemo(() => {
        return checklistItems?.some(item => {
            if (item?.ispresent !== 1) return false;

            // If complaints exist, check if this item has a resolved complaint
            const hasResolvedComplaint = getBedComplaints?.some(
                comp =>
                    comp?.compalint_status === 2 &&
                    comp?.complaint_desc === item?.fb_hk_rm_cklist_name
            );

            // If it has a resolved complaint, exclude it
            return !hasResolvedComplaint;
        });
    }, [checklistItems, getBedComplaints]);





    // handleing the checklist submissionz
    const handleChecklistSumbission = useCallback(async () => {
        setLoading(true);

        try {

            if (BedDetails?.[0]?.fb_hk_check_status === 1 && CmRectificationRequired?.length > 0) return warningNofity("Rectify all Complaint Befor Sumbitting")
            if (isNotSelected) return warningNofity("Select Befor Sumbitting.");
            if (activeButton === null) return warningNofity("Please select the Current Bed Status");
            if (activeButton !== null && remarks === "") return warningNofity("Please Enter the Remarks");
            if (empid?.length === 0) return warningNofity("Please select Employee")

            const payload = {
                data: DataforInsertion,
                fb_bed_slno: data?.fb_bed_slno,
                fb_hk_bd_status: activeButton === "Cleaned" ? 2 : 1,
                fb_hk_remark: remarks,
                fb_hk_emp_assign: empid
            };

            const response = await axiosApi.post('/feedback/inserthkbeddetail', payload);
            const { success } = response.data;
            if (success !== 2) return warningNofity("Error in Inserting Data")
            succesNofity(" CheckList completed");
            HanldeModalClose()
        } catch (error) {
            warningNofity("Error in Inserting Data")
        } finally {
            setLoading(false);
            refetch()
        }

    }, [isNotSelected,
        activeButton,
        remarks,
        empid,
        DataforInsertion,
        HanldeModalClose,
        data,
        refetch,
        BedDetails,
        CmRectificationRequired
    ]);

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
                    py: 0,
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
                    <ModalHeader name={'HOUSEKEEPING CHECKLIST'} data={data} HanldeModalClose={HanldeModalClose} />

                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                        <HkChecklistCard ChecklistItem={checklistItems} handleChange={handleChange} />
                    </Suspense>
                    {
                        isDamagedItemsArray && isDamagedItemsArray?.length > 0 &&
                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                            <HkComplaintHead
                                name={"DAMAGED ASSETS"}
                                DamagedItem={isDamagedItemsArray}
                                BedDetail={data}
                                DepartmentDetail={getlogempdetail}
                                selectemp={empid}
                                Complaints={Complaints}
                                setOpen={setOpen}
                                getBedComplaints={getBedComplaints}
                                RefetchComplaint={FetchBedComplaints}
                            />
                        </Suspense>
                    }
                    {
                        isDamagedItemsArray?.length > 0 &&
                        getBedComplaints?.length > 0 &&
                        (
                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                <HkComplaintRectificationCard
                                    selectemp={empid}
                                    name={"RECTIFY COMPLAINT"}
                                    checkcomplaint={getBedComplaints}
                                    RefetchComplaint={FetchBedComplaints}
                                />
                            </Suspense>
                        )
                    }

                    {
                        BedDetails && BedDetails?.length > 0 && BedDetails?.[0]?.fb_hk_check_status !== 0 &&
                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                            <OverallDetailCard
                                name={"CHECKLIST DETAIL"}
                                employee={BedDetails?.[0]?.em_name}
                                remark={BedDetails?.[0]?.fb_hk_bed_remark}
                            />
                        </Suspense>
                    }

                    {
                        BedDetails?.[0]?.fb_hk_check_status !== 2 &&
                        <>
                            <Box sx={{ px: 1, mt: 0.2 }}>
                                <Typography level='body-sm'
                                    sx={{
                                        fontWeight: 600,
                                        fontFamily: "var(--font-varient)",
                                        opacity: 0.8,
                                        paddingLeft: "0.26rem",
                                        lineHeight: "1.0rem",
                                        color: 'rgba(var(--font-primary-white))',
                                        paddingY: "0.26rem",
                                        fontSize: { xs: 10, sm: 14 }

                                    }}>Select Employee</Typography>
                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                                    <MultipleSelect
                                        data={departmentemp ? departmentemp : []}
                                        onchange={hanldmultiplechange}
                                        value={empid}
                                    />
                                </Suspense>
                            </Box>


                            <Typography level='body-sm'
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: "var(--font-varient)",
                                    opacity: 0.8,
                                    paddingLeft: "0.26rem",
                                    lineHeight: "1.0rem",
                                    color: 'rgba(var(--font-primary-white))',
                                    paddingY: "0.26rem",
                                    mt: 0.2,
                                    ml: 1,
                                    fontSize: { xs: 12, sm: 14 }
                                }}>Select Status</Typography>
                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                <HkCurrentBedStatusButton
                                    disable={isDamagedItemsArray?.length > 0 && IsDamgedItemAlreadyRecitified}
                                    setTotalDetail={setTotalDetail}
                                    remarks={remarks}
                                    activeButton={activeButton}
                                    FinalCheck={IsDamgedItemAlreadyRecitified}
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
                        justifyContent: 'center'
                    }}>
                        <Button
                            disabled={loading || BedDetails?.[0]?.fb_hk_check_status === 2}
                            onClick={handleChecklistSumbission}
                            variant="outlined"
                            sx={{
                                fontSize: { xs: 13, sm: 16 },
                                height: 45,
                                border: '1px solid rgb(216, 75, 154, 1)',
                                color: 'rgb(216, 75, 154, 1)',
                                bgcolor: '#fff0f3',
                                borderRadius: 8,
                                '&:hover': {
                                    boxShadow: 'none',
                                    color: 'rgb(216, 75, 154, 1)',
                                },
                            }}>
                            {
                                activeButton === "Cleaning Started" ? "Complete Initial CheckList" : (activeButton === "Cleaned" || BedDetails?.[0]?.fb_hk_check_status === 1) ? "Complete Final CheckList" : "Complete CheckList"
                            }

                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(HouseKeepingBedlistModal)
