import React, { memo } from 'react'
import NewReleasesTwoToneIcon from '@mui/icons-material/NewReleasesTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
const VerificationIconComponent = ({ status }) => {

    if (status === 0 || status === undefined) {
        return (
            <NewReleasesTwoToneIcon sx={{
                width: 20,
                height: 20,
                color:'red',
                animation: 'blink 2s infinite',
                '@keyframes blink': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                },
            }} />
        );
    } else {
        return (
            <VerifiedTwoToneIcon sx={{
                width: 20,
                height: 20,
                color:'green'
            }} />
        );
    }
}

export default memo(VerificationIconComponent)


