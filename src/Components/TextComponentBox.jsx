import { Typography } from '@mui/joy'
import React, { memo } from 'react'

const TextComponentBox = ({ name, size, weight, color }) => {
    return (
        <Typography
            sx={{
                fontFamily: 'var(--font-varient)',
                color: color ? color : 'rgba(var(--font-primary-white))',
                fontWeight: weight ? weight : { xs: 800, sm: 600 },
                fontSize: size ? size : 16,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textWrap: 'wrap'
            }}>
            {name}
        </Typography>
    )
}

export default memo(TextComponentBox)