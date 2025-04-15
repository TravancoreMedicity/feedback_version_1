import React, { useRef } from 'react';
import { memo } from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Box, Typography } from '@mui/joy';
import { BrightStar } from 'iconoir-react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Chip from '@mui/material/Chip';
import { timeFilters } from '../../Constant/Data';

const DurationModel = ({ setOpen, open, setCurrentFeed, currentfeed, setFetchDate }) => {

    const buttonRef = useRef(null); // Reference to the custom button

    return (
        <>
            {/* Custom Button to Open Dropdown */}
            <Box
                ref={buttonRef} // Attach the reference
                onClick={() => setOpen((prev) => !prev)}
                sx={{
                    minWidth: 100,
                    height: 40,
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
                    px: 2
                }}>
                <BrightStar style={{ color: 'rgba(var(--icon-primary))', fontSize: 13 }} />
                <Typography sx={{
                    ml: 1,
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    fontSize: 12
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
