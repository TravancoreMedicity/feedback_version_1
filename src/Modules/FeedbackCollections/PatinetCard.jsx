import React, { memo } from 'react';
import { Phone, Calendar, IpAddressTag, UserBadgeCheck, DatabaseScriptPlus, Male } from 'iconoir-react';
import { Box, Tooltip, Typography } from '@mui/joy';
import { format } from 'date-fns';

const PatinetCard = ({ inpatientDetail }) => {
    // Render a single patient card
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
                { label: 'Patient Name', value: inpatientDetail?.fb_ptc_name || 'N/A', icon: <UserBadgeCheck fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} /> },
                { label: 'Patient Ip', value: `${inpatientDetail?.fb_ip_no} / ${inpatientDetail?.fb_pt_no}`, icon: <IpAddressTag fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} /> },
                { label: 'Mobile No', value: inpatientDetail?.fb_ptc_mobile || 'Not Available', icon: <Phone fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} /> },
                { label: 'Gender/Age', value: `${inpatientDetail?.fb_ptc_sex === 'F' ? 'F' : 'M'} / ${inpatientDetail?.fb_ptn_yearage} year`, icon: <Male fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} /> },
                {
                    label: 'Admit Date', value: inpatientDetail?.fb_ipd_date
                        ? format(new Date(inpatientDetail.fb_ipd_date), "dd-MM-yyyy hh:mm a")
                        : 'N/A', icon: <Calendar fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                },
                {
                    label: 'Address',
                    value:
                        (inpatientDetail?.fb_ptc_loadd1 || '') +
                            (inpatientDetail?.fb_ptc_loadd2 || '') +
                            (inpatientDetail?.fb_ptc_loadd3 || '')
                            ? (inpatientDetail?.fb_ptc_loadd1 || '') +
                            (inpatientDetail?.fb_ptc_loadd2 || '') +
                            (inpatientDetail?.fb_ptc_loadd3 || '')
                            : 'Address is not found',
                    icon: <DatabaseScriptPlus fontSize={12} style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                },
            ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ width: '10%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip sx={{ cursor: 'pointer' }} title={item.label}>
                                {item.icon}
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
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
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default memo(PatinetCard);
