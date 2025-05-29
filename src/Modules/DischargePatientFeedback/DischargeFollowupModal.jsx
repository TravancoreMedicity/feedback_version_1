import Modal from '@mui/joy/Modal';
import { Paper } from '@mui/material';
import male from '../../assets/male.jpg';
import { format, parseISO } from 'date-fns';
import female from '../../assets/female.jpg';
import { Box, Button, ModalDialog, Tooltip, Typography } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import React, { lazy, memo, Suspense, useCallback, useEffect, useMemo } from 'react';
import {
    Phone,
    MessageTextSolid,
    UserBadgeCheck,
    Male,
    PharmacyCrossTag,
    CalendarRotateSolid,
    CalendarCheckSolid,
    IpAddressTag
} from 'iconoir-react';
import CustomeFollowupSkeleton from '../../Components/CustomeFollowupSkeleton';


const DatePickerComponent = lazy(() => import('../../Components/DatePickerComponent'));
const InpatientModalCard = lazy(() => import('./InpatientModalCard'));
const InfoRow = lazy(() => import('./InfoRow'));

const DischargeFollowupModal = ({
    open,
    setOpen,
    InPatientDetail,
    ReviewDetail,
    value,
    setValue,
    handleDateScheduling,
    Loading
}) => {



    const handleModalClose = useCallback(() => {
        setOpen(false)
    }, [setOpen]);

    const admissionDate = useMemo(() => {
        try {
            return format(parseISO(InPatientDetail?.fb_ipd_date || InPatientDetail?.fb_pt_admission_date), 'yyyy-MM-dd HH:mm:ss');
        } catch {
            return 'Not Available';
        }
    }, [InPatientDetail]);

    const dischargeDate = useMemo(() => {
        try {
            return format(parseISO(InPatientDetail?.fb_ipd_disc || InPatientDetail?.fb_pt_discharge_date), 'yyyy-MM-dd HH:mm:ss');
        } catch {
            return 'Not Available';
        }
    }, [InPatientDetail]);




    const getBasicInfoItems = (detail) => [
        {
            label: 'Patient Name',
            value: detail?.fb_ptc_name || detail?.fb_pt_name || 'Not Available',
            icon: <UserBadgeCheck fontSize={14} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        },
        {
            label: 'Mobile No',
            value: detail?.fb_ptc_mobile || detail?.fb_pt_mobile_no || 'Not Available',
            icon: <Phone fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        },
        {
            label: 'Gender/Age',
            value: (() => {
                const gender = detail?.fb_ptc_sex ?? detail?.fb_gender ?? 'Unknown';
                const age = detail?.fb_ptn_yearage ?? detail?.fb_pt_age ?? 'Unknown';
                return `${gender} / ${age} year`;
            })(),
            icon: <Male fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        },
        {
            label: 'IP NO',
            value: detail?.['Patient_No#'] || detail?.fb_ip_no || 'Not Available',
            icon: <IpAddressTag fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        },
        {
            label: 'Doctor Name',
            value: detail?.fb_doc_name || detail?.fb_ip_doctor || 'Not Available',
            icon: <PharmacyCrossTag fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        }
    ];


    useEffect(() => {
        if (InPatientDetail?.ScheduleDate && !InPatientDetail?.IsOnlyView) {
            setValue(new Date(InPatientDetail.ScheduleDate));
        }
    }, [InPatientDetail?.ScheduleDate, setValue, InPatientDetail?.IsOnlyView]);


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleModalClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <ModalDialog sx={{
                    width: { xs: 200, sm: 680 },
                    borderRadius: 'md',
                    p: 1,
                    minHeight: 280,
                    boxShadow: "none",
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                }}>
                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                        <InpatientModalCard name={"Review Follow Up"} ipno={InPatientDetail?.['Admn. Number'] || InPatientDetail?.fb_pt_admission_number} />
                    </Suspense>
                    {
                        Loading ? <CustomeFollowupSkeleton /> :

                            <Box sx={{
                                width: '100%',
                                minHeight: 260,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 2
                            }}>
                                <Box sx={{
                                    minWidth: '30%',
                                    maxWidth: '40%',
                                    minHeight: 240,
                                    py: 1
                                }}>
                                    <Box sx={{
                                        width: '60%',
                                        height: 125,
                                        bgcolor: '#ebebeb',
                                        px: 0.5,
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        {
                                            InPatientDetail?.Gender === "Male" || InPatientDetail?.fb_gender === "Male" ? <img
                                                src={male}
                                                alt="Male"
                                                width={120}
                                                height={120}

                                            /> : <img
                                                src={female}
                                                alt="Female"
                                                width={120}
                                                height={120}
                                            />
                                        }
                                    </Box>
                                    {getBasicInfoItems(InPatientDetail)?.map((item, index) => (
                                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 0.2 }}>
                                            <Box sx={{ width: '10%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Tooltip sx={{ cursor: 'pointer' }} title={item?.label}>
                                                        {item?.icon}
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                            <Box sx={{
                                                width: { xs: '100%', sm: '90%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                            }}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'var(--font-varient)',
                                                        color: 'rgba(var(--font-primary-white))',
                                                        fontWeight: { xs: 800, sm: 600 },
                                                        fontSize: { xs: 11, sm: 13 },
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        textWrap: 'wrap'
                                                    }}>
                                                    {item?.value}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Box sx={{
                                    minWidth: '70%',
                                    maxWidth: '60%',
                                    minHeight: 240,
                                    position: 'relative',
                                    mb: 1
                                }}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            minHeight: 120,
                                            mb: 1,

                                        }}>
                                        <Box
                                            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Tooltip sx={{ cursor: 'pointer' }} title={"Review"}>
                                                <MessageTextSolid className="border-b-[0.2rem] border-iconprimary p-0 " fontSize={16}
                                                    style={{
                                                        color: 'rgba(var(--font-primary-white))',
                                                        cursor: 'pointer'
                                                    }} />
                                            </Tooltip>
                                            <Typography
                                                className="border-b-[0.2rem] border-iconprimary p-0 "
                                                sx={{
                                                    fontFamily: 'var(--font-varient)',
                                                    color: 'rgba(var(--font-primary-white))',
                                                    fontWeight: { xs: 800, sm: 600 },
                                                    fontSize: { xs: 11, sm: 14 },
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    textWrap: 'wrap'
                                                }}>
                                                Previews Review Detail
                                            </Typography>
                                        </Box>
                                        <Paper variant='outlined' sx={{
                                            minHeight: 90,
                                            p: 1,
                                            backgroundColor: "rgba(var(--bg-card))",
                                        }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'var(--font-varient)',
                                                    color: 'rgba(var(--font-primary-white))',
                                                    fontWeight: { xs: 800, sm: 600 },
                                                    fontSize: { xs: 11, sm: 13 },
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    textWrap: 'wrap'
                                                }}>
                                                {ReviewDetail}
                                            </Typography>
                                        </Paper>

                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                        minHeight: 60,
                                    }}>
                                        <Box sx={{
                                            width: '100%',
                                            ming: 40,
                                            display: 'flex',
                                        }}>
                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                                <InfoRow icon={<CalendarRotateSolid fontSize={12}
                                                    style={{
                                                        color: 'rgba(var(--icon-primary))',
                                                        cursor: 'pointer'
                                                    }} />} label="Admission Date" value={admissionDate} /></Suspense>
                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                                <InfoRow icon={<CalendarCheckSolid fontSize={12}
                                                    style={{
                                                        color: 'rgba(var(--icon-primary))',
                                                        cursor: 'pointer'
                                                    }} />} label="Discharge Date" value={dischargeDate} /></Suspense>

                                        </Box>
                                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                            <DatePickerComponent
                                                readOnly={InPatientDetail?.IsOnlyView}
                                                minDate={new Date()}
                                                size={290}
                                                label={'Select Date'}
                                                setValue={setValue}
                                                value={InPatientDetail?.IsOnlyView ? new Date(InPatientDetail?.ScheduleDate
                                                ) : value}
                                            /></Suspense>
                                        <Button
                                            disabled={InPatientDetail?.IsOnlyView}
                                            onClick={() => handleDateScheduling(InPatientDetail)}
                                            color="neutral"
                                            size="sm"
                                            variant="outlined"
                                            sx={{
                                                my: 0.8,
                                                position: 'absolute',
                                                right: 20,
                                                color: 'rgba(var(--font-primary-white))',
                                                '&:hover': {
                                                    backgroundColor: '#9db4c0',
                                                },
                                                width: '95%'
                                            }}>{
                                                InPatientDetail?.isFormSubmitted ? "Edit Scheduled Date" : InPatientDetail?.IsOnlyView ? "Scheduled Date" : "Schedule Date"
                                            }</Button>
                                    </Box>
                                </Box>
                            </Box>
                    }
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(DischargeFollowupModal)



