import React from 'react';
import { Box, Tooltip, Typography } from '@mui/joy';
import LocalHotelTwoToneIcon from '@mui/icons-material/LocalHotelTwoTone';
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import BedTwoToneIcon from '@mui/icons-material/BedTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { format } from 'date-fns';

const MaintenanceCard = ({
    roomnumber,
    nsstation,
    roomtype,
    occupancy,
    requestdate,
    reason
}) => {
    // Render a single patient card
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, mt: 1 }}>
            {[
                {
                    label: 'Bed Number', value: roomnumber || 'N/A', icon: <LocalHotelTwoToneIcon sx={{
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: 22,
                    }} />
                },
                {
                    label: 'Ns Station', value: nsstation, icon: <MapsHomeWorkTwoToneIcon sx={{
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: 22,
                    }} />
                },
                {
                    label: 'Room Type', value: roomtype || 'Not Available', icon: <BedTwoToneIcon sx={{
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: 22,
                    }} />
                },
                {
                    label: 'Bed Satus', value: reason ? `${reason.toUpperCase()} REQUEST` : "BLOCKED", icon: <SettingsTwoToneIcon sx={{
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: 22,
                    }} />
                },
                {
                    label: 'Requested Date', value: requestdate
                        ? format(new Date(requestdate), "dd-MM-yyyy hh:mm a")
                        : 'N/A', icon: <CalendarMonthTwoToneIcon sx={{
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: 22,
                        }} />
                },
            ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ width: '30%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {item.icon}
                            <Typography
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontWeight: 600,
                                    fontSize: 15,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    textWrap: 'wrap',
                                    ml: 1
                                }}>
                                {item.label}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '5%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>
                        <Typography
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontWeight: 600,
                                fontSize: 15,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textWrap: 'wrap'
                            }}>:</Typography>
                    </Box>
                    <Box sx={{
                        width: '65%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>
                        <Typography
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontWeight: 600,
                                fontSize: 15,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textWrap: 'wrap'
                            }}>{item.value}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default MaintenanceCard;
