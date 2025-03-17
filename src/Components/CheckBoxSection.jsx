import React, { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomInputWithLabel from './CustomInputWithLabel';
import { Grid, Tooltip } from '@mui/joy';
import { CheckCircle, ChatBubbleXmark, PlusCircle } from 'iconoir-react';

const CheckBoxSection = ({ onInputChange, answers, count, setCount }) => {
    const handleinputcount = useCallback(() => {
        setCount((prev) => prev + 1);
    }, [count])
    const handleinputcountDec = useCallback(() => {
        setCount((prev) => prev - 1);
    }, [count])
    const gridColumns = count > 5 ? 6 : 12;
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
        }}>
            <Box sx={{ width: '80%' }}>
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Grid container spacing={1}>
                        {Array.from({ length: count }).map((_, index) => (
                            <Grid xs={gridColumns} key={index}>
                                <Box sx={{ display: 'flex', mt: 2, alignItems: 'center' }}>
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: "var(--font-varient)",
                                            opacity: 0.8,
                                            paddingLeft: "0.26rem",
                                            lineHeight: "1.0rem",
                                            fontSize: "1.01rem",
                                            color: 'rgba(var(--font-primary-white))',
                                            paddingY: "0.26rem",
                                            marginRight: 1
                                        }}
                                        fontSize="0.7rem"
                                    >
                                        {index + 1}.
                                    </Typography>
                                    <Box sx={{
                                        width: '90%'
                                    }}>
                                        <CustomInputWithLabel
                                            values={answers[`${index + 1}_value`] || ''}
                                            handleInputChange={(e) => onInputChange(`${index + 1}_value`, e.target.value)}
                                            placeholder="Type here"
                                            // placeholder={answers[`${index + 1}_star`] || ''}
                                            type="text"
                                            sx={{ width: 500 }}
                                        />
                                    </Box>
                                    {
                                        count >= 3 && index + 1 >= 3 &&
                                        <Box sx={{ mx: 1 }}>
                                            <Tooltip title="Remove" arrow variant='outlined'
                                                sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                                                <ChatBubbleXmark onClick={handleinputcountDec} color="rgba(var(--icon-primary))" cursor="pointer" />
                                            </Tooltip>
                                        </Box>
                                    }
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'end', p: 2 }}>
                <Tooltip title="Add input" arrow variant='outlined'
                    sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                    <PlusCircle onClick={handleinputcount} color="rgba(var(--icon-primary))" cursor="pointer" fontSize={21} />
                </Tooltip>
            </Box>
        </Box>
    );
};

export default CheckBoxSection;
