
import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import MaintenanceModal from './MaintenanceModal';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import { employeeID, succesNofity, warningNofity } from '../../Constant/Constant';
import { axiosApi } from '../../Axios/Axios';
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone';

const CleaningRoom = ({
    item,
}) => {

    // const [open, setOpen] = useState(false)
    // const [data, setData] = useState({})
    // const [activeButton, setActiveButton] = useState(null);
    // const [remarks, setRemarks] = useState("")
    // const [beddetail, setBeddetail] = useState({
    //     fb_bed_slno: 0,
    //     fb_bd_code: 0,
    //     fb_ns_code: "",
    //     fb_bdc_no: ""
    // })

    // const { fb_bed_slno, fb_bd_code, fb_ns_code, fb_bdc_no } = beddetail;

    // const HandleBedRequest = useCallback(async () => {
    //     const insertData = {
    //         fb_bed_slno: fb_bed_slno,
    //         fb_bd_code: fb_bd_code,
    //         fb_bdc_no: fb_bdc_no,
    //         fb_ns_code: fb_ns_code,
    //         fb_bed_reason: activeButton,
    //         fb_bed_remarks: remarks,
    //         fb_bed_status: 1,
    //         create_user: employeeID()
    //     }
    //     try {
    //         const response = await axiosApi.post('/feedback/insertbedremarks', insertData);
    //         const { success } = response.data;
    //         if (success !== 2) return warningNofity("Error in Inserting Data")
    //         succesNofity("Successfully Inserted Data")
    //         setActiveButton(null)
    //         setRemarks("")
    //         setOpen(false)
    //     } catch (error) {
    //         warningNofity("Error in Inserting Data")
    //     }

    // }, [fb_bed_slno, fb_bd_code, fb_ns_code, fb_bdc_no, activeButton, remarks, setOpen])


    // const HanldeModalOpen = useCallback((item) => {
    //     setData(item)
    //     setOpen(true)
    //     setBeddetail({
    //         fb_bed_slno: item?.fb_bed_slno,
    //         fb_bd_code: item?.fb_bd_code,
    //         fb_ns_code: item?.fb_ns_code,
    //         fb_bdc_no: item?.fb_bdc_no
    //     })
    // }, [setOpen, setData])


    return (
        <>
            {/* <MaintenanceModal
                open={open}
                setOpen={setOpen}
                item={data}
                setRemarks={setRemarks}
                remarks={remarks}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setBeddetail={setBeddetail}
                HandleBedRequest={HandleBedRequest}
            /> */}
            <Box
                // onClick={() => HanldeModalOpen(item)}
                sx={{
                    width: 220,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,

                }}>
                <Box
                    sx={{
                        width: '100%',
                        height: 100,
                        backgroundColor: "rgba(var(--bg-card))",
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        display: 'flex',
                        borderRadius: 8,
                        p: 2,
                        bgcolor: item?.fb_bed_status === null ? "#ade8f4" : '#ffc2d1'

                    }}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        flexDirection: 'column'
                    }}>
                        {
                            item?.fb_bed_status === null ? <HourglassBottomTwoToneIcon
                                sx={{
                                    width: 25,
                                    height: 25, color: 'rgba(var(--icon-primary))'
                                }} /> :
                                <VerifiedUserTwoToneIcon
                                    sx={{
                                        width: 25,
                                        height: 25, color: 'rgba(var(--icon-primary))'
                                    }} />
                        }
                        <Typography level='body-sm' fontWeight={'md'}
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontSize: 12,
                                fontWeight: 900,
                                textAlign: 'center',
                                mt: 1
                            }} >
                            {item?.fb_bdc_no}
                        </Typography>
                        <Typography level='body-sm' fontWeight={'md'}
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontSize: 10,
                                fontWeight: 900,
                                textAlign: 'center',
                            }} >
                            {item?.fb_rtc_desc}
                        </Typography>
                        <Typography level='body-sm' fontWeight={'md'}
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontSize: 12,
                                fontWeight: 900,
                                textAlign: 'center',
                            }} >
                            {item?.fb_ns_code}
                        </Typography>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default memo(CleaningRoom)

