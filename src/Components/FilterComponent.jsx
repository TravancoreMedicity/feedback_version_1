import React, { useState, memo, useEffect } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemContent
} from '@mui/joy';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '@mui/material/Popover';

const FilterComponent = ({ setSelectedFilter }) => {
    const options = [
        { name: 'All Select', id: 0 },
        { name: 'Renovation', id: 2 },
        { name: 'OnHold', id: 1 }
    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState(options[0]); // default to All Select

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        setSelectedFilter(option.id); // send selected ID
        handleClose();
    };

    useEffect(() => {
        handleSelect(options[0]); // default to All Select on mount
    }, []);

    const open = Boolean(anchorEl);

    return (
        <>
            <Box
                sx={{
                    width: { xs: 120, sm: 140 },
                    backgroundColor: 'rgba(var(--bg-common))',
                    borderWidth: 1.5,
                    borderRadius: { xs: 5, sm: 5 },
                    borderColor: 'rgba(var(--border-primary))',
                    height: { xs: 20, sm: 25 },
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 1.5,
                    cursor: 'pointer'
                }}
                onClick={handleClick}
            >
                <Typography
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: { xs: 10, sm: 14 },
                        fontWeight: 600,
                        textTransform: 'capitalize'
                    }}
                >
                    {selectedOption.name}
                </Typography>
                <ArrowDropDownIcon />
            </Box>

            <Popover
                sx={{ mt: 1 }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                disableRestoreFocus 
            >
                <List
                    sx={{
                        width: 200,
                        pt: 1,
                        backgroundColor: 'rgba(var(--bg-common))',
                        borderWidth: 1.5,
                        borderColor: 'rgba(var(--border-primary))'
                    }}
                >
                    {options.map((option) => (
                        <ListItem key={option.id}>
                            <ListItemButton
                                selected={selectedOption.id === option.id}
                                onClick={() => handleSelect(option)}
                            >
                                <ListItemContent>
                                    <Typography
                                        sx={{
                                            fontFamily: 'var(--font-varient)',
                                            color: 'rgba(var(--font-primary-white))',
                                            fontSize: { xs: 10, sm: 14 },
                                            fontWeight: 600,
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {option.name}
                                    </Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </>
    );
};

export default memo(FilterComponent);
