import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState'
import { Box } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentCompany } from '../../Function/CommonFunction';
import { EmpauthId, infoNofity, succesNofity, warningNofity } from '../../Constant/Constant';
import { axiosApi } from '../../Axios/Axios';
import TextComponentBox from '../../Components/TextComponentBox';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';



const DischargeFeedback = lazy(() => import('../../Feedback/DischargeFeedback'));
const DischargeDetailBox = lazy(() => import('./DischargeDetailBox'));
const LastPatientCallDetail = lazy(() => import('./LastPatientCallDetail'));
const FeedBackLog = lazy(() => import('../../Feedback/FeedBackLog'));
const ImpressionButton = lazy(() => import('../../Components/ImpressionButton'));
const PatientNotRespondingRemarkCard = lazy(() => import('./PatientNotRespondingRemarkCard'));
const DIschargePatientRemark = lazy(() => import('./DIschargePatientRemark'));


const DischargeImpressionFeedback = ({
    PatientData,
    ReviewDetail,
    setDefaultImpression,
    defaultimpression,
    PatientImpDetail,
    TransactionID,
    getFeedbackData,
    setOpen,
    PatientRemark,
    Relatives,
    Children,
    patientnotResponding,
    PatientNotRespondingRemark
}) => {


    const [patientremark, setPatientRemark] = useState("");

    // grouping data based on the Date
    const GroupPatientImpDetail = PatientImpDetail?.reduce((acc, item) => {
        const { create_date, em_name, fb_quest, ...rest } = item;
        return {
            ...acc,
            [create_date]: {
                ...(acc[create_date] || {}),// group based on create date
                em_name, // include the em_name
                [fb_quest]: [
                    ...(acc[create_date]?.[fb_quest] || []),// group  based on the quest id 
                    { fb_quest, ...rest }
                ]
            }
        };
    }, {});

    //KMC OR TMC COMPANY NAME SELECTING
    const { data: getCurrentCompany } = useQuery({
        queryKey: ['getcurrentcompany'],
        queryFn: () => fetchCurrentCompany(),
        staleTime: Infinity
    });


    // hanlde Defult impression question and remarks
    const handlesubmit = useCallback(async () => {
        if (TransactionID === 0) return warningNofity("Invalid Patient Details")
        const isImpressionEmpty = Object.entries(defaultimpression)?.length === 0;
        const isRemarkEmpty = patientremark.trim() === "";

        if (isImpressionEmpty && isRemarkEmpty) {
            return infoNofity("Select Answer Before Submitting");
        }

        //tracking if any error occuring
        let isSuccess = true;

        if (!isRemarkEmpty) {
            const insertremark = {
                fb_transact_slno: TransactionID,
                remark: patientremark,
                create_user: EmpauthId()
            };

            try {
                const result = await axiosApi.post("/feedback/insertimpremark", insertremark);
                const { success } = result.data;
                if (success === 0) {
                    isSuccess = false;
                    warningNofity("Error in Inserting  Data");
                }
            } catch (error) {
                warningNofity("error in Inserting Reamrk...!");
                isSuccess = false;
            }
        }
        if (!isImpressionEmpty) {

            const insertData = {
                answer: defaultimpression,
                fb_transact_slno: TransactionID,
                create_user: EmpauthId()
            }

            try {
                const result = await axiosApi.post("/feedback/insertimpression", insertData);
                const { success } = result.data;
                if (success === 0) {
                    isSuccess = false;
                    warningNofity("Error in Inserting Data");
                }
            } catch (error) {
                warningNofity("error in Inserting Data...!");
                isSuccess = false;
            }
        }

        if (isSuccess) {
            getFeedbackData();
            setOpen(false);
            succesNofity("Successfully Inserted Data");
        }

    }, [defaultimpression, getFeedbackData, setOpen, patientremark, TransactionID]);

    return (
        <Box sx={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
        }}>
            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <FeedBackLog CurrentCompany={getCurrentCompany?.[0]?.company_slno} />
            </Suspense>
            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <DischargeDetailBox PatientData={PatientData}
                    ReviewDetail={ReviewDetail} Relatives={Relatives} Children={Children}
                    PatientNotRespondingRemark={PatientNotRespondingRemark}
                />
            </Suspense>

            {
                patientnotResponding && patientnotResponding?.length > 0 &&
                < Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                    <PatientNotRespondingRemarkCard
                        PatientRemark={patientnotResponding}
                    />
                </Suspense>
            }
            {
                PatientImpDetail && PatientImpDetail?.length > 0 &&
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                    <LastPatientCallDetail PtDetail={GroupPatientImpDetail} />
                </Suspense>
            }

            {
                PatientRemark && PatientRemark?.length > 0 &&
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                    <DIschargePatientRemark PatientRemark={PatientRemark} />
                </Suspense>
            }


            <Box sx={{ width: '86%', p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EditNoteTwoToneIcon sx={{ color: 'rgba(var(--icon-primary))', fontSize: 28 }} />
                    <TextComponentBox name={`Enter Remarks`} size={15} />
                </Box>
                <textarea
                    onChange={(e) => setPatientRemark(e.target.value)}
                    value={patientremark}
                    placeholder={`Patient Remarks`}
                    style={{
                        backgroundColor: "rgba(var(--bg-card))",
                        width: '100%',
                        minHeight: '70px',
                        fontFamily: "var(--font-varient)",
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: "14px",
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'rgba(var(--border-primary))',
                        padding: '4px',
                        outline: 'none'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(var(--border-primary))';
                        e.target.style.outline = 'none';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(var(--border-primary))';
                    }}
                />
            </Box>
            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <DischargeFeedback
                    defaultimpression={defaultimpression}
                    setDefaultImpression={setDefaultImpression}
                />
            </Suspense>
            <Box sx={{
                widows: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
            }}>
                <Suspense fallback={"Loading"}>
                    <ImpressionButton handlesubmit={handlesubmit} />
                </Suspense>
            </Box>

        </Box >
    )
}

export default memo(DischargeImpressionFeedback)