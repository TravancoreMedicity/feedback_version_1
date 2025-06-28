import { Box, Tooltip } from '@mui/joy'
import React, { memo } from 'react'
import TextComponentBox from '../../Components/TextComponentBox'

const BasicInformationCard = ({ icon, value, label, size }) => {
    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'space-between', flex: 1, gap: 0.2, }}>
            <Box
                sx={{ width: '5%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip sx={{ cursor: 'pointer' }} title={label}>
                        {icon}
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <TextComponentBox name={value} size={size ? size : 14} />
            </Box>
        </Box>
    )
}

export default memo(BasicInformationCard);