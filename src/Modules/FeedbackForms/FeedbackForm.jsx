import { useLocation, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/joy'
import { axiosApi } from '../../Axios/Axios';
import { useQuery } from '@tanstack/react-query';
import { errorNofity, warningNofity } from '../../Constant/Constant';
import { FeedbackDetailForDisplay } from '../../Function/CommonFunction';
import EmojiSkeleton from '../../Feedback/Commoncomponents/ChooseEmogjiSkeleton';
import QuestionBoxSkeleton from '../../Feedback/Commoncomponents/QuestionBoxSkeleton';
import React, { memo, lazy, useState, useCallback, useEffect, useMemo, Suspense } from 'react'


const TextComponent = lazy(() => import('../../Feedback/Commoncomponents/TextComponent'))
const SuccessPage = lazy(() => import('../../Components/SuccessPage'))
const FeedBackLog = lazy(() => import('../../Feedback/FeedBackLog'))
const QuestionBox = lazy(() => import('../../Feedback/QuestionBox'))
const FeedbackButton = lazy(() => import('../../Feedback/Commoncomponents/FeedbackButton'))
const AnswerComponentSelect = lazy(() => import('../../Components/AnswerComponentSelect'))


const FeedbackForm = () => {
    const [useranswer, setUserAnswer] = useState({});
    const [issubmit, setIsSubmit] = useState(false);
    const [mobilevalidation, setMobileValidation] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [isnoclicked, setIsNoClicked] = useState({})
    const [formData, setFormData] = useState({
        PatientName: "",
        feedbackId: 0,
        inpatientNumber: 0,
        patientNo: 0,
    });
    const { encodedId } = useParams();
    const location = useLocation();
    const { PatientName, feedbackId, inpatientNumber, patientNo } = formData;

    useEffect(() => {
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
            warningNofity("Error decoding Base64:", error);
        }
    }, [encodedId, location.search])

    const { data: feedbackDtlDisplay } = useQuery({
        queryKey: ['fetchfbdtldispay', feedbackId],
        queryFn: () => FeedbackDetailForDisplay(feedbackId),
        enabled: feedbackId !== 0
    });

    const IsComponentPresent = feedbackDtlDisplay &&
        feedbackDtlDisplay?.filter(item => item?.fb_answer_component !== null && item?.fb_answer_component !== "");

    const ComponentName = IsComponentPresent?.map((item) => item?.fb_answer_component);

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
        // create_user: Number(feedbackId) === 18 ? 1 : Number(employeeID()) //confusion in this part check later
        create_user: 1 //confusion in this part check later
    }), [patientNo, PatientName, mobilenumber, combinedFeedbackData, feedbackId, inpatientNumber])



    const handlesubmit = useCallback(async () => {

        const answerlength = Object.keys(useranswer)?.length;
        const clickedNoComplenth = Object.keys(isnoclicked)?.length;
        const isClickedNotMobileInput = Object.values(isnoclicked)?.includes("MobileInputBox")

        if ((feedbackDtlDisplay?.length + IsComponentPresent?.length) !== (answerlength + clickedNoComplenth)) {
            warningNofity("Please Answer all Questions?")
            return
        }

        // && clickedNoComplenth === 0 this condition is for using if the current senario is not working
        if (ComponentName?.includes("MobileInputBox") && mobilenumber?.length < 10 && !isClickedNotMobileInput) {
            setMobileValidation("Enter a valid Mobile Number")
            return
        }
        if (ComponentName?.includes("MobileInputBox") && mobilevalidation !== "") {
            warningNofity("Please check your Mobile Number");
            return
        }
        try {
            const result = await axiosApi.post('/feedback/feedbackanswers', FinalInsertData);
            const { success } = result.data;
            if (success !== 2) return errorNofity("Error in inserting Feedback!")
            setIsSubmit(true)
            setUserAnswer({})
            setIsNoClicked({})
        } catch (err) {
            warningNofity("Error in Submiting FeedbackForm:SERVER")
        }
    }, [feedbackDtlDisplay, useranswer, FinalInsertData, IsComponentPresent, ComponentName, mobilevalidation, mobilenumber, isnoclicked])

    return (
        <>
            {
                issubmit ? (
                    <>
                        <Suspense fallback={"Loading...!"}>
                            <SuccessPage setIsSubmit={setIsSubmit} />
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
                        <FeedBackLog />
                        {
                            PatientName && <Box sx={{
                                width: '86%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 1,
                                //    ? border: '0.1px solid rgba(var(--font-primary-white))',
                                borderRadius: 5,
                                bgcolor: '#e3f2fd'
                            }}>
                                {/* <Box> */}
                                <Typography sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                }} fontWeight={600} fontSize={{ xs: 8, sm: 12, md: 12, lg: 14, xl: 15 }}>PT NAME :{PatientName}</Typography>
                                <Typography sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                }} fontWeight={600} fontSize={{ xs: 8, sm: 12, md: 12, lg: 14, xl: 15 }}>IP NO :{inpatientNumber}</Typography>
                                <Typography sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                }} fontWeight={600} fontSize={{ xs: 8, sm: 12, md: 12, lg: 14, xl: 15 }}>MRD NO :{patientNo}</Typography>

                                {/* </Box> */}
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
                                                                english={item?.fd_qa_eng}
                                                                malayalam={item?.fd_qa_malay}
                                                            />
                                                        </Suspense>
                                                    </>
                                                )
                                            }
                                            <Suspense fallback={<EmojiSkeleton />}>
                                                <AnswerComponentSelect
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
                                        average={useranswer}
                                        handlesubmit={handlesubmit}
                                    />
                                </Suspense>
                            </Box>
                            <Typography sx={{
                                textAlign: 'center',
                                mt: 5,
                                fontSize: 8,
                                color: " rgba(65, 68, 68, 0.64)",
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