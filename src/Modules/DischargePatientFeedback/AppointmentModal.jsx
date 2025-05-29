// building after the confirmation of sir
import { Box, Modal, ModalDialog, Typography } from '@mui/joy';
import { format, parseISO } from 'date-fns';
import React, { memo, Suspense, useCallback } from 'react'
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import InpatientModalCard from './InpatientModalCard';
import {
    PharmacyCrossTag,
    CalendarCheckSolid,
} from 'iconoir-react';


const AppointmentModal = ({ open, setOpen, feedbackData }) => {

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
                <ModalDialog
                    className="w-[420px] h-[250px] p-[0.2rem] rounded-md shadow-none border border-color-white border-[0.03px]">
                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                        <InpatientModalCard name={"Appoinment Confirmation"} />
                    </Suspense>
                    <Box className="w-full h-full flex items-center justify-center flex-col rounded">
                        <Box className="w-full h-1/2  flex ">
                            <Box className='w-[20%] h-full  flex items-center justify-center flex-col gap-2'>
                                <CalendarCheckSolid fontSize={12}
                                    style={{
                                        color: 'rgba(var(--icon-primary))',
                                        cursor: 'pointer'
                                    }} />
                                <PharmacyCrossTag fontSize={12}
                                    style={{
                                        color: 'rgba(var(--icon-primary))',
                                        cursor: 'pointer'
                                    }} />
                            </Box>
                            <Box className='w-[80%] h-full  flex items-start justify-center flex-col gap-2'>
                                <Typography>{format(parseISO(feedbackData?.ScheduleDate), 'dd-MM-yyyy')}</Typography>
                                <Typography>{feedbackData?.Doctor}</Typography>
                            </Box>
                        </Box>
                        <Box className="w-full h-1/2 bg-green-600">

                        </Box>
                        {/* 
                         */}
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(AppointmentModal)