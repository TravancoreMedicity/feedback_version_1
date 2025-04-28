import { Box, Button, Typography } from '@mui/joy';
import React, { memo, useCallback } from 'react'
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';

const BedOverallCondition = ({ setTotalDetail, ovarallconditon, overallremarks }) => {


    const handleButtonClick = useCallback((buttonName) => {
        setTotalDetail((prev) => ({
            ...prev,
            ovarallconditon: prev?.ovarallconditon === buttonName ? null : buttonName
        }));
    }, [setTotalDetail]);

    const getIconColor = useCallback((buttonName) => {
        return ovarallconditon === buttonName ? 'rgb(216, 75, 154, 1)' : 'rgba(var(--font-primary-white))';
    }, [ovarallconditon]);

    return (
        <Box sx={{
            p: 1,
            backgroundColor: "rgba(var(--bg-card))",
            borderRadius: 5,
        }}>
            <Box sx={{
                border: 0,
                borderBottom: 1.5,
                borderColor: "rgba(var(--tab-border-color))",
                borderBottomColor: 'divider',
                borderWidth: 2,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                pb: 0.4
            }}>
                <VerifiedUserTwoToneIcon sx={{
                    color: 'rgba(var(--icon-primary))',
                    fontSize: { xs: 20, sm: 26 },
                    fontWeight: 700
                }} />
                <Typography
                    level='body-sm'
                    fontWeight={'md'}
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: { xs: 14, sm: 18 },
                        fontWeight: 700
                    }}>
                    OVERALL CONDITIONS
                </Typography>
            </Box>
            <Box
                sx={{
                    px: 1,
                    width: "100%",
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2
                }}
            >
                <Button
                    variant="outlined"
                    sx={{
                        width: '32%',
                        border: '1px solid rgba(var(--border-primary))',
                        color: getIconColor("1"),
                        bgcolor: ovarallconditon === '1' ? '#fae0e4' : '',
                        fontSize: { xs: 10, sm: 14 }
                    }}
                    onClick={() => handleButtonClick("1")}>POOR</Button>
                <Button
                    variant="outlined"
                    sx={{
                        width: '32%',
                        border: '1px solid rgba(var(--border-primary))',
                        color: getIconColor("2"),
                        bgcolor: ovarallconditon === '2' ? '#fae0e4' : '',
                        fontSize: { xs: 10, sm: 14 }
                    }}
                    onClick={() => handleButtonClick("2")}>GOOD</Button>
                <Button
                    variant="outlined"
                    sx={{
                        width: '32%',
                        border: '1px solid rgba(var(--border-primary))',
                        color: getIconColor("3"),
                        bgcolor: ovarallconditon === '3' ? '#fae0e4' : '',
                        fontSize: { xs: 10, sm: 14 }
                    }}
                    onClick={() => handleButtonClick("3")}>EXCELLENT</Button>
            </Box>

            {
                ovarallconditon !== null &&
                <Box sx={{
                    px: 1,
                    mt: 1
                }}>
                    <textarea
                        onChange={(e) =>
                            setTotalDetail((prev) => ({
                                ...prev,
                                overallremarks: e.target.value
                            }))
                        }
                        value={overallremarks}
                        placeholder={`Overall Remarks`}
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
        </Box>
    )
}

export default memo(BedOverallCondition)