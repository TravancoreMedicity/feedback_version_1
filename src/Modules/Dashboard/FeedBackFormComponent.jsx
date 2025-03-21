import { Box, Typography } from '@mui/joy';
import React, { memo, useCallback, useState } from 'react';
import { Popover } from '@mui/material';
import FeedbackCategoryProgress from './FeedbackCategoryProgress';
import StarRendering from './StarRendering';


const FeedBackFormComponent = ({ name, totalMark, len, progress, totalForm, formMark }) => {

    const rating = Math.min(5, totalMark / len);
    const FeedBackRating = Math.min(5, formMark / totalForm);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMouseEnter = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setAnchorEl(null);
    }, []);


    return (
        <>
            <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    width: '100%',
                    height: 120,
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    display: 'flex',
                    alignItems: 'start',
                    borderRadius: 5,
                    flexDirection: "column",
                    p: 2,
                    my: 1,
                    cursor: 'pointer',
                    position: 'relative'
                }}>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Typography level='body-sm' fontWeight={'md'}
                        sx={{
                            fontFamily: 'var(--font-varient)',
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: 14,
                            fontWeight: 600,
                        }} >
                        {name} Feedback
                    </Typography>
                </Box>
                {/* Total Rating from the Overall Feedbacks */}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: "column",
                        mt: 1,
                    }}>
                    <Typography sx={{
                        fontSize: 19,
                        fontWeight: 600,
                        mr: 1,
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))'
                    }}>{rating && !isNaN(rating) ? rating.toFixed(1) : 0}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: "start" }}>
                        <StarRendering totalRating={rating && !isNaN(rating) ? rating.toFixed(1) : 0} />
                    </Box>
                    <Typography sx={{
                        ml: 0.3,
                        fontSize: 12,
                        fontWeight: 400,
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))'
                    }}>({totalMark}/{len})</Typography>
                </Box>
            </Box>

            {/* Popover (Hover Modal) */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleMouseLeave}
                sx={{
                    pointerEvents: 'none', // Prevents clicking issues
                    mt: 1,
                    ml: 2, // Positioning the modal to the side
                }}
                disableEnforceFocus={true}
            >
                <Box sx={{
                    p: 2,
                    width: 650,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    height: 330

                }}>
                    <Typography sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))'
                    }} fontWeight={600} fontSize={16}>{name}'s Feedback Details</Typography>
                    <Typography sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        mb: 1
                    }} fontSize={14}>More detailed feedback summary here...</Typography>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', height: '87%' }}>

                        <Box sx={{
                            width: '20%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "column",
                            justifyContent: "center",

                        }}>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: "column",
                            }}>
                                <Typography sx={{
                                    fontSize: 53,
                                    fontWeight: 600,
                                    mr: 1,
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))'
                                }}>{FeedBackRating && !isNaN(FeedBackRating) ? FeedBackRating.toFixed(1) : 0}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: "start" }}>
                                    <StarRendering totalRating={FeedBackRating.toFixed(1)} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: '80%', px: 1, height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {
                                progress?.map((item, index) => {
                                    return (
                                        <Box key={index} sx={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mb: 0.3,
                                        }}>
                                            <Box sx={{ width: '45%' }}>
                                                <Typography sx={{
                                                    fontFamily: 'var(--font-varient)',
                                                    color: 'rgba(var(--font-primary-white))'
                                                }} fontSize={12}>{item.fb_category_name}</Typography>
                                            </Box>
                                            <Box sx={{ width: '60%' }}>
                                                <FeedbackCategoryProgress count={item.totalFeed} mark={item.totalMark} />
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>


                    </Box>

                </Box>
            </Popover>
        </>
    );
}

export default memo(FeedBackFormComponent);




