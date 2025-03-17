import { Box, Button, Typography } from '@mui/joy'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TextsmsIcon from '@mui/icons-material/Textsms';

const FeedBackHeader = ({ name }) => {
    return (
        <Box sx={{
            width: '100%',
            height: 45,
            borderBottom: '1px solid #dee2e6',
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center',
            px:2,
            py:2
        }}>
            <Typography sx={{fontWeight:600}}> <TextsmsIcon/> {name}</Typography>
            <Button variant="outlined"><CloseIcon sx={{color:'red'}}/></Button>
        </Box>
    )
}

export default FeedBackHeader