import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, Suspense, useState } from 'react'
import { useCallback } from 'react';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { axiosApi } from '../../Axios/Axios';
import { employeeID, errorNofity, succesNofity, warningNofity } from '../../Constant/Constant';
const HouseKeepingBedlistModal = lazy(() => import('./HouseKeepingBedlistModal'));

const Housekeepinglist = ({ data, assingedbed }) => {
   
    const [open, setOpen] = useState(false);
    const HandleCheckList = useCallback(() => {
        setOpen(true)
    }, []);


    const HandleRemoveAssignedBed = useCallback(async (bed) => {
        // const insertdata = {
        //     fb_hk_bed_slno: bed,
        //     edit_user: Number(employeeID()),
        //     fb_hk_status: 0
        // }
        // try {
        //     const response = await axiosApi.post('/feedback/removeassign', insertdata)
        //     const { success } = response?.data;
        //     if (success === 1) return errorNofity("Error in Removing Bed Assign")
        //     succesNofity("Removed Assigned Bed")
        // } catch (error) {
        //     warningNofity(error)
        // }
    }, [employeeID]);




    return (
        <>
            {
                open &&
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                    <HouseKeepingBedlistModal
                        open={open}
                        data={data}
                        setOpen={setOpen}
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
                    <Box onDoubleClick={() => HandleRemoveAssignedBed(data?.fb_bed_slno)
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
                            matchdata?.fb_bed_reason === 1 ?
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
                                }} /> : matchdata?.fb_bed_reason === 2 ? <PauseCircleFilledTwoToneIcon sx={{
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
                                }} /> : <CampaignTwoToneIcon sx={{
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
                    {/* <CardAttachment /> */}
                    <Box
                        onClick={() => HandleCheckList(data?.fb_bdc_no)}
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