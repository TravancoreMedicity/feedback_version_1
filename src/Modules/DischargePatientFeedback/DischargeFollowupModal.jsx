import Modal from '@mui/joy/Modal';
import { Paper } from '@mui/material';
import male from '../../assets/male.jpg';
import { format, parseISO } from 'date-fns';
import female from '../../assets/female.jpg';
import { Box, Button, ModalDialog, Tooltip, Typography } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import React, { lazy, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
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
import TextComponentBox from '../../Components/TextComponentBox';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';


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
    Loading,
    setProRemarks,
    proremarks,
    SumbittingData
}) => {

    const [opentextarea, setOpenTextArea] = useState(false);

    // console.log();




    // modal close
    const handleModalClose = useCallback(() => {
        setOpen(false)
    }, [setOpen]);

    // admission date showing if availble or showing "Not Available"
    const admissionDate = useMemo(() => {
        try {
            return format(parseISO(InPatientDetail?.fb_ipd_date), 'yyyy-MM-dd HH:mm:ss');
        } catch {
            return 'Not Available';
        }
    }, [InPatientDetail]);


    //discharge date showing if availble or showing "Not Available"
    const dischargeDate = useMemo(() => {
        try {
            return format(parseISO(InPatientDetail?.fb_ipd_disc), 'yyyy-MM-dd HH:mm:ss');
        } catch {
            return 'Not Available';
        }
    }, [InPatientDetail]);



    // function to render the Patient Detail
    const getBasicInfoItems = (detail) => [
        {
            label: 'Patient Name',
            value: detail?.fb_ptc_name || 'Not Available',
            icon: <UserBadgeCheck className='iconStyle' />
        },
        {
            label: 'Mobile No',
            value: detail?.fb_ptc_mobile || 'Not Available',
            icon: <Phone className='iconStyle' />
        },
        {
            label: 'Gender/Age',
            value: (() => {
                const gender = detail?.fb_ptc_sex ?? 'Unknown';
                const age = detail?.fb_ptn_yearage ?? 'Unknown';
                return `${gender} / ${age} year`;
            })(),
            icon: <Male className='iconStyle' />
        },
        {
            label: 'IP NO',
            value: detail?.fb_ip_no || 'Not Available',
            icon: <IpAddressTag className='iconStyle' />
        },
        {
            label: 'Doctor Name',
            value: detail?.fb_doc_name || 'Not Available',
            icon: <PharmacyCrossTag className='iconStyle' />
        }
    ];


    // used to show the Scheduled Date If Present 
    useEffect(() => {
        if (InPatientDetail?.ScheduleDate && !InPatientDetail?.IsOnlyView) {
            setValue(new Date(InPatientDetail?.ScheduleDate));
            setProRemarks(InPatientDetail?.proremark)
        }
    }, [InPatientDetail?.ScheduleDate, setValue, InPatientDetail?.IsOnlyView, InPatientDetail?.proremark, setProRemarks]);


    // opening text area
    const handleopenTextarea = useCallback(() => {
        setOpenTextArea(prev => !prev)
    }, [setOpenTextArea]);


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
                        <InpatientModalCard name={"Review Follow Up"} ipno={InPatientDetail?.fb_ip_no} />
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
                                            InPatientDetail?.fb_ptc_sex === "M" || InPatientDetail?.fb_gender === "Male" ? <img
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
                                                <TextComponentBox name={item?.value} size={13} />
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
                                            borderColor: "rgba(var(--border-primary))",
                                        }}>
                                            <TextComponentBox name={ReviewDetail} size={13} />
                                        </Paper>

                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                        minHeight: 60,
                                    }}>
                                        <Box sx={{
                                            width: '100%',
                                            ming: 40,
                                            display: 'flex'
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
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, px: 1 }}>
                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                                <DatePickerComponent
                                                    readOnly={InPatientDetail?.IsOnlyView}
                                                    minDate={new Date()}
                                                    size={390}
                                                    label={'Select Date'}
                                                    setValue={setValue}
                                                    value={InPatientDetail?.IsOnlyView ? new Date(InPatientDetail?.ScheduleDate
                                                    ) : value}
                                                />
                                            </Suspense>
                                            <Tooltip title={"Add Remarks"}>
                                                <AddCircleTwoToneIcon
                                                    onClick={handleopenTextarea}
                                                    sx={{ fontSize: 26, color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
                                            </Tooltip>
                                        </Box>
                                        {
                                            (InPatientDetail?.proremark || opentextarea) &&
                                            <Box sx={{ width: '%', p: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <EditNoteTwoToneIcon sx={{ color: 'rgba(var(--icon-primary))', fontSize: 28 }} />
                                                    <TextComponentBox name={`Enter Remarks`} size={14} />
                                                </Box>
                                                <textarea
                                                    onChange={(e) => setProRemarks(e.target.value)}
                                                    value={proremarks}
                                                    placeholder={`Patient Remarks`}
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
                                        <Box sx={{ position: 'relative' }}>

                                            <Button
                                                disabled={InPatientDetail?.IsOnlyView || SumbittingData}
                                                onClick={() => handleDateScheduling(InPatientDetail)}
                                                color="neutral"
                                                size="sm"
                                                variant="outlined"
                                                sx={{
                                                    mt: 1.5,
                                                    color: 'rgba(var(--font-primary-white))',
                                                    '&:hover': {
                                                        backgroundColor: '#9db4c0',
                                                    },
                                                    width: '95%'
                                                }}>
                                                {
                                                    SumbittingData ? "Submitting...." :
                                                        InPatientDetail?.isFormSubmitted ? "Edit Scheduled Date" : InPatientDetail?.IsOnlyView ? "Scheduled Date" : "Schedule Date"
                                                }
                                            </Button>
                                        </Box>
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



