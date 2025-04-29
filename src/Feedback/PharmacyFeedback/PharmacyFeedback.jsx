// import { Box, Textarea, Typography } from '@mui/joy'
// import React, { lazy, Suspense, useState } from 'react'
// import FeedBackLog from '../FeedBackLog'
// import RadiologyCheckBox from '../RadiologyFeedback/RadiologyCheckBox'
// import EmojiSkeleton from '../Commoncomponents/ChooseEmogjiSkeleton'
// import QuestionBoxSkeleton from '../Commoncomponents/QuestionBoxSkeleton'
// import { Items, Items2, Items3, Items4, Items5 } from '../Commoncomponents/Commondetal'
// import TextComponentSkeleton from '../Commoncomponents/TextComponentSkeleton'
// import FeedbackButton from '../Commoncomponents/FeedbackButton'


// const QuestionBox = lazy(() => import('../QuestionBox'))
// const ChooseEmoji = lazy(() => import('../ChooseEmoji'))
// const TextComponent = lazy(() => import('../Commoncomponents/TextComponent'))

// const PharmacyFeedback = () => {
//     const [selected, setSelected] = useState({})
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [description, setDescription] = useState("")
//     const handleEmojiSelect = (questionId, emojiId) => {
//         setSelected((prevState) => ({
//             ...prevState,
//             [questionId]: emojiId,
//         }));
//     };

//     const handlesumbit = () => {
//         // resetAll()
//         setSnackbarOpen(true)
//         setTimeout(() => {
//             setSnackbarOpen(false);  // This will set the state to false after 2 seconds
//         }, 2000);
//     }
//     return (
//         <Box sx={{
//             // px: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             scrollbarWidth: 'none',
//             '&::-webkit-scrollbar': {
//                 display: 'none',
//             },
//             pb: 1
//         }}>
//             <FeedBackLog />
//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"How would you rate your overall experience wiht the Pharmacy?"}
//                     malayalam={"ഫാർമസിയിലെ നിങ്ങളുടെ മൊത്തത്തിലുള്ള അനുഭവം നിങ്ങൾ എങ്ങനെ വിലയിരുത്തും?"}
//                     id={1}
//                 />
//             </Suspense>
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={1}
//                     selected={selected[1]}
//                 />
//             </Suspense>

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"How easy was it to locate the pharmacy within the hospital?"}
//                     malayalam={"ആശുപത്രിക്കുള്ളിൽ ഫാർമസി കണ്ടെത്തുന്നത് എത്ര എളുപ്പമായിരുന്നു??"}
//                     id={2}
//                 />
//             </Suspense>
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={2}
//                     selected={selected[2]}
//                 />
//             </Suspense>


//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Were the medications you needed availabel at eht pharmacy?"}
//                     malayalam={"നിങ്ങൾക്ക് ആവശ്യമായ മരുന്നുകൾ eht ഫാർമസിയിൽ ലഭ്യമാണോ?"}
//                 // id={3}
//                 />
//             </Suspense>
//             <RadiologyCheckBox
//                 value={Items4}
//             />

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"How would you rate the behaviour and Professionalisum of the Pharmacy Staff?"}
//                     malayalam={"ഫാർമസി സ്റ്റാഫിൻ്റെ പെരുമാറ്റവും പ്രൊഫഷണലിസവും നിങ്ങൾ എങ്ങനെ വിലയിരുത്തും?"}
//                     id={3}
//                 />
//             </Suspense>
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={3}
//                     selected={selected[3]}
//                 />
//             </Suspense>

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"How Long did you wait to get Medications?"}
//                     malayalam={"മരുന്നുകൾ ലഭിക്കാൻ എത്രനാൾ കാത്തിരുന്നു?"}
//                 // id={3}
//                 />
//             </Suspense>
//             <RadiologyCheckBox
//                 value={Items}
//             />

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Were the instructions on medication usage explained clearly by the Pharmacist?"}
//                     malayalam={"മരുന്നുകളുടെ ഉപയോഗത്തെക്കുറിച്ചുള്ള നിർദ്ദേശങ്ങൾ ഫാർമസിസ്റ്റ് വ്യക്തമായി വിശദീകരിച്ചിട്ടുണ്ടോ?"}
//                     id={4}
//                 />
//             </Suspense>
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={4}
//                     selected={selected[4]}
//                 />
//             </Suspense>

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"How would you rate the cleanliness and organization of the pharmacy area?"}
//                     malayalam={"ഫാർമസി ഏരിയയുടെ വൃത്തിയും ഓർഗനൈസേഷനും നിങ്ങൾ എങ്ങനെ വിലയിരുത്തും?"}
//                     id={5}
//                 />
//             </Suspense>
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={5}
//                     selected={selected[5]}
//                 />
//             </Suspense>

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Did the pharmacy accept your insurance or provide other payment options?"}
//                     malayalam={"ഫാർമസി നിങ്ങളുടെ ഇൻഷുറൻസ് സ്വീകരിച്ചോ അല്ലെങ്കിൽ മറ്റ് പേയ്‌മെൻ്റ് ഓപ്ഷനുകൾ നൽകിയോ"}
//                 />
//             </Suspense>
//             <RadiologyCheckBox
//                 value={Items5}
//             />

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Were you satisfied with the overall price of the medications?"}
//                     malayalam={"മരുന്നുകളുടെ മൊത്തത്തിലുള്ള വിലയിൽ നിങ്ങൾ തൃപ്തനാണോ?"}
//                     id={6}
//                 />
//             </Suspense>
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={6}
//                     selected={selected[6]}
//                 />
//             </Suspense>


//             <Box sx={{
//                 width: { xs: "90%", sm: '85%' },
//                 minHeight: 150,
//                 mt: 3,
//                 mb: 2,
//             }}>
//                 <Suspense fallback={<TextComponentSkeleton />
//                 }>
//                     <TextComponent
//                         english={"Do you have any suggestion for improving the pharmacy suggestions?"}
//                         malayalam={"ഫാർമസി നിർദ്ദേശങ്ങൾ മെച്ചപ്പെടുത്തുന്നതിന് നിങ്ങൾക്ക് എന്തെങ്കിലും നിർദ്ദേശമുണ്ടോ?"}
//                     />
//                 </Suspense>
//                 <Textarea
//                     onChange={(e) => setDescription(e.target.value)}
//                     value={description}
//                     minRows={2} sx={{
//                         mt: 1,
//                         minHeight:
//                             80, mb: 1,
//                         border: '1px solid #CC488F',
//                         '&:focus': {
//                             outline: 'none',
//                             border: '1px solid #CC488F',
//                         },
//                     }} />
//             </Box>
//             <Box sx={{
//                 widows: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 mt: 4
//             }}>
//                 <FeedbackButton
//                     average={selected}
//                     handlesubmit={handlesumbit}
//                     setSnackbarOpen={setSnackbarOpen}
//                     snackbarOpen={snackbarOpen}
//                 />
//             </Box>
//             <Typography sx={{
//                 textAlign: 'center',
//                 mt: 5,
//                 fontSize: { xs: 8, sm: 10, md: 14, lg: 16 },
//                 color: " rgba(65, 68, 68, 0.64)",
//                 fontFamily: "Bahnschrift",
//             }}>Copyright © 2025 Travancore Medicity</Typography>

//         </Box>
//     )
// }

// export default PharmacyFeedback