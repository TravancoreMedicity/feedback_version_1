import React, { lazy, memo, Suspense, useCallback, useState } from 'react';
import Modal from '@mui/joy/Modal';
import { Box, Divider, ModalDialog } from '@mui/joy';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { QRCodeSVG } from 'qrcode.react';
import { useMediaQuery } from '@mui/material';


const PatientCardHeader = lazy(() => import('./PatientCardHeader'));
const PatientRemarks = lazy(() => import('./PatientRemarks'));
const ButtonComponent = lazy(() => import('./ButtonComponent'));
const FeedbackItem = lazy(() => import('./FeedbackItem'));
const PatinetCard = lazy(() => import('./PatinetCard'));
const QrModal = lazy(() => import('./QrModal'));

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
  setRoomStatus,
  entering
}) => {

  const [openqr, setOpenQr] = useState(false);
  const [currentfeedbackitem, setCurrentFeedbackItem] = useState([]);


  const handleModalClose = useCallback(() => {
    setOpen(false)
    setRoomStatus({})
  }, [setOpen, setRoomStatus]);

  const handleQrcode = useCallback((item) => {
    setOpenQr(true);
    setCurrentFeedbackItem(item);
  }, []);

  const isMdUp = useMediaQuery('(min-width: 760px)');

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
          width: { xs: '100%', sm: 620 },
          borderRadius: 'md',
          p: 1,
          minHeight: 150,
          boxShadow: "none",
          backgroundColor: "rgba(var(--bg-card))",
          border: 0.03,
          borderColor: "rgba(var(--border-primary))"
        }}>
          {loading ? <CustomBackDropWithOutState message={"Loading..."} /> : null}
          {entering === 1 ?
            (
              <Box
                sx={{
                  px: 1,
                  py: 1,
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "rgba(var(--bg-card))",
                  minHeight: 200,
                }}>
                <Box sx={{ backgroundColor: "rgba(var(--bg-card))" }}>
                  <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                    <PatientCardHeader roomnumber={roomnumber} name={"Patient Detail"} />
                  </Suspense>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box sx={{ width: { xs: '100%', sm: '60%' }, display: 'flex', flexDirection: 'column', gap: 1, px: 2 }}>
                      <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                        <PatinetCard inpatientDetail={inpatientDetail[currentIndex]} ispresent={ispresent} />
                      </Suspense>
                    </Box>
                    {
                      inpatientDetail[currentIndex] !== undefined &&
                      < Divider
                        orientation={!isMdUp ? "horizontal" : "vertical"}
                        sx={{
                          bgcolor: 'rgba(213, 82, 154, 0.8)',
                          width: { xs: '100%', sm: 2 },
                        }} />}
                    <Box sx={{ width: { xs: '100%', sm: '35%' }, gap: 1, minHeight: 30, }}>
                      <Box sx={{ width: '100%', gap: 1, height: '100%', display: 'flex', px: 0.2, flexDirection: 'column' }}>
                        <>
                          <Box sx={{ display: 'flex', height: '50%', justifyContent: 'space-between' }}>
                            {
                              inpatientDetail[currentIndex] !== undefined && allfeedbackNames
                                ?.filter(item => item?.feedback_name === "Common" || item?.feedback_name === "ip")
                                ?.map((item, index) => (
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
                                ))
                            }
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: { xs: 0, sm: 1 }, mx: 2 }}>
                            {
                              inpatientDetail[currentIndex] !== undefined && allfeedbackNames
                                ?.filter(item => item?.feedback_name === "Common" || item?.feedback_name === "ip")
                                ?.map((item, index) => (
                                  <Suspense
                                    key={index}
                                    fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                                    <Box
                                      onClick={() => handleQrcode(item)}
                                      sx={{
                                        width: { xs: 60, sm: '38%' },
                                        objectFit: 'contain',
                                        p: 1,
                                        borderRadius: 5,
                                        cursor: 'pointer',
                                        '&:hover':
                                        {
                                          background: 'linear-gradient(to right, rgba(33, 150, 243, 0.4), rgba(233, 30, 99, 0.4))'
                                        }
                                      }}>
                                      <QRCodeSVG value={'sdflkjdjh'} style={{ width: '100%', height: '100%', borderRadius: 3 }} />
                                    </Box>
                                  </Suspense>
                                ))
                            }
                          </Box>
                          {
                            openqr && (
                              <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                                <QrModal
                                  open={openqr}
                                  setOpen={setOpenQr}
                                  inpatientDetail={inpatientDetail}
                                  currentIndex={currentIndex}
                                  item={currentfeedbackitem}
                                  feedbackedexit={feedbackedexit}
                                />
                              </Suspense>
                            )
                          }
                        </>
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
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "rgba(var(--bg-card))",
                  minHeight: 200,
                }}>
                <Box sx={{ backgroundColor: "rgba(var(--bg-card))" }}>
                  <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                    <PatientCardHeader roomnumber={roomnumber} name={"Patient Detail"} />
                  </Suspense>
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









