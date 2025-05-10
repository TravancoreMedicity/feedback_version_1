import React, { memo, useCallback } from 'react';
import Modal from '@mui/joy/Modal';
import { QRCodeSVG } from 'qrcode.react';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Box, ModalDialog, Typography } from '@mui/joy';
import { COMMON_FEEDBACK_LINK_URL, OUTLINK_FEEDBACK } from '../../Constant/Static';
const QrModal = ({ open, setOpen, item, inpatientDetail, currentIndex, feedbackedexit }) => {

    const isFeedbackGiven = feedbackedexit?.some(fb =>
        fb?.fdmast_slno === item?.fdmast_slno && fb?.fb_patient_name === inpatientDetail[currentIndex]?.fb_ptc_name
    );

    const handleModalClose = useCallback(() => {
        setOpen(false)
    }, [setOpen]);

    const encodedId = btoa(item?.fdmast_slno);
    const encodedName = btoa(inpatientDetail[currentIndex]?.fb_ptc_name)
    const encodepatientid = btoa(inpatientDetail[currentIndex]?.fb_pt_no)
    const encodemobile = btoa(inpatientDetail[currentIndex]?.fb_ptc_mobile)
    const encodeipnum = btoa(inpatientDetail[currentIndex]?.fb_ip_no)
    const redirectToUrlIp = `${OUTLINK_FEEDBACK}/${encodedId}?name=${encodedName}&pid=${encodepatientid}&mbno=${encodemobile}&ipnum=${encodeipnum}`;
    const redirectToUrlCommon = COMMON_FEEDBACK_LINK_URL;

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
                    width: { xs: 200, sm: 420 },
                    borderRadius: 'md',
                    p: 1,
                    minHeight: 380,
                    boxShadow: "none",
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {
                        !isFeedbackGiven ? <>
                            <Box sx={{ width: 180, height: 180, objectFit: 'contain', p: 1, background: 'linear-gradient(to right, rgba(33, 150, 243, 0.4), rgba(233, 30, 99, 0.4))', borderRadius: 5 }}>
                                <QRCodeSVG value={item?.feedback_name === "ip" ? redirectToUrlIp : redirectToUrlCommon} style={{ width: '100%', height: '100%', borderRadius: 3 }} />
                            </Box>
                            <Typography sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                            }} fontWeight={900} fontSize={12}>Scan The QrCode.</Typography>
                        </> :
                            <>
                                <VolunteerActivismIcon sx={{
                                    color: 'rgba(var(--font-primary-white))',

                                }} />
                                <Typography sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                }} fontWeight={900} fontSize={12}>Patient Already Submitted.<br /> Thanks For Your Intreset</Typography>
                            </>
                    }
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(QrModal)