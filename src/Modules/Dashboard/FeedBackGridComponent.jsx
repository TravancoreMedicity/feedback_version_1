import React, { memo } from 'react';
import { Box, Typography } from "@mui/joy";
import StarRating from './StarRendering';

const FeedBackGridComponent = ({ name, totalRating, count }) => {

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: 180,
                backgroundColor: "rgba(var(--bg-card))",
                border: 0.03,
                borderColor: "rgba(var(--border-primary))",
                display: 'flex',
                alignItems: 'start',
                borderRadius: 8,
                flexDirection: "column",
                p: 2
            }}>
            <Box sx={{ width: '100%', textAlign: 'center' }}
                className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer hover:bg-slate-200 mb-2 "
            >
                <Typography level='body-sm' fontWeight={'md'}
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: { sm: 8, md: 10, lg: 10, xl: 12 },
                        fontWeight: 600,
                    }} >
                    {name}
                </Typography>
            </Box>
            {/* Total Rating from the Overall Feedbacks */}
            <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: "column",
                mt: 1
            }}>
                <Typography sx={{
                    fontSize: 27,
                    fontWeight: 600,
                    mr: 1,
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))'
                }}>{totalRating}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: "start" }}>
                    <StarRating totalRating={totalRating} size={26} />
                </Box>
                <Typography sx={{
                    ml: 0.3,
                    fontSize: 12,
                    fontWeight: 400,
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))'
                }}>({count})</Typography>
            </Box>
        </Box>
    )
}

export default memo(FeedBackGridComponent)


