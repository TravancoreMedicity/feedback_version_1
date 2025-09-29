import React, { useCallback, useState } from "react";
import { Box, Input, Button, Typography, Card, Divider, Stack } from "@mui/joy";
import { getFamilyDetails } from "../../Function/CommonFunction";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WcIcon from "@mui/icons-material/Wc";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import { useParams } from "react-router-dom";
import { OUTLINK_FEEDBACK } from "../../Constant/Static";
import searchbg from '../../assets/searchbg.jpg'

const SearchPatientModal = () => {

    const { feedbackId } = useParams();


    const [mrd, setMrd] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [patient, setPatient] = useState(null);


    // fetch patient details
    const fetchPatientDetail = useCallback(async (mrdNo) => {
        try {
            setError("");
            const result = await getFamilyDetails(mrdNo);
            if (result && result.length > 0) {
                setPatient(result[0]);
                return result[0];
            } else {
                setError("No patient found with this MRD number.");
                return null;
            }
        } catch (err) {
            console.error("Error fetching patient:", err);
            setError("Something went wrong while fetching patient details.");
            return null;
        }
    }, []);

    // search handler
    const handleSearch = useCallback(async () => {
        if (mrd?.length < 10) {
            setError("Please enter a Valid MRD NUMBER");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await fetchPatientDetail(mrd);
        } finally {
            setLoading(false);
        }
    }, [mrd, fetchPatientDetail]);

    // confirm details
    const handleConfirm = useCallback(() => {
        if (patient) {
            const encodedName = btoa(patient?.PTC_PTNAME);
            const encodepatientid = btoa(patient?.PT_NO);
            const encodemobile = btoa(patient?.PTC_MOBILE);
            const encodedId = feedbackId;
            const qrstausCode = btoa("1")

            const externalQrUrl = `${OUTLINK_FEEDBACK}/${encodedId}?name=${encodedName}&pid=${encodepatientid}&mbno=${encodemobile}&qrs=${qrstausCode}`;
            // Step 3 → open new tab
            window.open(externalQrUrl, "_blank");
        }
    }, [patient, feedbackId]);

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url(${searchbg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Box sx={{
                p: 2,
                display: "flex", flexDirection: "column", gap: 2, width: { xs: '95%', sm: 380 },
                bgcolor: '#e9ecef72',
                borderRadius: 5
            }}>
                {/* Header */}
                <Box>
                    <Typography level="h5" sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} fontWeight={600}>
                        Search Patient
                    </Typography>
                    <Typography level="body-sm" sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} color="neutral">
                        Enter MRD number to fetch patient details
                    </Typography>
                </Box>

                {!patient ? (
                    <>
                        <Input
                            variant="outlined"
                            placeholder="Enter MRD Number"
                            value={mrd}
                            startDecorator={<SearchIcon />}
                            onChange={(e) => {
                                setMrd(e.target.value);
                                setError(""); // clear error on input change
                            }}
                            sx={{ borderRadius: "md", boxShadow: "sm", width: '100%' }}
                        />

                        {error && (
                            <Typography color="danger" sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                                startDecorator={<ErrorOutlineIcon fontSize="small" />}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            onClick={handleSearch}
                            loading={loading}
                            disabled={!mrd.trim()}
                            color="primary"
                            sx={{ mt: 1 }}
                            startDecorator={<SearchIcon />}
                        >
                            Search
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Patient details */}
                        <Card
                            variant="soft"
                            color="neutral"
                            sx={{
                                p: 1,
                                borderRadius: "lg",
                                boxShadow: "sm",
                                fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1rem" }
                            }}
                        >
                            <Typography level="body-md" sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, display: "flex", alignItems: "center", gap: 1 }}>
                                <PersonIcon fontSize="small" /> {patient?.PTC_PTNAME}
                            </Typography>

                            <Typography level="body-md" sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, display: "flex", alignItems: "center", gap: 1 }}>
                                <CalendarTodayIcon fontSize="small" /> {patient?.PTN_YEARAGE} years
                            </Typography>

                            <Typography level="body-md" sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, display: "flex", alignItems: "center", gap: 1 }}>
                                <WcIcon fontSize="small" /> {patient?.PTC_SEX === "F" ? "FEMALE" : "MALE"}
                            </Typography>

                            <Typography level="body-md" sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, display: "flex", alignItems: "center", gap: 1 }}>
                                <BadgeIcon fontSize="small" /> MRD: {patient?.PT_NO}
                            </Typography>

                            <Typography level="body-md" sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, display: "flex", alignItems: "center", gap: 1 }}>
                                <PhoneIcon fontSize="small" /> {patient?.PTC_MOBILE}
                            </Typography>

                            <Typography level="body-md" sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, display: "flex", alignItems: "center", gap: 1 }}>
                                <HomeIcon fontSize="small" /> {patient?.PTC_LOADD1}, {patient?.PTC_LOADD2}
                            </Typography>
                        </Card>


                        <Typography level="body-sm" sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: "neutral.600" }}>
                            Please confirm patient details before continuing.
                        </Typography>

                        <Button
                            onClick={handleConfirm}
                            color="success"
                            fullWidth
                            startDecorator={<CheckCircleIcon />}
                        >
                            Confirm & Continue
                        </Button>
                    </>
                )}


            </Box>
        </Box>
    );
};

export default SearchPatientModal;
