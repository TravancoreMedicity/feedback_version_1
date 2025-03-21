import React, { lazy, memo, Suspense, useCallback } from 'react';
import Modal from '@mui/joy/Modal';
import { Box, Divider, ModalDialog } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import PatientCardHeader from './PatientCardHeader';


const PatientRemarks = lazy(() => import('./PatientRemarks'));
const ButtonComponent = lazy(() => import('./ButtonComponent'));
const FeedbackItem = lazy(() => import('./FeedbackItem'));
const PatinetCard = lazy(() => import('./PatinetCard'));

const PatientModal = ({
  open,
  setOpen,
  allfeedbackNames,
  inpatientDetail,
  feedbackedexit,
  roomnumber,
  currentIndex,
  handlebuttonClick,
  loading,
  nextPatient,
  prevPatient,
  ispresent,
  multiple,
  setRoomStatus
}) => {

  const handleModalClose = useCallback(() => {
    setOpen(false)
    setRoomStatus({})
  }, [setOpen, setRoomStatus])


  return (
    <Box>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={handleModalClose}
        sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
      >
        <ModalDialog sx={{
          minWidth: 620,
          borderRadius: 'md',
          p: 1,
          minHeight: 250,
          boxShadow: "none",
          backgroundColor: "rgba(var(--bg-card))",
          border: 0.03,
          borderColor: "rgba(var(--border-primary))"
        }}>
          {loading ? <CustomBackDropWithOutState message={"Loading..."} /> : null}
          {Array.isArray(inpatientDetail) && inpatientDetail.length > 0 ?
            (
              <Box
                sx={{
                  px: 1,
                  py: 1,
                  width: 600,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "rgba(var(--bg-card))",
                  minHeight: 250,
                }}>
                <Box sx={{ backgroundColor: "rgba(var(--bg-card))" }}>
                  <PatientCardHeader roomnumber={roomnumber} />
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', gap: 1, px: 2 }}>
                      <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                        <PatinetCard inpatientDetail={inpatientDetail[currentIndex]} />
                      </Suspense>
                    </Box>
                    <Divider orientation="vertical" sx={{ bgcolor: 'rgba(213, 82, 154, 0.8)', width: 2 }} />
                    <Box sx={{ width: '35%', gap: 1, minHeight: 180, }}>
                      <Box sx={{ width: '100%', gap: 1, height: '100%', display: 'flex', justifyContent: 'center', px: 0.2 }}>
                        {
                          allfeedbackNames
                            ?.filter(item => item.feedback_name === "Common" || item.feedback_name === "ip")
                            .map((item, index) => {
                              return (
                                <Suspense key={index} fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                                  <FeedbackItem
                                    index={index}
                                    item={item}
                                    feedbackedexit={feedbackedexit}
                                    currentIndex={currentIndex}
                                    inpatientDetail={inpatientDetail}
                                    handlebuttonClick={handlebuttonClick}
                                  />
                                </Suspense>
                              );
                            })
                        }
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {
                  ispresent === "O" && multiple === 2 &&
                  <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                    <ButtonComponent nextPatient={nextPatient} prevPatient={prevPatient} />
                  </Suspense>
                }

              </Box>
            ) : (
              <Box
                sx={{
                  px: 1,
                  py: 2,
                  width: 600,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "rgba(var(--bg-card))",
                  minHeight: 250,
                }}>
                <Box sx={{ backgroundColor: "rgba(var(--bg-card))" }}>
                  <PatientCardHeader roomnumber={roomnumber} />
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1, px: 2 }}>
                    <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                      <PatientRemarks inpatientDetail={inpatientDetail} />
                    </Suspense>
                  </Box>
                </Box>
              </Box>
            )
          }
        </ModalDialog>
      </Modal>
    </Box>
  )
}

export default memo(PatientModal)









