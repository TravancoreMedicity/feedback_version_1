import React, { memo, useCallback } from 'react';
import Modal from '@mui/joy/Modal';
import { QRCodeSVG } from 'qrcode.react';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Box, ModalDialog, Typography } from '@mui/joy';
import { COMMON_FEEDBACK_LINK_URL, OUTLINK_FEEDBACK } from '../../../Constant/Static';


const DischargeQrModal = ({
    open,
    setOpen,
    item,
    feedbackedexit,
    feedbackdata
}) => {


    const handleModalClose = useCallback(() => {
        setOpen(false)
    }, [setOpen]);

    const encodedId = btoa(feedbackdata?.fdmast_slno);
    const encodedName = btoa(item?.fb_ptc_name)
    const encodepatientid = btoa(item?.fb_pt_no)
    const encodemobile = btoa(item?.fb_ptc_mobile)
    const encodeipnum = btoa(item?.fb_ip_no)
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
                        !feedbackedexit ? <>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Typography sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 13, sm: 18 }
                                }} fontWeight={900} >{item?.fb_ptc_name}</Typography>
                                <Typography sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                }} fontWeight={900} fontSize={12}>{item?.fb_pt_no}</Typography>
                                <Typography sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                }} fontWeight={900} fontSize={10}>{item?.fb_ip_no}</Typography>
                            </Box>

                            <Box sx={{ width: 180, height: 180, objectFit: 'contain', p: 1, background: 'linear-gradient(to right, rgba(33, 150, 243, 0.4), rgba(233, 30, 99, 0.4))', borderRadius: 5 }}>
                                <QRCodeSVG value={feedbackdata?.feedback_name === "ip" ? redirectToUrlIp : redirectToUrlCommon} style={{ width: '100%', height: '100%', borderRadius: 3 }} />
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

export default memo(DischargeQrModal)