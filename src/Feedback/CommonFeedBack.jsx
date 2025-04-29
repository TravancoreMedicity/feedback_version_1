// import { Box, Button, Textarea, Typography } from '@mui/joy'
// import React, { useState } from 'react'
// import LogoComponent from '../Component/LogoComponent'
// import ChooseEmoji from './ChooseEmoji';
// import FeedbackTextArea from './FeedbackTextArea';


// const CommonFeedBack = () => {
//     const [selected, setSelected] = useState({})
//     const Questions = [
//         { id: 1, name: " How satisfied were you with the care and treatment you received?", count: 1 },
//         { id: 2, name: " Were your questions or concerns addressed promptly and effectively?", count: 2 },
//         { id: 3, name: " How would you rate the waiting time for the service?", count: 3 },
//         { id: 4, name: " How would you rate the cleanliness and comfort of the facility?", count: 4 },
//         { id: 5, name: " Would you recommend our services to others?", count: 5 },
//     ];
    

//     const handleEmojiSelect = (questionId, emojiId) => {
//         setSelected((prevState) => ({
//             ...prevState,
//             [questionId]: emojiId,
//         }));
//     };

//     return (
//         <Box sx={{
//             width: '99vw',
//             display: 'flex',
//             flex:1,
//             bgcolor: 'transparent',
//             alignItems: 'center',
//             flexDirection: 'column',
//             bgcolor:'white',
//             pb:1
//         }}>
//             <LogoComponent />
//             <Box
//                 sx={{
//                     width: "98%",
//                     height: "55%",
//                     display: 'flex',
//                     flexDirection: 'column',
//                     bgcolor: 'white',
//                     marginTop: 7,
//                     px: 1,
//                     py: 1
//                 }}>
//                 <Box sx={{ width: '100%', height: 'auto', mb: 1, pb: 1}}>
//                     {
//                         Questions?.map((quest) => {
//                             return (
//                                 <Box  key={quest.id}>
//                                     <Box sx={{ gap: 2, display: 'flex', alignItems: 'center', mb: 3, mt: 1 }}>
//                                         <Typography
//                                             sx={{
//                                                 fontSize: { xs: 12, sm: 16, md: 18, lg: 22 },
//                                                 fontWeight: 600
//                                             }}>{quest.count}.</Typography>
//                                         <Box sx={{ height: 20 }}>
//                                             <Typography
//                                                 sx={{
//                                                     fontSize: { xs: 12, sm: 16, md: 18, lg: 22 },
//                                                     fontWeight: 600
//                                                 }}>{quest.name}</Typography>
//                                         </Box>
//                                     </Box>
//                                     <ChooseEmoji
//                                         questionid={quest.id}
//                                         setSelected={handleEmojiSelect}
//                                         selected={selected[quest.id]} />
//                                 </Box>
//                             )
//                         })
//                     }
//                 </Box>
//             </Box >
//             <FeedbackTextArea count={6} quest={"What areas could be imporved?"}/>
//             <FeedbackTextArea count={7} quest={"Additional Comments(optional)?"}/>
//             <FeedbackTextArea count={8} quest={"Please share any other Suggestion or Feedback?"}/>

//           <Box sx={{width:'100%',px:1}}>
//           <Button color='success'>Submit FeedBack</Button>
//           </Box>
//         </Box>
//     )
// }

// export default CommonFeedBack

//not using