// import { Box, Input, Textarea, Typography, } from '@mui/joy'
// import React, { lazy, Suspense, useState } from 'react'
// import FeedbackButton from './Commoncomponents/FeedbackButton'
// import QuestionBoxSkeleton from './Commoncomponents/QuestionBoxSkeleton'
// import EmojiSkeleton from './Commoncomponents/ChooseEmogjiSkeleton';
// import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';



// const FeedBackLog = lazy(() => import('./FeedBackLog'))
// const QuestionBox = lazy(() => import('./QuestionBox'))
// const ChooseEmoji = lazy(() => import('./ChooseEmoji'))
// const TextComponent = lazy(() => import('./Commoncomponents/TextComponent'))



// const CommonFinalFeed = () => {
//     const [selected, setSelected] = useState({})
//     const [needrep, setNeedRep] = useState(null)
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [clicked, setClicked] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [description, setDescription] = useState("")


//     const handleEmojiSelect = (questionId, emojiId) => {
//         setSelected((prevState) => ({
//             ...prevState,
//             [questionId]: emojiId,
//         }));
//     };

//     const handleImageClick = (value) => {
//         if (value === clicked) {
//             setClicked(null)
//             setNeedRep(null)
//         } else {
//             setClicked(value);
//             setNeedRep(value === "yes" ? "yes" : "no");
//         }
//     };
//     const handlemobilenumber = (event) => {
//         const value = event.target.value;
//         if (value.length <= 10) {
//             setMobileNumber(value);
//         }
//     }

//     const resetAll = () => {
//         setNeedRep(null)
//         setMobileNumber('')
//         setClicked(null)
//         setSelected({})
//         setDescription("")
//     }
//     const handlesumbit = () => {
//         resetAll()
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
//                     english={"How satisfied were you with the care and treatment you received?"}
//                     malayalam={"നിങ്ങൾക്ക് ലഭിച്ച പരിചരണത്തിലും ചികിത്സയിലും നിങ്ങൾ എത്രത്തോളം സംതൃപ്തനായിരുന്നു?"}
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
//                     english={"Were your questions or concerns addressed promptly and effectively?"}
//                     malayalam={"നിങ്ങളുടെ ചോദ്യങ്ങളോ ആശങ്കകളോ ഉടനടി ഫലപ്രദമായി പരിഹരിക്കപ്പെട്ടോ?"}
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
//                     english={"How would you rate the waiting time for the service?"}
//                     malayalam={"സേവനത്തിനായുള്ള കാത്തിരിപ്പ് സമയം നിങ്ങൾ എങ്ങനെ വിലയിരുത്തും?"}
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
//                     english={"How would you rate the cleanliness and comfort of the facility?"}
//                     malayalam={"സൗകര്യത്തിൻ്റെ വൃത്തിയും സൗകര്യവും നിങ്ങൾ എങ്ങനെ വിലയിരുത്തും?"}
//                     id={4}
//                 />
//             </Suspense >
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={4}
//                     selected={selected[4]}
//                 />
//             </Suspense>
//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Would you recommend our services to others?"}
//                     malayalam={"ഞങ്ങളുടെ സേവനങ്ങൾ മറ്റുള്ളവർക്ക് ശുപാർശ ചെയ്യുമോ?"}
//                     id={5}
//                 />
//             </Suspense >
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={5}
//                     selected={selected[5]}
//                 />
//             </Suspense>
//             <Box sx={{
//                 width: { xs: "90%", sm: '85%' },
//                 minHeight: 150,
//                 mt: 3,
//                 mb: 2,
//             }}>

//                 <TextComponent
//                     english={"Tell us How we can Improve?"}
//                     malayalam={"നമുക്ക് എങ്ങനെ മെച്ചപ്പെടുത്താം എന്ന് പറയൂ?"}
//                 />
//                 <Textarea
//                     outline="contained"

//                     onChange={(e) => setDescription(e.target.value)}
//                     value={description}
//                     minRows={2} sx={{
//                         mt: 1,
//                         minHeight: 80,
//                         mb: 1,
//                         border: '1px solid #CC488F',
//                         '&:focus': {
//                             outline: 'none',
//                             border: '1px solid #CC488F',
//                         },
//                         '&:hover': {
//                             border: '1px solid #CC488F', // Hover color
//                         },
//                     }} />
//                 <TextComponent
//                     english={"Would you like a representative to Contact you?"}
//                     malayalam={"ഒരു പ്രതിനിധി നിങ്ങളെ ബന്ധപ്പെടാൻ  ആഗ്രഹിക്കുന്നുണ്ടോ?"}
//                 />
//                 <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'space-around',
//                     mb: 1,
//                     pt: 1,
//                     mt: 3
//                 }}>
//                     <Box
//                         sx={{
//                             width: { xs: 60, sm: 70 },
//                             height: { xs: 60, sm: 70 },
//                             // bgcolor: clicked === "yes" ? 'green' : "white",
//                             borderRadius: '50%',
//                             p: 0.4,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             border: clicked === 'yes' ? '2px solid rgba(0, 128, 0, 0.56)' : ' 1px solid rgba(0, 128, 0, 0.56)',
//                             filter: clicked === 'yes' ? `drop-shadow(0px 0px 15px rgba(4, 154, 46, 0.7))` : '',
//                             bgcolor: ' rgba(255, 255, 255, 0.8)'
//                         }}
//                         onClick={() => handleImageClick("yes")} alt=""
//                     >
//                         {
//                             clicked === "yes" ? <ThumbUpIcon
//                                 sx={{
//                                     width: '90%',
//                                     height: '90%',
//                                     color: 'rgba(0, 128, 0, 0.56)'

//                                 }}

//                             /> : <ThumbUpOffAltIcon
//                                 sx={{
//                                     width: '90%',
//                                     height: '90%',
//                                     color: 'rgba(0, 128, 0, 0.56)'

//                                 }}

//                             />
//                         }

//                     </Box>
//                     <Box
//                         sx={{
//                             width: { xs: 60, sm: 70 },
//                             height: { xs: 60, sm: 70 },
//                             // bgcolor: clicked === "no" ? 'red' : "",
//                             borderRadius: '50%',
//                             p: 0.4,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             border: clicked === 'no' ? '2px solid rgba(224, 15, 15, 0.56)' : ' 1px solid rgba(224, 15, 15, 0.56)',
//                             filter: clicked === 'no' ? `drop-shadow(0px 0px 15px rgba(178, 0, 0, 0.46))` : '',
//                             bgcolor: ' rgba(255, 255, 255, 0.8)'
//                         }}
//                         onClick={() => handleImageClick("no")}
//                     >
//                         {
//                             clicked === 'no' ? <ThumbDownAltIcon
//                                 sx={{
//                                     width: '90%',
//                                     height: '90%',
//                                     color: 'rgba(224, 15, 15, 0.56)',

//                                 }}
//                             /> : <ThumbDownOffAltIcon
//                                 sx={{
//                                     width: '90%',
//                                     height: '90%',
//                                     color: 'rgba(224, 15, 15, 0.56)',

//                                 }}
//                             />
//                         }
//                     </Box>
//                 </Box>
//                 {
//                     needrep === "yes" &&
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'center'
//                         }}
//                     >
//                         <Input
//                             placeholder="91+ XXXXXXXXX"
//                             type='Number'
//                             value={mobileNumber}
//                             onChange={handlemobilenumber}
//                             maxLength="10"
//                             sx={{
//                                 height: 55,
//                                 width: { xs: '80%', sm: '50%' },
//                                 borderRadius: 11,
//                                 mt: 3,
//                                 border: '1px solid #CC488F',
//                                 '&:focus': {
//                                     outline: 'none',
//                                     border: '1px solid #CC488F',
//                                 },
//                             }}
//                         />
//                     </Box>
//                 }
//                 <Box sx={{
//                     widows: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mt: 4
//                 }}>
//                     <FeedbackButton
//                         average={selected}
//                         handlesubmit={handlesumbit}
//                         setSnackbarOpen={setSnackbarOpen}
//                         snackbarOpen={snackbarOpen}
//                     />
//                 </Box>
//                 <Typography sx={{
//                     textAlign: 'center',
//                     mt: 5,
//                     fontSize: { xs: 8, sm: 10, md: 14, lg: 16 },
//                     color: " rgba(65, 68, 68, 0.64)",
//                     fontFamily: "Bahnschrift",
//                 }}>Copyright © 2025 Travancore Medicity</Typography>
//             </Box>
//         </Box >
//     )
// }

// export default CommonFinalFeed

//not using