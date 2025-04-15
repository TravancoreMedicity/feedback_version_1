import { Box } from '@mui/joy';
import React, { lazy, memo, Suspense } from 'react';
const Scanner = lazy(() => import('../Components/Scanner'))


const Qrscan = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Suspense fallback={"Loading..!"}>
        <Scanner />
      </Suspense>
    </Box>
  )
}

export default memo(Qrscan);