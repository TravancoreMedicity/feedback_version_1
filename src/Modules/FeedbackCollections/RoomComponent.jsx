import { Box, Divider, Tooltip, Typography } from '@mui/joy';
import React, { memo, useCallback, useState } from 'react';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import { useQuery } from '@tanstack/react-query';
import { getallfeedbackMaster } from '../../Function/CommonFunction';
import { OUTLINK_FEEDBACK } from '../../Constant/Static';
import PatientModal from './PatientModal';

const RoomComponent = ({
    roomnumber,
    ispresent,
    getdetail,
    bdcode,
    inpatientDetail,
    setAnchorEl,
    feedbackedexit,
    multiple,
    loading,
    open,
}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalopen, setModalOpen] = useState(false);

    const { data: allfeedbackNames } = useQuery({
        queryKey: ['allfeedbackname'],
        queryFn: () => getallfeedbackMaster(),
    })

    const handleClick = useCallback((event) => {
        setModalOpen(true)
        getdetail(bdcode)
    }, [open, setModalOpen]);


    const openFeedbackForm = useCallback((feedbackId, name, PatientId, patMobile, ipnumber) => {
        const encodedId = btoa(feedbackId);
        const encodedName = btoa(name)
        const encodepatientid = btoa(PatientId)
        const encodemobile = btoa(patMobile)
        const encodeipnum = btoa(ipnumber)
        const externalUrl = `${OUTLINK_FEEDBACK}/${encodedId}?name=${encodedName}&pid=${encodepatientid}&mbno=${encodemobile}&ipnum=${encodeipnum}`;
        window.open(externalUrl, '_blank'); // Opens in a new tab
    }, []);

    const handlebuttonClick = useCallback((id, name, pid, mob, ipnum) => {
        openFeedbackForm(id, name, pid, mob, ipnum)
        setAnchorEl(null)
    }, [openFeedbackForm, setAnchorEl])

    // Function to go to the next patient card
    const nextPatient = () => {
        if (currentIndex < inpatientDetail.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
    // Function to go to the previous patient card
    const prevPatient = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    return (
        <>
            <Box
                onClick={handleClick}
                sx={{
                    width: 150,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                }}>
                <Box
                    sx={{
                        width: '100%',
                        height: 60,
                        backgroundColor: ispresent === "A" ? "#8FD14F" : ispresent === "O" && multiple === 2 ? "rgba(207, 118, 133, 0.96)" : ispresent === "T" ? "rgb(239, 131, 15)" : ispresent === "B" ? "rgba(200, 0, 180, 0.8)" : ispresent === "N" ? "rgba(235, 18, 18, 0.84)" : ispresent === "F" ? "rgb(53, 170, 193)" : ispresent === "R" ? "rgb(40, 185, 234)" : ispresent === "O" ? "rgba(19, 112, 241, 0.68)" : "red",
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        display: 'flex',
                        borderRadius: 8,
                    }}>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative' }}>
                        <HotelOutlinedIcon style={{ fontSize: 27, color: 'white' }} />
                        <Typography level='body-sm' fontWeight={'md'}
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'white',
                                fontSize: 13,
                                fontWeight: 900,
                                ml: 1
                            }} >
                            {roomnumber}
                        </Typography>
                    </Box>
                    {/* Popover */}
                </Box>
            </Box>
            <PatientModal
                open={modalopen}
                setOpen={setModalOpen}
                allfeedbackNames={allfeedbackNames}
                inpatientDetail={inpatientDetail}
                feedbackedexit={feedbackedexit}
                roomnumber={roomnumber}
                currentIndex={currentIndex}
                handlebuttonClick={handlebuttonClick}
                loading={loading}
                nextPatient={nextPatient}
                prevPatient={prevPatient}
                ispresent={ispresent}
                multiple={multiple}
            />
        </>
    )
}
export default memo(RoomComponent);

