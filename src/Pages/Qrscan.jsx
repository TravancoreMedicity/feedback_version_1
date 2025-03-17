import { Box } from '@mui/joy';
import React from 'react';
import Scanner from '../Components/Scanner';


const Qrscan = () => {
  return (
   <Box
   sx={{
    display:'flex',
    flex:1,
    height:'100vh',
    alignItems:'center',
    justifyContent:'center'
   }}>
         <Scanner/>
   </Box>
  )
}

export default Qrscan