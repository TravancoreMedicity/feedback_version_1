import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Popover from '@mui/material/Popover';

export default function DatePickerIconComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [anchorEl, setAnchorEl] = useState(null);

    const handleIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <IconButton onClick={handleIconClick} aria-label="Open calendar">
                <CalendarTodayIcon
                    sx={{ fontSize: 16, mt: 2 }}
                />
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <DateCalendar
                    value={selectedDate}
                    onChange={(newDate) => {
                        setSelectedDate(newDate);
                        handleClose(); // Close after selecting a date
                    }}
                />
            </Popover>
        </LocalizationProvider>
    );
}
