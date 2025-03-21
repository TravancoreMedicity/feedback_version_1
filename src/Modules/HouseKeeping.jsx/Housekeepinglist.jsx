import { Box, Typography } from '@mui/joy'
import React, { memo, useState } from 'react'
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
// import CardAttachment from '../../Components/CardAttachment';


const Housekeepinglist = ({ data }) => {

    const [open, setOpen] = useState(false)


    return (
        <>
            {/* <BedListModal
                getallremarkrefetch={getallremarkrefetch}
                getallBlokedbedRefetch={getallBlokedbedRefetch}
                icon={icon}
                name={name}
                open={open}
                bedslno={data?.fb_bed_slno}
                bedcode={data?.fb_bd_code}
                bedno={data?.fb_bdc_no}
                nscode={data?.fb_ns_code}
                setOpen={setOpen}
                selectmaintentance={selectmaintentance}
                setSelectMaintenance={setSelectMaintenance}
                setinformationtech={setinformationtech}
                setInformationTech={setInformationTech}
                setbiomedical={setbiomedical}
                setBioMedical={setBioMedical}
            /> */}
            <Box
                sx={{
                    backgroundColor: 'rgba(var(--bg-card))',
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    my: 2,
                    position: 'relative'
                }}>
                <div style={{
                    height: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    backgroundColor: 'rgba(var(--bg-common))',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'rgba(var(--border-primary))',
                    paddingRight: '10px'
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
                            fontSize: 14,
                            lineHeight: 1,
                            border: 0.03,
                            borderColor: "rgba(var(--border-primary))",
                            bgcolor: 'rgba(213, 82, 154, 0.8)',
                            px: 1,
                            py: 0.4,
                            fontFamily: 'var(--font-varient)',
                            color: 'White',
                            fontWeight: 900,
                            height: 120,
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
                                    fontSize: 14,
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
                                    fontSize: 10,
                                    fontWeight: 900,
                                    textAlign: 'center',
                                }} >
                                {data?.fb_rtc_desc}
                            </Typography>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 14,
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

                    </Box>
                    {/* <CardAttachment /> */}
                    <Box
                        // onClick={() => HandleCheckList(data?.fb_bdc_no)}
                        sx={{
                            width: 130,
                            height: 40,
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'red',
                            backgroundColor: 'rgba(var(--bg-common))',
                            fontFamily: 'var(--font-varient)',
                            borderWidth: 1,
                            borderColor: 'rgba(var(--border-primary))',
                            cursor: 'pointer',
                            fontWeight: 600,
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