// import { Box, Input, Textarea, Typography, } from '@mui/joy';
// import React, { lazy, Suspense, useState } from 'react';
// import FeedbackButton from '../Commoncomponents/FeedbackButton';
// import QuestionBoxSkeleton from '../Commoncomponents/QuestionBoxSkeleton';
// import EmojiSkeleton from '../Commoncomponents/ChooseEmogjiSkeleton';
// import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';



// const FeedBackLog = lazy(() => import('../FeedBackLog'))
// const QuestionBox = lazy(() => import('../QuestionBox'))
// const ChooseEmoji = lazy(() => import('../ChooseEmoji'))
// const TextComponent = lazy(() => import('../Commoncomponents/TextComponent'))




// const LaboratoryFeedback = () => {
//     const [selected, setSelected] = useState({})
//     const [needrep, setNeedRep] = useState(null)
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


//     const resetAll = () => {
//         setNeedRep(null)
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
//                     english={"Behaviour/Approach of billing Staff?"}
//                     malayalam={"ബില്ലിംഗ് സ്റ്റാഫിൻ്റെ പെരുമാറ്റം/സമീപനം?"}
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
//                     english={"Sample collection?"}
//                     malayalam={"സാമ്പിൾ ശേഖരണം?"}
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
//                     english={"Timely Report Delivery?"}
//                     malayalam={"സമയബന്ധിതമായ റിപ്പോർട്ട് ഡെലിവറി?"}
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
//                     english={"Cleanliness of toilet?"}
//                     malayalam={"ടോയ്‌ലറ്റിൻ്റെ ശുചിത്വം?"}
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
//                     english={"HouseKeeping?"}
//                     malayalam={"ഹൗസ് കീപ്പിംഗ്?"}
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

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"HouseKeeping?"}
//                     malayalam={"ഹൗസ് കീപ്പിംഗ്?"}
//                     id={6}
//                 />
//             </Suspense >
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={6}
//                     selected={selected[6]}
//                 />
//             </Suspense>


//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Reliability fo reports?"}
//                     malayalam={"റിപ്പോർട്ടുകളുടെ വിശ്വാസ്യത?"}
//                     id={7}
//                 />
//             </Suspense >
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={7}
//                     selected={selected[7]}
//                 />
//             </Suspense>


//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Approach of laboratory staff?"}
//                     malayalam={"ലബോറട്ടറി ജീവനക്കാരുടെ സമീപനം?"}
//                     id={8}
//                 />
//             </Suspense >
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={8}
//                     selected={selected[8]}
//                 />
//             </Suspense>

//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Accuracy of reports?"}
//                     malayalam={"റിപ്പോർട്ടുകളുടെ കൃത്യത?"}
//                     id={9}
//                 />
//             </Suspense >
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={9}
//                     selected={selected[9]}
//                 />
//             </Suspense>
//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Proper Communication?"}
//                     malayalam={"ശരിയായ ആശയവിനിമയം?"}
//                     id={10}
//                 />
//             </Suspense >
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={10}
//                     selected={selected[10]}
//                 />
//             </Suspense>
//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Test Rates?"}
//                     malayalam={"ടെസ്റ്റ് നിരക്കുകൾ?"}
//                     id={11}
//                 />
//             </Suspense >
//             <Suspense fallback={<EmojiSkeleton />}>
//                 <ChooseEmoji
//                     setSelected={handleEmojiSelect}
//                     questionid={11}
//                     selected={selected[11]}
//                 />
//             </Suspense>
//             <Box sx={{
//                 width: { xs: "90%", sm: '85%' },
//                 minHeight: 150,
//                 mt: 3,
//                 mb: 2,
//             }}>

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
//                     sx={{
//                         width: { xs: 60, sm: 70 },
//                         height: { xs: 60, sm: 70 },
//                         // bgcolor: clicked === "yes" ? 'green' : "white",
//                         borderRadius: '50%',
//                         p: 0.4,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         cursor: 'pointer',
//                         border: clicked === 'yes' ? '2px solid rgba(0, 128, 0, 0.56)' : ' 1px solid rgba(0, 128, 0, 0.56)',
//                         filter: clicked === 'yes' ? `drop-shadow(0px 0px 15px rgba(4, 154, 46, 0.7))` : '',
//                         bgcolor: ' rgba(255, 255, 255, 0.8)'
//                     }}
//                     onClick={() => handleImageClick("yes")} alt=""
//                 >
//                     {
//                         clicked === "yes" ? <ThumbUpIcon
//                             sx={{
//                                 width: '90%',
//                                 height: '90%',
//                                  color: 'rgba(0, 128, 0, 0.56)'
//                             }}

//                         /> : <ThumbUpOffAltIcon
//                             sx={{
//                                 width: '90%',
//                                 height: '90%',
//                                 color: 'rgba(0, 128, 0, 0.56)'
//                             }}

//                         />
//                     }

//                 </Box>
//                     <Box
//                     sx={{
//                         width: { xs: 60, sm: 70 },
//                         height: { xs: 60, sm: 70 },
//                         // bgcolor: clicked === "no" ? 'red' : "",
//                         borderRadius: '50%',
//                         p: 0.4,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         cursor: 'pointer',
//                         border: clicked === 'no' ? '2px solid rgba(224, 15, 15, 0.56)' : ' 1px solid rgba(224, 15, 15, 0.56)',
//                             filter: clicked === 'no' ? `drop-shadow(0px 0px 15px rgba(178, 0, 0, 0.46))` : '',
//                             bgcolor: ' rgba(255, 255, 255, 0.8)'
//                     }}
//                     onClick={() => handleImageClick("no")}
//                 >
//                     {
//                         clicked === 'no' ? <ThumbDownAltIcon
//                             sx={{
//                                 width: '90%',
//                                 height: '90%',
//                                 color: 'rgba(224, 15, 15, 0.56)',

//                             }}
//                         /> : <ThumbDownOffAltIcon
//                             sx={{
//                                 width: '90%',
//                                 height: '90%',
//                                 color: 'rgba(224, 15, 15, 0.56)',

//                             }}
//                         />
//                     }
//                 </Box>
//                 </Box>
//                 {
//                     needrep === "yes" &&
//                     <Box
//                     sx={{
//                         display: 'flex',
//                         width: '100%',
//                         mt: 5,
//                         px: 2,
//                     }}
//                     >
//                         <Textarea
//                             onChange={(e) => setDescription(e.target.value)}
//                             value={description}
//                             placeholder='Reason(കാരണം)'
//                             minRows={2} sx={{ mt: 1, minHeight: 100, mb: 1, width: '100%' }} />
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

// export default LaboratoryFeedback