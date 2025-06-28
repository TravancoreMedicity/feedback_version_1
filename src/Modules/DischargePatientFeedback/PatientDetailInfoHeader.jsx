import { Box, Tooltip, Typography } from '@mui/joy'
import React, { memo } from 'react'
import TextComponentBox from '../../Components/TextComponentBox'

const PatientDetailInfoHeader = ({ item, index, CopyToClipBoard, value }) => {
    return (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: value === 1 ? '100%' : 'auto', gap: 0.2, }}>
            <Box sx={{ width: '10%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip onClick={CopyToClipBoard ? () => CopyToClipBoard(item?.value) : () => { }} sx={{ cursor: 'pointer' }} title={item?.label}>
                        {item?.icon}
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{
                width: { xs: '100%', sm: '90%' },
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
                <TextComponentBox name={item?.value} size={14} />
            </Box>
        </Box>
    )
}

export default memo(PatientDetailInfoHeader);