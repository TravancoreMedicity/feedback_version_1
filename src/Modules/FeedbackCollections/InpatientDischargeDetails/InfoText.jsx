import React, { memo } from 'react';
import { Typography, Tooltip } from '@mui/joy';

const InfoText = ({
    icon: Icon,
    iconTooltip,
    children,
    sx = {},
}) => {
    return (
        <Typography
            level="body-sm"
            sx={{
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
                fontSize: { xs: 11, sm: 12 },
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor:'pointer',
                ...sx,
            }}
        >
            {Icon && (
                <Tooltip
                    title={iconTooltip}
                    placement="top"
                    variant="soft"
                    arrow
                    size='sm'
                    sx={{cursor:'pointer'}}
                >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon size={14} />
                    </span>
                </Tooltip>
            )}
            {children}
        </Typography>
    );
};

export default memo(InfoText);
