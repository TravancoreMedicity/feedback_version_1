import React, { memo } from 'react';
import { Box, Tooltip, Typography } from '@mui/joy';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { OUTLINK_FEEDBACK } from '../../../Constant/Static';
import { infoNofity, warningNofity } from '../../../Constant/Constant';

const FeedbackActionItem = ({
    index,
    item,
    patientdata,
    isAlreadypresent
}) => {


    const { fdmast_slno, feedback_name } = item ?? {};
    const { fb_ip_no, fb_pt_no, fb_ptc_mobile, fb_ptc_name } = patientdata ?? {}

    const openFeedbackForm = (feedbackId, name, PatientId, patMobile, ipnumber) => {
        try {
            if (!feedbackId) {
                warningNofity("Feedback ID is missing!");
                return;
            }

            const encodedId = btoa(feedbackId || "");
            const encodedName = btoa(name || "");
            const encodePatientId = btoa(PatientId || "");
            const encodeMobile = btoa(patMobile || "");
            const encodeIpNum = btoa(ipnumber || "");

            const externalUrl = `${OUTLINK_FEEDBACK}/${encodedId}?name=${encodedName}&pid=${encodePatientId}&mbno=${encodeMobile}&ipnum=${encodeIpNum}`;

            window.open(externalUrl, "_blank");
        } catch (error) {
            console.error("Error opening feedback form:", error);
            warningNofity("Unable to open feedback form");
        }
    };


    const handlebuttonClick = (id, name, pid, mob, ipnum) => {
        if (isAlreadypresent) return infoNofity("Already Submitted");
        openFeedbackForm(id, name, pid, mob, ipnum)
    };




    return (
        <Box
            key={index}
            sx={{
                width: { xs: 70, sm: 80 },
                height: { xs: 80, sm: 80 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: 'rgba(174, 168, 168, 0.45)',
                },
            }}
        >
            <Tooltip
                title={isAlreadypresent ? 'Completed' : ''}
            >
                <Box
                    onClick={() => handlebuttonClick(fdmast_slno, fb_ptc_name, fb_pt_no, fb_ptc_mobile, fb_ip_no)}
                    sx={{
                        width: '60%',
                        height: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(var(--bg-card))',
                        border: '2px solid rgba(var(--border-primary))',
                        borderRadius: 15,
                    }}
                >
                    <FeedbackOutlinedIcon
                        sx={{
                            fontSize: 20,
                            color: isAlreadypresent ? '#8FD14F' : 'rgba(var(--font-primary-white))',
                        }}
                    />
                </Box>
            </Tooltip>

            <Typography
                fontSize={{ xs: 8, sm: 10 }}
                fontWeight={900}
                sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    textAlign: 'center',
                }}
            >
                {feedback_name}
            </Typography>
        </Box>
    );
};

export default memo(FeedbackActionItem);
