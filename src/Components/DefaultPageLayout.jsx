import React, { useCallback, useState } from 'react'
import { memo } from 'react'
import { Box, Divider, Typography } from '@mui/joy'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { Popover } from '@mui/material';
import { HomeSimple, LogOut, ReportColumns } from 'iconoir-react'
import DragIndicatorTwoToneIcon from '@mui/icons-material/DragIndicatorTwoTone';
import { Indicator } from '../Constant/Data'

const DefaultPageLayout = ({ label, children, view, setView }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleindicator = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    })

    const handlepopoveClose = useCallback(() => {
        setAnchorEl(null)
    }, [setAnchorEl])

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Box className="m-1  overscroll-none" sx={{ backgroundColor: 'rgba(var(--bg-common))', borderColor: 'rgba(var(--border-primary))' }} >
                <Box className="flex flex-col m-0 rounded-xl p-1 pb-2 overflow-scroll w-full"
                    sx={{ backgroundColor: 'rgba(var(--bg-card))', border: 1, borderColor: 'rgba(var(--border-primary))' }} >
                    {/* <ToastContainer /> */}
                    <Box className="flex flex-row items-center" >
                        <ReportColumns fontSize='medium' className='text-iconprimary ml-2' />
                        <Typography level='title-md' textAlign='left'
                            sx={{ p: 0.5, flexGrow: 1, color: 'rgba(var(--font-primary-white))', fontFamily: 'var(--font-varient)' }} >{label}</Typography>
                        {view === 1 &&
                            <Box onClick={(event) => handleindicator(event)}>
                                <DragIndicatorTwoToneIcon className='text-iconprimary cursor-pointer ' sx={{ cursor: 'pointer' }} /></Box>
                        }
                        <Box onClick={() => navigate('/Home/Dashboard')} >
                            <HomeSimple className='text-iconprimary cursor-pointer mr-1' /></Box>
                        <Box onClick={view === 1 ? () => setView(0) : () => navigate(-1)} >
                            <LogOut className='text-iconprimary cursor-pointer mr-3' /></Box>
                    </Box>
                    <Divider sx={{ m: 0, mb: 0.5, backgroundColor: 'rgba(var(--border-primary))' }} />
                    {children}
                </Box>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handlepopoveClose}
                    disableRestoreFocus
                    sx={{
                        mt: 4,
                        mr: 5
                    }}
                    disableEnforceFocus={true}
                >
                    <Box sx={{
                        p: 2,
                        width: 550,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: "rgba(var(--bg-card))",
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        minHeight: 200

                    }}>
                        <Box
                            className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer " >
                            <Typography level='body-sm' fontWeight={600} fontSize={16} sx={{ fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))' }} >
                                BED DETAILS
                            </Typography>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    px: 1,
                                    mt: 2
                                }}
                            >
                                {Indicator.map((val, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            flex: '1 1 23%', // 4 items per row
                                            maxWidth: '25%', // Ensures wrapping happens naturally
                                            bgcolor: val.color,
                                            textAlign: 'center',
                                            padding: 1,
                                            cursor: 'pointer',
                                            borderBottom: '0.2rem solid var(--border-iconprimary)',
                                            height: 30,
                                            borderRadius: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {val.icon}
                                        <Typography
                                            fontWeight={600}
                                            fontSize={10}
                                            sx={{ fontFamily: 'var(--font-varient)', color: 'white' }}
                                        >
                                            {val.name}
                                        </Typography>

                                    </Box>
                                ))}
                            </Box>
                        </Box>


                    </Box>
                </Popover>

            </Box>
        </Box>
    )
}

export default memo(DefaultPageLayout) 