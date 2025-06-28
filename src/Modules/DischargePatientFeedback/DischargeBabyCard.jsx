import React, { memo } from 'react';
import male from '../../assets/male.jpg';
import female from '../../assets/female.jpg';
import {
    Male,
    MapPin,
    CalendarRotate,
    User
} from 'iconoir-react';
import { Box } from '@mui/joy';

import TextComponentBox from '../../Components/TextComponentBox';
import BasicInformationCard from './BasicInformationCard';

const DischargeBabyCard = ({ Children }) => {

    const getBasicInfoItems = (detail) => [
        {
            label: 'Father Name',
            value: detail?.fb_brc_husband || 'Not Available',
            icon: <User fontSize={12}
                style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        },
        {
            label: 'Gender/Age',
            value: (() => {
                const gender = detail?.fb_ptc_sex === "M" ? "Male" : 'Female' ?? 'Unknown';
                const age = detail?.fb_ptn_yearage ?? '0';
                return `${gender} / ${age} year`;
            })(),
            icon: <Male fontSize={12}
                style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        },
        {
            label: 'Birth Date',
            value: detail?.fb_birth_date || 'Not Available',
            icon: <CalendarRotate fontSize={12}
                style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        },
        {
            label: 'Address',
            value: (() => {
                const addr1 = detail?.fb_ptc_loadd1 || '';
                const addr2 = detail?.fb_ptc_loadd2 || '';
                const addr3 = detail?.fb_ptc_loadd3 || '';
                const addr4 = detail?.fb_ptc_loadd4 || '';
                return [addr1, addr2, addr3, addr4].filter(Boolean).join(', ');
            })(),
            icon: <MapPin fontSize={12}
                style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
        },
    ];
    return (
        <Box >
            {
                Children?.map((item, index) => {
                    return (
                        <>
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{
                                    width: 45,
                                    height: 45,
                                    // bgcolor: '#ebebeb',
                                    background: 'linear-gradient(135deg,rgb(253, 187, 222),rgb(171, 223, 252),rgb(255, 242, 225))',
                                    px: 0.5,
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%'
                                }}>
                                    {
                                        item?.fb_ptc_sex === "M" ?
                                            <img src={male} alt="Male" style={{ borderRadius: '50%', width: 35, height: 35 }} />
                                            : <img src={female} alt="Male" style={{ borderRadius: '50%', width: 35, height: 35 }} />
                                    }
                                </Box>
                                <TextComponentBox name={`B/O ${item?.fb_ptc_name}`} size={15} />
                            </Box>
                            {
                                getBasicInfoItems(item)?.map((item, index) => (
                                    <BasicInformationCard
                                        key={index}
                                        icon={item?.icon}
                                        value={item?.value}
                                        label={item?.label}
                                    />
                                ))
                            }
                        </>
                    )
                })
            }
        </Box>
    )
}

export default memo(DischargeBabyCard)
