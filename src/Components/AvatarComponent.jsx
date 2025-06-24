import React, { memo } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Male from '../assets/male.jpg';
import Female from '../assets/female.jpg';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AvatarComponent = ({ length }) => {
    return (
        <AvatarGroup total={length + 1} sx={{ cursor: 'pointer', pt: .5 }}>
            <Avatar alt="Remy Sharp" src={Male} sx={{
                width: 20, height: 20, background: 'linear-gradient(135deg,rgb(253, 187, 222),rgb(171, 223, 252),rgb(255, 242, 225))',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 1,
                borderRadius: '50%', p: .1
            }} />
            <Avatar alt="Travis Howard" src={Female} sx={{ width: 20, height: 20 }} />
            <Avatar alt="Travis Howard" sx={{ width: 20, height: 20, bgcolor: 'lightgrey' }} ><MoreVertIcon sx={{ width: 15, height: 15, color: 'grey' }} /></Avatar>
        </AvatarGroup>
    )
}

export default memo(AvatarComponent)


