import React from 'react';
import { Box, Skeleton } from '@mui/material';

const CheckboxSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: "90%", sm: '85%' },
      }}
    >
      <Box
        sx={{
          p: 3,
          width: '100%',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 2,
          }}
        >
          {/* Skeleton for radio button labels */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={40}
              sx={{
                // border: '1px solid #CC488F',
                borderRadius: '5px',
                p: 1,
                fontSize: { xs: 16, sm: 22, md: 22, lg: 24 },
                bgcolor: '#f0f0f0',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckboxSkeleton;
