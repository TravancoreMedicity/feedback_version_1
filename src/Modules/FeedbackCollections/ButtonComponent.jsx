import { Box } from '@mui/joy';
import { ArrowLeftCircle, ArrowRightCircle, } from 'iconoir-react';
import { memo } from 'react';

const ButtonComponent = ({ nextPatient, prevPatient }) => {
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center',
            backgroundColor: "rgba(var(--bg-card))",
            gap: 2,
            height: 40,
            border: 0.03,
            borderColor: "rgba(var(--border-primary))",
            mt: 1
        }} >
            <Box
                onClick={prevPatient}
                sx={{
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    my: 0.5,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2
                }}>
                <ArrowLeftCircle style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
            </Box>
            <Box
                onClick={nextPatient}
                sx={{
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    my: 0.5,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2
                }}>
                <ArrowRightCircle style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
            </Box>
        </Box>
    )
}

export default memo(ButtonComponent)