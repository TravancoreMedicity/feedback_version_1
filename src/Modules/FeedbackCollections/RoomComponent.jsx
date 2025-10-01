import { Box, Typography } from '@mui/joy';
import React, { lazy, memo, Suspense, useCallback, useState } from 'react';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import { useQuery } from '@tanstack/react-query';
import { getallfeedbackMaster, getBedRemarkStatus } from '../../Function/CommonFunction';
import { OUTLINK_FEEDBACK } from '../../Constant/Static';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { infoNofity, warningNofity } from '../../Constant/Constant';


const PatientModal = lazy(() => import('./PatientModal'));

const RoomComponent = ({
    roomnumber,
    ispresent,
    getdetail,
    bdcode,
    inpatientDetail,
    setAnchorEl,
    feedbackedexit,
    multiple,
    loading,
    open,
    remarkstatus
}) => {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalopen, setModalOpen] = useState(false);
    const [roomstatus, setRoomStatus] = useState({})
    const [entering, setEntering] = useState(0)

    const { data: allfeedbackNames } = useQuery({
        queryKey: ['allfeedbackname'],
        queryFn: async () => await getallfeedbackMaster(),
        staleTime: Infinity
    })

    const { data: getallremarkstatus } = useQuery({
        queryKey: ["getbedremarkstatus"],
        queryFn: async () => await getBedRemarkStatus(),
        staleTime: Infinity,
        enabled: !!bdcode
    });

    // fetching Remarks
    const remarkDetails = useCallback((bdcode) => {
        if (!bdcode) return warningNofity("Bed Code Not Found!");
        const result = getallremarkstatus?.find((item) => item?.fb_bd_code === Number(bdcode));
        setRoomStatus(result || {});
    }, [getallremarkstatus, setRoomStatus])

    const handleClick = useCallback(async () => {
        if (ispresent !== 'A') {
            const isInRemark = await getallremarkstatus?.some((item) => item?.fb_bd_code === Number(bdcode));
            // && ispresent !== 'N'
            if (!isInRemark) {
                setModalOpen(true)
                getdetail(bdcode)
                setRoomStatus({})
                setEntering(1)
            } else {
                setModalOpen(true)
                remarkDetails(bdcode)
                setEntering(0)
            }
        } else {
            infoNofity("This Room is Available")
        }
    }, [setModalOpen, getallremarkstatus, setRoomStatus, bdcode, ispresent, setEntering, getdetail, remarkDetails]);



    const openFeedbackForm = useCallback((feedbackId, name, PatientId, patMobile, ipnumber) => {
        try {
            if (!feedbackId) {
                warningNofity("Feedback ID is missing!");
                return;
            }

            const encodedId = btoa(feedbackId || "");
            const encodedName = btoa(name || "");
            const encodePatientId = btoa(PatientId || "");
            const encodeMobile = btoa(patMobile || "");
            const encodeIpNum = btoa(ipnumber || "");

            const externalUrl = `${OUTLINK_FEEDBACK}/${encodedId}?name=${encodedName}&pid=${encodePatientId}&mbno=${encodeMobile}&ipnum=${encodeIpNum}`;

            window.open(externalUrl, "_blank");
        } catch (error) {
            console.error("Error opening feedback form:", error);
            warningNofity("Unable to open feedback form");
        }
    }, []);


    const handlebuttonClick = useCallback((id, name, pid, mob, ipnum) => {
        openFeedbackForm(id, name, pid, mob, ipnum)
        setAnchorEl(null)
    }, [openFeedbackForm]);




    // Function to go to the next patient card
    const nextPatient = useCallback(() => {
        if (currentIndex < inpatientDetail?.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, inpatientDetail]);
    // Function to go to the previous patient card
    const prevPatient = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }, [currentIndex]);

    return (
        <>
            <Box
                onClick={handleClick}
                sx={{
                    width: 155,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                    position: 'relative'
                }}>
                <Box
                    sx={{
                        width: '100%',
                        height: 60,
                        backgroundColor: 'rgba(var(--bg-common))',
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        display: 'flex',
                        borderRadius: 8,
                    }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: "column",
                        fontSize: 12,
                        lineHeight: 1,
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        backgroundColor: ispresent === "A" ? "#8FD14F" :
                            ispresent === "O" && multiple === 2 ? "rgba(207, 118, 133, 0.96)" :
                                ispresent === "T" ? "rgb(239, 131, 15)" : ispresent === "B" ? "rgba(200, 0, 180, 0.8)" :
                                    ispresent === "N" && remarkstatus?.fb_bed_service_status === 2 ? "rgb(40, 185, 234)" : ispresent === "N" && remarkstatus?.fb_bed_service_status === 1 ? "rgb(72, 54, 134)" : ispresent === "N" ? "rgba(235, 18, 18, 0.84)" :
                                        ispresent === "F" ? "rgb(53, 170, 193)" : ispresent === "R" ? "rgb(40, 185, 234)" :
                                            ispresent === "O" ? "rgba(19, 112, 241, 0.68)" : "red",
                        px: 0.6,
                        fontFamily: 'var(--font-varient)',
                        color: 'White',
                        fontWeight: 900,
                        py: 0.1,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                    }}>
                        <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>B</Box>
                        <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>E</Box>
                        <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>D</Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative' }}>
                        <HotelOutlinedIcon style={{ fontSize: { xs: 20, sm: 27 }, color: 'rgba(var(--font-primary-white))', }} />
                        <Typography level='body-sm' fontWeight={'md'}
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontSize: { xs: 10, sm: 12 },
                                fontWeight: 900,
                                ml: 1
                            }} >
                            {roomnumber}
                        </Typography>
                    </Box>
                    {/* Popover */}
                </Box>
            </Box >
            {
                Object.keys(inpatientDetail)?.length !== 0 && <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                    <PatientModal
                        open={modalopen}
                        setOpen={setModalOpen}
                        allfeedbackNames={allfeedbackNames}
                        inpatientDetail={inpatientDetail?.length > 0 ? inpatientDetail : roomstatus ? roomstatus : []}
                        feedbackedexit={feedbackedexit}
                        roomnumber={roomnumber}
                        currentIndex={currentIndex}
                        handlebuttonClick={handlebuttonClick}
                        loading={loading}
                        nextPatient={nextPatient}
                        prevPatient={prevPatient}
                        ispresent={ispresent}
                        multiple={multiple}
                        setRoomStatus={setRoomStatus}
                        roomstatus={roomstatus}
                        entering={entering}
                    />
                </Suspense>
            }

        </>
    )
}
export default memo(RoomComponent);

