import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'

const PatientInfoHeader = ({ PatientName, inpatientNumber, patientNo, getCurrentCompany }) => {
    return (
        <Box sx={{
            width: '86%',
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            borderRadius: 5,
            bgcolor: getCurrentCompany?.[0]?.company_slno === 1 ?
                'rgba(var(--qustion-box))' : 'rgba(var(---kmc-qustion-box))',
        }}>
            <Typography sx={{
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
            }} fontWeight={600} fontSize={{ xs: 8, sm: 12, md: 12, lg: 14, xl: 15 }}>PT NAME :{PatientName}</Typography>
            {
                inpatientNumber && <Typography sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                }} fontWeight={600} fontSize={{ xs: 8, sm: 12, md: 12, lg: 14, xl: 15 }}>IP NO :{inpatientNumber}</Typography>
            }

            <Typography sx={{
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
            }} fontWeight={600} fontSize={{ xs: 8, sm: 12, md: 12, lg: 14, xl: 15 }}>MRD NO :{patientNo}</Typography>
        </Box>
    )
}

export default memo(PatientInfoHeader);