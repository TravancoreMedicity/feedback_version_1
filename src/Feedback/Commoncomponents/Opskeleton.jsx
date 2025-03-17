import { Box, Skeleton, Typography } from '@mui/joy';
import React from 'react';
import EmojiSkeleton from './ChooseEmogjiSkeleton';
import QuestionBoxSkeleton from './QuestionBoxSkeleton';
import LogoSkeleton from './FeedbackLogoSkeleton';
import { RulesyesornoSkeleton } from './RulesyesornoSkeleton';

const CommonFinalFeedSkeleton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pb: 1,
            }}
        >
            <LogoSkeleton />
            {[...Array(4)].map((_, index) => (
                <React.Fragment key={index}>
                    <QuestionBoxSkeleton />
                    <EmojiSkeleton />
                </React.Fragment>
            ))}

            <QuestionBoxSkeleton />
            <RulesyesornoSkeleton />

            {[...Array(4)].map((_, index) => (
                <React.Fragment key={index}>
                    <QuestionBoxSkeleton />
                    <RulesyesornoSkeleton />
                </React.Fragment>
            ))}


            <Skeleton
                variant="rectangular"
                sx={{
                    width: 150,
                    height: 50,
                    mt: 4,
                    borderRadius: 10,
                }}
            />
            <Typography
                sx={{
                    textAlign: 'center',
                    mt: 5,
                    fontSize: { xs: 8, sm: 10, md: 14, lg: 16 },
                    color: " rgba(65, 68, 68, 0.64)",
                }}
            >
                <Skeleton width={250} />
            </Typography>
        </Box>
    );
};

export default CommonFinalFeedSkeleton;
