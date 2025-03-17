import React, { useCallback, memo, useState } from 'react';
import Modal from '@mui/joy/Modal';
import { Box, Button, ModalDialog, Typography } from '@mui/joy';
import BedTwoToneIcon from '@mui/icons-material/BedTwoTone';
import MaintenanceCard from './MaintenanceCard';
import MaintenaceRemark from './MaintenaceRemark';
import MaintenanceVerification from './MaintenanceVerification';

const MaintenanceModal = ({
    item,
    setRemarks,
    remarks,
    activeButton,
    setActiveButton,
    setBeddetail,
    HandleBedRequest,
    open,
    setOpen
}) => {


    const [empid, setEmpid] = useState([]);
    const [verificationdetail, setVerificationDetail] = useState({
        remark: "",
        time: '',
    });

    const { remark, time } = verificationdetail;

    const HandleVerification = useCallback(() => {
        const insertdta = {
            remark: remark,
            empid: empid,
            time: time
        }
        console.log(insertdta);

    }, [])

    const HanldeModalClose = useCallback(() => {
        setOpen(false)
        setRemarks("")
        setActiveButton(null)
        setBeddetail({
            fb_bed_slno: 0,
            fb_bd_code: 0,
            fb_ns_code: "",
            fb_bdc_no: ""
        })
        setEmpid([])
    }, [setOpen, setBeddetail, setActiveButton, setRemarks]);
    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={HanldeModalClose}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}
            >
                <ModalDialog sx={{
                    width: 660,
                    borderRadius: 'md',
                    p: 1,
                    minHeight: 250,
                    border: 0,
                    boxShadow: "none",
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                }}>
                    <Box sx={{
                        p: 1,
                        backgroundColor: "rgba(var(--bg-card))",
                        borderRadius: 5,
                        minHeight: 200,
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}
                            className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
                            <BedTwoToneIcon sx={{
                                color: 'rgba(var(--icon-primary))',
                                fontSize: 26,
                                fontWeight: 700,
                                mt: 2,
                            }} />
                            <Typography
                                level='body-sm'
                                fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    mt: 2
                                }}>
                                BED DETAILS
                            </Typography>
                        </Box>
                        <MaintenanceCard
                            nsstation={item?.fb_ns_code}
                            roomnumber={item?.fb_bd_code}
                            roomtype={item?.fb_rtc_desc}
                            requestdate={item?.create_date}
                            occupancy={item?.fb_bdc_occup}
                            reason={item?.fb_bed_reason}
                        />
                        {
                            item?.fb_bed_status === null ? <MaintenaceRemark
                                setRemarks={setRemarks}
                                remarks={remarks}
                                activeButton={activeButton}
                                setActiveButton={setActiveButton}
                            /> : <MaintenanceVerification
                                remark={remark}
                                time={time}
                                empid={empid}
                                setEmpid={setEmpid}
                                verificationdetail={verificationdetail}
                                setVerificationDetail={setVerificationDetail}
                            />
                        }
                        {
                            item?.fb_bed_status === null ? (
                                activeButton !== null && <Box sx={{
                                    px: 2,
                                    width: '100%'
                                }}>
                                    <Button
                                        onClick={HandleBedRequest}
                                        disabled={!remarks}
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                            border: '1px solid rgba(var(--border-primary))',
                                            color: 'rgba(var(--font-primary-white))',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                                borderColor: 'rgb(216, 75, 154, 1)',
                                                color: 'rgb(216, 75, 154, 1)',
                                            },
                                        }}>
                                        Submit Remarks
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{
                                    px: 1,
                                    width: '100%'
                                }}>
                                    <Button
                                        onClick={HandleVerification}
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                            border: '1px solid rgba(var(--border-primary))',
                                            color: 'rgba(var(--font-primary-white))',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                                borderColor: 'rgb(216, 75, 154, 1)',
                                                color: 'rgb(216, 75, 154, 1)',
                                            },
                                        }}>
                                        Verify Now
                                    </Button>
                                </Box>
                            )
                        }


                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(MaintenanceModal)
