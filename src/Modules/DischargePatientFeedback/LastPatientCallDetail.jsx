import { Box, Chip } from '@mui/joy'
import React, { memo } from 'react';
import { Phone, CalendarRotateSolid, LongArrowDownRight } from 'iconoir-react';
import TextComponentBox from '../../Components/TextComponentBox';

const LastPatientCallDetail = ({ PtDetail }) => {


    // Render according to value 
    const getExperienceChip = (value) => (
        <Chip
            sx={{ height: 20 }}
            color={value === 1 ? "danger" : value === 2 ? "warning" : "success"}
            variant="outlined"
            size="sm">
            {
                value === 1 ? "Poor Experience" :
                    value === 2 ? "Good Experience" :
                        "Excellent Experience"
            }
        </Chip>
    );

    return (
        <Box sx={{
            width: '86%',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 5,
            bgcolor: 'rgba(var(--qustion-box))',
            p: 1,
            mt: 1
        }}>
            <Box sx={{
                width: '100%',
                minHeight: 120,
                display: 'flex',
                px: 2,
                flexDirection: 'column',
                gap: 2
            }}>
                {
                    PtDetail && Object.entries(PtDetail)?.map(([date, detail]) => (
                        <Box key={date} sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <CalendarRotateSolid
                                        fontSize={12}
                                        style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
                                    <TextComponentBox name={date} size={16} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Phone
                                        fontSize={12}
                                        style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
                                    <TextComponentBox name={`By: ${detail.em_name ?? "Unknown"} `} size={14} />
                                </Box>
                            </Box>

                            <Box sx={{
                                p: 1, border: 0.03,
                                borderColor: "rgba(var(--border-primary))",
                                borderRadius: 5
                            }}>
                                {
                                    Object.entries(detail)?.map(([quest, answers], index) =>
                                        Array.isArray(answers) && (
                                            <Box key={index} sx={{
                                                width: '100%',
                                                minHeight: 60,
                                                bgcolor: 'rgba(168, 224, 248, 0.24)',
                                                mb: 1,
                                                p: 1,
                                                borderRadius: 5
                                            }}>
                                                <TextComponentBox name={`${index} . ${quest}`} size={15} />
                                                {
                                                    answers?.map((item, i) => {
                                                        const parsedAnswers = item?.fb_ans_detail ? JSON.parse(item?.fb_ans_detail) : [];
                                                        return (
                                                            <Box key={i}
                                                                sx={{
                                                                    display: 'flex',
                                                                    gap: 2,
                                                                    width: '100%',
                                                                    minHeight: 30,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                <Box sx={{ width: '90%', minHeight: 20, display: 'flex', gap: 1 }}>
                                                                    <LongArrowDownRight
                                                                        fontSize={12}
                                                                        style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
                                                                    <TextComponentBox name={`${item?.fb_quest_sub} :`} size={15} />
                                                                    {getExperienceChip(item?.fb_imp_ans)}
                                                                    <TextComponentBox
                                                                        color='#fa4c58'
                                                                        name={` ${parsedAnswers?.length === 0 ? "" : ` [ ${parsedAnswers} ]`}`}
                                                                        size={12} />
                                                                </Box>
                                                            </Box>
                                                        );
                                                    })
                                                }
                                            </Box>
                                        )
                                    )
                                }
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default memo(LastPatientCallDetail);



