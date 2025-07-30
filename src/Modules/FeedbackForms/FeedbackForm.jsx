import { Box, Typography } from '@mui/joy'
import { axiosApi } from '../../Axios/Axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { EmpauthId, errorNofity, warningNofity } from '../../Constant/Constant';
import { FeedbackDetailForDisplay, fetchCurrentCompany } from '../../Function/CommonFunction';
import EmojiSkeleton from '../../Feedback/Commoncomponents/ChooseEmogjiSkeleton';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import QuestionBoxSkeleton from '../../Feedback/Commoncomponents/QuestionBoxSkeleton';
import React, { memo, lazy, useState, useCallback, useEffect, useMemo, Suspense } from 'react';
import TextComponentBox from '../../Components/TextComponentBox';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';



const PatientInfoHeader = lazy(() => import('./PatientInfoHeader'));
const FeedBackLog = lazy(() => import('../../Feedback/FeedBackLog'));
const QuestionBox = lazy(() => import('../../Feedback/QuestionBox'));
const SuccessPage = lazy(() => import('../../Components/SuccessPage'));
const DischargeFeedback = lazy(() => import('../../Feedback/DischargeFeedback'));
const TextComponent = lazy(() => import('../../Feedback/Commoncomponents/TextComponent'));
const AnswerComponentSelect = lazy(() => import('../../Components/AnswerComponentSelect'));
const FeedbackButton = lazy(() => import('../../Feedback/Commoncomponents/FeedbackButton'));
const DischargeDetailBox = lazy(() => import('../DischargePatientFeedback/DischargeDetailBox'));
const PatientNotRespondingRemarkCard = lazy(() => import('../DischargePatientFeedback/PatientNotRespondingRemarkCard'));


const FeedbackForm = ({
    fbencodedId,
    fbencodedName,
    fbencodepatientid,
    fbencodemobile,
    fbencodeipnum,
    setOpen,
    getFeedbackData,
    PatientData,
    ReviewDetail,
    Relatives,
    Children,
    patientnotResponding,
    PatientNotRespondingRemark,
    getDishcargePatientDetail
}) => {
    const [useranswer, setUserAnswer] = useState({});
    const [issubmit, setIsSubmit] = useState(false);
    const [mobilevalidation, setMobileValidation] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [isnoclicked, setIsNoClicked] = useState({})
    const [loading, setLoading] = useState(false)
    const [defaultimpression, setDefaultImpression] = useState({}); // default question
    const [defaultremarks, setDefaultRemarks] = useState("")
    const [formData, setFormData] = useState({
        PatientName: "",
        feedbackId: 0,
        inpatientNumber: 0,
        patientNo: 0,
    });
    const { encodedId } = useParams();
    const location = useLocation();
    const { PatientName, feedbackId, inpatientNumber, patientNo } = formData;



    // getting patient detail using url
    useEffect(() => {
        if (fbencodedId !== undefined) return;
        try {
            // Decode the Base64 encoded ID to get the original feedbackId
            const feedbackId = atob(encodedId);  // Decode Base64 to get feedbackId
            const queryParams = new URLSearchParams(location.search);
            const patientName = atob(queryParams.get("name") || "");
            const patienId = atob(queryParams.get("pid") || "")
            const patientMob = atob(queryParams.get("mbno") || "")
            const InpatientNumber = atob(queryParams.get("ipnum") || "")
            // Fetch feedback data using the decoded feedbackId
            setMobileNumber(patientMob)
            setFormData({
                PatientName: patientName,
                feedbackId: feedbackId,
                patientNo: patienId,
                inpatientNumber: InpatientNumber,
            });
        } catch (error) {
            warningNofity("Error decoding Data", error);
        }
    }, [encodedId, location.search, fbencodedId])




    //getting data through  props and update in the feedback
    useEffect(() => {
        if (fbencodedId === undefined) return;
        try {
            const feedbackId = atob(fbencodedId);
            const patientName = atob(fbencodedName || "");
            const patienId = atob(fbencodepatientid || "")
            const patientMob = atob(fbencodemobile || "")
            const InpatientNumber = atob(fbencodeipnum || "")

            setMobileNumber(patientMob)
            setFormData({
                PatientName: patientName,
                feedbackId: feedbackId,
                patientNo: patienId,
                inpatientNumber: InpatientNumber,
            });
        } catch (error) {
            warningNofity("Error decoding Datassss");
        }
    }, [fbencodedId, fbencodedName, fbencodepatientid, fbencodemobile, fbencodeipnum]);



    // Based on feedback Id Fetch the Corresponding  Feedback 
    const { data: feedbackDtlDisplay } = useQuery({
        queryKey: ['fetchfbdtldispay', feedbackId],
        queryFn: () => FeedbackDetailForDisplay(feedbackId),
        enabled: feedbackId !== 0
    });

    //KMC OR TMC COMPANY NAME SELECTING
    const { data: getCurrentCompany } = useQuery({
        queryKey: ['getcurrentcompany'],
        queryFn: () => fetchCurrentCompany(),
        staleTime: Infinity
    });


    const IsComponentPresent = feedbackDtlDisplay &&
        feedbackDtlDisplay?.filter(item => item?.fb_answer_component !== null && item?.fb_answer_component !== "");

    const ComponentName = IsComponentPresent?.map((item) => item?.fb_answer_component);


    // Handling User Selected answers of emogies
    const hanldeuseranswers = useCallback((question, answer) => {
        setUserAnswer((prevValues) => {
            const updatedAnswers = { ...prevValues }
            if (answer === "") {
                delete updatedAnswers[question]
            } else {
                updatedAnswers[question] = answer;
            }
            return updatedAnswers;
        });
    }, []);


    // Handling Yes or No Question Answers
    const hanldecomponent = useCallback((question, component) => {
        setIsNoClicked((prevValues) => {
            const updatedAnswers = { ...prevValues }
            if (component === "") {
                delete updatedAnswers[question]
            } else {
                updatedAnswers[question] = component;
            }
            return updatedAnswers;
        });
    }, []);




    //Getting all required fields for the user Transaction to insert......!!!!!
    // ***************************************************************************
    const combinedFeedbackData = feedbackDtlDisplay?.map(item => {
        // Get the main answer corresponding to the current feedback item (based on fddet_slno)
        const answer = useranswer[item?.fddet_slno];

        // Check if there's a suggestion for the same question (e.g., 78_suggest for 78)
        const suggestion = useranswer[`${item?.fddet_slno}_suggest`];
        // Check if there's mobile data for the same question (e.g., 78_mobile for 78)
        const mobile = useranswer[`${item?.fddet_slno}_mobile`];
        // Return a new object combining the feedback details, answer, suggestion, and mobile

        const Obj_fb_mast_qakey_slno = item?.fb_mast_qakey_slno
            ? item?.fb_mast_qakey_slno?.split(', ')
                .reduce((obj, pair) => {
                    const [key, value] = pair?.split(': ');
                    obj[key] = value;
                    return obj;
                }, {})
            : {};

        // console.log(Obj_fb_mast_qakey_slno);

        const Obj_fb_mast_qakey_mark = item?.fb_mast_qakey_mark
            ? item?.fb_mast_qakey_mark?.split(', ')
                .reduce((obj, pair) => {
                    const [key, value] = pair?.split(': ');
                    obj[key] = value;
                    return obj;
                }, {})
            : {};


        //extracting the fbqa_slno and fbqa mark for the corresponding answers....?
        const fbqa_slno = Obj_fb_mast_qakey_slno[answer] || Obj_fb_mast_qakey_slno["Description Type"] || null;
        const fbqa_mark = Obj_fb_mast_qakey_mark[fbqa_slno] || null;

        return {
            fdmast_slno: item?.fdmast_slno,
            fb_category_slno: item?.fb_category_slno,
            fb_subcategory_slno: item?.fb_subcategory_slno,
            fddet_slno: item?.fddet_slno,
            fbqa_slno: Number(fbqa_slno),
            answer: Number(fbqa_mark),
            suggestion: suggestion || null,
            mobile: mobile || null,
            Descrpt: Number(fbqa_mark) === 0 ? answer : suggestion ? suggestion : null
        };
    });


    //FInal postdata for Feedback Submission
    const FinalInsertData = useMemo(() => ({
        fdmast_slno: Number(feedbackId),
        fb_ip_num: inpatientNumber ? inpatientNumber : null,
        fb_patient_num: patientNo ? patientNo : null,
        fb_patient_name: PatientName ? PatientName : null,
        fb_patient_mob: mobilenumber ? mobilenumber : null,
        fb_answers: combinedFeedbackData,
        fb_default_quest: defaultimpression ? defaultimpression : [],
        fb_default_reamark: defaultremarks ? defaultremarks : '',
        create_user: encodedId && atob(encodedId) === "3" ? 1 : Number(EmpauthId())
    }), [patientNo, PatientName, mobilenumber, combinedFeedbackData, feedbackId, inpatientNumber, defaultimpression, encodedId, defaultremarks])



    // Submit Feedback Forms
    const handlesubmit = useCallback(async () => {
        setLoading(true)
        const answerlength = Object.keys(useranswer)?.length;
        const clickedNoComplenth = Object.keys(isnoclicked)?.length;
        const isClickedNotMobileInput = Object.values(isnoclicked)?.includes("MobileInputBox")

        // if(feedbackId === "26" && (Object.keys(defaultimpression)?.length === 0)) use later if  the default questions are mantetary

        if ((feedbackDtlDisplay?.length + IsComponentPresent?.length) !== (answerlength + clickedNoComplenth)) {
            warningNofity("Please Answer all Questions?")
            setLoading(false)
            return
        }

        // && clickedNoComplenth === 0 this condition is for using if the current senario is not working
        if (ComponentName?.includes("MobileInputBox") && mobilenumber?.length < 10 && !isClickedNotMobileInput) {
            setMobileValidation("Enter a valid Mobile Number")
            setLoading(false)
            return
        }
        if (ComponentName?.includes("MobileInputBox") && mobilevalidation !== "") {
            warningNofity("Please check your Mobile Number");
            setLoading(false)
            return
        }
        try {
            const result = await axiosApi.post('/feedback/feedbackanswers', FinalInsertData);
            const { success } = result.data;
            if (success !== 2) return errorNofity("Error in inserting Feedback!")
            setIsSubmit(true)
            setUserAnswer({})
            setIsNoClicked({})
            setLoading(false)
        } catch (err) {
            warningNofity("Error in Submiting FeedbackForm:SERVER")
            setLoading(false)
        }
    }, [feedbackDtlDisplay, useranswer, FinalInsertData, IsComponentPresent, ComponentName, mobilevalidation, mobilenumber, isnoclicked])

    return (
        <>
            {
                issubmit ? (
                    <>
                        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                            <SuccessPage
                                setOpen={setOpen}
                                setIsSubmit={setIsSubmit}
                                feedbackId={feedbackId}
                                getFeedbackData={getFeedbackData}
                                PatientData={PatientData}
                                getDishcargePatientDetail={getDishcargePatientDetail}
                            />
                        </Suspense>
                    </>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        m: 0,
                        p: 0
                    }}>
                        <FeedBackLog CurrentCompany={getCurrentCompany?.[0]?.company_slno} />
                        {
                            PatientName && feedbackId !== "8" &&
                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                <PatientInfoHeader
                                    PatientName={PatientName}
                                    inpatientNumber={inpatientNumber}
                                    patientNo={patientNo}
                                    getCurrentCompany={getCurrentCompany} />
                            </Suspense>
                        }

                        {
                            PatientData && feedbackId === "8" && <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                    <DischargeDetailBox
                                        PatientNotRespondingRemark={PatientNotRespondingRemark}
                                        PatientData={PatientData}
                                        ReviewDetail={ReviewDetail}
                                        Relatives={Relatives}
                                        Children={Children}
                                    />
                                </Suspense>
                            </Box>
                        }
                        {
                            patientnotResponding && patientnotResponding?.length > 0 && feedbackId === "8" && <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                                    <PatientNotRespondingRemarkCard
                                        PatientRemark={patientnotResponding}
                                    />
                                </Suspense>
                            </Box>
                        }
                        <Box sx={{
                            width: '90%',
                            minHeight: '60vh',
                            mt: 3,
                            mb: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {
                                feedbackDtlDisplay?.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {
                                                item?.fb_question_type === "Normal" ? (
                                                    <Box sx={{
                                                        width: "95%",
                                                        minHeight: 70,
                                                        mt: 3,
                                                    }}>
                                                        <Suspense fallback={<QuestionBoxSkeleton />}>
                                                            <TextComponent
                                                                english={item?.fd_qa_eng}
                                                                malayalam={item?.fd_qa_malay}
                                                            />
                                                        </Suspense>
                                                    </Box>
                                                ) : (
                                                    <>
                                                        <Suspense fallback={<QuestionBoxSkeleton />}>
                                                            <QuestionBox
                                                                CurrentCompany={getCurrentCompany?.[0]?.company_slno}
                                                                english={item?.fd_qa_eng}
                                                                malayalam={item?.fd_qa_malay}
                                                            />
                                                        </Suspense>
                                                    </>
                                                )
                                            }
                                            <Suspense fallback={<EmojiSkeleton />}>
                                                <AnswerComponentSelect
                                                    CurrentCompany={getCurrentCompany?.[0]?.company_slno}
                                                    fbencodedId={fbencodedId}
                                                    type={item?.fb_rateing_name}
                                                    answer={item?.fb_mast_qakey_data}
                                                    questionid={item?.fddet_slno}
                                                    hanldeuseranswers={hanldeuseranswers}
                                                    component={item?.fb_answer_component}
                                                    setMobileValidation={setMobileValidation}
                                                    mobilevalidation={mobilevalidation}
                                                    setMobileNumber={setMobileNumber}
                                                    hanldecomponent={hanldecomponent}
                                                />
                                            </Suspense>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </Box>
                        {/* this part is only for discharge feedback */}
                        {
                            feedbackId === "8" && <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <Box sx={{ width: '86%', p: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <EditNoteTwoToneIcon sx={{ color: 'rgba(var(--icon-primary))', fontSize: 28 }} />
                                        <TextComponentBox name={`Enter Remarks`} size={14} />
                                    </Box>
                                    <textarea
                                        onChange={(e) => setDefaultRemarks(e.target.value)}
                                        value={defaultremarks}
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
                            </Box>
                        }
                        {/* the part ends here */}
                        <Box sx={{
                            width: { xs: "90%", sm: '85%' },
                            minHeight: 60,
                            mb: 2
                        }}>
                            <Box sx={{
                                widows: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Suspense fallback={"Loading"}>
                                    <FeedbackButton
                                        loading={loading}
                                        average={useranswer}
                                        handlesubmit={handlesubmit}
                                    />
                                </Suspense>
                            </Box>
                            <Typography sx={{
                                textAlign: 'center',
                                mt: 5,
                                fontSize: 8,
                                // color: " rgba(65, 68, 68, 0.64)",
                                color: 'rgba(var(--font-primary-white))',
                                fontFamily: "Bahnschrift",
                            }}>Copyright © 2025 Travancore Medicity</Typography>
                        </Box>
                    </Box >
                )
            }
        </>
    )
}

export default memo(FeedbackForm)