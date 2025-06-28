import { Box, Card, CardContent, Chip, Divider, Typography } from '@mui/joy'
import React, { lazy, memo, Suspense } from 'react'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState';


const StarRendering = lazy(() => import('../Modules/Dashboard/StarRendering'));

const DashboardDetailCards = ({ allfeedbackNames, name, CategoryCount, totalRating, item, feedbackDataArray }) => {

    // categorizing count
    const MatchCount = CategoryCount?.find(category => category?.fb_category_slno === item?.fb_category_slno);
    return (
        <Box sx={{ width: '100%' }}>
            <Card
                sx={{
                    flex: 1,
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    background: '#fefefe',
                    p: 2,
                    width: '100%',
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                }}
            >
                <CardContent>
                    <Typography
                        variant="overline"
                        sx={{
                            fontWeight: 500,
                            fontSize: 10.5,
                            letterSpacing: 1,
                            color: 'rgba(var(--font-primary-white))',
                        }}>{name}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 1,
                            px: 1,
                            fontSize: 13,
                            fontWeight: 500
                        }}>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'rgba(var(--font-primary-white))',
                                        mr: 1
                                    }}>{totalRating}</Typography>
                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                    <StarRendering totalRating={totalRating?.toFixed(1)} size={20} />
                                </Suspense>
                            </Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: 'rgba(var(--font-primary-white))',
                                    mr: 1
                                }}>
                                {MatchCount?.question_count}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{}} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5, px: 1 }}>
                        {
                            allfeedbackNames && allfeedbackNames?.map((feedbackItem, index) => {
                                const feedbackData = item.feedbacks?.find(fb => fb?.feedback_name === feedbackItem?.feedback_name);
                                const totalMark = feedbackData?.total_fd_mark !== undefined ? feedbackData?.total_fd_mark : 0;
                                const totalForm = feedbackData?.feedbacks?.length || 0;
                                // const FormRating = feedbackDataArray?.find(fbfrm => fbfrm?.name === feedbackItem?.feedback_name)
                                const rating = Math.min(5, totalMark / totalForm)
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            px: 1,
                                            mt: .5,
                                            bgcolor: 'rgba(var(--qustion-box))',
                                            borderRadius: 3
                                        }}
                                    >
                                        <Box sx={{ flex: 1, fontSize: 13, color: 'rgba(var(--font-primary-white))', textTransform: 'capitalize' }} >
                                            {feedbackItem?.feedback_name}
                                        </Box>
                                        <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Chip variant='soft' size='sm' sx={{ width: 100, bgcolor: 'rgba(var(--qustion-box))', color: 'rgba(var(--font-primary-white))', }}>
                                                {rating && !isNaN(rating) ? rating?.toFixed(1) : 0}
                                            </Chip>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default memo(DashboardDetailCards)