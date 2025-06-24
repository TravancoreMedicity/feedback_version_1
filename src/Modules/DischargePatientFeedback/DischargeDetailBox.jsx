import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react';
import male from '../../assets/male.jpg';
import female from '../../assets/female.jpg';
import mother from '../../assets/mother.png';
import { format, parseISO } from 'date-fns';
import { Box, Tooltip } from '@mui/joy';
import TextComponentBox from '../../Components/TextComponentBox';
import {
    MessageTextSolid,
    Male,
    MapPin,
    Phone,
    UserBadgeCheck,
    IpAddressTag,
    GoogleDocs,
    JournalPage,
    EyeClosed,
    Eye
} from 'iconoir-react';
import BasicInformationCard from './BasicInformationCard';
import CallEndTwoToneIcon from '@mui/icons-material/CallEndTwoTone';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import { Paper } from '@mui/material';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';


const PatientNotResponding = lazy(() => import('./PatientNotResponding'))
const AvatarComponent = lazy(() => import('../../Components/AvatarComponent'))
const DischargeBabyCard = lazy(() => import('./DischargeBabyCard'))

const DischargeDetailBox = ({ PatientData, ReviewDetail, Relatives, Children, PatientNotRespondingRemark }) => {

    const [openIndex, setOpenIndex] = useState(null);
    const [opendischargeindex, setOpenDischargeIndex] = useState(null)
    const [openproremark, setOpenProRemark] = useState(null);
    const [responding, setResponding] = useState(false);
    const [respondremark, setRespondRemark] = useState("")


    // open corresponding patient detail
    const handleOpen = useCallback(() => {
        setOpenIndex(prev => !prev);
    }, []);

    const handledischargeOpen = useCallback(() => {
        setOpenProRemark(false)
        setOpenDischargeIndex(pre => !pre)
    }, [])

    const handleproremark = useCallback(() => {
        setOpenDischargeIndex(false)
        setOpenProRemark(pre => !pre)
    }, [])

    const handleOpenNotResponding = useCallback(() => {
        setResponding(prev => {
            const newState = !prev;
            if (!newState) {
                setRespondRemark("");
            }
            return newState;
        });
    }, []);


    // Patient information function
    const getBasicInfoItems = (detail) => {
        const fullAddress = [detail?.fb_ptc_loadd1, detail?.fb_ptc_loadd2, detail?.fb_ptc_loadd3, detail?.fb_ptc_loadd4]
            .filter(Boolean).join(', ');
        return [
            { label: 'Patient No', value: detail?.fb_pt_no || 'Not Available', icon: <UserBadgeCheck className='iconStyle' /> },
            { label: 'IP No', value: detail?.fb_ip_no || 'Not Available', icon: <IpAddressTag className='iconStyle' /> },
            { label: 'Mobile No', value: detail?.fb_ptc_mobile || 'Not Available', icon: <Phone className='iconStyle' /> },
            {
                label: 'Gender/Age',
                value: `${detail?.fb_ptc_sex === "M" ? "Male" : "Female"} / ${detail?.fb_ptn_yearage ?? 'Unknown'} year`,
                icon: <Male className='iconStyle' />
            },
            { label: 'Address', value: fullAddress || 'Not Available', icon: <MapPin className='iconStyle' /> },
        ];
    };


    // patient detail bind in Usememo
    const basicInfoItems = useMemo(() => getBasicInfoItems(PatientData), [PatientData]);

    // closing the relative data when clicking out side the box
    const handleclose = useCallback(() => {
        if (openIndex || openIndex === null) {
            setOpenIndex(false) // close only if it is open
        };
        if (opendischargeindex || opendischargeindex === null) {
            setOpenDischargeIndex(false)
        }
        if (openproremark || openproremark === null) {
            setOpenProRemark(false)
        }
    }, [openIndex, setOpenIndex, opendischargeindex, openproremark]);


    return (
        <Box sx={{
            width: '86%',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 5,
            bgcolor: 'rgba(var(--qustion-box))',
            p: 1,
            mt: 1,
        }} onClick={handleclose}>
            {
                responding ?
                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                        <PatientNotResponding
                            PatientNotRespondingRemark={PatientNotRespondingRemark}
                            setResponding={setResponding}
                            PatientData={PatientData}
                            respondremark={respondremark}
                            setRespondRemark={setRespondRemark} />
                    </Suspense>
                    :
                    <Box sx={{
                        width: '100%',
                        minHeight: 120,
                        display: 'flex',
                        px: 2,
                        position: 'relative'
                    }}>
                        <Box sx={{
                            width: '55%',
                            minHeight: 120,
                            display: 'flex',
                            px: 2,
                            gap: 2,
                            borderRightWidth: 0.03
                        }}>
                            <Box sx={{
                                width: 95,
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
                                    Children && Children?.length > 0 ?
                                        <img src={mother} alt="mother" style={{ borderRadius: '50%', width: 90, height: 90, objectFit: 'cover' }} />
                                        : PatientData?.fb_ptc_sex === "M" ?
                                            <img src={male} alt="Male" style={{ borderRadius: '50%', width: 90, height: 90 }} />
                                            : <img src={female} alt="Male" style={{ borderRadius: '50%', width: 90, height: 90 }} />
                                }
                            </Box>
                            <Box sx={{ mt: 2, flex: 1 }}>
                                <TextComponentBox name={PatientData?.fb_ptc_name} size={18} />
                                {basicInfoItems?.map((item, index) => (
                                    <BasicInformationCard
                                        key={index}
                                        icon={item?.icon}
                                        value={item?.value}
                                        label={item?.label}
                                    />
                                ))}
                                <Box sx={{ position: 'relative', width: '100%', cursor: 'pointer' }}>
                                    {
                                        (Children?.length > 0 || Relatives?.length > 0) &&
                                        <Box sx={{ width: '100%', display: 'flex' }} onClick={handleOpen}>
                                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                                <AvatarComponent length={Relatives?.length || Children?.length} />
                                            </Suspense>
                                        </Box>
                                    }
                                    {openIndex && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 30,
                                                left: 0,
                                                width: '100%',
                                                bgcolor: 'rgba(var(---dropdown-box))',
                                                zIndex: 9999,
                                                padding: 1,
                                            }}>
                                            {
                                                Children?.length === 0 && Relatives?.map((item, index) => {
                                                    return (
                                                        <Box key={index}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box sx={{
                                                                    width: 45,
                                                                    height: 45,
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
                                                                <TextComponentBox name={item?.fb_ptc_name} size={15} />
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
                                                        </Box>
                                                    )
                                                })
                                            }
                                            {
                                                Children && Children?.length > 0 &&
                                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                                    <DischargeBabyCard Children={Children} />
                                                </Suspense>
                                            }
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: '45%',
                            minHeight: 120,
                            display: 'flex',
                            flexDirection: 'column',
                            px: 2
                        }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    minHeight: 80,
                                    mt: 3
                                }}>
                                <Box
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Tooltip sx={{ cursor: 'pointer' }} title={"Review"}>
                                            <MessageTextSolid className="border-b-[0.2rem] border-iconprimary p-0 " fontSize={13}
                                                style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                                        </Tooltip>
                                        <TextComponentBox name={"Previews Review Detail"} size={16} />
                                    </Box>
                                </Box>
                                {
                                    PatientData?.ScheduleDate &&
                                    <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                                        <TextComponentBox name={"Scheduled Date :"} size={12} weight={800} />
                                        <TextComponentBox name={format(parseISO(PatientData?.ScheduleDate), 'yyyy-MM-dd')} size={14} />
                                    </Box>
                                }
                                <Box sx={{ position: 'relative' }}>
                                    <Box
                                        onClick={handledischargeOpen}
                                        sx={{
                                            width: '100%',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                        {
                                            ReviewDetail && (
                                                <>
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <JournalPage fontSize={12}
                                                            style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                                                        <TextComponentBox name={"Discharge summary"} size={14} />
                                                    </Box>
                                                    {
                                                        opendischargeindex ? <Eye fontSize={12}
                                                            style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer', right: 0 }} /> : <EyeClosed fontSize={12}
                                                                style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer', right: 0 }} />
                                                    }
                                                </>
                                            )
                                        }
                                    </Box>
                                    {opendischargeindex && (
                                        <Box
                                            className="border border-iconprimary px-1 rounded-sm"
                                            sx={{
                                                position: 'absolute',
                                                top: 30,
                                                left: 0,
                                                width: '100%',
                                                bgcolor: 'rgba(var(---dropdown-box))',
                                                zIndex: 9999,
                                                padding: 1,
                                            }}>
                                            <TextComponentBox name={ReviewDetail} size={13} />
                                        </Box>
                                    )}
                                </Box>
                                {
                                    PatientData?.ProRemark &&
                                    <Box
                                        onClick={handleproremark}
                                        sx={{
                                            gap: 1,
                                            mb: 0.5,
                                            borderRadius: 5,
                                            width: '100%',
                                            mt: 1,
                                            position: 'relative',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <GoogleDocs fontSize={12}
                                                style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer' }} />
                                            <TextComponentBox name={"Pro remarks"} size={14} />
                                        </Box>
                                        {
                                            openproremark ? <Eye fontSize={12}
                                                style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer', right: 0 }} /> : <EyeClosed fontSize={12}
                                                    style={{ color: 'rgba(var(--font-primary-white))', cursor: 'pointer', right: 0 }} />
                                        }
                                        {openproremark && (
                                            <Box
                                                className="border border-iconprimary px-1 rounded-sm"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 30,
                                                    left: 0,
                                                    width: '100%',
                                                    bgcolor: 'rgba(var(---dropdown-box))',
                                                    zIndex: 9999,
                                                    padding: 1,
                                                }}>
                                                <TextComponentBox
                                                    name={PatientData?.ProRemark}
                                                    size={13}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                }
                            </Box>
                        </Box>
                    </Box>
            }
            <Box sx={{ position: 'relative', display: 'inline-block', bgcolor: 'red' }}>
                <Paper
                    onClick={handleOpenNotResponding}
                    sx={{
                        position: 'absolute',
                        top: -35,
                        right: 0,
                        transform: 'translateY(-50%)',
                        bgcolor: 'white',
                        color: `${!responding ? '#FC003E' : '#2dc653'}`,
                        border: `${!responding ? "1px solid #FC003E" : "1px solid #2dc653"} `,
                        borderRadius: '12px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer'
                    }}>
                    <Box sx={{
                        bgcolor: `${!responding ? '#FC003E' : '#2dc653'}`,
                        borderRadius: '50%',
                        p: 0.5
                    }}>
                        {
                            responding ? <CallEndTwoToneIcon
                                className='vibrating-element'
                                sx={{ color: 'white', fontSize: 18 }} /> : <PhoneMissedIcon
                                className='vibrating-element'
                                sx={{ color: 'white', fontSize: 18 }} />
                        }

                    </Box>
                    {
                        responding ? "Close" : "Not Responding"
                    }

                </Paper>
            </Box>
        </Box>
    )
}

export default memo(DischargeDetailBox);






