import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, Suspense, useState } from 'react'
import { useCallback } from 'react';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { axiosApi } from '../../Axios/Axios';
import { employeeID, errorNofity, succesNofity, warningNofity } from '../../Constant/Constant';
import InitialCheckComplited from '../../Components/InitialCheckComplited';
import { gethkBedDetial, gethkcheckbedDetail, gethkcomplaintdetail } from '../../Function/CommonFunction';



const HouseKeepingBedlistModal = lazy(() => import('./HouseKeepingBedlistModal'));

const Housekeepinglist = ({ data, refetch }) => {

    const [open, setOpen] = useState(false);
    const [checkeditems, setCheckedItems] = useState([]);
    const [complaints, setComplaints] = useState([])
    const [hkbeddetail, setHKBedDetail] = useState([])


    // function to Open modal and also fetching the current checklist detail if any 
    const HandleCheckList = useCallback(async (data) => {
        const { fb_hk_check_status, fb_hk_slno, fb_bed_slno } = data;
        try {
            if (fb_hk_check_status === null) return
            const result = await gethkcheckbedDetail(fb_hk_slno);
            const complaints = await gethkcomplaintdetail(fb_bed_slno)
            const beddetail = await gethkBedDetial(fb_bed_slno)
            setCheckedItems(result ? result : [])
            setComplaints(complaints ? complaints : [])
            setHKBedDetail(beddetail ? beddetail : [])
        } catch (error) {
            warningNofity("Error in fetching data")
        } finally {
            setOpen(true)
        }
    }, [setCheckedItems, setComplaints, setHKBedDetail]);

    // function to undo the assinged bed when double clicking on  the bed
    const HandleRemoveAssignedBed = useCallback(async (data) => {
        const HasWorkStarted = data?.fb_hk_check_status;
        if (HasWorkStarted !== null) return warningNofity("cannot Reassign the bed after Work started");

        const insertdata = {
            fb_hk_bed_slno: data?.fb_bed_slno,
            edit_user: Number(employeeID()),
            fb_hk_status: 0
        }
        try {
            const response = await axiosApi.post('/feedback/removeassign', insertdata)
            const { success } = response?.data;
            if (success === 1) return errorNofity("Error in Removing Bed Assign")
            succesNofity("Removed Assigned Bed")
            refetch()
        } catch (error) {
            warningNofity(error)
        }
    }, [refetch]);






    return (
        <>
            {
                open &&
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                    <HouseKeepingBedlistModal
                        open={open}
                        data={data}
                        setOpen={setOpen}
                        CheckedItems={checkeditems}
                        refetch={refetch}
                        Complaints={complaints}
                        BedDetails={hkbeddetail}
                    />
                </Suspense>
            }
            <Box
                sx={{
                    backgroundColor: 'rgba(var(--bg-card))',
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    my: 2,
                    position: 'relative',
                }}>
                <div style={{
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    backgroundColor: 'rgba(var(--bg-common))',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'rgba(var(--border-primary))',
                    paddingRight: '10px'
                }}>
                    <Box onDoubleClick={() => HandleRemoveAssignedBed(data)
                    } sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: "column",
                            fontSize: { xs: 9, sm: 10 },
                            lineHeight: 1,
                            border: 0.03,
                            borderColor: "rgba(var(--border-primary))",
                            bgcolor: 'rgba(252, 114, 190, 0.8)',
                            px: 1,
                            py: 0.4,
                            fontFamily: 'var(--font-varient)',
                            color: 'White',
                            fontWeight: 900,
                            height: 80,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            mr: 1
                        }}>
                            {data?.fb_bdc_no && data.fb_bdc_no.split('').map((char, index) => (
                                <Box key={index} sx={{ p: 0, m: 0, lineHeight: 1 }}>
                                    {char}
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{
                            width: 150,
                            borderRadius: 5
                        }}>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 9, sm: 12 },
                                    fontWeight: 900,
                                    textAlign: 'center',
                                    mt: 1
                                }} >
                                {data?.fb_bdc_no}
                            </Typography>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 9, sm: 12 },
                                    fontWeight: 900,
                                    textAlign: 'center',
                                }} >
                                {data?.fb_rtc_desc}
                            </Typography>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 9, sm: 12 },
                                    fontWeight: 600,
                                    textAlign: 'center',
                                }} >
                                {data?.fb_ns_name}
                            </Typography>
                        </Box>
                    </Box>
                    {/* <Box sx={{

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>{
                            data?.fb_hk_check_status === 1 ?
                                <HandymanTwoToneIcon sx={{
                                    width: 30, height: 30,
                                    animation: 'blink 2s infinite',
                                    '@keyframes blink': {
                                        '0%': {
                                            opacity: 1,
                                        },
                                        '50%': {
                                            opacity: 0,
                                        },
                                        '100%': {
                                            opacity: 1,
                                        },
                                    },
                                }} />
                                : <PauseCircleFilledTwoToneIcon sx={{
                                    width: 30, height: 30,
                                    animation: 'blink 2s infinite',
                                    '@keyframes blink': {
                                        '0%': {
                                            opacity: 1,
                                        },
                                        '50%': {
                                            opacity: 0,
                                        },
                                        '100%': {
                                            opacity: 1,
                                        },
                                    },
                                }} />
                        }

                    </Box> */}

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Typography sx={{
                            fontFamily: 'var(--font-varient)',
                            color: 'rgba(var(--font-primary-white))',
                            fontWeight: 700,
                            fontSize: { xs: 8, sm: 14 },
                        }}>
                            {
                                data?.fb_hk_check_status === 2 ? " CLEANED" : data?.fb_hk_check_status === 1 ? "CLEANING STARTED" : 'NOT STARTED'
                            }

                        </Typography>
                        {
                            data?.fb_hk_check_status === 1 &&
                            <InitialCheckComplited color={data?.fb_initial_check === 1 ? "rgb(239, 131, 15)" : "#ef3c2d"} />
                        }

                    </Box>
                    <Box
                        onClick={() => HandleCheckList(data)}
                        sx={{
                            width: { xs: 90, sm: 130 },
                            height: { xs: 30, sm: 40 },
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'red',
                            backgroundColor: 'rgba(var(--bg-common))',
                            fontFamily: 'var(--font-varient)',
                            borderWidth: 0.2,
                            borderColor: 'rgba(252, 114, 190, 0.8)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: { xs: 12, sm: 14 },
                            mt: data?.fb_hk_check_status === 1 ? 2 : 0,
                            ':hover': {
                                transition: 'none',
                                backgroundColor: 'rgba(var(--input-hover-bg-color))',
                                borderColor: 'rgba(var(--input-hover-border-color))',
                                color: 'rgba(var(--input-hover-font-color))',
                                '.iconColor': {
                                    color: 'rgba(var(--icon-green))',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'rgba(var(--icon-green))',
                                }
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'rgba(var(--icon-primary))',
                            },
                        }}>
                        Check List
                    </Box>
                </div>
            </Box>
        </>
    )
}

export default memo(Housekeepinglist)