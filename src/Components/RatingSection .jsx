import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomInputWithLabel from './CustomInputWithLabel';
import { Grid } from '@mui/joy';

const RatingSection = ({ onInputChange, icon, ratingCount, answers }) => {

  const gridColumns = ratingCount > 5 ? 6 : 12;
  return (
    <Box sx={{ width: ratingCount > 5 ? '100%' : '50%', mb: 2 }}>
      <Grid container spacing={1}>
        {Array.from({ length: ratingCount }).map((_, index) => (
          <Grid xs={gridColumns} key={index}>
            <Box sx={{ display: 'flex', mt: 2, alignItems: 'center' }}>
              <Typography
                level="body-sm"
                sx={{
                  fontWeight: 600,
                  fontFamily: "var(--font-varient)",
                  opacity: 0.8,
                  paddingLeft: "0.26rem",
                  lineHeight: "1.0rem",
                  fontSize: "1.01rem",
                  color: 'rgba(var(--font-primary-white))',
                  paddingY: "0.26rem",
                }}
                fontSize="0.7rem"
              >
                {index + 1}.
              </Typography>
              <Box sx={{ mx: 1 }}>
                {icon}
              </Box>
              <CustomInputWithLabel
                values={answers[`${index + 1}_star`] || ''}
                handleInputChange={(e) => onInputChange(`${index + 1}_star`, e.target.value)}
                placeholder="Type here"
                // placeholder={answers[`${index + 1}_star`] || ''}
                sx={{}}
                type="text"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RatingSection;
