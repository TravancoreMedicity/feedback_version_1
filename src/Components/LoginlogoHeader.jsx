import { Box } from '@mui/joy'
import React, { memo } from 'react'
import { Skeleton } from '@mui/material';
// import { PUBLIC_NAS_FOLDER } from "../Constant/Static";
import feedbackLogo from '../assets/FeedbackLogo.png'



const LoginlogoHeader = () => {

    // const [imgLoaded, setImgLoaded] = useState(false);
    // const [imgError, setImgError] = useState(false);
    // const imgSrc = `${PUBLIC_NAS_FOLDER}/logo/FeedbackLogo.png`;


    return (
        <>
            <Box
                className="flex items-center justify-start w-40 h-40 border-1 rounded-full"
                sx={{
                    filter: `drop-shadow(5px 5px 20px rgba(224, 171, 196, 0.61))`
                }}>
                <Box
                    sx={{
                        width: { xs: 120, sm: 120 },
                        height: { xs: 120, sm: 120 },
                    }}>
                    {/* {(!feedbackLogo) && (
                        <Skeleton
                            variant="circular"
                            width={120}
                            height={120}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                background: 'linear-gradient(45deg, rgba(123, 31, 162, 0.59), rgba(194, 24, 92, 0.6), rgba(25, 118, 210, 0.62))'
                            }}
                        />
                    )} */}
                    {
                        feedbackLogo ? <img
                            src={feedbackLogo}
                            alt="Feedback Logo"
                            // onLoad={() => setImgLoaded(true)}
                            // onError={() => setImgError(true)}
                            style={{
                                // display: imgLoaded && !imgError ? 'block' : 'none',
                                width: '100%',
                                height: '100%'
                            }}
                        /> : <Skeleton
                            variant="circular"
                            width={120}
                            height={120}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                background: 'linear-gradient(45deg, rgba(123, 31, 162, 0.59), rgba(194, 24, 92, 0.6), rgba(25, 118, 210, 0.62))'
                            }}
                        />
                    }

                </Box>
            </Box>
        </>
    )
}

export default memo(LoginlogoHeader)
