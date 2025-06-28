import { Box } from '@mui/joy';
import React, { memo } from 'react'
import { Phone, HeadsetWarningSolid } from 'iconoir-react';
import TextComponentBox from '../../Components/TextComponentBox';


const PatientNotRespondingRemarkCard = ({ PatientRemark }) => {

    // Group Remark Based on the Date
    const GroupPatientRemarkDetail = PatientRemark?.reduce((acc, item) => {
        const { create_date, em_name, ...rest } = item;
        return {
            ...acc,
            [create_date]: {
                ...(acc[create_date] || {}),// group based on create date
                em_name, // include the em_name
                ...rest
            }
        };
    }, {});


    return (
        <Box sx={{
            width: '86%',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 5,
            bgcolor: 'rgba(var(--qustion-box))',
            p: 1,
            mt: 1,

        }}>
            <Box sx={{
                width: '100%',
                minHeight: 80,
                display: 'flex',
                px: 2,
                flexDirection: 'column',
                gap: 2
            }}>
                {
                    GroupPatientRemarkDetail && Object.entries(GroupPatientRemarkDetail)?.map(([date, detail]) => (
                        <Box key={date} sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <HeadsetWarningSolid
                                        fontSize={12}
                                        style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
                                    <TextComponentBox name={date} size={15} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Phone
                                        fontSize={12}
                                        style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
                                    <TextComponentBox name={`By: ${detail.em_name ?? "Unknown"} `} size={10} weight={800} />
                                </Box>
                            </Box>

                            <Box sx={{
                                p: 1,
                                border: 0.01,
                                borderColor: "rgba(var(--border-primary))",
                                borderRadius: 5,
                                bgcolor: 'rgba(168, 224, 248, 0.24)',
                            }}>
                                <TextComponentBox name={detail?.fb_pt_nr_remark} size={14} />
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default memo(PatientNotRespondingRemarkCard);