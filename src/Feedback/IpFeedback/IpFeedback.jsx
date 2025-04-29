// import { Box, Divider, Chip, Textarea, Typography, } from '@mui/joy'
// import React, { lazy, Suspense, useState } from 'react'
// import EmojiSkeleton from '../Commoncomponents/ChooseEmogjiSkeleton'
// import QuestionBoxSkeleton from '../Commoncomponents/QuestionBoxSkeleton'
// import FeedbackButton from '../Commoncomponents/FeedbackButton'
// import { Items6, Time } from '../Commoncomponents/Commondetal'
// import RadiologyCheckBox from '../RadiologyFeedback/RadiologyCheckBox'
// import RulesandRegulation from '../RulesandRegulation'
// import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// import FeedbackIcon from '@mui/icons-material/Feedback';

// const FeedBackLog = lazy(() => import('../FeedBackLog'))
// const QuestionBox = lazy(() => import('../QuestionBox'))
// const ChooseEmoji = lazy(() => import('../ChooseEmoji'))
// const TextComponent = lazy(() => import('../Commoncomponents/TextComponent'))



// const Ipfeedback = () => {

//     const [selected, setSelected] = useState({})
//     const [needrep, setNeedRep] = useState(null);
//     const [clicked, setClicked] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [description, setDescription] = useState("")
//     const [selectyesorno, setSelectYesorNo] = useState({})
//     const [remarks, setRemarks] = useState("")

//     const handleEmojiSelect = (questionId, emojiId) => {
//         setSelected((prevState) => ({
//             ...prevState,
//             [questionId]: emojiId,
//         }));
//     };

//     const hanldeyesornoselect = (questionId, value) => {
//         setSelectYesorNo((prevState) => ({
//             ...prevState,
//             [questionId]: value,
//         }));
//     };


//     console.log(selectyesorno);


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
//             setSnackbarOpen(false);
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
//                     english={"Admission desk - Behaviour and Communication?"}
//                     malayalam={"അഡ്മിഷൻ ഡെസ്ക് - പെരുമാറ്റവും ആശയവിനിമയവും?"}
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
//                     english={"Time taken to occupy the room / ward after admission advise?"}
//                     malayalam={"അഡ്മിഷൻ ഉപദേശത്തിന് ശേഷം മുറി / വാർഡിൽ താമസിക്കാൻ എടുക്കുന്ന സമയം"}
//                 />
//             </Suspense>
//             <RadiologyCheckBox
//                 value={Time}
//             />
//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Amenlties provided in the room / ward?"}
//                     malayalam={"മുറി / വാർഡിൽ സൗകര്യങ്ങൾ നൽകിയിട്ടുണ്ട്?"}
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
//                     english={"Cleanliness of the room/ward?"}
//                     malayalam={"മുറിയുടെ/വാർഡിൻ്റെ ശുചിത്വം?"}
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
//                     english={"Doctors Behaviour and communication?"}
//                     malayalam={"ഡോക്ടർമാരുടെ പെരുമാറ്റവും ആശയവിനിമയവും?"}
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
//                     english={"Nurses Behaviour and communiction?"}
//                     malayalam={"നഴ്സുമാരുടെ പെരുമാറ്റവും ആശയവിനിമയവും?"}
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
//                     english={"Nursing Care?"}
//                     malayalam={"നഴ്സുമാരുടെ പെരുമാറ്റവും ആശയവിനിമയവും?"}
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
//                     english={"Cafeteria & Canteen Service?"}
//                     malayalam={"കഫറ്റീരിയ & കാൻ്റീന് സേവനം?"}
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
//                     english={"Billing and Discharge?"}
//                     malayalam={"ബില്ലിംഗും ഡിസ്ചാർജും?"}
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
//                     english={"Treatment Satisfaction?"}
//                     malayalam={"ചികിത്സ സംതൃപ്തി"}
//                 />
//             </Suspense>
//             <RadiologyCheckBox
//                 value={Items6}
//             />
//             <Suspense fallback={<QuestionBoxSkeleton />}>
//                 <QuestionBox
//                     english={"Overall experience in Medicity?"}
//                     malayalam={"മെഡിസിറ്റിയിൽ മൊത്തത്തിലുള്ള അനുഭവം"}
//                 />
//             </Suspense>
//             <RadiologyCheckBox
//                 value={Items6}
//             />
//             <Box sx={{
//                 width: { xs: "90%", sm: '85%' },
//                 minHeight: 150,
//                 mt: 3,
//                 mb: 2,
//             }}>

//                 <TextComponent
//                     english={"Will you refer Travancore Medicity to Family & friends for treatment?"}
//                     malayalam={"ചികിത്സയ്ക്കായി നിങ്ങൾ ട്രാവൻകൂർ മെഡിസിറ്റി കുടുംബത്തിനും സുഹൃത്തുക്കൾക്കും റഫർ ചെയ്യുമോ?"}
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
//                             border: clicked === 'yes' ? '2px solid rgba(0, 128, 0, 0.8)' : ' 1px solid rgba(0, 128, 0, 0.8)',
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
//                             width: '96%',
//                             mt: 5,
//                             px: 2
//                         }}
//                     >
//                         <Textarea
//                             onChange={(e) => setDescription(e.target.value)}
//                             value={description}
//                             placeholder='Reason(കാരണം)'
//                             minRows={2} sx={{ mt: 1, minHeight: 120, mb: 1, width: '100%' ,

//                                 border: '1px solid #CC488F',
//                                 '&:focus': {
//                                     outline: 'none',
//                                     border: '1px solid #CC488F',
//                                 },
//                                 '&:hover': {
//                                     border: '1px solid #CC488F', // Hover color
//                                 },
//                             }} />
//                     </Box>
//                 }
//                 <Box sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     // bgcolor: 'red',
//                     width: '100%',
//                     position: 'relative',
//                     marginTop: 5,
//                     mb: 5
//                 }}>
//                     <Divider sx={{ width: '50%' }} />
//                     <Chip variant="solid" 
//                      color="neutral"
//                      sx={{
//                         position: 'absolute',
//                         top: -12,
//                         fontFamily: "Bahnschrift",
//                         fontSize: { xs: 10, sm: 16 }

//                     }}
//                     startDecorator={<FeedbackIcon sx={{ fontSize: { xs: 17, sm: 20 } }}/>}>
//                         Patient Rights
//                     </Chip>
//                     <Divider sx={{ width: '50%' }} />
//                 </Box>


//                 {/* <Divider sx={{ marginTop: 5, marginBottom: 5 }} /> */}
//                 <Typography sx={{
//                     fontSize: { xs: 16, sm: 22, md: 25, lg: 24 },
//                     textAlign: 'center',
//                     fontWeight: { xs: 400 },
//                     color: " rgba(65, 68, 68, 0.64)",
//                     fontFamily: "Bahnschrift",
//                 }}>Questionnarie to check Compliance to Patient Right</Typography>
//                 <Typography sx={{
//                     fontSize:
//                         { xs: 13, sm: 17, md: 18, lg: 17 },
//                     textAlign: 'center',
//                     fontWeight: { xs: 400 },
//                     color: " rgba(65, 68, 68, 0.64)",
//                     fontFamily: "Bahnschrift",
//                     mb: 5
//                 }}>
//                     രോഗിയുടെ അവകാശം പാലിക്കുന്നുണ്ടോയെന്ന് പരിശോധിക്കുന്നതിനുള്ള ചോദ്യാവലി</Typography>

//             </Box>


//             {/* Rules and Regulation component */}
//             <RulesandRegulation
//                 setSelected={hanldeyesornoselect}
//                 selected={selectyesorno}
//                 setRemarks={setRemarks}
//                 remarks={remarks}
//             />


//             {/* button component */}
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

//         </Box >
//     )
// }

// export default Ipfeedback