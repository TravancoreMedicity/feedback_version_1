import React, { memo } from 'react';
import { Box, Typography, Button } from '@mui/joy';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const ErrorFallback = ({ message = "Something went wrong", error, onRetry }) => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(var(--bg-card), 0.7)',
                borderRadius: 4,
                p: 2,
            }}
        >
            <ReportProblemIcon sx={{ color: '#e36414', fontSize: 40, mb: 1 }} />
            <Typography level="title-md" sx={{ color: 'rgba(var(--font-primary-white))', mb: 1, fontSize: { xs: 10, sm: 12 } }}>
                {message}
            </Typography>
            {error?.message && (
                <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))', mb: 2, fontSize: { xs: 10, sm: 12 } }}>
                    {error.message}
                </Typography>
            )}
            {onRetry && (
                <Button onClick={onRetry} variant="outlined" color="warning">
                    Retry
                </Button>
            )}
        </Box>
    );
};

export default memo(ErrorFallback);
