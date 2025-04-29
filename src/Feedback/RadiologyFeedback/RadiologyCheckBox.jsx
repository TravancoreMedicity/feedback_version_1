import React, { memo } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const RadiologyCheckBox = ({ value, questionid, hanldeuseranswers }) => {


  const resultObject = value != null && value !== undefined
    ? Object.fromEntries(value.split(', ').map(item => item?.split(': ')))
    : {};

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw'
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 1 },
          width: { xs: '90%', sm: '80%' },
          borderRadius: '10px',

        }}
      >
        <RadioGroup>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            {
              Object.entries(resultObject)?.map(([key, description], index) => (
                <FormControlLabel
                  onChange={() => hanldeuseranswers(questionid, description)}
                  key={index}
                  value={description}
                  control={<Radio sx={{ color: '#CC488F', '&.Mui-checked': { color: '#512A7D' } }} />}
                  label={description}
                  componentsProps={{
                    typography: {
                      sx: {
                        fontSize: { xs: 11, sm: 14, md: 16 }, // Smaller text size
                        fontWeight: 500,
                        fontFamily: 'Bahnschrift',
                        color: "rgba(65, 68, 68, 0.64)"
                      }
                    }
                  }}
                  sx={{
                    border: '1px solid #CC488F',
                    borderRadius: '12px',
                    p: 1,
                    width: "100%",
                    height: { xs: 45, sm: '' },
                  }}
                />
              )
              )}
          </Box>
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default memo(RadiologyCheckBox);
