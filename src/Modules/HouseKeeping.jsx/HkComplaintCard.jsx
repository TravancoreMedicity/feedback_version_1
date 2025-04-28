import { Box, Button, Typography } from '@mui/joy'
import React, { memo } from 'react'

const HkComplaintCard = ({ items }) => {

    return (
        <>
            <Box sx={{
                display: 'flex',
                gap: 1,
                px: 1, mt: 1,
                borderRadius: 5,
                border: 0.03,
                borderColor: "rgba(var(--border-primary))",
            }}>
                <Box sx={{ width: '60%' }}>
                    {items?.map((val, index) => {
                        return (
                            <Box key={index} sx={{
                                minHeight: 20
                            }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                    }}>
                                    <Box sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <Box
                                            sx={{
                                                height: 30,
                                                display: 'flex',
                                                alignItems: 'center',
                                                px: 2,
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Typography sx={{
                                                fontFamily: 'var(--font-varient)',
                                                color: 'rgba(var(--font-primary-white))',
                                                fontWeight: 500,
                                                fontSize: { xs: 10, sm: 13 },
                                            }}>
                                                {`${index + 1}. ${val?.fb_hk_rm_cklist_name?.toUpperCase()}`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    }
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'end', width: '40%', }}>
                    <Box sx={{
                        px: 1,
                        width: '90%',
                        height: 35,
                        my: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                    }}>
                        <Button
                            // disabled={IsExist && filteredAssets?.length === 0}
                            // onClick={handlecomplaintRegistrarion}
                            variant="outlined"
                            sx={{
                                fontSize: { xs: 7, sm: 11 },
                                fontWeight: 900,
                                height: 35,
                                border: '1px solid rgb(216, 75, 154, 1)',
                                color: 'rgb(216, 75, 154, 1)',
                                bgcolor: '#fff0f3',
                                borderRadius: { xs: 7, sm: 2 },
                                '&:hover': {
                                    boxShadow: 'none',
                                    color: 'rgb(216, 75, 154, 1)',
                                }
                            }}>
                            Register Complaints
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default memo(HkComplaintCard)