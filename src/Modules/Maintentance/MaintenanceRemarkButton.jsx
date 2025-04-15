import { Box } from '@mui/joy';
import React, { memo, useCallback } from 'react';
import Button from '@mui/joy/Button';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import FiberNewTwoToneIcon from '@mui/icons-material/FiberNewTwoTone';

const MaintenanceRemarkButton = ({
    remarks,
    activeButton,
    setTotalDetail
}) => {

    const handleButtonClick = useCallback((buttonName) => {
        setTotalDetail((prev) => ({
            ...prev,
            activeButton: prev?.activeButton === buttonName ? null : buttonName,
            remarks: prev?.activeButton === buttonName ? prev?.remarks : "" // Reset remarks if switching
        }));
    }, [setTotalDetail]);
    
    // Function to get the icon color based on active button
    const getIconColor = useCallback((buttonName) => {
        return activeButton === buttonName ? 'rgb(216, 75, 154, 1)' : 'inherit';
    }, [activeButton]);

    return (
        <>
            <Box
                sx={{
                    px: 1,
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                    mb: 2
                }}
            >
                <Button
                    variant="outlined"
                    sx={{
                        width: '48%',
                        border: '1px solid rgba(var(--border-primary))',
                        color: 'rgba(var(--font-primary-white))',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            borderColor: 'rgba(var(--border-primary))',
                        },
                        '&:focus': {
                            outline: 'none', // Remove focus outline
                        }
                    }}
                    startDecorator={<PauseCircleFilledTwoToneIcon sx={{ color: getIconColor("OnHold") }} />}
                    onClick={() => handleButtonClick("OnHold")}
                >
                    On Hold
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        width: '48%',
                        border: '1px solid rgba(var(--border-primary))',
                        color: 'rgba(var(--font-primary-white))',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            borderColor: 'rgba(var(--border-primary))',
                        },
                        '&:focus': {
                            outline: 'none', // Remove focus outline
                        }
                    }}
                    startDecorator={<FiberNewTwoToneIcon sx={{ color: getIconColor("Renovation") }} />}
                    onClick={() => handleButtonClick("Renovation")}
                >
                    Renovation
                </Button>
            </Box>
            {
                activeButton !== null &&
                <Box sx={{
                    px: 1,
                    mt: 1
                }}>
                    <textarea
                        onChange={(e) =>
                            setTotalDetail((prev) => ({
                                ...prev,
                                remarks: e.target.value
                            }))
                        }
                        value={remarks}
                        placeholder={`${activeButton} Remarks`}
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
                            padding: '4px',
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
            }
        </>
    );
}

export default memo(MaintenanceRemarkButton);
