import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';


export const FiveStar = [
    { field: 'Very Satisfied', emo: <TagFacesIcon sx={{ fontSize: { xs: 34, sm: 50, md: 55, lg: 55 } }} />, id: 1 },
    { field: 'Satisfied', emo: <SentimentSatisfiedAltIcon sx={{ fontSize: { xs: 34, sm: 50, md: 55, lg: 55 } }} />, id: 2 },
    { field: 'Neutral', emo: <SentimentSatisfiedIcon sx={{ fontSize: { xs: 34, sm: 50, md: 55, lg: 55 } }} />, id: 3 },
    { field: 'Dissatisfied', emo: <SentimentDissatisfiedIcon sx={{ fontSize: { xs: 34, sm: 50, md: 55, lg: 55 } }} />, id: 4 },
    { field: 'Very Dissatisfied', emo: <SentimentVeryDissatisfiedIcon sx={{ fontSize: { xs: 34, sm: 50, md: 55, lg: 55 } }} />, id: 5 },
]



export const ThreeStar = [
    { field: 'Very Satisfied', emo: <TagFacesIcon sx={{ fontSize: { xs: 34, sm: 50, md: 55, lg: 55 } }} />, id: 1 },
    { field: 'Neutral', emo: <SentimentSatisfiedIcon sx={{ fontSize: { xs: 34, sm: 50, md: 55, lg: 55 } }} />, id: 3 },
    { field: 'Very Dissatisfied', emo: <SentimentVeryDissatisfiedIcon sx={{ fontSize: { xs: 34, sm: 50, md: 55, lg: 55 } }} />, id: 5 },
]



export const Items = [
    "Less than 10 Minutes",
    "10 to 20 Minutes",
    "20 to 30 Minutes",
    "More than 30 Minutes"
]

export const Items2 = [
    "Yes, very clearly",
    "Yes, Somewhat clearly",
    "No,I wasn't informed",
    "No,I already knew from a previos experience"
]


export const Items3 = [
    "Yes, Earlier than expected",
    "Yes, on Time",
    "No,Slightly Delayed",
    "No,Significantly Delayed"
]


export    const iconMap = {
    "Very Satisfied": <TagFacesIcon sx={{ fontSize: { xs: 36, sm: 35, md: 40, lg: 45 }, bgcolor: '#1955AC', borderRadius: '50%', p: 0.1, color: 'white' }} />,
    "Satisfied": <SentimentSatisfiedAltIcon sx={{ fontSize: { xs: 36, sm: 35, md: 40, lg: 45 }, bgcolor: '#1955AC', borderRadius: '50%', p: 0.1, color: 'white' }} />,
    "Neutral": <SentimentSatisfiedIcon sx={{ fontSize: { xs: 36, sm: 35, md: 40, lg: 45 }, bgcolor: '#1955AC', borderRadius: '50%', p: 0.1, color: 'white' }} />,
    "Dissatisfied": <SentimentDissatisfiedIcon sx={{ fontSize: { xs: 36, sm: 35, md: 40, lg: 45 }, bgcolor: '#1955AC', borderRadius: '50%', p: 0.1, color: 'white' }} />,
    "Very Dissatisfied": <SentimentVeryDissatisfiedIcon sx={{ fontSize: { xs: 36, sm: 35, md: 40, lg: 45 }, bgcolor: '#1955AC', borderRadius: '50%', p: 0.1, color: 'white' }} />,
};


export const Items4 = [
    "All Medications were available",
    "Most Medications were available",
    "Some Medications were unavailable",
    "None of the Medications were available"
]

export const Items5 = [
    "Yes,Easily",
    "Yes, but with some difficulty",
    "No,insurance was not accepted",
    "I did not use insurance"
]


export const Items6 = [
    "Good | നല്ലത് ",
    "Need Improvement | മെച്ചപ്പെടുത്തൽ ആവശ്യമാണ്",
]


export const Time = [
    "10 - 15  Minutes",
    "15 - 30  Minutes",
    "30 - 45  Minutes",
    "45 - 60  Minutes",
    "1 Hour and More"
]


export const component = [
    { value: 1, label: "TextArea" },
    { value: 2, label: "InputBox" },
    { value: 3, label: "MobileInputBox" },
]