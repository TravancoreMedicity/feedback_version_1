import React, { memo } from 'react';
import {
    Industry,
    TaskList,
    HouseRooms,
    Component
} from 'iconoir-react'
import { Box, Typography } from '@mui/joy';


const PatientRemarks = ({ inpatientDetail }) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
                {
                    label: 'Bed Status', value: inpatientDetail?.fb_bed_service_status === 2 ? "RENOVAION" : inpatientDetail?.fb_bed_service_status === 1 ? "ONHOLD" : 'NOT READY',
                    icon: <HouseRooms fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                },
                {
                    label: 'Overall Condition',
                    value: inpatientDetail?.fb_overall_condition === '2' ? 'Good Condition' : inpatientDetail?.fb_overall_condition === '1' ? 'Poor Condition' : inpatientDetail?.fb_overall_condition === '2' ? 'Excellent Condition' : "Verification Pending",
                    icon:
                        <TaskList fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                },
                {
                    label: 'Bed Remarks',
                    value: inpatientDetail?.fb_bed_remark ? inpatientDetail?.fb_bed_remark : "Verification pending ",
                    icon: <Industry fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />,
                },
                {
                    label: 'Overall Remarks',
                    value: inpatientDetail?.fb_overall_remarks ? inpatientDetail?.fb_overall_remarks :
                        "Verification Pending",
                    icon:
                        <Component fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                },

            ]?.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ width: '40%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {item?.icon}
                            <Typography
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontWeight: 600,
                                    fontSize: 15,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    textWrap: 'wrap'
                                }}
                            >
                                {item?.label}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '60%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'space-between'
                    }}>
                        <Typography
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontWeight: 600,
                                fontSize: 15,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textWrap: 'wrap'
                            }}
                        >
                            {item?.value}
                        </Typography>
                        {item?.verify}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default memo(PatientRemarks);
