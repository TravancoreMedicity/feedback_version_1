import { Box, Skeleton, Typography } from '@mui/joy';
import React from 'react';
import EmojiSkeleton from './ChooseEmogjiSkeleton';
import QuestionBoxSkeleton from './QuestionBoxSkeleton';
import LogoSkeleton from './FeedbackLogoSkeleton';
import TextComponentSkeleton from './TextComponentSkeleton';

import CheckboxSkeleton from './CheckboxSkeleton';

const RadiologyFeedbackSkeleton = () => {
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
            {[...Array(3)].map((_, index) => (
                <React.Fragment key={index}>
                    <QuestionBoxSkeleton />
                    <EmojiSkeleton />
                </React.Fragment>
            ))}
             <QuestionBoxSkeleton />
            <CheckboxSkeleton />
            {[...Array(2)].map((_, index) => (
                <React.Fragment key={index}>
                    <QuestionBoxSkeleton />
                    <EmojiSkeleton />
                </React.Fragment>
            ))}
            <CheckboxSkeleton />
            <Box sx={{
                width: { xs: "90%", sm: '85%' },
                minHeight: 150,
                mt: 3,
                mb: 2,
            }}>
                <TextComponentSkeleton />
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: '100%',
                        height: 75,
                        mt: 3,
                        borderRadius: 11,
                        display: 'flex',
                        justifyContent: 'center',
                    }} />
            </Box>

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
                <Skeleton width={150} />
            </Typography>
        </Box>
    );
};

export default RadiologyFeedbackSkeleton;
