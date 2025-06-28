import React, { lazy, memo, Suspense, useCallback, useState } from 'react';
import { Box, Textarea } from '@mui/joy';
import EmojiSkeleton from '../Feedback/Commoncomponents/ChooseEmogjiSkeleton';
import { removeEmojis } from '../Constant/Constant';


const ChooseEmoji = lazy(() => import('../Feedback/ChooseEmoji'))
const Rulesyesorno = lazy(() => import('../Feedback/Rulesyesorno'))
const RadiologyCheckBox = lazy(() => import('../Feedback/RadiologyFeedback/RadiologyCheckBox'))

const AnswerComponentSelect = ({
    questionid,
    answer,
    type,
    hanldeuseranswers,
    component,
    setMobileValidation,
    mobilevalidation,
    setMobileNumber,
    hanldecomponent,
    fbencodedId,
    CurrentCompany
}) => {

    const [textareavalue, setTextAreaValue] = useState("");

    const handleDescription = useCallback((e) => {
        setTextAreaValue(e.target.value)
        const sanitizedValue = removeEmojis(e.target.value)
        //changed e.target.value to sanitizedValue
        hanldeuseranswers(questionid, sanitizedValue)
    }, [hanldeuseranswers, questionid]);



    return (
        <Box sx={{ gap: { xs: 3, sm: 5, md: 4 }, display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
            {
                type && type === "Yes/No" ? (
                    <Suspense fallback={<EmojiSkeleton />}>
                        <Rulesyesorno
                            fbencodedId={fbencodedId}
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
                    </Suspense>
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
                                width: fbencodedId !== undefined ? '70%' : { xs: "80%", sm: '85% ' },
                                minHeight: 100,
                                borderRadius: '12px',
                            }}>
                                <Textarea
                                    outline="contained"
                                    placeholder='Suggestions...!'
                                    onChange={handleDescription}
                                    value={textareavalue}
                                    minRows={2}
                                    sx={{
                                        width: '100%',
                                        minHeight: 100,
                                        backgroundColor: "rgba(var(--bg-card))",
                                        color: 'rgba(var(--font-primary-white))',
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
                        <Suspense fallback={<EmojiSkeleton />}>
                            <RadiologyCheckBox
                                questionid={questionid}
                                value={answer}
                                hanldeuseranswers={hanldeuseranswers}
                            />
                        </Suspense>
                    </>
                ) : (
                    <>
                        <Suspense fallback={<EmojiSkeleton />}>
                            <ChooseEmoji
                                CurrentCompany={CurrentCompany}
                                questionid={questionid}
                                value={answer}
                                hanldeuseranswers={hanldeuseranswers}
                            />
                        </Suspense>
                    </>
                )
            }
        </Box>
    );
};

export default memo(AnswerComponentSelect);
