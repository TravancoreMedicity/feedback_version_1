import React, { memo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Paper } from '@mui/material';

const Scanner = () => {
  const redirectToUrl = 'http://192.168.10.88:9741/feedback/Mw==';
  return (
    <Paper elevation={3} sx={{ width: 180, height: 180, objectFit: 'contain', borderRadius: 1, bgcolor: 'white', p: 1 }}>
      <QRCodeSVG value={redirectToUrl} style={{ width: '100%', height: '100%', borderRadius: 3 }} />
    </Paper>
  );
};

export default memo(Scanner);
