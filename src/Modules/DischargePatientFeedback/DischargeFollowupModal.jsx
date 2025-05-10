import React, { lazy, memo, Suspense, useCallback } from 'react';
import Modal from '@mui/joy/Modal';
import { Box, ModalDialog, Tooltip, Typography } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { Phone, MessageTextSolid, UserBadgeCheck, Male, PharmacyCrossTag } from 'iconoir-react';

import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import DatePickerComponent from '../../Components/DatePickerComponent';
import { Paper } from '@mui/material';

const InpatientModalCard = lazy(() => import('./InpatientModalCard'));

const DischargeFollowupModal = ({ open, setOpen, InPatientDetail, ReviewDetail, value, setValue }) => {


    const handleModalClose = useCallback(() => {
        setOpen(false)
    }, [setOpen]);

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
                    width: { xs: 200, sm: 620 },
                    borderRadius: 'md',
                    p: 1,
                    minHeight: 280,
                    boxShadow: "none",
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                }}>
                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                        <InpatientModalCard name={"Review Follow Up"} ipno={InPatientDetail?.['Patient_No#']} />
                    </Suspense>
                    <Box sx={{
                        width: '100%',
                        minHeight: 240,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 2,
                    }}>
                        <Box sx={{
                            width: '30%',
                            minHeight: 240,
                            py: 1,
                        }}>
                            <Box sx={{
                                width: '85%',
                                height: 135,
                                bgcolor: '#ebebeb',
                                p: 1,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {
                                    InPatientDetail?.Gender === "Male" ? <img
                                        src={male}
                                        alt=""
                                        width={120}
                                        height={120}

                                    /> : <img
                                        src={female}
                                        alt=""
                                        width={'100%'}
                                        height={'80%'}
                                    />
                                }
                            </Box>
                            {[
                                {
                                    label: 'Patient Name',
                                    value: InPatientDetail?.['Patient_Name'] || 'Not Available',
                                    icon: <UserBadgeCheck fontSize={14}
                                        style={{
                                            color: 'rgba(var(--font-primary-white))',
                                            cursor: 'pointer'
                                        }} />
                                },
                                {
                                    label: 'Mobile No',
                                    value: InPatientDetail?.['Mobile No'] || 'Not Available',
                                    icon: <Phone fontSize={12}
                                        style={{
                                            color: 'rgba(var(--font-primary-white))',
                                            cursor: 'pointer'
                                        }} />
                                },
                                {
                                    label: 'Gender/Age',
                                    value: `${InPatientDetail?.['Gender']} / ${InPatientDetail?.['Age_year'] ?? 'Unknown'} year`,
                                    icon: <Male fontSize={12}
                                        style={{
                                            color: 'rgba(var(--font-primary-white))',
                                            cursor: 'pointer'
                                        }} />
                                },
                                {
                                    label: 'Doctor Name',
                                    value: InPatientDetail?.['Doctor'] || 'Not Available',
                                    icon: <PharmacyCrossTag fontSize={12}
                                        style={{
                                            color: 'rgba(var(--font-primary-white))',
                                            cursor: 'pointer'
                                        }} />
                                },
                            ]?.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
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
                        {/* Review Goes Here */}
                        <Box sx={{
                            width: '70%',
                            minHeight: 240,

                        }}>
                            <Box sx={{
                                width: '100%',
                                minHeight: 90, mb: 1
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
                                <Paper elevation={2} sx={{
                                    p: 1
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
                                minHeight: 60
                            }}>
                                <DatePickerComponent label={'Select Next Available Date'} setValue={setValue} value={value} />
                            </Box>


                        </Box>

                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(DischargeFollowupModal)



