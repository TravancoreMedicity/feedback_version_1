import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, Suspense } from 'react'
import Grid from '@mui/material/Grid2'
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';

const StarRendering = lazy(() => import('./StarRendering'));

const FeedbackRatings = ({ allfeedbackNames, feedbackDataArray }) => {
    return (
        <Box sx={{
            width: { xs: '100%', lg: '68%' }, height: '100%', boxShadow: 12, border: 0.03,
            borderColor: "rgba(var(--border-primary))", mt: { xs: 2, sm: 2, md: 0 }
        }}
            className=' py-3 rounded-md flex'>
            <Grid spacing={0.5} container sx={{ flexGrow: 0, px: 1, width: "100%" }}>
                {
                    allfeedbackNames && allfeedbackNames?.map((feedbackItem, index) => {
                        const FormRating = feedbackDataArray?.find(fbfrm => fbfrm?.name === feedbackItem?.feedback_name);
                        const FeedBackRating = FormRating && FormRating.totalform > 0
                            ? Math.min(5, FormRating.totalmark / FormRating.totalform)
                            : 0;
                        return (
                            <Grid
                                key={index}
                                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <Box
                                    className="w-[95%] h-[100px] shadow-md border border-[rgba(var(--border-primary))] bg-[rgba(var(--bg-card))] py-3 rounded-md flex justify-center flex-col items-center">
                                    <Typography sx={{
                                        fontSize: { md: 12, xl: 14 },
                                        fontWeight: 800,
                                        fontFamily: 'var(--font-varient)',
                                        color: 'rgba(var(--font-primary-white))',
                                        textTransform: 'capitalize'
                                    }}>{FormRating?.name} Feedback</Typography>
                                    <Box className='flex gap-1 items-center'>
                                        <Typography sx={{
                                            fontSize: 15,
                                            fontWeight: 800,
                                            fontFamily: 'var(--font-varient)',
                                            color: 'rgba(var(--font-primary-white))'
                                        }}>{FeedBackRating.toFixed(1)}</Typography>
                                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                            <StarRendering totalRating={FeedBackRating.toFixed(1)} size={20} />
                                        </Suspense>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default memo(FeedbackRatings);