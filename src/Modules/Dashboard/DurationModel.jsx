import React, { useRef } from 'react';
import { memo } from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Box, Typography } from '@mui/joy';
import { BrightStar } from 'iconoir-react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Chip from '@mui/material/Chip';
import { timeFilters } from '../../Constant/Data';

const DurationModel = ({ setOpen, open, setCurrentFeed, currentfeed, setFetchDate, size }) => {

    const buttonRef = useRef(null); // Reference to the custom button

    return (
        <>
            {/* Custom Button to Open Dropdown */}
            <Box
                ref={buttonRef}
                onClick={() => setOpen((prev) => !prev)}
                sx={{
                    minWidth: { xs: '100%', sm: "30%" },
                    height: { xs: 20, sm: 35 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    borderRadius: 15,
                    px: { xs: 0, sm: 2 }
                }}>
                <BrightStar fontSize={size ? 13 : 7} style={{ color: 'rgba(var(--icon-primary))' }} />
                <Typography sx={{
                    ml: 1,
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    fontSize: { xs: 5, sm: 10 }
                }}>{currentfeed}</Typography>
            </Box>

            <Menu
                open={open}
                anchorEl={buttonRef.current}
                onClose={() => setOpen(false)}
                placement="bottom"
                sx={{
                    width: 300,
                    boxShadow: 'lg',
                    borderRadius: 'lg',
                    bgcolor: 'rgba(var(--bg-card))',
                    borderColor: 'rgba(var(--border-primary))',
                    mt: 1,
                }}
            >
                <MenuItem
                    sx={{
                        mt: 1,
                        py: 1,
                        pb: 2,
                        px: 2,
                        '&.MuiMenuItem-root:hover': {
                            bgcolor: 'transparent',
                        }
                    }}>
                    <Box className=" gap-3">
                        {
                            timeFilters?.map((item, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        onClick={() => {
                                            setCurrentFeed(item?.label)
                                            setOpen(false)
                                            setFetchDate(item?.value)
                                        }}
                                        sx={{
                                            m: 1,
                                            fontFamily: 'var(--font-varient)',
                                            cursor: 'pointer',
                                            border: 0.01,
                                            borderColor: "rgba(var(--border-primary))",
                                            backgroundColor: "rgba(var(--bg-card))",
                                            color: 'rgba(var(--font-primary-white))',
                                            fontSize: 11
                                        }}
                                        icon={<AccessTimeIcon style={{ color: 'rgba(var(--icon-primary))', fontSize: 15 }} />}
                                        label={item?.label}
                                    />
                                )
                            })
                        }
                    </Box>
                </MenuItem>
            </Menu>
        </>
    );
};

export default memo(DurationModel);
