import { Box, Tooltip, Typography } from '@mui/joy';
import { format, parseISO } from 'date-fns';
import React, { memo, useCallback } from 'react';
import {
    Phone,
    MessageTextSolid,
    UserBadgeCheck,
    Male,
    PharmacyCrossTag,
    CalendarRotate,
    CalendarCheck,
    IpAddressTag
} from 'iconoir-react';
import { getAgeInYears, warningNofity } from '../../Constant/Constant';
import male from '../../assets/male.jpg';
import female from '../../assets/female.jpg';
import TextComponentBox from '../../Components/TextComponentBox';

import PatientDetailInfoHeader from './PatientDetailInfoHeader';

const DischargePatientDetail = ({ PatientData, ReviewDetail }) => {



    // copy to clipboard Funciton
    const CopyToClipBoard = useCallback((text) => {
        if (!text) return;
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(text).catch((err) => warningNofity("Error in Copying Text", err))
        } else return
    }, []);

    const getBasicInfoItems = (detail) => [
        {
            label: 'Patient Name',
            value: PatientData?.fb_ptc_name || 'Not Available',
            icon: <UserBadgeCheck fontSize={12}
                style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
        },
        {
            label: 'Mobile No',
            value: PatientData?.fb_ptc_mobile || 'Not Available',
            icon: <Phone fontSize={12}
                style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
        },
        {
            label: 'Gender/Age',
            value: (() => {
                const gender = PatientData?.fb_ptc_sex ?? 'Unknown';
                const age = getAgeInYears(PatientData?.fb_ptd_dob) ?? 'Unknown';
                return `${gender} / ${age} year`;
            })(),
            icon: <Male fontSize={12}
                style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
        },
        {
            label: 'IP NO',
            value: PatientData?.fb_ip_no || 'Not Available',
            icon: <IpAddressTag fontSize={12}
                style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
        },
        {
            label: 'Doctor Name',
            value: PatientData?.fb_doc_name || 'Not Available',
            icon: <PharmacyCrossTag fontSize={12}
                style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
        },
        {
            label: 'Admission Date',
            value: format(parseISO(detail?.fb_ipd_date), 'yyyy-MM-dd HH:mm:ss'),
            icon: <CalendarRotate fontSize={12}
                style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
        },
        {
            label: 'Discharge Date',
            value: format(parseISO(PatientData?.fb_ipd_disc), 'yyyy-MM-dd HH:mm:ss'),
            icon: <CalendarCheck fontSize={12}
                style={{ color: 'rgba(var(--icon-primary))', cursor: 'pointer' }} />
        }
    ];

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 5,
            bgcolor: 'rgba(var(--qustion-box))',
            p: 1,
            mt: 1
        }}>
            <Box sx={{
                width: '100%',
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                px: 2
            }}>
                <Box sx={{
                    width: '40%',
                    height: 95,
                    bgcolor: '#ebebeb',
                    px: 0.5,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%'

                }}>
                    {
                        PatientData?.fb_ptc_sex === "M" || PatientData?.fb_gender === "Male" ? <img
                            src={male}
                            alt="Male"
                            width={90}
                            height={90}
                            style={{ borderRadius: '50%' }}

                        /> : <img
                            src={female}
                            alt="Female"
                            width={120}
                            height={120}
                            style={{ borderRadius: '50%' }}
                        />
                    }
                </Box>
                {getBasicInfoItems(PatientData)?.map((item, index) => (
                    <PatientDetailInfoHeader
                        index={index}
                        item={item}
                        CopyToClipBoard={CopyToClipBoard}
                        value={1}
                    />
                ))}
                <Box
                    sx={{
                        width: '100%',
                        minHeight: 80,
                        my: 1,
                    }}>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Tooltip sx={{ cursor: 'pointer' }} title={"Review"}>
                            <MessageTextSolid className="border-b-[0.2rem] border-iconprimary p-0 " fontSize={11}
                                style={{
                                    color: 'rgba(var(--font-primary-white))',
                                    cursor: 'pointer'
                                }} />
                        </Tooltip>
                        <Typography
                            className="border-b-[0.2rem] border-iconprimary p-0 "
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontWeight: { xs: 800, sm: 600 },
                                fontSize: { xs: 11, sm: 14 },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textWrap: 'wrap'
                            }}>
                            Previews Review Detail
                        </Typography>
                    </Box>
                    <TextComponentBox name={ReviewDetail} size={13} />
                </Box>
            </Box>
        </Box>
    )
}

export default memo(DischargePatientDetail)