import React, { memo } from 'react';
import { Box, Chip, Typography } from '@mui/joy';

const ChipList = ({ label, Icon, color = 'primary', list = [] }) => {
    if (!list || list?.length === 0) return null;

    return (
        <Box sx={{ gap: 1, display: 'flex', px: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography sx={{
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
                fontWeight: 500,
                fontSize: { xs: 10, sm: 13 },
            }}>
                {Icon && <Icon sx={{ fontSize: 12, mr: 1, color: 'rgba(var(--icon-primary))' }} />}
                {label}
            </Typography>

            {list?.map((name, idx) => (
                <Chip
                    key={idx}
                    color={color}
                    size="small"
                    variant="soft"
                    sx={{ fontSize: { xs: 8, sm: 10 }, px: 0.5 }}
                >
                    {name?.trim()}
                </Chip>
            ))}
        </Box>
    );
};

export default memo(ChipList);
