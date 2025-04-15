import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '@mui/joy/Modal';
import { useQuery } from '@tanstack/react-query';
import { getallroomchecklist, getprobedChecklistDetail } from '../../Function/CommonFunction';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import { Box, Button, ModalClose, ModalDialog, Typography } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { EmpauthId, succesNofity, warningNofity } from '../../Constant/Constant';
import { axiosApi } from '../../Axios/Axios';



const BedOverallCondition = lazy(() => import('./BedOverallCondition'));
const ProBedListCard = lazy(() => import('./ProBedListCard'));
const OverallDetailCard = lazy(() => import('./OverallDetailCard'));

const ProBedlistModal = ({ open, setOpen, data, fetchProcheckdetail }) => {

    const [checklistItems, setChecklistItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totaldetail, setTotalDetail] = useState({
        ovarallconditon: null,
        overallremarks: ""
    })

    const { ovarallconditon, overallremarks } = totaldetail;

    const { data: allroomchecklist } = useQuery({
        queryKey: ['roomchecklist'],
        queryFn: () => getallroomchecklist(),
    });

    const { data: proCheckListDetail, refetch: fetchProcheckListDetail } = useQuery({
        queryKey: ['checkllistdetail', data?.fb_bd_code],
        queryFn: () => getprobedChecklistDetail(data?.fb_bd_code),
        enabled: !!open && !!data?.fb_bd_code
    });

    const HanldeModalClose = useCallback(() => {
        setOpen(false)
        fetchProcheckListDetail()
        fetchProcheckdetail()
    }, [fetchProcheckListDetail, fetchProcheckdetail, setOpen])


    const invalidItems = useMemo(() => (
        checklistItems?.filter(
            (item) => item?.ispresent === 2 && item?.ispresentcondition === 0
        )
    ), [checklistItems]);


    const ivalildCondtiion = useMemo(() => (
        checklistItems?.filter(
            (item) => item?.ispresent === 2 && item.iscondtion === 0
        )
    ), [checklistItems]);



    //integration item condition along with  the master Data
    const items = useMemo(() => {
        if (!allroomchecklist) return [];
        return allroomchecklist?.map(item => {
            const isItemCheckCompleted = proCheckListDetail?.find(val => val?.fb_item_name === item?.fb_item_name)
            return {
                ...item,
                ispresent:
                    (isItemCheckCompleted?.fb_initial_check === 1)
                        ? isItemCheckCompleted?.fb_item_present : item?.ispresent || 1,
                iscondtion:
                    (isItemCheckCompleted?.fb_item_present === 2 &&
                        isItemCheckCompleted?.fb_present_condition === 1)
                        ? 1
                        : item.iscondtion ?? 0,
                ispresentcondition:
                    (isItemCheckCompleted?.fb_initial_check === 1) ?
                        isItemCheckCompleted?.fb_present_condition : item?.ispresentcondition ?? 0
            };
        });
    }, [allroomchecklist, proCheckListDetail]);

    useEffect(() => {
        if (items?.length > 0) {
            setChecklistItems(items);
        }
    }, [items, open]);


    const handleChange = useCallback((id, value, field) => {
        setChecklistItems(prev =>
            prev?.map(item =>
                item?.fb_item_name === id && item[field] !== value
                    ? { ...item, [field]: value }
                    : item
            )
        );
    }, []);

    const HandleBedDetailRequest = useCallback(async () => {
        if (invalidItems?.length > 0 && proCheckListDetail?.[0]?.fb_initial_check !== 1) return warningNofity("Please select the Condition");
        if (ivalildCondtiion?.length > 0 && proCheckListDetail?.[0]?.fb_initial_check === 1) return warningNofity("Please check all Items");
        if (ovarallconditon === null) return warningNofity("Please select the Overall Condition")
        if (overallremarks === "") return warningNofity("Please enter the Remarks")
        setLoading(true);

        const isInitialCheckDone = proCheckListDetail?.[0]?.fb_initial_check === 1;
        const CheckListBedSlNo = proCheckListDetail?.[0]?.fb_check_bed_slno;

        const commonData = {
            data: checklistItems,
            fb_bed_slno: data?.fb_bed_slno,
            fb_bd_code: Number(data?.fb_bd_code),
            fb_bdc_no: data?.fb_bdc_no,
            fb_ns_code: data?.fb_ns_code,
            fb_initial_ovc: !isInitialCheckDone && ovarallconditon,
            fb_initial_remark: !isInitialCheckDone && overallremarks,
            fb_final_ovc: isInitialCheckDone && ovarallconditon,
            fb_final_remark: isInitialCheckDone && overallremarks,
            create_user: EmpauthId(),
        };

        const postData = {
            ...commonData,
            ...(isInitialCheckDone ? { fb_final_check: 1 } : { fb_initial_check: 1 }),
            ...(CheckListBedSlNo ? { fb_check_bed_slno: CheckListBedSlNo } : { fb_check_bed_slno: "" })
        };
        try {
            const response = await axiosApi.post('/feedback/insertprocheckdetl', postData);
            const { success } = response.data;
            if (success !== 2) return warningNofity("Error in Inserting Data")
            succesNofity(isInitialCheckDone ? "Final CheckList completed" : "Initial CheckList completed");
            HanldeModalClose()
        } catch (error) {
            warningNofity("Error in Inserting Data")
        } finally {
            setLoading(false);
        }
    }, [checklistItems, data, invalidItems, proCheckListDetail, ivalildCondtiion, overallremarks, ovarallconditon, HanldeModalClose])


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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight:5,pb:0.3 }}
                        className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
                        <Box sx={{ display: 'flex', alignItems: 'center',pb:0.3 }}>
                            <EngineeringTwoToneIcon
                                className='hoverClass'
                                sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }}
                            />
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
                                PRO CHECKLIST
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: "column",
                                fontSize: 10,
                                lineHeight: 1,  // Ensures text is tightly packed
                                border: 0.03,
                                borderColor: "rgba(var(--border-primary))",
                                bgcolor: 'rgba(213, 82, 154, 0.8)',
                                fontFamily: 'var(--font-varient)',
                                color: 'White',
                                px: 0.5,
                                fontWeight: 800,
                                py: 0.17
                            }}>
                                <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>B</Box>
                                <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>E</Box>
                                <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>D</Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: "row",
                                fontSize: 13,
                                border: 0.03,
                                borderColor: "rgba(var(--border-primary))",
                                px: 0.5,
                                py: 2,
                                fontWeight: 800,
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(213, 82, 154, 0.8)',
                                height: 30
                            }}>
                                {data?.fb_bdc_no && data?.fb_bdc_no.split('')
                                    ?.filter(char => !['/', '(', ')', '\\']?.includes(char))
                                    ?.map((char, index) => (
                                        <Box key={index} sx={{ p: 0, m: 0, lineHeight: 1 }}>
                                            {char}
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            py: 1,
                            borderRadius: 5,
                            px: 2
                        }}>
                        <Box sx={{ width: '30%', display: 'flex', alignItems: 'center' }} >
                            <Typography
                                level='body-sm'
                                fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 17,
                                    fontWeight: 700,
                                }}>
                                ITEMS
                            </Typography>
                        </Box>
                        <Box sx={{ width: '30%', display: 'flex', alignItems: 'center' }} >
                            <Typography
                                level='body-sm'
                                fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 17,
                                    fontWeight: 700,
                                    mt: 1
                                }}>
                                INITIAL CHECKLIST
                            </Typography>
                        </Box>
                        <Box sx={{ width: '30%', display: 'flex', alignItems: 'center' }} >
                            <Typography
                                level='body-sm'
                                fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 17,
                                    fontWeight: 700,
                                    mt: 1
                                }}>
                                FINAL CHECKLIST
                            </Typography>
                        </Box>
                    </Box>
                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                        <ProBedListCard
                            item={items}
                            handleChange={handleChange}
                            checklistItems={checklistItems}
                            proCheckListDetail={proCheckListDetail}
                        />
                    </Suspense>
                    {
                        proCheckListDetail?.[0]?.fb_initial_check === 1 &&
                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                            <OverallDetailCard
                                name={"INITIAL CHECKLIST DETAIL"}
                                employee={proCheckListDetail?.[0]?.created_by}
                                condition={proCheckListDetail?.[0]?.fb_initial_ovc}
                                remark={proCheckListDetail?.[0]?.fb_initial_remark}
                            />
                        </Suspense>
                    }
                    {
                        proCheckListDetail?.[0]?.fb_final_check === 1 &&
                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                            <OverallDetailCard
                                name={"FINAL CHECKLIST DETAIL"}
                                employee={proCheckListDetail?.[0]?.edited_by}
                                condition={proCheckListDetail?.[0]?.fb_final_ovc}
                                remark={proCheckListDetail?.[0]?.fb_final_remark}
                            />
                        </Suspense>
                    }
                    {
                        proCheckListDetail?.[0]?.fb_final_check !== 1 &&
                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                            <BedOverallCondition
                                setTotalDetail={setTotalDetail}
                                ovarallconditon={ovarallconditon}
                                overallremarks={overallremarks} />
                        </Suspense>
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
                            disabled={loading || proCheckListDetail?.[0]?.fb_final_check === 1}
                            onClick={HandleBedDetailRequest}
                            variant="outlined"
                            sx={{
                                fontSize: 16,
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
                                loading ? "Processing..." : proCheckListDetail?.[0]?.fb_final_check === 1 ? 'CheckList Completed' : proCheckListDetail?.[0]?.fb_initial_check === 1 ? "Complete Final CheckList" : "Complete Initial CheckList"
                            }

                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default ProBedlistModal