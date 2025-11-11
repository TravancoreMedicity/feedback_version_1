import React, { memo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Paper } from '@mui/material';
import { PREM_FEEDBACK_URL } from '../../Constant/Static';


const PopupQrScanner = ({ feedbackid, empId }) => {

    const employeeId = btoa(empId);
    const feedbackId = btoa(feedbackid);
    const redirectToUrl = `${PREM_FEEDBACK_URL}/${feedbackId}/${employeeId}`;
    return (
        <Paper elevation={3} sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 1, bgcolor: 'white', p: 1 }}>
            <QRCodeSVG value={redirectToUrl} style={{ width: '100%', height: '100%', borderRadius: 3 }} />
        </Paper>
    )
}

export default memo(PopupQrScanner);

