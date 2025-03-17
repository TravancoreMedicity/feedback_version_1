import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import { Box, Divider, ModalDialog, Tooltip } from '@mui/joy';
import PatinetCard from './PatinetCard';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import PatientCardHeader from './PatientCardHeader';
import FeedbackItem from './FeedbackItem';
import ButtonComponent from './ButtonComponent';
import PatientRemarks from './PatientRemarks';

export default function PatientModal({
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
  multiple
}) {
  return (
    <Box>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
      >
        <ModalDialog sx={{
          width: 620, borderRadius: 'md', p: 1, minHeight: 250, border: 0, boxShadow: "none", backgroundColor: "rgba(var(--bg-card))", border: 0.03,
          borderColor: "rgba(var(--border-primary))",
        }}>
          {loading ? <CustomBackDropWithOutState message={"Loading..."} /> : null}
          {!loading && inpatientDetail && inpatientDetail.length > 0 ?
            (
              <Box
                sx={{
                  px: 1,
                  py: 2,
                  width: 600,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "rgba(var(--bg-card))",
                  minHeight: 250,
                  // border: 0.03,
                  // borderColor: "rgba(var(--border-primary))",
                }}>
                <Box sx={{ backgroundColor: "rgba(var(--bg-card))" }}>
                  <PatientCardHeader roomnumber={roomnumber} />
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', gap: 1, px: 2 }}>
                      <PatinetCard inpatientDetail={inpatientDetail[currentIndex]} />
                    </Box>
                    <Divider orientation="vertical" sx={{ bgcolor: 'rgba(213, 82, 154, 0.8)', width: 2 }} />
                    <Box sx={{ width: '35%', gap: 1, minHeight: 180, }}>
                      <Box sx={{ width: '100%', gap: 1, height: '100%', display: 'flex', justifyContent: 'center', px: 0.2 }}>
                        {
                          allfeedbackNames
                            ?.filter(item => item.feedback_name === "Common" || item.feedback_name === "ip")
                            .map((item, index) => {
                              return (
                                <FeedbackItem
                                  key={index}
                                  item={item}
                                  feedbackedexit={feedbackedexit}
                                  currentIndex={currentIndex}
                                  inpatientDetail={inpatientDetail}
                                  handlebuttonClick={handlebuttonClick}
                                />
                              );
                            })
                        }
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {
                  ispresent === "O" && multiple === 2 &&
                  <ButtonComponent nextPatient={nextPatient} prevPatient={prevPatient} />
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
                    {/* <PatinetCard inpatientDetail={inpatientDetail[currentIndex]} /> */}
                    <PatientRemarks />
                  </Box>
                  {/* <Box sx={{ width: '100%', display: 'flex', px: 2, minHeight: 150 }}>
                    <Box sx={{
                      width: '30%', bgcolor: 'green'
                    }}>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-varient)',
                          color: 'rgba(var(--font-primary-white))',
                          fontWeight: 600,
                          fontSize: 15,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          textWrap: 'wrap'
                        }}
                      >
                        fsdfsdfsfsd
                      </Typography>
                    </Box>
                    <Box sx={{
                      width: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', bgcolor: 'blue'
                    }}>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-varient)',
                          color: 'rgba(var(--font-primary-white))',
                          fontWeight: 600,
                          fontSize: 15,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          textWrap: 'wrap'
                        }}
                      >
                        fsdfsdfsfsd
                      </Typography>
                    </Box>
                  </Box> */}
                </Box>
              </Box>
            )
          }
        </ModalDialog>
      </Modal>
    </Box>
  );
}




