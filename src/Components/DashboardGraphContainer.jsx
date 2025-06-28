import { Box } from '@mui/joy'
import React, { memo } from 'react'
import BarchartComponent from './BarchartComponent'

const DashboardGraphContainer = () => {
    return (
        <Box sx={{ width: '70%', height: 300, p: 1,backgroundColor: "rgba(var(--bg-card))",display:'flex',justifyContent:'center'  }}>
            <Box className="h-[25%] rounded-lg flex  items-center justify-center flex-col " sx={{
                bgcolor: 'rgba(var(--qustion-box))',
                width: '98%',
                height:'98%'
            }}>
                <BarchartComponent/>
            </Box>
        </Box>
    )
}

export default memo(DashboardGraphContainer)