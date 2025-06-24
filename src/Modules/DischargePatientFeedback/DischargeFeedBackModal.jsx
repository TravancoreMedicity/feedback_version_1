import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import Modal from '@mui/joy/Modal';
import { Box, ModalClose, ModalDialog } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import CommonFinalFeedSkeleton from '../../Feedback/Commoncomponents/commonFinalFeedSkeleton';


const FeedbackForm = lazy(() => import('../FeedbackForms/FeedbackForm'));
const DischargeImpressionFeedback = lazy(() => import('./DischargeImpressionFeedback'));


const DischargeFeedBackModal = ({
    open,
    setOpen,
    feedbackData,
    ReviewDetail,
    Loading,
    getFeedbackData,
    IsIMpressionDone,
    setPatientImpDetail,
    PatientImpDetail,
    TransactionID,
    PatientRemark,
    Relatives,
    Children,
    patientnotResponding,
    PatientNotRespondingRemark
}) => {


    const [defaultimpression, setDefaultImpression] = useState({});


    // Hanlde close and clearing the state current value00
    const handleModalClose = useCallback(() => {
        setOpen(false)
        setPatientImpDetail([])
    }, [setOpen, setPatientImpDetail]);

    const encodedId = btoa(26);
    const encodedName = btoa(feedbackData?.fb_ptc_name || "");
    const encodepatientid = btoa(feedbackData?.fb_pt_no || "");
    const encodemobile = btoa(feedbackData?.fb_ptc_mobile || "");
    const encodeipnum = btoa(feedbackData?.fb_ip_no || "");

    if (!open || !feedbackData) {
        return <CustomBackDropWithOutState message="Loading" />;
    }


    return (
        <>
            <Box>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <ModalDialog sx={{
                        width: { xs: '100%', md: IsIMpressionDone ? '75%' : '85%', },
                        borderRadius: 'md',
                        p: 1,
                        height: '90vh',
                        boxShadow: "none",
                        backgroundColor: 'transparent',
                        border: 'none',
                        display: 'flex'
                    }}>
                        <ModalClose
                            onClick={handleModalClose}
                            sx={{
                                right: -20,
                                top: -15,
                                p: 1,
                                borderRadius: '50%',
                                bgcolor: "rgba(var(--bg-card))"
                            }} />
                        <Box sx={{
                            width: '100%',
                            minHeight: '100%',
                            position: 'relative',
                            overflow: 'scroll',
                            bgcolor: "rgba(var(--bg-card))",
                            borderRadius: 5,
                            display: 'flex'
                        }}>
                            <Box sx={{ width: '100%' }}>
                                {

                                    !IsIMpressionDone ?
                                        Loading ? <CommonFinalFeedSkeleton /> :
                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                                <FeedbackForm
                                                    fbencodedId={encodedId}
                                                    fbencodedName={encodedName}
                                                    fbencodepatientid={encodepatientid}
                                                    fbencodemobile={encodemobile}
                                                    fbencodeipnum={encodeipnum}
                                                    setOpen={setOpen}
                                                    getFeedbackData={getFeedbackData}
                                                    PatientData={feedbackData}
                                                    ReviewDetail={ReviewDetail}
                                                    Relatives={Relatives}
                                                    Children={Children}
                                                    patientnotResponding={patientnotResponding}
                                                    PatientNotRespondingRemark={PatientNotRespondingRemark}
                                                />
                                            </Suspense>
                                        : Loading ? <CommonFinalFeedSkeleton /> :
                                            <Suspense>
                                                <DischargeImpressionFeedback
                                                    defaultimpression={defaultimpression}
                                                    setDefaultImpression={setDefaultImpression}
                                                    PatientData={feedbackData}
                                                    ReviewDetail={ReviewDetail}
                                                    PatientImpDetail={PatientImpDetail}
                                                    TransactionID={TransactionID}
                                                    setOpen={setOpen}
                                                    getFeedbackData={getFeedbackData}
                                                    PatientRemark={PatientRemark}
                                                    Relatives={Relatives}
                                                    Children={Children}
                                                    patientnotResponding={patientnotResponding}
                                                    PatientNotRespondingRemark={PatientNotRespondingRemark}
                                                />
                                            </Suspense>
                                }
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </Box >
        </>

    )
}

export default memo(DischargeFeedBackModal)