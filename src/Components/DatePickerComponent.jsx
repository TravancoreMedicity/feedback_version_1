import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import { DatePicker } from '@mui/x-date-pickers';

const DatePickerComponent = ({ label, setValue, value }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            width: { xs: '100%', sm: 'auto' }
        }}>
            <Typography sx={{
                fontSize: 16,
                fontWeight: 500,
                color: 'rgba(var(--font-primary-white))',
                fontFamily: 'Bahnschrift',
                whiteSpace: 'nowrap'
            }}>{label} :</Typography>
            <DatePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                slotProps={{
                    textField: {
                        size: 'small',
                        sx: {
                            width: { xs: '100%', sm: 160 },
                            '& .MuiInputBase-input': {
                                color: 'rgba(var(--font-primary-white))',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(var(--font-primary-white))',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(var(--font-primary-white))',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'rgba(var(--font-primary-white))', // Calendar icon
                            },
                        },
                    },
                }}
            />
        </Box>
    )
}

export default memo(DatePickerComponent)

