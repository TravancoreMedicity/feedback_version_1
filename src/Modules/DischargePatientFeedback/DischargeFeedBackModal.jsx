import React, { lazy, memo, Suspense, useCallback } from 'react'
import Modal from '@mui/joy/Modal';
import { Box, ModalDialog } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';


const FeedbackForm = lazy(() => import('../FeedbackForms/FeedbackForm'));


const DischargeFeedBackModal = ({ open, setOpen, feedbackData, getFeedbackData }) => {

    const handleModalClose = useCallback(() => {
        setOpen(false)
    }, [setOpen]);


    const encodedId = btoa(26);
    const encodedName = btoa(feedbackData?.fb_ptc_name || "");
    const encodepatientid = btoa(feedbackData?.fb_pt_no || "");
    const encodemobile = btoa(feedbackData?.fb_ptc_mobile || "");
    const encodeipnum = btoa(feedbackData?.fb_ip_no || "");

    return (
        <>
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
                        width: '85%',
                        borderRadius: 'md',
                        p: 1,
                        height: '90vh',
                        boxShadow: "none",
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        backgroundColor: "rgba(var(--bg-card))",

                    }}>
                        {/* <Suspense
                            fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                            <BookAppoinment onclick={handleopenmodal} />
                        </Suspense> */}
                        <Box sx={{
                            width: '100%',
                            minHeight: '100%',
                            position: 'relative',
                            overflow: 'scroll',
                            bgcolor: "rgba(var(--bg-card))"
                        }}>
                            {
                                open && feedbackData &&
                                <Suspense
                                    fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                    <FeedbackForm
                                        fbencodedId={encodedId}
                                        fbencodedName={encodedName}
                                        fbencodepatientid={encodepatientid}
                                        fbencodemobile={encodemobile}
                                        fbencodeipnum={encodeipnum}
                                        setOpen={setOpen}
                                        getFeedbackData={getFeedbackData}
                                    />
                                </Suspense>
                            }
                        </Box>
                    </ModalDialog>
                </Modal>
            </Box >
        </>

    )
}

export default memo(DischargeFeedBackModal)