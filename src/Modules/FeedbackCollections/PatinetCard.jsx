import React, { memo } from 'react';
import { Phone, Calendar, IpAddressTag, UserBadgeCheck, DatabaseScriptPlus, Male, PharmacyCrossTag } from 'iconoir-react';
import { Box, Tooltip, Typography } from '@mui/joy';
import { format } from 'date-fns';
import { getAgeInYears } from '../../Constant/Constant';

const PatinetCard = ({ inpatientDetail, ispresent }) => {

    // Render a single patient card

    const isDataEmpty = !inpatientDetail || Object.keys(inpatientDetail).length === 0;

    if (ispresent === "T" && isDataEmpty) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '100%', sm: 530 },
                minHeight: 150,
                flexDirection: 'column'
            }}>
                <Typography
                    level="body-md"
                    sx={{ fontWeight: 600, color: 'rgba(var(--font-primary-white))', fontSize: { xs: 13, sm: 16 } }}>
                    The patient has checked out.
                </Typography>
                <Typography
                    level="body-md"
                    sx={{ fontWeight: 600, color: 'rgba(var(--font-primary-white))', fontSize: { xs: 12, sm: 16 } }}>
                    The other details will update soon.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, mb: { xs: 1, sm: 0 } }}>
            {[
                {
                    label: 'Patient Name',
                    value: inpatientDetail?.fb_ptc_name || 'Not Available',
                    icon: <UserBadgeCheck fontSize={14}
                        style={{
                            color: 'rgba(var(--font-primary-white))',
                            cursor: 'pointer'
                        }} />
                },
                {
                    label: 'Patient Ip',
                    value: `${inpatientDetail?.fb_ip_no ?? "IP N/A"} / ${inpatientDetail?.fb_pt_no ?? 'PT N/A'}`,
                    icon: <IpAddressTag fontSize={12}
                        style={{
                            color: 'rgba(var(--font-primary-white))',
                            cursor: 'pointer'
                        }}
                    />
                },
                {
                    label: 'Mobile No',
                    value: inpatientDetail?.fb_ptc_mobile || 'Not Available',
                    icon: <Phone fontSize={12}
                        style={{
                            color: 'rgba(var(--font-primary-white))',
                            cursor: 'pointer'
                        }} />
                },
                {
                    label: 'Gender/Age',
                    value: `${inpatientDetail?.fb_ptc_sex === 'F' ? 'F' : 'M'} /
                     ${getAgeInYears(inpatientDetail?.fb_ptd_dob) ?? 'Unknown'}
                      year`,
                    icon: <Male fontSize={12}
                        style={{
                            color: 'rgba(var(--font-primary-white))',
                            cursor: 'pointer'
                        }} />
                },
                {
                    label: 'Doctor Name',
                    value: inpatientDetail?.fb_doc_name || 'Not Available',
                    icon: <PharmacyCrossTag fontSize={12}
                        style={{
                            color: 'rgba(var(--font-primary-white))',
                            cursor: 'pointer'
                        }} />
                },
                {
                    label: 'Admit Date',
                    value: inpatientDetail?.fb_ipd_date
                        ? format(new Date(inpatientDetail.fb_ipd_date), "dd-MM-yyyy hh:mm a")
                        : 'Not Available',
                    icon: <Calendar fontSize={12}
                        style={{
                            color: 'rgba(var(--font-primary-white))',
                            cursor: 'pointer'
                        }} />
                },
                {
                    label: 'Address',
                    value: inpatientDetail?.fb_ptc_loadd1 || 'Address is not found',
                    // value:
                    //     (inpatientDetail?.fb_ptc_loadd1 || '') +
                    //         (inpatientDetail?.fb_ptc_loadd2 || '') +
                    //         (inpatientDetail?.fb_ptc_loadd3 || '')
                    //         ? (inpatientDetail?.fb_ptc_loadd1 || '') +
                    //         (inpatientDetail?.fb_ptc_loadd2 || '') +
                    //         (inpatientDetail?.fb_ptc_loadd3 || '')
                    //         : 'Address is not found',
                    icon: <DatabaseScriptPlus fontSize={12}
                        style={{
                            color: 'rgba(var(--font-primary-white))',
                            cursor: 'pointer'
                        }} />
                },
            ]?.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ width: '10%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip sx={{ cursor: 'pointer' }} title={item.label}>
                                {item.icon}
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', sm: '90%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>
                        <Typography
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontWeight: { xs: 800, sm: 600 },
                                fontSize: { xs: 13, sm: 15 },
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
