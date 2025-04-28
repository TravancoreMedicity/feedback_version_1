import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Suspense } from 'react';
import Modal from '@mui/joy/Modal';
import { useQuery } from '@tanstack/react-query';
import { EmpauthId } from '../../Constant/Constant';
// import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import { Box, Button, ModalDialog, Typography } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { getDepartmentEmployee, getllhkroomChecklist, getLoggedEmpDetail } from '../../Function/CommonFunction';


const HkChecklistCard = lazy(() => import('./HkChecklistCard'));
const HkCurrentBedStatusButton = lazy(() => import('./HkCurrentBedStatusButton'));
const HkComplaintHead = lazy(() => import('./HkComplaintHead'));
const MultipleSelect = lazy(() => import('../../Components/MultipleSelect'));
const ModalHeader = lazy(() => import('../../Components/ModalHeader'));

const HouseKeepingBedlistModal = ({ open, data, setOpen }) => {

    const id = EmpauthId()
    const [checklistItems, setChecklistItems] = useState([]);
    const [empid, setEmpid] = useState([]);
    const [totaldetail, setTotalDetail] = useState({
        activeButton: null,
        remarks: ""
    });

    const { activeButton, remarks } = totaldetail;

    const HanldeModalClose = useCallback(() => {
        setOpen(false)
    }, [setOpen]);



    const { data: allhkchecklistitems } = useQuery({
        queryKey: ['roomchecklistitem'],
        queryFn: () => getllhkroomChecklist(),
    });

    const hanldmultiplechange = useCallback((e, val) => {
        setEmpid(val);
    }, [setEmpid]);


    //just for testing
    /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
    const { data: getlogempdetail } = useQuery({
        queryKey: ["loggedempdetail", id],
        queryFn: () => getLoggedEmpDetail(id),
        enabled: !!open,
        staleTime: Infinity
    });

    const departmentSection = useMemo(() => getlogempdetail?.[0]?.em_dept_section, [getlogempdetail]);

    //fetching departemployee
    const { data: departmentemp } = useQuery({
        queryKey: ['fetchalldepemployee', departmentSection],
        queryFn: () => getDepartmentEmployee(departmentSection),
        enabled: !!departmentSection,
    });

    /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

    const handleChange = useCallback((id, value, field) => {
        setChecklistItems(prev =>
            prev?.map(item =>
                item?.fb_hk_rm_cklist_name === id && item[field] !== value
                    ? { ...item, [field]: value }
                    : item
            )
        );
    }, []);

    const items = useMemo(() => {
        if (!allhkchecklistitems) return [];
        return allhkchecklistitems?.map(item => {
            return {
                ...item,
                ispresent:
                    item?.ispresent ?? 0,
            };
        });
    }, [allhkchecklistitems]);


    useEffect(() => {
        if (items?.length > 0) {
            setChecklistItems(items);
        }
    }, [items, open]);

    //The item for complaints
    const isDamagedItemsArray = useMemo(() => checklistItems?.filter(item => item?.ispresent === 1), [checklistItems]);

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
                        <HkChecklistCard item={items} handleChange={handleChange} />
                    </Suspense>
                    {
                        isDamagedItemsArray && isDamagedItemsArray?.length > 0 &&
                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                            <HkComplaintHead name={"DAMAGED ASSETS"} items={isDamagedItemsArray} />
                        </Suspense>
                    }
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
                            setTotalDetail={setTotalDetail}
                            remarks={remarks}
                            activeButton={activeButton}
                        />
                    </Suspense>
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
                            // disabled={loading || proCheckListDetail?.[0]?.fb_final_check === 1}
                            // onClick={HandleBedDetailRequest}
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
                            CheckList Completed
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(HouseKeepingBedlistModal)
