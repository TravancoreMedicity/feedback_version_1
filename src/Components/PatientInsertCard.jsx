import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    Tooltip,
    IconButton,
    Avatar
} from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { axiosApi } from "../Axios/Axios";
import { errorNofity, succesNofity, warningNofity } from "../Constant/Constant";
import CustomBackDropWithOutState from "./CustomBackDropWithOutState";
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import HomeIcon from '@mui/icons-material/Home';

const PatientInsertCard = ({ patientData = [], onInsert }) => {

    const [loadingipcheck, setLoadingIpCheck] = useState(false);
    const [isIpExist, setIsIpExist] = useState(false)

    // Check Ip Number Already Exist
    const CheckIpAlreadyExist = async (ip) => {
        console.log({ ip });
        if (!ip) return warningNofity("Ip Number Missing");
        try {
            setLoadingIpCheck(true);
            setIsIpExist(false)
            const res = await axiosApi.post('/feedback/checkipexist', {
                fb_ip_no: ip
            });
            const { message, success } = res.data;
            if (success === 2) {
                succesNofity(message || `MySQL Patient Insert Success`);
                setIsIpExist(true)
            }
            else {
                warningNofity(message || `MySQL Patient Insert Error`);
                setIsIpExist(false)
            }
        } catch (err) {
            errorNofity(`MySQL Patient Insert Error Occurred`);
        } finally {
            setLoadingIpCheck(false);
        }
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {patientData?.map((pt, index) => {
                return (
                    <Card
                        key={index}
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: "lg",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            boxShadow: "md",
                            backgroundColor: 'rgba(var(--bg-card))',  // Card background
                            color: 'rgba(var(--font-primary-white))' // Text color
                        }}
                    >
                        {/* TOP: Avatar + Name + Status */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                flexDirection: { xs: "column", sm: "row" }
                                , position: 'relative'
                            }}
                        >
                            <Avatar sx={{ width: { sm: 40, md: 70 }, height: { sm: 40, md: 70 }, bgcolor: "rgba(255,255,255,0.1)" }}>
                                <PersonIcon sx={{ fontSize: 36, color: 'rgba(var(--icon-primary))' }} />
                            </Avatar>

                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: "flex", justifyContent: { xs: 'center', sm: 'space-between' } }}>
                                    <Typography sx={{ fontSize: { sm: 20, md: 22 }, fontWeight: 600, color: 'rgba(var(--font-primary-white))' }}>
                                        {pt.PTC_PTNAME}
                                    </Typography>

                                    <Tooltip
                                        sx={{ position: 'absolute', right: 0, top: 0 }}
                                        title={isIpExist ? "Patient Already Exist" : "Check Patient Exists"}
                                        placement="top"
                                        size="sm"
                                        variant="outlined" >
                                        <IconButton onClick={isIpExist ? () => { } : () => CheckIpAlreadyExist(pt?.IP_NO)}>
                                            {
                                                isIpExist ?
                                                    <CheckCircleIcon color={"primary"} /> :
                                                    <ErrorOutlineIcon sx={{ color: 'rgba(var(--font-primary-white))' }} />
                                            }
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                                <Typography level="body-sm"
                                    sx={{ opacity: 0.7, color: 'rgba(var(--font-primary-white))' }}>
                                    IP Number: {pt.IP_NO}
                                </Typography>

                            </Box>
                        </Box>

                        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

                        {/* GRID DETAILS */}
                        {
                            loadingipcheck ?
                                <CustomBackDropWithOutState message={"Checking Please Wait...!"} /> :
                                <CardContent
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                        gap: 2,
                                        color: 'rgba(var(--font-primary-white))'
                                    }}
                                >
                                    {/* Patient Info */}
                                    <Box>
                                        <Typography level="title-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>
                                            <PregnantWomanIcon sx={{ color: 'rgba(var(--font-primary-white))' }} />
                                            Patient Info
                                        </Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}><b>Patient ID:</b> {pt.PT_NO}</Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>
                                            <b>Gender:</b> {pt.PTC_SEX === "M" ? "Male" : "Female"}
                                        </Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>
                                            <b>Age:</b> {pt.PTN_YEARAGE} Y / {pt.PTN_MONTHAGE} M
                                        </Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>
                                            <b>DOB:</b> {pt.PTD_DOB ? new Date(pt.PTD_DOB).toLocaleDateString() : "N/A"}
                                        </Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>
                                            <b>Mobile:</b> {pt.PTC_MOBILE || "N/A"}
                                        </Typography>
                                    </Box>

                                    {/* Admission Info */}
                                    <Box>
                                        <Typography level="title-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>
                                            <SignalCellularAltIcon sx={{ color: 'rgba(var(--font-primary-white))' }} />
                                            Admission Info</Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>
                                            <b>Admission Date:</b>{" "}
                                            {pt.IPD_DATE ? new Date(pt.IPD_DATE).toLocaleString() : "N/A"}
                                        </Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}><b>Bed:</b> {pt.BD_CODE}</Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}><b>Department:</b> {pt.DPC_DESC}</Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}><b>Doctor Name:</b> {pt.DOC_NAME}</Typography>
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}><b>Current Status:</b> {pt.IPC_CURSTATUS}</Typography>
                                    </Box>

                                    {/* Address — Full width */}
                                    <Box sx={{ gridColumn: "1 / -1" }}>
                                        <Typography sx={{
                                            fontFamily: 'var(--font-varient)',
                                            color: 'rgba(var(--font-primary-white))',
                                        }} fontWeight={600} fontSize={{ xs: 14, sm: 17 }}>
                                            <HomeIcon sx={{ color: 'rgba(var(--font-primary-white))' }} />
                                            Address</Typography>
                                        {/* <Typography level="title-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>Address</Typography> */}
                                        <Typography level="body-sm" sx={{ color: 'rgba(var(--font-primary-white))' }}>
                                            {[pt.PTC_LOADD1, pt.PTC_LOADD2, pt.PTC_LOADD3, pt.PTC_LOADD4]
                                                .filter(Boolean)
                                                .join(", ") || "N/A"}
                                        </Typography>
                                    </Box>
                                </CardContent>
                        }
                        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

                        {/* Insert Button */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                color="neutral"
                                variant="soft"
                                onClick={() => onInsert(pt)}
                                sx={{
                                    borderRadius: "md",
                                    px: 3,
                                    fontWeight: "bold",
                                }}
                            >
                                process
                            </Button>
                        </Box>
                    </Card>
                );
            })}
        </Box >
    );
};

export default PatientInsertCard;
