import React, { memo, Suspense, useCallback, useMemo, useState } from 'react';
import { Box, Chip } from '@mui/joy';
import {
    FaUser,
    FaBirthdayCake,
    FaBed,
    FaUserMd,
    FaIdBadge,
    FaNotesMedical,

} from 'react-icons/fa';
import { MdOutlinePhone } from "react-icons/md";
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import { QRCodeSVG } from 'qrcode.react';
import FeedbackActionItem from './FeedbackActionItem';
import { getallfeedbackMaster } from '../../../Function/CommonFunction';
import { useQuery } from '@tanstack/react-query';
import InfoText from './InfoText';
import { getAgeFromDOB, warningNofity } from '../../../Constant/Constant';
import DischargeQrModal from './DischargeQrModal';

const PatientInfoCard = ({ data, patientdata, submittedFeedback }) => {
    const {
        ip,
        patientId,
        patientName,
        ageGender,
        room,
        doctor,
        status,
        mobile
    } = data;


    const [openqr, setOpenQr] = useState(false);
    const [feedbackpresent, setFeedbackPresent] = useState(false);
    const [feedbackdata, setFeedbackData] = useState({});

    const { data: allfeedbackNames } = useQuery({
        queryKey: ['allfeedbackname'],
        queryFn: async () => await getallfeedbackMaster(),
        staleTime: Infinity,
    });

    /**
     * 
     * for getting only common and ip patients
     */
    const filteredFeedback = useMemo(
        () =>
            allfeedbackNames?.filter(
                item =>
                    item?.feedback_name === 'Common' ||
                    item?.feedback_name === 'ip'
            ),
        [allfeedbackNames]
    );

    // opening qr code and setting data 
    const handleQrcode = useCallback((item, data) => {
        if (!data) return warningNofity("Feedback Data Missing...!")
        setOpenQr(true);
        setFeedbackPresent(item);
        setFeedbackData(data)
    }, []);


    return (
        <Box
            sx={{
                width: '100%',
                p: 1,
                height: 150,
                backgroundColor: 'rgba(var(--bg-card))',
                border: '0.03px solid rgba(var(--border-primary))',
                borderRadius: 12,
                display: 'flex',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(var(--bg-card),0.9)',
                },
            }}
        >
            {/* LEFT SECTION */}
            <Box
                sx={{
                    width: { xs: '60%', md: '80%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    ml: 1,
                }}
            >
                {/* HEADER */}
                <InfoText
                    icon={FaUser}
                    iconTooltip="Patient Name"
                    sx={{ fontSize: { xs: 14, sm: 17 }, fontWeight: 600 }}
                >
                    {patientName}
                </InfoText>

                {/* IP & PATIENT ID */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <InfoText icon={FaIdBadge} iconTooltip="IP Number">
                        {ip}
                    </InfoText>

                    <InfoText icon={FaUserMd} iconTooltip="Patient ID">
                        {patientId}
                    </InfoText>
                </Box>


                <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* AGE / GENDER */}
                    <InfoText icon={FaBirthdayCake} iconTooltip="Age / Gender">
                        {getAgeFromDOB(ageGender)}
                    </InfoText>
                    {
                        mobile &&
                        <InfoText icon={MdOutlinePhone} iconTooltip="Mobile No">
                            {mobile}
                        </InfoText>
                    }

                </Box>
                {/* DOCTOR */}
                <InfoText icon={FaNotesMedical} iconTooltip="Consulting Doctor">
                    {doctor}
                </InfoText>


                {/* ROOM & STATUS */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <InfoText icon={FaBed} iconTooltip="Room / Bed">
                        {room}
                    </InfoText>

                    <Chip
                        size="sm"
                        variant="soft"
                        color="warning"
                        sx={{ px: 1, fontSize: 12 }}
                    >
                        {status}
                    </Chip>
                </Box>
            </Box>

            {/* RIGHT SECTION */}
            <Box sx={{ width: { xs: '40%', md: '20%' }, height: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        px: 0.2,
                    }}
                >
                    <Box sx={{ display: 'flex', height: '50%', justifyContent: 'space-between' }}>
                        {filteredFeedback
                            ?.map((item, index) => {
                                const AlreadyPresent = Array.isArray(submittedFeedback) &&
                                    submittedFeedback?.some(val => Number(val?.fdmast_slno) === Number(item?.fdmast_slno));
                                return (
                                    <Suspense
                                        key={index}
                                        fallback={<CustomBackDropWithOutState message="loading...!" />}>
                                        <FeedbackActionItem
                                            isAlreadypresent={AlreadyPresent}
                                            index={index}
                                            item={item}
                                            patientdata={patientdata}
                                        />
                                    </Suspense>
                                )
                            })}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mx: { xs: 2, lg: 1 },
                            height: '50%',
                        }}
                    >
                        {
                            filteredFeedback
                                ?.map((item, index) => {
                                    const AlreadyPresent = Array.isArray(submittedFeedback) &&
                                        submittedFeedback?.some(val => Number(val?.fdmast_slno) === Number(item?.fdmast_slno));
                                    return (
                                        <Suspense
                                            key={index}
                                            fallback={<CustomBackDropWithOutState message="loading...!" />}>
                                            <Box
                                                onClick={() => handleQrcode(AlreadyPresent, item)}
                                                sx={{
                                                    width: { xs: 40, sm: '30%', md: '25%' },
                                                    height: '80%',
                                                    p: 1,
                                                    borderRadius: 5,
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        background:
                                                            'linear-gradient(to right, rgba(33,150,243,0.4), rgba(233,30,99,0.4))',
                                                    },
                                                }}
                                            >
                                                <QRCodeSVG
                                                    value="sdflkjdjh"
                                                    style={{ width: '100%', height: '100%', borderRadius: 3 }}
                                                />
                                            </Box>
                                        </Suspense>
                                    )
                                })}
                    </Box>
                </Box>
            </Box>

            {
                openqr && (
                    <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                        <DischargeQrModal
                            open={openqr}
                            setOpen={setOpenQr}
                            item={patientdata}
                            feedbackdata={feedbackdata}
                            feedbackedexit={feedbackpresent}// already present status
                        />
                    </Suspense>
                )
            }
        </Box>
    );
};

export default memo(PatientInfoCard);
