import React from 'react';
import { Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const RadiologyCheckBox = ({ value, questionid, hanldeuseranswers }) => {


  const resultObject = value != null && value !== undefined
    ? Object.fromEntries(value.split(', ').map(item => item.split(': ')))
    : {};

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
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
              gap: 1,
              // mt: 2,
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
                  sx={{
                    border: '1px solid #CC488F',
                    borderRadius: '12px',
                    p: 1,
                    fontSize: { xs: 16, sm: 22, md: 22, lg: 24 },
                    fontWeight: { xs: 400 },
                    color: " rgba(65, 68, 68, 0.64)",
                    fontFamily: "Bahnschrift",
                    width: "100%",
                    height: { xs: 45, sm: '' }
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

export default RadiologyCheckBox;
