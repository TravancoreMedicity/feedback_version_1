import React, { lazy, memo, Suspense, useCallback, useState } from 'react';
import Box from '@mui/joy/Box';
import { Chip, Typography } from '@mui/joy';
import SentimentNeutralTwoToneIcon from '@mui/icons-material/SentimentNeutralTwoTone';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import MoodTwoToneIcon from '@mui/icons-material/MoodTwoTone';
import CustomBackDropWithOutState from './CustomBackDropWithOutState';


const RadioGroupComponent = lazy(() => import('./RadioGroupComponent'))

const CheckBoxGroup = ({ item, subdivitem, onSelection }) => {
    const [selections, setSelections] = useState({});

    const handleSelection = useCallback((key, rating) => {
        const updated = {
            ...selections,
            [key]: { ...(selections[key] || {}), rating }
        };
        setSelections(updated);
        onSelection?.(updated);
    }, [selections, onSelection]);


    //  SELECTING SUB ANSWERS FOR EACH CATERGORY
    const handleSubSelections = useCallback((key, newSubSelections) => {
        const updated = {
            ...selections,
            [key]: { ...(selections[key] || {}), details: newSubSelections }
        };
        setSelections(updated);
        onSelection?.(updated);
    }, [selections, onSelection]);



    return (
        <Box sx={{
            width: '100%',
            minHeight: 80,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            px: 3,
            my: 2
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: !subdivitem ? 'row' : 'column',
                gap: 2,
                mb: 1,
                justifyContent: 'space-between'
            }}>
                {
                    item && item?.length > 0 ?
                        item?.map((val, index) => {
                            return (
                                <Box key={index}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 50,
                                            display: 'flex',
                                            px: 2,
                                            borderRadius: 5,
                                            border: 0.06,
                                            borderColor: "rgba(var(--border-primary))",
                                            backgroundColor: selections[val]?.rating ? 'rgba(var(--background-selected))' : 'transparent'
                                        }}
                                    >
                                        <Box sx={{
                                            width: !subdivitem ? '100%' : '30%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Typography sx={{
                                                fontFamily: 'var(--font-varient)',
                                                color: 'rgba(var(--font-primary-white))',
                                                fontWeight: 600,
                                                fontSize: 14
                                            }}>
                                                {val}
                                            </Typography>
                                        </Box>

                                        {subdivitem && (
                                            <Box sx={{
                                                width: '70%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                {[
                                                    {
                                                        id: 1, name: "Poor", icon: <SentimentNeutralTwoToneIcon sx={{
                                                            color: '#c9184a'
                                                        }} />
                                                    },
                                                    {
                                                        id: 2, name: "Good", icon: <SentimentSatisfiedTwoToneIcon sx={{
                                                            color: '#c9184a'
                                                        }} />
                                                    },
                                                    {
                                                        id: 3, name: "Excellent", icon: <MoodTwoToneIcon sx={{
                                                            color: '#c9184a'
                                                        }} />
                                                    }
                                                ].map((item, i) => (
                                                    <Box
                                                        key={i}
                                                        sx={{
                                                            width: '30%',
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Chip
                                                            color={selections[val]?.rating === item.id ? 'success' : 'neutral'}
                                                            onClick={() => handleSelection(val, item.id)}
                                                            variant="soft"
                                                            startDecorator={item.icon}
                                                        >
                                                            {item.name}
                                                        </Chip>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                    {selections[val]?.rating === 1 && subdivitem[val] !== undefined && (
                                        <Box sx={{ mt: 1, ml: 2 }}>
                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                                <RadioGroupComponent
                                                    onChange={(newVals) => handleSubSelections(val, newVals)}
                                                    selected={selections[val]?.details || []}
                                                    subdivitem={subdivitem[val] || []}
                                                />
                                            </Suspense>
                                        </Box>
                                    )}
                                </Box>
                            )
                        }) : (
                            <Box sx={{
                                width: '100%',
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                border: 0.06,
                                borderColor: "rgba(var(--border-primary))",
                                borderRadius: 5
                            }}>
                                {[
                                    {
                                        id: 1, name: "Really Bad Response", icon: <SentimentNeutralTwoToneIcon sx={{
                                            color: '#c9184a'
                                        }} />
                                    },
                                    {
                                        id: 2, name: "Good Response", icon: <SentimentSatisfiedTwoToneIcon sx={{
                                            color: '#c9184a'
                                        }} />
                                    },
                                    {
                                        id: 3, name: "Excellent Response", icon: <MoodTwoToneIcon sx={{
                                            color: '#c9184a'
                                        }} />
                                    }
                                ].map((item, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            width: '30%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            py: 1
                                        }}
                                    >
                                        <Chip
                                            color={selections['Impression']?.rating === item.id ? 'success' : 'neutral'}
                                            onClick={() => handleSelection('Impression', item.id)}
                                            variant="soft"
                                            startDecorator={item.icon}
                                        >
                                            {item.name}
                                        </Chip>
                                    </Box>
                                ))}
                            </Box>
                        )}
            </Box>
        </Box>
    );
};

export default memo(CheckBoxGroup);
