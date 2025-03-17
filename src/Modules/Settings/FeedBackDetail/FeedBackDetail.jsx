import React, { lazy, Suspense, useCallback, useState } from 'react';
import { Box, Typography } from '@mui/joy'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import Textarea from '@mui/joy/Textarea';
import { useQuery } from '@tanstack/react-query';
import { allfeedbackcollection, fetchFeedbackdtl } from '../../../Function/CommonFunction';
import CommonMenuList from '../../../Components/CommonMenuList';
import CustomCheckBoxWithLabel from '../../../Components/CustomCheckBoxWithLabel';
import SelectCmpCategoryMaster from '../../../Components/SelectCmpCategoryMaster'
import SelectSubCategoryMaster from '../../../Components/SelectSubCategoryMaster';
import MasterPageLayout from '../../../Components/MasterPageLayout'
import SelectFeedbackMaster from '../../../Components/SelectFeedbackMaster';
import { employeeID, errorNofity, succesNofity, validateEnglishInput, warningNofity } from '../../../Constant/Constant';
import { axiosApi } from '../../../Axios/Axios';
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil, Star, ThumbsUp, ThumbsDown, CheckCircle } from "iconoir-react";
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import SelectFeedbackRating from '../../../Components/SelectFeedbackRating';
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel';
import RatingSection from '../../../Components/RatingSection ';
import SelectAnswerComponent from '../../../Components/SelectAnswerComponent';
import { component } from '../../../Feedback/Commoncomponents/Commondetal';
import CheckBoxSection from '../../../Components/CheckBoxSection';
// import { PageStar, PrivacyPolicy } from 'iconoir-react'



const FeedbackCategoryMasterList = lazy(() => import('../../../Components/CustomTable'));

const FeedBackDetail = () => {

    const [updateflag, setUpdateFlag] = useState(0)
    const [updationdetail, setUpdateDetial] = useState({})
    const [currentFeedbackData, setCurrentFeedbackData] = useState("")
    const [answers, setAnswers] = useState({})
    const [checkboxanswer, setCheckBoxAnswer] = useState({})
    const [count, setCount] = useState(2);
    const [feedbackdetail, setFeedbackDetail] = useState({
        categoryid: null,
        subcategoryid: null,
        selected: null,
        english: "",
        malayalam: "",
        feedbackid: null,
        status: false,
        QuesitonType: "",
        Suggestion: false,
        componentid: 0
    })




    const [yesorno, setYesOrNo] = useState({
        Yes: "",
        No: "",
    })
    const { Yes, No } = yesorno;

    const handleYesorNoAnswer = useCallback(async (e) => {
        const { name, value } = e.target;
        setYesOrNo({ ...yesorno, [name]: value })
    }, [yesorno])

    const { fb_mast_qakey_data } = updationdetail;
    const resultObject = fb_mast_qakey_data !== null && fb_mast_qakey_data !== undefined ? Object.fromEntries(
        fb_mast_qakey_data?.split(', ').map(item => item.split(': '))
    ) : {}

    const filteredData = Object.keys(checkboxanswer)
        .filter(key => !resultObject.hasOwnProperty(key))
        .reduce((obj, key) => {
            obj[key] = checkboxanswer[key];
            return obj;
        }, {});





    const hanldeinputData = useCallback(async (e) => { //usecallback
        const { name, value } = e.target;
        setFeedbackDetail({ ...feedbackdetail, [e.target.name]: e.target.value })
        if (name === "feedbackid") {
            setCurrentFeedbackData(value)
        }
        if (name === "feedbackid" && value !== currentFeedbackData) {
            setAnswers({})
            setYesOrNo({ Yes: "", No: "" })
            setCheckBoxAnswer({})
            setCount(2)
            setFeedbackDetail({
                categoryid: null,
                subcategoryid: null,
                selected: null,
                english: "",
                malayalam: "",
                status: false,
                QuesitonType: "",
                Suggestion: false,
                componentid: 0
            })
        }
    }, [feedbackdetail, setCount, setCheckBoxAnswer, setYesOrNo, setAnswers, currentFeedbackData]);

    const handleInputChange = useCallback((ratingKey, value) => {
        setAnswers((prevValues) => ({
            ...prevValues,
            [ratingKey]: value,
        }));
    }, []);



    const handleCheckBoxAnswer = useCallback((key, value) => {
        setCheckBoxAnswer((prev) => {
            const updatedAnswers = { ...prev }
            if (value === "") {
                delete updatedAnswers[key]
            } else {
                updatedAnswers[key] = value;
            }
            return updatedAnswers;
        })
    }, []);

    const { data: feedbackdtl, refetch: feedbackdtlrefetch } = useQuery({
        queryKey: ['fetchcurrentfbdtl', currentFeedbackData],
        queryFn: () => fetchFeedbackdtl(currentFeedbackData),
        enabled: currentFeedbackData !== 0
    })

    const { data: allratingtype } = useQuery({
        queryKey: ['allcollectiontype'],
        queryFn: () => allfeedbackcollection(),
    })


    const {
        categoryid,
        subcategoryid,
        selected,
        english,
        malayalam,
        feedbackid,
        status,
        QuesitonType,
        Suggestion,
        componentid
    } = feedbackdetail;

    const Component = component?.filter(item => item.value === componentid)
    const ratingType = allratingtype && selected ? allratingtype?.filter(item => item.fb_rateing_slno === selected) : '';
    const ratingName = ratingType.length > 0 ? ratingType[0]?.fb_rateing_name.trim() : '';
    const ComponentName = Component.length > 0 ? Component[0]?.label.trim() : '';

    const ValidateAnswer = useCallback(() => {
        const size = Object.keys(answers).length;

        if (ratingName === "5 Star Rating" && size !== 5) {
            warningNofity(`Please enter all ${5 - size}  Answer`)
            return false
        }
        if (ratingName === "3 Star Rating" && size !== 3) {
            warningNofity(`Please enter all ${3 - size}  Answer`);
            return false
        }

        if (ratingName === "Yes/No" && (Yes === "" || No === "")) {
            warningNofity(`Please enter all the Answers`);
            return false
        }
        return true
    }, [ratingName, answers, yesorno,Yes,No])


    const HanldeUpdation = useCallback(
        async (rowData) => {
            console.log(rowData, "data");

            const { fb_mast_qakey_data, fb_rateing_slno, fb_answer_component } = rowData;
            const Component = rowData && component?.filter(item => item.label === fb_answer_component);
            const ComponentId = Component?.length > 0 ? Component[0]?.value : '';
            const resultObject = fb_mast_qakey_data !== null && fb_mast_qakey_data !== undefined ? Object.fromEntries(
                fb_mast_qakey_data?.split(', ').map(item => item.split(': '))
            ) : {}
            const size = Object.keys(resultObject).length;
            if (fb_rateing_slno === 1 && Object.keys(resultObject).length > 0) {
                setYesOrNo({
                    Yes: resultObject.Yes,
                    No: resultObject.No,
                })
            } else if (fb_rateing_slno === 2) {
                setCount(size)
                setCheckBoxAnswer({
                    ...resultObject, // Merge with the new resultObject
                });
            } else {
                setAnswers({
                    ...resultObject, // Merge with the new resultObject
                });
            }
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setFeedbackDetail({
                categoryid: rowData.fb_category_slno,
                subcategoryid: rowData.fb_subcategory_slno,
                selected: rowData.fb_rateing_slno,
                english: rowData.fd_qa_eng,
                malayalam: rowData.fd_qa_malay,
                feedbackid: rowData.fdmast_slno,
                QuesitonType: rowData.fb_question_type,
                Suggestion: rowData.fb_answer_component !== null ? true : false,
                componentid: ComponentId,
                status: rowData.feedback_status === 1 ? true : false,
            })
        },
        []
    );



    const handleDocInformationSubmit = useCallback(async () => {
        if (!feedbackid && !currentFeedbackData) return warningNofity("Please Select the feedback");
        if (!categoryid) return warningNofity("Please Select the category");
        if (!subcategoryid) return warningNofity("Please Select the subcategory");
        if (QuesitonType === "") return warningNofity("Please Select the QuesitonType");
        if (english === "") return warningNofity("Please enter the Question in english");
        if (!validateEnglishInput(english)) return warningNofity("Only enter the Question in English ");
        if (malayalam === "") return warningNofity("Please enter the Question in malayalam");
        // if (!validateMalayalamInput(malayalam)) return warningNofity("Only enter the Question in Malayalm ");
        if (!selected) return warningNofity("Please Select the Answer Type!");

        if (Suggestion && componentid === 0) return warningNofity("Please select  Required Component")

        if (!ValidateAnswer()) return;

        const insertData = {
            fdmast_slno: feedbackid ? feedbackid : currentFeedbackData,
            fb_category_slno: categoryid,
            fb_subcategory_slno: subcategoryid,
            fd_qa_malay: malayalam,
            fd_qa_eng: english,
            fb_rateing_slno: selected,
            fb_question_type: QuesitonType,
            fb_answer_component: ComponentName ? ComponentName : null,
            feedback_status: status,
            rating_name: selected && selected === 6 ? { "Description": "Description Type" } : answers && Object.keys(answers).length > 0 ? answers : checkboxanswer && Object.keys(checkboxanswer).length > 0 ? checkboxanswer : yesorno,
            create_user: employeeID()
        }

        const UpdateinsertingData = {
            fdt_slno: updationdetail.fdt_slno,
            fdmast_slno: feedbackid ? feedbackid : currentFeedbackData,
            fb_category_slno: categoryid,
            fb_subcategory_slno: subcategoryid,
            fd_qa_malay: malayalam,
            fd_qa_eng: english,
            fb_rateing_slno: selected,
            fb_question_type: QuesitonType,
            fb_answer_component: ComponentName ? ComponentName : null,
            feedback_status: status,
            rating_name: selected && selected === 6 ? { "Description": "Description Type" } : answers && Object.keys(answers).length > 0 ? answers : filteredData && Object.keys(filteredData).length > 0 ? filteredData : checkboxanswer && Object.keys(checkboxanswer).length > 0 ? checkboxanswer : yesorno,
            edit_user: employeeID()
        }

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertfeedbackDetail", insertData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                succesNofity("Successfully Inserted Data..!")
                feedbackdtlrefetch()
                setAnswers({})
                setCheckBoxAnswer({})
                setCount(2)
                setYesOrNo({ Yes: "", No: "" })
                setFeedbackDetail({
                    categoryid: null,
                    subcategoryid: null,
                    selected: null,
                    english: "",
                    malayalam: "",
                    status: false,
                    QuesitonType: "",
                    Suggestion: false,
                    componentid: 0
                })
            } catch (error) {
                warningNofity(error)
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatefeedbackDetail", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                succesNofity("Successfully Updated Data..!")
                feedbackdtlrefetch()
                setUpdateFlag(0)
                setAnswers({})
                setCheckBoxAnswer({})
                setCount(2)
                setYesOrNo({ Yes: "", No: "" })
                setFeedbackDetail({
                    categoryid: null,
                    subcategoryid: null,
                    selected: null,
                    english: "",
                    malayalam: "",
                    status: false,
                    QuesitonType: "",
                    Suggestion: false,
                    componentid: 0
                })
            } catch (error) {
                warningNofity(error)
            }
        }
    }, [feedbackid, currentFeedbackData, categoryid, subcategoryid, QuesitonType, english, malayalam, Suggestion, selected, ValidateAnswer, updateflag, componentid, ComponentName, answers, checkboxanswer, feedbackdtlrefetch, updationdetail, filteredData, yesorno, status]);

    return (
        <>
            <DefaultPageLayout label="FeedBack  Details Master" >
                <MasterPageLayout>

                    {/* Feedback Master select Box */}
                    <SelectFeedbackMaster
                        label={'Select the Feedback'}
                        value={feedbackid ? feedbackid : currentFeedbackData}
                        handleChange={(e, val) => hanldeinputData({ target: { name: 'feedbackid', value: val } })}
                    />

                    {
                        feedbackid || currentFeedbackData ? <>
                            <SelectCmpCategoryMaster
                                label={'Select the Category'}
                                value={categoryid}
                                handleChange={(e, val) => hanldeinputData({ target: { name: 'categoryid', value: val } })}
                            />

                            <SelectSubCategoryMaster
                                label={'Select the Subcategory'}
                                value={subcategoryid}
                                categoryid={categoryid}
                                handleChange={(e, val) => hanldeinputData({ target: { name: 'subcategoryid', value: val } })}
                            />

                            <Typography level='body-sm'
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: "var(--font-varient)",
                                    opacity: 0.8,
                                    paddingLeft: "0.26rem",
                                    lineHeight: "1.0rem",
                                    fontSize: "0.81rem",
                                    color: 'rgba(var(--font-primary-white))',
                                    paddingY: "0.26rem",
                                }}
                                fontSize='0.7rem'
                            >Select The Question Type</Typography>
                            <Box className="flex flex-1 items-center gap-3 py-[0.299rem]">
                                <CustomCheckBoxWithLabel
                                    label="Contained"
                                    checkBoxValue={QuesitonType === "Contained"}
                                    handleCheckBoxValue={(e) => hanldeinputData({ target: { name: "QuesitonType", value: "Contained" } })}
                                />
                                <CustomCheckBoxWithLabel
                                    label="Normal"
                                    checkBoxValue={QuesitonType === "Normal"}
                                    handleCheckBoxValue={(e) => hanldeinputData({ target: { name: "QuesitonType", value: "Normal" } })}
                                />
                            </Box>

                            <Typography level='body-sm'
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: "var(--font-varient)",
                                    opacity: 0.8,
                                    paddingLeft: "0.26rem",
                                    lineHeight: "1.0rem",
                                    fontSize: "0.81rem",
                                    color: 'rgba(var(--font-primary-white))',
                                    paddingY: "0.26rem",
                                }}
                                fontSize='0.7rem'
                            >Enter the Question in English</Typography>
                            <Textarea
                                placeholder="Type here..."
                                minRows={2}
                                value={english}
                                onChange={(e) =>
                                    hanldeinputData({ target: { name: 'english', value: e.target.value } })
                                }
                                sx={{
                                    transition: 'none',
                                    "&.MuiTextarea-root": {
                                        "--Textarea-focusedHighlight": 'none',
                                        "--Textarea-focusedShadow": "none",
                                        "--Textarea-focusedThickness": "1.1px",
                                    },
                                    fontSize: 15,
                                    fontFamily: "var(--font-varient)",
                                    borderWidth: "2.8px",
                                    borderRadius: "6px",
                                    backgroundColor: 'rgba(var(--input-bg-color))',
                                    borderColor: 'rgba(var(--input-border-color))',
                                    color: 'rgba(var(--input-font-color))',
                                    boxShadow: "none",
                                    ':hover': {
                                        backgroundColor: 'rgba(var(--input-hover-bg-color))',
                                        borderColor: 'rgba(var(--input-hover-border-color))',
                                        color: 'rgba(var(--input-hover-font-color))',
                                        '.iconColor': {
                                            color: 'rgba(var(--icon-green))',
                                        }
                                    },
                                }}
                            />
                            <Typography level='body-sm'
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: "var(--font-varient)",
                                    opacity: 0.8,
                                    paddingLeft: "0.26rem",
                                    lineHeight: "1.0rem",
                                    fontSize: "0.81rem",
                                    color: 'rgba(var(--font-primary-white))',
                                    paddingY: "0.26rem",

                                }}
                                fontSize='0.7rem'
                            >Enter the Question in Malayalam</Typography>

                            <Textarea
                                placeholder="Type here..."
                                minRows={2}
                                value={malayalam}
                                onChange={(e) =>
                                    hanldeinputData({ target: { name: 'malayalam', value: e.target.value } })
                                }
                                sx={{
                                    transition: 'none',
                                    "&.MuiTextarea-root": {
                                        "--Textarea-focusedHighlight": 'none',
                                        "--Textarea-focusedShadow": "none",
                                        "--Textarea-focusedThickness": "1.1px",
                                    },
                                    fontSize: 15,
                                    fontFamily: "var(--font-varient)",
                                    borderWidth: "2.8px",
                                    borderRadius: "6px",
                                    backgroundColor: 'rgba(var(--input-bg-color))',
                                    borderColor: 'rgba(var(--input-border-color))',
                                    color: 'rgba(var(--input-font-color))',
                                    boxShadow: "none",
                                    ':hover': {
                                        backgroundColor: 'rgba(var(--input-hover-bg-color))',
                                        borderColor: 'rgba(var(--input-hover-border-color))',
                                        color: 'rgba(var(--input-hover-font-color))',
                                        '.iconColor': {
                                            color: 'rgba(var(--icon-green))',
                                        }
                                    },
                                }}
                            />

                            <SelectFeedbackRating
                                label={'Select the Answer Type'}
                                value={selected}
                                handleChange={(e, val) => {
                                    // Update the selected value
                                    hanldeinputData({ target: { name: 'selected', value: val } });
                                    // Reset the answers to an empty object
                                    setAnswers({});
                                    setCheckBoxAnswer({});
                                    // setYesOrNo({})
                                }}
                            />
                            {selected && ratingName === '5 Star Rating' ? (
                                <RatingSection
                                    ratingType="5 Star Rating"
                                    icon={<Star color="rgba(var(--icon-primary))" cursor="pointer" />}
                                    ratingCount={5}
                                    onInputChange={handleInputChange}
                                    answers={answers}
                                />
                            ) : null}
                            {selected && ratingName === '3 Star Rating' ? (
                                <RatingSection
                                    ratingType="3 Star Rating"
                                    icon={<Star color="rgba(var(--icon-primary))" cursor="pointer" />}
                                    ratingCount={3}
                                    onInputChange={handleInputChange}
                                    answers={answers}

                                />
                            ) : null}
                            {selected && ratingName === '6 Star Rating' ? (
                                <RatingSection
                                    ratingType="6 Star Rating"
                                    icon={<Star color="rgba(var(--icon-primary))" cursor="pointer" />}
                                    ratingCount={6}
                                    onInputChange={handleInputChange}
                                    answers={answers}
                                />
                            ) : null}
                            {selected && ratingName === 'Checkbox Type' ? (
                                <CheckBoxSection
                                    count={count}
                                    setCount={setCount}
                                    onInputChange={handleCheckBoxAnswer}
                                    answers={checkboxanswer}
                                />
                            ) : null}

                            {selected && ratingName === 'Yes/No' ? (
                                <Box sx={{ width: 450, mb: 2 }}>
                                    <Box sx={{ display: 'flex', mt: 2 }}>
                                        <Typography level='body-sm'
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: "var(--font-varient)",
                                                opacity: 0.8,
                                                paddingLeft: "0.26rem",
                                                lineHeight: "1.0rem",
                                                fontSize: "1.01rem",
                                                color: 'rgba(var(--font-primary-white))',
                                                paddingY: "0.26rem",

                                            }}
                                            fontSize='0.7rem'
                                        >1.Yes</Typography>
                                        <Box sx={{ mx: 1 }}>
                                            <ThumbsUp
                                                color="rgba(var(--icon-primary))"
                                                cursor={"pointer"}
                                            /></Box>
                                        <CustomInputWithLabel
                                            values={Yes}
                                            handleInputChange={(e) => handleYesorNoAnswer({ target: { name: 'Yes', value: e.target.value } })}
                                            placeholder="Type here ..."
                                            sx={{}}
                                            type="text"
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', mt: 2 }}>
                                        <Typography level='body-sm'
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: "var(--font-varient)",
                                                opacity: 0.8,
                                                paddingLeft: "0.26rem",
                                                lineHeight: "1.0rem",
                                                fontSize: "1.01rem",
                                                color: 'rgba(var(--font-primary-white))',
                                                paddingY: "0.26rem",

                                            }}
                                            fontSize='0.7rem'
                                        >2.No</Typography>
                                        <Box sx={{ mx: 1 }}>
                                            <ThumbsDown
                                                color="rgba(var(--icon-primary))"
                                                cursor={"pointer"}
                                            /></Box>
                                        <CustomInputWithLabel
                                            values={No}
                                            handleInputChange={(e) => handleYesorNoAnswer({ target: { name: 'No', value: e.target.value } })}
                                            placeholder="Type here ..."
                                            sx={{}}
                                            type="text"
                                        />
                                    </Box>

                                    <Box className="flex flex-1 items-center justify-between py-[0.299rem]">
                                        <CustomCheckBoxWithLabel
                                            label="Need Suggestion"
                                            checkBoxValue={Suggestion}
                                            handleCheckBoxValue={(e) => hanldeinputData({ target: { name: "Suggestion", value: e.target.checked } })}
                                        />
                                    </Box>
                                    {
                                        Suggestion &&
                                        <>
                                            <SelectAnswerComponent
                                                label={'Select Component'}
                                                value={componentid}
                                                handleChange={(e, val) => {
                                                    hanldeinputData({ target: { name: 'componentid', value: val } })
                                                }
                                                }
                                            />
                                        </>
                                    }

                                </Box>
                            ) : null}
                            <Box className="flex flex-1 items-center justify-between py-[0.299rem]">
                                <CustomCheckBoxWithLabel
                                    label="Detail Status"
                                    checkBoxValue={status}
                                    handleCheckBoxValue={(e) => hanldeinputData({ target: { name: "status", value: e.target.checked } })}
                                />
                            </Box>

                        </> : null
                    }
                    <CommonMenuList
                        handleSubmitButtonFun={handleDocInformationSubmit}
                    // handleViewButtonFun={() => setValue("2")}
                    />
                </MasterPageLayout>
                <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                    <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Feedback Name', 'Category Name', 'SubCategory Name', 'Quest English', 'Quest Malayalam', 'Rating Type', 'Status', 'Action']} >
                        {
                            feedbackdtl?.map((item, idx) => (
                                <tr key={idx} >
                                    <td>{item.slno}</td>
                                    <td>{item.feedback_name?.toUpperCase()}</td>
                                    <td>{item.fb_category_name?.toUpperCase()}</td>
                                    <td style={{ overflowX: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.fb_subcategory_name?.toUpperCase()}</td>
                                    <td style={{ overflowX: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.fd_qa_eng?.toUpperCase()}</td>
                                    <td style={{ overflowX: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.fd_qa_malay?.toUpperCase()}</td>
                                    <td>{item.fb_rateing_name?.toUpperCase()}</td>
                                    <td>{item.feedback_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
                                    <td><Tooltip title="Edit Data" placement="top">
                                        <IconButton
                                            variant="outlined"
                                            size="sm"
                                            onClick={() => HanldeUpdation(item)}
                                            sx={{
                                                ":hover": {
                                                    backgroundColor: "transparent",
                                                    border: "0.03px solid rgba(var(--color-pink))",
                                                },
                                            }}
                                        >
                                            <EditPencil
                                                height={18}
                                                width={18}
                                                color="rgba(var(--icon-primary))"
                                                cursor={"pointer"}
                                            />
                                        </IconButton>
                                    </Tooltip></td>
                                </tr>
                            ))
                        }
                    </FeedbackCategoryMasterList>
                </Suspense>
            </DefaultPageLayout>
        </>
    )
}

export default FeedBackDetail