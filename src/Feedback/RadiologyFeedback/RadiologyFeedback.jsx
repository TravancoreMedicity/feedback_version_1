import { Box, Textarea, Typography } from '@mui/joy'
import React, { lazy, Suspense, useState } from 'react'
import FeedBackLog from '../FeedBackLog'
import RadiologyCheckBox from './RadiologyCheckBox'
import EmojiSkeleton from '../Commoncomponents/ChooseEmogjiSkeleton'
import QuestionBoxSkeleton from '../Commoncomponents/QuestionBoxSkeleton'
import { Items, Items2, Items3 } from '../Commoncomponents/Commondetal'
import TextComponentSkeleton from '../Commoncomponents/TextComponentSkeleton'
import FeedbackButton from '../Commoncomponents/FeedbackButton'


const QuestionBox = lazy(() => import('../QuestionBox'))
const ChooseEmoji = lazy(() => import('../ChooseEmoji'))
const TextComponent = lazy(() => import('../Commoncomponents/TextComponent'))

const RadiologyFeedback = () => {
    const [selected, setSelected] = useState({})
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [description, setDescription] = useState("")
    const handleEmojiSelect = (questionId, emojiId) => {
        setSelected((prevState) => ({
            ...prevState,
            [questionId]: emojiId,
        }));
    };

    const handlesumbit = () => {
        // resetAll()
        setSnackbarOpen(true)
        setTimeout(() => {
            setSnackbarOpen(false);  // This will set the state to false after 2 seconds
        }, 2000);
    }
    return (
        <Box sx={{
            // px: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            pb: 1
        }}>
            <FeedBackLog />
            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"How would you rate your overall experience wiht the radiology?"}
                    malayalam={"റേഡിയോളജിയിലെ നിങ്ങളുടെ മൊത്തത്തിലുള്ള അനുഭവം നിങ്ങൾ എങ്ങനെ വിലയിരുത്തും?"}
                    id={1}
                />
            </Suspense>
            <Suspense fallback={<EmojiSkeleton />}>
                <ChooseEmoji
                    setSelected={handleEmojiSelect}
                    questionid={1}
                    selected={selected[1]}
                />
            </Suspense>

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Was it easy to schedule your radiology appointment?"}
                    malayalam={"നിങ്ങളുടെ റേഡിയോളജി അപ്പോയിൻ്റ്മെൻ്റ് ഷെഡ്യൂൾ ചെയ്യുന്നത് എളുപ്പമായിരുന്നോ?"}
                    id={2}
                />
            </Suspense>
            <Suspense fallback={<EmojiSkeleton />}>
                <ChooseEmoji
                    setSelected={handleEmojiSelect}
                    questionid={2}
                    selected={selected[2]}
                />
            </Suspense>


            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"How would you rate the clarity and thorougness of the instructions provided before the radiology procedure?"}
                    malayalam={"റേഡിയോളജി നടപടിക്രമത്തിന് മുമ്പ് നൽകിയിരിക്കുന്ന നിർദ്ദേശങ്ങളുടെ വ്യക്തതയും സമഗ്രതയും നിങ്ങൾ എങ്ങനെ വിലയിരുത്തും?"}
                    id={3}
                />
            </Suspense>
            <Suspense fallback={<EmojiSkeleton />}>
                <ChooseEmoji
                    setSelected={handleEmojiSelect}
                    questionid={3}
                    selected={selected[3]}
                />
            </Suspense>

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"How Long did you wait for your radiology appointment?"}
                    malayalam={"നിങ്ങളുടെ റേഡിയോളജി അപ്പോയിൻ്റ്മെൻ്റിനായി നിങ്ങൾ എത്രത്തോളം കാത്തിരുന്നു?"}
                // id={3}
                />
            </Suspense>
            <RadiologyCheckBox
                value={Items}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Were the radiology staff(technicians,nurse,etc.)courteous and professional?"}
                    malayalam={"റേഡിയോളജി സ്റ്റാഫ് (സാങ്കേതിക വിദഗ്ധർ, നഴ്‌സ് മുതലായവ) മര്യാദയുള്ളവരും പ്രൊഫഷണലുകളുമായിരുന്നു?"}
                    id={4}
                />
            </Suspense>
            <Suspense fallback={<EmojiSkeleton />}>
                <ChooseEmoji
                    setSelected={handleEmojiSelect}
                    questionid={4}
                    selected={selected[4]}
                />
            </Suspense>

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Did the radiology staff explain the procedure and answer your questions satisfactorily?"}
                    malayalam={"റേഡിയോളജി സ്റ്റാഫ് നടപടിക്രമം വിശദീകരിക്കുകയും നിങ്ങളുടെ ചോദ്യങ്ങൾക്ക് തൃപ്തികരമായി ഉത്തരം നൽകുകയും ചെയ്തോ?"}
                    id={5}
                />
            </Suspense>
            <Suspense fallback={<EmojiSkeleton />}>
                <ChooseEmoji
                    setSelected={handleEmojiSelect}
                    questionid={5}
                    selected={selected[5]}
                />
            </Suspense>

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"How Comfortable were you during the Radiology Procedure?"}
                    malayalam={"റേഡിയോളജി പ്രക്രിയയിൽ നിങ്ങൾ എത്ര സുഖകരമായിരുന്നു?"}
                    id={6}
                />
            </Suspense>
            <Suspense fallback={<EmojiSkeleton />}>
                <ChooseEmoji
                    setSelected={handleEmojiSelect}
                    questionid={6}
                    selected={selected[6]}
                />
            </Suspense>

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Were you informed about when and how you would receive the results?"}
                    malayalam={"നിങ്ങൾക്ക് എപ്പോൾ, എങ്ങനെ ഫലങ്ങൾ ലഭിക്കുമെന്ന് നിങ്ങളെ അറിയിച്ചിരുന്നോ?"}
                />
            </Suspense>
            <RadiologyCheckBox
                value={Items2}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"How would you rate the cleanliness and organization of the radiology department?"}
                    malayalam={"റേഡിയോളജി വിഭാഗത്തിൻ്റെ വൃത്തിയും ഓർഗനൈസേഷനും നിങ്ങൾ എങ്ങനെ വിലയിരുത്തും?"}
                    id={7}
                />
            </Suspense>
            <Suspense fallback={<EmojiSkeleton />}>
                <ChooseEmoji
                    setSelected={handleEmojiSelect}
                    questionid={7}
                    selected={selected[7]}
                />
            </Suspense>


            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Were the results delivered to you in the promised time Frame?"}
                    malayalam={"വാഗ്‌ദത്ത സമയ ഫ്രെയിമിൽ ഫലങ്ങൾ നിങ്ങൾക്ക് എത്തിച്ചുതന്നിരുന്നോ?"}
                />
            </Suspense>
            <RadiologyCheckBox
                value={Items3}
            />


            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"How satisfied were you with the overall quality of the radiology services?"}
                    malayalam={"റേഡിയോളജി സേവനങ്ങളുടെ മൊത്തത്തിലുള്ള ഗുണനിലവാരത്തിൽ നിങ്ങൾ എത്രത്തോളം സംതൃപ്തനായിരുന്നു?"}
                    id={8}
                />
            </Suspense>
            <Suspense fallback={<EmojiSkeleton />}>
                <ChooseEmoji
                    setSelected={handleEmojiSelect}
                    questionid={8}
                    selected={selected[8]}
                />
            </Suspense>


            <Box sx={{
                width: { xs: "90%", sm: '85%' },
                minHeight: 150,
                mt: 3,
                mb: 2,
            }}>
                <Suspense fallback={<TextComponentSkeleton />
                }>
                    <TextComponent
                        english={"Do you have any suggestion or comments for improving the radiology services?"}
                        malayalam={"റേഡിയോളജി സേവനങ്ങൾ മെച്ചപ്പെടുത്തുന്നതിന് നിങ്ങൾക്ക് എന്തെങ്കിലും നിർദ്ദേശങ്ങളോ അഭിപ്രായങ്ങളോ ഉണ്ടോ"}
                    />
                </Suspense>
                <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    minRows={2} sx={{ mt: 1,
                     minHeight: 80, 
                     mb: 1 ,
                     border: '1px solid #CC488F',
                     '&:focus': {
                         outline: 'none', 
                         border: '1px solid #CC488F', 
                     },
                     
                     }} />
            </Box>
            <Box sx={{
                widows: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 4
            }}>
                <FeedbackButton
                    average={selected}
                handlesubmit={handlesumbit}
                setSnackbarOpen={setSnackbarOpen}
                snackbarOpen={snackbarOpen}
                />
            </Box>
            <Typography sx={{
                textAlign: 'center',
                mt: 5,
                fontSize: { xs: 8, sm: 10, md: 14, lg: 16 },
                color: " rgba(65, 68, 68, 0.64)",
                fontFamily: "Bahnschrift",
            }}>Copyright © 2025 Travancore Medicity</Typography>

        </Box>
    )
}

export default RadiologyFeedback