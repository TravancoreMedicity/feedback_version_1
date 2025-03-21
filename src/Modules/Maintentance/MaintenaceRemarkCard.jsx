import React, { memo } from 'react'
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import { Box, Tooltip, Typography } from '@mui/joy';

const MaintenaceRemarkCard = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'rgba(var(--bg-card))',
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
                my: 1
            }}>
            <div style={{
                minHeight: 50,
                backgroundColor: 'rgba(var(--bg-common))',
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(var(--border-primary))',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                paddingLeft: '10px',
                paddingRight: '10px',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                    minHeight: 50
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <PendingActionsTwoToneIcon sx={{
                            width: 20,
                            height: 20
                        }} />
                        <Typography
                            sx={{
                                fontFamily: "var(--font-varient)",
                                color: 'rgba(var(--font-primary-white))',
                                fontSize: "14px",
                                fontWeight: 600,
                                ml: 1
                            }}
                        >
                            Hold Room
                            {/* {item.feedback_name.toUpperCase()} */}
                        </Typography>
                    </Box>
                    <Tooltip sx={{ fontSize: 12 }} title={`preview `} placement="top">
                        <PendingActionsTwoToneIcon
                            sx={{
                                cursor: "pointer",
                                transition: "transform 0.3s ease",
                                transform: "translateX(0)",
                            }} />
                    </Tooltip>

                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',  // Ensure the height adjusts based on content
                        position: 'relative',
                        overflow: 'auto',  // Enable scrolling if content overflows
                        whiteSpace: 'normal',  // Ensure text wraps inside the box
                        wordWrap: 'break-word',  // Ensure long words wrap correctly
                        padding: '8px',  // Add some padding to avoid text being right against the box edges
                    }}
                >
                    <textarea
                        placeholder="Remarks"
                        style={{
                            backgroundColor: "rgba(var(--bg-card))",
                            width: '100%',
                            minHeight: '70px',
                            fontFamily: "var(--font-varient)",
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: "14px",
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: 'rgba(var(--border-primary))',
                            padding: '3px',
                            outline: 'none'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'rgba(var(--border-primary))';
                            e.target.style.outline = 'none';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(var(--border-primary))';
                        }}
                    />

                </Box>
            </div>
        </Box>
    )
}

export default memo(MaintenaceRemarkCard)