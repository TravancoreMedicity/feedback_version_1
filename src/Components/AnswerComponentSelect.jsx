import React, { useCallback, useState } from 'react';
import { Box, Textarea } from '@mui/joy';
import Rulesyesorno from '../Feedback/Rulesyesorno';
import ChooseEmoji from '../Feedback/ChooseEmoji';
import RadiologyCheckBox from '../Feedback/RadiologyFeedback/RadiologyCheckBox';

const AnswerComponentSelect = ({
    questionid,
    answer,
    type,
    hanldeuseranswers,
    component,
    setMobileValidation,
    mobilevalidation,
    setMobileNumber,
    hanldecomponent
}) => {


    const [textareavalue, setTextAreaValue] = useState("");
    const handleDescription = useCallback((e) => {
        setTextAreaValue(e.target.value)
        hanldeuseranswers(questionid, e.target.value)
    }, [hanldeuseranswers, textareavalue]);



    return (
        <Box sx={{ gap: { xs: 3, sm: 5, md: 4 }, display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
            {
                type && type === "Yes/No" ? (
                    <Rulesyesorno
                        questionid={questionid}
                        value={answer}
                        hanldeuseranswers={hanldeuseranswers}
                        component={component}
                        type={type}
                        setMobileValidation={setMobileValidation}
                        mobilevalidation={mobilevalidation}
                        setMobileNumber={setMobileNumber}
                        hanldecomponent={hanldecomponent}
                    />
                ) : type === "Description Type" ? (
                    <>
                        <Box sx={{
                            width: '100vw',
                            minHeight: 100,
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                width: { xs: "80%", sm: '85%' },
                                minHeight: 100,
                                borderRadius: '12px',
                                // bgcolor:'red'
                            }}>
                                <Textarea
                                    outline="contained"
                                    placeholder='Suggestions...!'
                                    onChange={handleDescription}
                                    value={textareavalue}
                                    minRows={2} sx={{
                                        width: '100%',
                                        minHeight: 100,
                                        mb: 1,
                                        border: '1px solid #CC488F',
                                        '&:focus': {
                                            outline: 'none',
                                            border: '1px solid #CC488F',
                                        },
                                        '&:hover': {
                                            border: '1px solid #CC488F', // Hover color
                                        },
                                    }} />

                            </Box>
                        </Box>
                    </>
                ) : type === "Checkbox Type" ? (
                    <>
                        <RadiologyCheckBox
                            questionid={questionid}
                            value={answer}
                            hanldeuseranswers={hanldeuseranswers}
                        />
                    </>
                ) : (
                    <>
                        <ChooseEmoji
                            questionid={questionid}
                            value={answer}
                            hanldeuseranswers={hanldeuseranswers}
                        />
                    </>
                )
            }
        </Box>
    );
};

export default AnswerComponentSelect;
