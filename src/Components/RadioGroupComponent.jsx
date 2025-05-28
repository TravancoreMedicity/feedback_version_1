import React, { memo, useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import { Box, Checkbox } from '@mui/joy';


const RadioGroupComponent = ({ subdivitem, onChange, selected = [] }) => {

  const [selectedItems, setSelectedItems] = useState(selected);

  // HANDLING MULTIPLE CHECKBOX
  const handleToggle = (itemName) => {
    const updated = selectedItems?.includes(itemName)
      ? selectedItems.filter((name) => name !== itemName)
      : [...selectedItems, itemName];

    setSelectedItems(updated);
    onChange?.(updated); // Notify parent
  };


  return (
    <Box
      sx={{
        borderRadius: 'sm',
        p: 1,
        width: '100%',
      }}
    >
      <Box
        sx={{
          gap: 2,
          width: '100%',
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {
          subdivitem && subdivitem?.length > 0 && subdivitem?.map((item, inx) => {
            return (
              <FormControl
                onClick={() => handleToggle(item?.name)}
                key={inx}
                size="sm"
                sx={{
                  px: 1,
                  bgcolor: `rgba(var(--qustion-box))`,
                  display: 'flex',
                  minWidth: '10%',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  height: 40
                }}>
                <Checkbox
                  color='success'
                  sx={{ color: 'rgba(var(--font-primary-white))' }}
                  checked={selectedItems?.includes(item?.name)}
                  label={item?.name}
                />
              </FormControl>
            )
          })
        }
      </Box>
    </Box>

  )
}

export default memo(RadioGroupComponent);
