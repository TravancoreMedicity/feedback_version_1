import React, { useCallback, useState } from 'react';
import { Box, Tooltip } from '@mui/joy';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const ChooseEmoji = ({ questionid, value, hanldeuseranswers }) => {

    const [selected, setSelected] = useState('')
    const resultObject = value != null && value !== undefined
        ? Object.fromEntries(value.split(', ').map(item => item.split(': ')))
        : {};
    const size = Object.keys(resultObject).length;

    const handleEmogjiSelection = useCallback((key, questionid, description) => {
        hanldeuseranswers(questionid, description)
        setSelected(key)
    }, []);


    return (
        <Box sx={{ gap: { xs: 3, sm: 5, md: 4, lg: 5 }, px: 3, display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
            {
                Object.entries(resultObject).map(([key, description], index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                cursor: 'pointer',
                                color: selected === key ? '#512A7D' : '#CC488F'
                            }}
                            onClick={() => handleEmogjiSelection(key, questionid, description)}
                        >
                            <Tooltip title={description}>
                                <Box sx={{
                                    filter: selected === key ? `drop-shadow(0px 0px 15px rgba(156, 215, 255, 0.7))` : '',
                                    bgcolor: selected === key ? 'white' : '',
                                    borderRadius: '50%',
                                    p: { xs: 0.5, sm: 1 },
                                }}>
                                    {size === 3 ? (
                                        <>
                                            {key === "1_star" && <SentimentDissatisfiedIcon sx={{ fontSize: { xs: 34, sm: 40, md: 55, lg: 55 } }} />}
                                            {key === "2_star" && <SentimentSatisfiedIcon sx={{ fontSize: { xs: 34, sm: 40, md: 55, lg: 55 } }} />}
                                            {key === "3_star" && <TagFacesIcon sx={{ fontSize: { xs: 34, sm: 40, md: 55, lg: 55 } }} />}
                                        </>
                                    ) : size === 5 ? (
                                        <>
                                            {key === "1_star" && <SentimentVeryDissatisfiedIcon sx={{ fontSize: { xs: 34, sm: 40, md: 55, lg: 55 } }} />}
                                            {key === "2_star" && <SentimentDissatisfiedIcon sx={{ fontSize: { xs: 34, sm: 40, md: 55, lg: 55 } }} />}
                                            {key === "3_star" && <SentimentSatisfiedIcon sx={{ fontSize: { xs: 34, sm: 40, md: 55, lg: 55 } }} />}
                                            {key === "4_star" && <SentimentSatisfiedAltIcon sx={{ fontSize: { xs: 34, sm: 40, md: 55, lg: 55 } }} />}
                                            {key === "5_star" && <TagFacesIcon sx={{ fontSize: { xs: 34, sm: 40, md: 55, lg: 55 } }} />}
                                        </>
                                    ) : null}
                                </Box>
                            </Tooltip>
                        </Box>
                    )
                })
            }
        </Box>
    );
};

export default ChooseEmoji;
