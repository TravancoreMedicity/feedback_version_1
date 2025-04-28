import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from '@mui/joy';
import { PageEdit } from 'iconoir-react'

const MultipleSelect = ({ data, onchange, value }) => {
    return (
        <Select
            placeholder="select employee."
            multiple
            value={value || []} // Ensure the component is controlled with the value prop
            onChange={(e, val) => onchange(e, val)} // Pass new value to onChange handler
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                    {selected.map((selectedOption) => {
                        // Ensure selectedOption is an object and you're rendering the label or another string property
                        return (
                            <Chip
                            sx={{
                                fontSize:{xs:10,sm:14}
                            }}
                                key={selectedOption.value} // Use a unique identifier (e.g., `value`) as the key
                                variant="soft"
                                color="primary">
                                {selectedOption.label || selectedOption.value || selectedOption} {/* Render the label or value */}
                            </Chip>
                        );
                    })}
                </Box>
            )}
            sx={{
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
                fontSize: { xs: 12, sm: 15 },
                transition: 'none',
                width: '100%',
                boxShadow: 'none',
                borderWidth: '2.8px',
                '&.MuiSelect-root': {
                    "--Select-focusedHighlight": 'none',
                    "--Select-focusedThickness": '1.1px',
                    "--Select-boxShadow": 'none',
                },
                borderRadius: '6px',
                backgroundColor: 'rgba(var(--input-bg-color))',
                borderColor: 'rgba(var(--input-border-color))',
                color: 'rgba(var(--input-font-color))',
                ':hover': {
                    transition: 'none',
                    backgroundColor: 'rgba(var(--input-hover-bg-color))',
                    borderColor: 'rgba(var(--input-hover-border-color))',
                    color: 'rgba(var(--input-hover-font-color))',
                    '.iconColor': {
                        color: 'rgba(var(--icon-green))',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'rgba(var(--icon-green))',
                    }
                },
                '& .MuiSvgIcon-root': {
                    color: 'rgba(var(--icon-primary))',
                },
            }}
            slotProps={{
                listbox: {
                    sx: {
                        width: '100%',
                    },
                },
            }}
            startDecorator={<PageEdit color='rgba(var(--font-primary-white))' />} // Adding the icon here
        >
            {data?.map((item, index) => (
                <Option key={index} value={item.em_id} sx={{ fontSize: { xs: 12, sm: 15 } }}>
                    {item.em_name}
                </Option>
            ))}
        </Select>
    );
};

export default MultipleSelect;
