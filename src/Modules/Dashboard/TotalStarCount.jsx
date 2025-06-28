
import { Box, Typography } from '@mui/joy';
import React, { lazy, memo, Suspense } from 'react'
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';


const LinearProgressBar = lazy(() => import('../../Components/LinearProgressBar'));
const TextComponentBox = lazy(() => import('../../Components/TextComponentBox'));
const StarRendering = lazy(() => import('./StarRendering'));

const TotalStarCount = ({ getstarcount, HospitalRating, totalFeedback }) => {

    // Total number of Star Questions
    const totalCount = getstarcount?.reduce((sum, item) => sum + item?.rating_count, 0);
    return (
        <Box sx={{
            width: { xs: '100%', lg: '38%' },
            height: 300,
            backgroundColor: "rgba(var(--bg-card))",
            boxShadow: 12,
            border: 0.03,
            borderColor: "rgba(var(--border-primary))",
            position: 'relative'
        }}
            className=' py-3 rounded-md flex justify-center flex-col items-center'>
            <Box className="h-[25%] w-[95%] bg-[rgba(var(--qustion-box))] rounded-lg flex items-center justify-center flex-col">
                <Typography sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))'
                }}>Total of {totalFeedback} Patient Review</Typography>
                <Suspense fallback={<CustomBackDropWithOutState message={"loading"} />}>
                    <StarRendering totalRating={HospitalRating?.toFixed(1)} size={20} />
                </Suspense>
                <Typography sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))'
                }}>{HospitalRating?.toFixed(1)} / 5</Typography>
            </Box>

            <Box className="w-full h-[75%] p-3">
                {
                    getstarcount?.map((item, inx) => {
                        const percentage = getstarcount && totalCount > 0
                            ? (item?.rating_count / totalCount) * 100
                            : 0;
                        return (
                            <Box key={inx} className='flex w-[100%] justify-between py-2 '>
                                <Suspense fallback={<CustomBackDropWithOutState message={"loading"} />}>
                                    <TextComponentBox name={`${item?.fd_mark} Star`} size={14} weight={400} />
                                </Suspense>
                                <Suspense fallback={<CustomBackDropWithOutState message={"loading"} />}>
                                    <LinearProgressBar value={percentage} />
                                </Suspense>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default memo(TotalStarCount);