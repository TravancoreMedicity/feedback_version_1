import React from 'react'
import FeedBackHeader from './FeedBackHeader'
import { Box, Grid, Typography } from '@mui/joy'
import TextsmsIcon from '@mui/icons-material/Textsms';
import { useNavigate } from 'react-router-dom';

const ChooseFeedbacks = () => {
    const navigate = useNavigate()
    const feedBacks = [
        { name: "Common Feedback", Path: "/commonfeed", id: 1 },
        { name: "OP Feedback", Path: "/opFeedback", id: 2 },
        { name: "IP Feedback", Path: "/ipFeedback", id: 3 },
        { name: "Laboratory Feedback", Path: "/labFeedback", id: 4 },
        { name: "Pharmacy Feedback", Path: "/PharmacyFeedback", id: 5 },
        { name: "Radiology Feedback", Path: "/radiologyfeed", id: 6 }
    ]
    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flex: 1,
            bgcolor: 'white',
        }}>
            <Grid container mx={{ xs: 1, sm: 3 }} my={{ xs: 4, sm: 6, md: 4, lg: 5 }} sx={{ display: 'flex', flex: 1 }}>
                {
                    feedBacks?.map((items) => {
                        return (
                            <Grid
                                key={items.id}
                                xs={12}
                                sm={6}
                                md={6}
                                lg={4}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Box
                                    onClick={() => navigate(items.Path)}
                                    sx={{
                                        bgcolor: "white",
                                        width: { xs: 400, sm: 300, md: 400 },
                                        height: { xs: 60, sm: 100 },
                                        borderRadius: 5,
                                        filter: `drop-shadow(5px 5px 10px rgba(186, 184, 184, 0.3))`,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        px: 2,
                                        mb: 1,
                                        mx:1,
                                        cursor: 'pointer',
                                        "&:hover": {
                                            filter: `drop-shadow(0px 0px 15px rgba(158, 184, 240, 0.7))`,
                                            transform: 'scale(1.00)',
                                        },
                                        // bgcolor:'green'
                                    }}>
                                    <Typography sx={{ fontSize: { xs: 16, sm: 18, md: 20, lg: 22 }, fontWeight: 600 }}><TextsmsIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20, lg: 22 } }} />{items.name}</Typography>

                                </Box>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default ChooseFeedbacks