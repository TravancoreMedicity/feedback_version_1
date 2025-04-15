import React, { memo, useCallback, useState } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Box, Typography } from '@mui/joy';
import { infoNofity } from '../Constant/Constant';

const GoodBadSelector = ({ handleChangeChecked, value, completed, isexist }) => {


  const [selected, setSelected] = useState(value === 2 ? 'Good' : value === 1 ? 'Damaged' : null);

  const handleSelect = useCallback((option) => {
    if (isexist) return infoNofity("Item Initally Damaged")
    if (completed) return infoNofity("Initial Checklist Completed")
    const newValue = selected === option ? null : option;
    setSelected(newValue);
    if (handleChangeChecked) {
      const numericValue = newValue === 'Good' ? 2 : newValue === 'Damaged' ? 1 : 0;
      handleChangeChecked(numericValue); // Pass value 2 (Good), 1 (Bad), or 0 (none)
    }
  }, [isexist, handleChangeChecked, completed, selected]);

  return (
    <List
      orientation="horizontal"
      variant="outlined"
      aria-label="Good or Bad"
      sx={{
        display: 'flex',
        '--List-radius': '5px',
        height: 40,
        justifyContent: 'space-between',
        alignContent: 'center',
        py: 0.6,
        width: '100%'
      }}
    >
      {['Good', 'Damaged']?.map((option) => (
        <ListItem key={option} sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Checkbox
            checked={selected === option}
            onChange={() => handleSelect(option)}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2, pb: 1 }}>
                {option === 'Good' ? <CheckCircleOutlineOutlinedIcon sx={{ width: 15, height: 15 }}
                  color={selected === 'Good' ? 'success' : 'rgba(var(--icon-primary))'} /> : <CancelOutlinedIcon sx={{ width: 15, height: 15 }} color={selected === 'Damaged' ? 'error' : 'rgba(var(--icon-primary))'} />}
                <Typography sx={{
                  fontFamily: 'var(--font-varient)',
                  color: selected === option ? "#495057" : 'rgba(var(--font-primary-white))',
                  fontSize: 10,
                  fontWeight: 600,
                }} level="body-sm" >{option}</Typography>
              </Box>
            }
            disableIcon
            overlay
            variant={selected === option ? 'outlined' : 'plain'}
            color={'neutral'}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  bgcolor: checked ? 'background.level1' : 'transparent',
                  boxShadow: checked ? 'sm' : 'none',
                  height: 30,
                },
              }),
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default memo(GoodBadSelector);
