import React, { memo } from 'react'
import { Box, Tooltip, Typography } from "@mui/joy";
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';


const FeedbackItem = ({ index, item, feedbackedexit, currentIndex, inpatientDetail, handlebuttonClick }) => {
    const isFeedbackGiven = feedbackedexit?.some(fb =>
        fb.fdmast_slno === item.fdmast_slno && fb.fb_patient_name === inpatientDetail[currentIndex]?.fb_ptc_name
    );
    return (
        <Box
            key={index}
            sx={{
                width: '48%',
                height: '48%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: "wrap",
                flexDirection: 'column',
                '&:hover': { bgcolor: 'rgba(174, 168, 168, 0.45)' }
            }}>
            <Tooltip title={isFeedbackGiven ? `Completed` : ''}>
                <Box
                    onClick={!isFeedbackGiven ? () => handlebuttonClick(item.fdmast_slno, inpatientDetail[currentIndex]?.fb_ptc_name, inpatientDetail[currentIndex]?.fb_pt_no, inpatientDetail[currentIndex]?.fb_ptc_mobile, inpatientDetail[currentIndex]?.fb_ip_no) : () => { }}
                    sx={{
                        width: '60%',
                        height: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: "rgba(var(--bg-card))",
                        border: 2,
                        borderColor: "rgba(var(--border-primary))",
                        borderRadius: 15,
                    }}>
                    {isFeedbackGiven ?
                        <FeedbackOutlinedIcon sx={{ color: '#8FD14F', fontSize: 24 }} />
                        : <FeedbackOutlinedIcon sx={{ color: 'rgba(var(--font-primary-white))', fontSize: 24 }} />}
                </Box>
            </Tooltip>
            <Typography sx={{
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))',
            }} fontWeight={900} fontSize={12}>{item.feedback_name}</Typography>
        </Box>
    )
}

export default memo(FeedbackItem)