import React, { memo } from 'react';
import {
    Industry,
    Computer,
    Heart,
    TaskList,
    HouseRooms,
    HomeTemperatureIn
} from 'iconoir-react'
import { Box, Typography } from '@mui/joy';
import VerificationIconComponent from './VerificationIconComponent';


const PatientRemarks = ({ inpatientDetail }) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
                {
                    label: 'Bed Status', value: inpatientDetail?.fb_bed_reason === 1 ? "RENOVAION" : inpatientDetail?.fb_bed_reason === 2 ? "ONHOLD" : 'NOT READY',
                    icon: <HouseRooms fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                },
                {
                    label: 'Maintenance Remarks',
                    value: inpatientDetail?.fb_maintenace_remark ? inpatientDetail?.fb_maintenace_remark : "Verification pending ",
                    icon: <Industry fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />,
                    verify: inpatientDetail?.fb_maintenance_status ?
                        inpatientDetail?.fb_maintenance_status === 0 ?
                            <VerificationIconComponent status={inpatientDetail?.fb_maintenance_status} /> : <VerificationIconComponent status={inpatientDetail?.fb_maintenance_status} /> :
                        <VerificationIconComponent status={inpatientDetail?.fb_maintenance_status} />
                },
                {
                    label: 'InfoTech Remarks',
                    value: inpatientDetail?.fb_it_remark ? inpatientDetail?.fb_it_remark : "Verification pending",
                    icon: <Computer fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />, verify: inpatientDetail?.fb_it_status ?
                        inpatientDetail?.fb_it_status === 0 ?
                            <VerificationIconComponent status={inpatientDetail?.fb_it_status} /> : <VerificationIconComponent status={inpatientDetail?.fb_it_status} /> : <VerificationIconComponent status={inpatientDetail?.fb_it_remark} />
                },
                {
                    label: 'Biomedical Remarks',
                    value: inpatientDetail?.fb_biomedical_remarks ? inpatientDetail?.fb_biomedical_remarks : "Verification pending ",
                    icon: <Heart fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />, verify: inpatientDetail?.fb_biomedical_status ?
                        inpatientDetail?.fb_biomedical_status === 0 ?
                            <VerificationIconComponent status={inpatientDetail?.fb_biomedical_status} /> : <VerificationIconComponent status={inpatientDetail?.fb_biomedical_status} /> :
                        <VerificationIconComponent status={inpatientDetail?.fb_biomedical_status} />
                },
                {
                    label: 'Housekeeping Remarks',
                    value: "Verification Pending...!",
                    icon:
                        <HomeTemperatureIn fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />,
                    verify:
                        <VerificationIconComponent status={0} />
                },
                {
                    label: 'Overall Condition',
                    value: inpatientDetail?.fb_overall_condition ? inpatientDetail?.fb_overall_condition : "Pending...!",
                    icon:
                        <TaskList fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                },

            ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ width: '40%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {item.icon}
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
                                {item.label}
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
                            {item.value}
                        </Typography>
                        {item.verify}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default memo(PatientRemarks);
