import { Box, Skeleton } from '@mui/joy';
import React from 'react';

const TextComponentSkeleton = () => {
    return (
        <Box
            sx={{
                width:'100%',
                mt: 2,
                mb: 2,
            }}
        >    
            <Skeleton
                variant="text"
                sx={{
                    width: { xs: "70%", sm: "60%", md: "50%" }, 
                    height: { xs: 20, sm: 25, md: 25, lg: 30 }, 
                    mb: 1,
                    borderRadius: 2, 
                }}
            />

           
            <Skeleton
                variant="text"
                sx={{
                    width: { xs: "50%", sm: "45%", md: "40%" }, 
                    height: { xs: 15, sm: 20, md: 20, lg: 25 },
                    borderRadius: 2,
                }}
            />
            
        </Box>
    );
};

export default TextComponentSkeleton;
