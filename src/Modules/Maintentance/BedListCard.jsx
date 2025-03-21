import React, { memo, useState } from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/joy';
import CustomCheckBoxWithLabel from '../../Components/CustomCheckBoxWithLabel';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import NewReleasesTwoToneIcon from '@mui/icons-material/NewReleasesTwoTone';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';


const BedListCard = ({ setSelectedItems, selectedItems, status, totallength, trueitemlength, dep, current }) => {
    // State to track the selected checkboxes
    // Handle checkbox change
    const handleCheckboxChange = (label) => {
        setSelectedItems((prevState) => ({
            ...prevState,
            [label]: !prevState[label]
        }));
    };




    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, mt: 1 }}>
            {Object.keys(selectedItems).map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        py: 1,
                        borderRadius: 5,
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                    }}>
                    <Box sx={{ width: '40%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                {item}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: '40%', display: 'flex', justifyContent: 'start', gap: 3 }}>
                        {
                            selectedItems[item] ? <Chip startDecorator={<VerifiedTwoToneIcon />} variant="soft" color="success" sx={{
                                fontFamily: 'var(--font-varient)',
                                fontWeight: 600,
                                fontSize: 12,
                            }} > {status === 1 && (totallength === trueitemlength) ? "ASSET VERIFIED" : `${item} GOOD CONDITION`} </Chip> : <Chip startDecorator={<NewReleasesTwoToneIcon sx={{
                                animation: 'blink 1.5s infinite', // Apply the blink animation
                                '@keyframes blink': {
                                    '0%': {
                                        opacity: 1,
                                    },
                                    '50%': {
                                        opacity: 0.6,
                                    },
                                    '100%': {
                                        opacity: 1,
                                    },
                                },
                            }} />} variant="soft" color="danger" sx={{
                                fontFamily: 'var(--font-varient)',
                                fontWeight: 600,
                                fontSize: 12,

                            }} >VERIFICATION PENDING!</Chip>
                        }

                    </Box>

                    <Box sx={{ width: '20%', display: 'flex', justifyContent: 'end', gap: 3 }}>
                        {
                            status === 1 && (totallength === trueitemlength) && (dep !== current) ? <Tooltip title="Asset Verified">
                                <CheckBoxOutlinedIcon sx={{
                                    width: 30,
                                    height: 30,
                                    mr: 1,
                                    color: 'green',
                                    cursor: 'pointer'
                                }} />
                            </Tooltip> : <CustomCheckBoxWithLabel
                                disabled={status === 1 && (totallength === trueitemlength) && (dep !== current)}
                                checkBoxValue={selectedItems[item]}
                                handleCheckBoxValue={() => handleCheckboxChange(item)}
                            />
                        }

                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default memo(BedListCard);
