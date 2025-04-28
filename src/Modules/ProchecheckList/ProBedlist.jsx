import React, { memo, useCallback, useState } from 'react'
import { Box, Typography } from '@mui/joy'
import ProBedlistModal from './ProBedlistModal'
import InitialCheckComplited from '../../Components/InitialCheckComplited';


const ProBedlist = ({ data, matchdata, fetchProcheckdetail }) => {

    const [open, setOpen] = useState(false);

    const handleChecklistClick = useCallback(() => {
        setOpen(true)
    }, [])


    return (
        <Box sx={{ bgcolor: 'red', width: "100%" }}>
            {open && (
                <ProBedlistModal
                    open={open}
                    setOpen={setOpen}
                    data={data}
                    fetchProcheckdetail={fetchProcheckdetail}
                />
            )}

            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'rgba(var(--bg-card))',
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    my: 2,
                    position: 'relative'
                }}>
                <div style={{
                    height: { xs: 100, sm: 120 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    backgroundColor: 'rgba(var(--bg-common))',
                    borderWidth: 1.5,
                    borderRadius: 5,
                    paddingRight: '10px',
                    borderColor: 'rgba(var(--border-primary))',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: "column",
                            fontSize: { xs: 12, sm: 14 },
                            lineHeight: 1,
                            border: 0.03,
                            borderColor: "rgba(var(--border-primary))",
                            bgcolor: "rgb(239, 131, 15)",
                            px: 1.5,
                            py: 0.4,
                            fontFamily: 'var(--font-varient)',
                            color: 'White',
                            fontWeight: 900,
                            height: { xs: 100, sm: 120 },
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            mr: 1
                        }}>
                            {data?.fb_bdc_no && data?.fb_bdc_no.split('')
                                ?.filter(char => !['/', '(', ')', '\\']?.includes(char))
                                ?.map((char, index) => (
                                    <Box key={index} sx={{ p: 0, m: 0, lineHeight: 1 }}>
                                        {char}
                                    </Box>
                                ))}
                        </Box>
                        <Box sx={{
                            width: { xs: 80, sm: 150 },
                            borderRadius: 5
                        }}>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 9, sm: 14 },
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
                                    fontSize: { xs: 9, sm: 14 },
                                    fontWeight: 900,
                                    textAlign: 'center',
                                }} >
                                {data?.fb_rtc_desc}
                            </Typography>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 9, sm: 14 },
                                    fontWeight: 600,
                                    textAlign: 'center',
                                }} >
                                {data?.fb_ns_name}
                            </Typography>
                        </Box>
                    </Box>
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
                                matchdata?.fb_final_check === 1 ? " COMPLETED" : "DISCHARGED"
                            }

                        </Typography>
                        {
                            matchdata?.fb_initial_check === 1 && matchdata?.fb_final_check !== 1 &&
                            <InitialCheckComplited color={matchdata?.fb_initial_check === 1 ? "rgb(239, 131, 15)" : "#ef3c2d"} />
                        }

                    </Box>
                    <Box
                        onClick={handleChecklistClick}
                        sx={{
                            width: { xs: 90, sm: 130 },
                            height: { xs: 30, sm: 40 },
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(var(--bg-common))',
                            fontFamily: 'var(--font-varient)',
                            borderWidth: 1.8,
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: { xs: 10, sm: 14 },
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
            </Box >


        </Box>
    )
}

export default memo(ProBedlist)
